import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_REQUESTS = 5;
const RATE_LIMIT_WINDOW = 3600000;
const MAX_CONTENT_LENGTH = 5000;

const RECIPIENT_EMAILS = [
  'akito.miura@icloud.com',
  'miura.13.ryoudai@gmail.com',
];

const ALLOWED_ORIGINS = [
  'https://gadget-journal.vercel.app',
  'http://localhost:3000',
];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

function hasControlCharacters(str: string): boolean {
  return /[\r\n\u0000-\u001f\u007f]/.test(str);
}

function isValidEmail(email: string): boolean {
  if (hasControlCharacters(email)) return false;
  if (email.length > 255) return false;
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function isValidName(name: string): boolean {
  if (hasControlCharacters(name)) return false;
  return name.trim().length > 0 && name.length <= 100;
}

function isValidMessage(message: string): boolean {
  return message.trim().length > 10 && message.length <= MAX_CONTENT_LENGTH;
}

function isValidSubject(subject: string): boolean {
  if (hasControlCharacters(subject)) return false;
  return subject.trim().length <= 200;
}

function isSpamContent(content: string): boolean {
  const spamPatterns = [
    /viagra|cialis|casino|lottery|prize|click here|bitcoin|crypto investment/gi,
    /[A-Z]{15,}/g,
    /https?:\/\/\S+/gi,
  ];
  const matches = spamPatterns.filter(p => (content.match(p) || []).length > 0).length;
  return matches >= 2;
}

function checkRateLimit(ip: string): { allowed: boolean; resetTime: number; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (rateLimitMap.size > 10000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) rateLimitMap.delete(key);
    }
  }

  if (!record || now > record.resetTime) {
    const resetTime = now + RATE_LIMIT_WINDOW;
    rateLimitMap.set(ip, { count: 1, resetTime });
    return { allowed: true, resetTime, remaining: RATE_LIMIT_REQUESTS - 1 };
  }
  if (record.count >= RATE_LIMIT_REQUESTS) {
    return { allowed: false, resetTime: record.resetTime, remaining: 0 };
  }
  record.count++;
  return { allowed: true, resetTime: record.resetTime, remaining: RATE_LIMIT_REQUESTS - record.count };
}

function rateLimitHeaders(info: { resetTime: number; remaining: number }): Record<string, string> {
  return {
    'RateLimit-Limit': String(RATE_LIMIT_REQUESTS),
    'RateLimit-Remaining': String(info.remaining),
    'RateLimit-Reset': String(Math.ceil((info.resetTime - Date.now()) / 1000)),
  };
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin');
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { success: false, error: '不正なリクエストです' },
        { status: 403 }
      );
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'しばらく時間をおいて再送信してください。' },
        { status: 429, headers: rateLimitHeaders(rateLimit) }
      );
    }

    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: '不正なリクエスト形式です' },
        { status: 400 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: '不正なリクエスト形式です' },
        { status: 400 }
      );
    }

    const name = typeof body.name === 'string' ? body.name : '';
    const email = typeof body.email === 'string' ? body.email : '';
    const subject = typeof body.subject === 'string' ? body.subject : '';
    const message = typeof body.message === 'string' ? body.message : '';

    if (!isValidName(name)) {
      return NextResponse.json({ success: false, error: 'お名前が無効です' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ success: false, error: 'メールアドレスが無効です' }, { status: 400 });
    }
    if (!isValidMessage(message)) {
      return NextResponse.json({ success: false, error: 'メッセージは10〜5000文字で入力してください' }, { status: 400 });
    }
    if (subject && !isValidSubject(subject)) {
      return NextResponse.json({ success: false, error: '件名が長すぎます' }, { status: 400 });
    }
    if (isSpamContent(message) || isSpamContent(subject || '') || isSpamContent(name)) {
      return NextResponse.json({ success: false, error: '不審なコンテンツが含まれています' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({ success: false, error: 'メール設定エラー' }, { status: 500 });
    }

    const resend = new Resend(resendApiKey);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = subject ? escapeHtml(subject) : '（未入力）';
    const safeMessage = escapeHtml(message);

    const emailSubject = subject
      ? `[Gadget Journal] ${subject.slice(0, 150)}`
      : `[Gadget Journal] お問い合わせ from ${name.slice(0, 80)}`;

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 12px;">
        <div style="background: #1d1d1f; border-radius: 10px; padding: 20px 28px; margin-bottom: 24px;">
          <h1 style="color: #fff; font-size: 20px; font-weight: 700; margin: 0; letter-spacing: -0.02em;">
            🍎 Gadget Journal — お問い合わせ
          </h1>
        </div>
        <div style="background: #fff; border-radius: 10px; padding: 28px; border: 1px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; width: 80px;">お名前</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">メール</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #2563eb;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">件名</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${safeSubject}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <div style="color: #64748b; font-size: 13px; margin-bottom: 8px;">メッセージ</div>
            <div style="background: #f8fafc; border-radius: 8px; padding: 16px; color: #0f172a; line-height: 1.7; white-space: pre-wrap; font-size: 15px;">${safeMessage}</div>
          </div>
        </div>
        <div style="margin-top: 16px; text-align: center; color: #94a3b8; font-size: 12px;">
          送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })} JST
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: 'Gadget Journal <onboarding@resend.dev>',
      to: RECIPIENT_EMAILS,
      replyTo: email,
      subject: emailSubject,
      html: htmlBody,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, error: 'メールの送信に失敗しました。しばらく後でお試しください。' },
        { status: 500, headers: rateLimitHeaders(rateLimit) }
      );
    }

    console.log('Contact form sent successfully:', { timestamp: new Date().toISOString() });

    return NextResponse.json(
      { success: true, message: 'メッセージを送信しました。3営業日以内にご返信いたします。' },
      { status: 200, headers: rateLimitHeaders(rateLimit) }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'サーバーエラーが発生しました。しばらく後でお試しください。' },
      { status: 500 }
    );
  }
}
