import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_REQUESTS = 5;
const RATE_LIMIT_WINDOW = 3600000;
const MAX_CONTENT_LENGTH = 5000;

const RECIPIENT_EMAILS = [
  'akito.miura@icloud.com',
  'miura.13.ryoudai@gmail.com',
];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

function isValidName(name: string): boolean {
  return name.trim().length > 0 && name.length <= 100;
}

function isValidMessage(message: string): boolean {
  return message.trim().length > 10 && message.length <= MAX_CONTENT_LENGTH;
}

function isValidSubject(subject: string): boolean {
  return subject.trim().length <= 200;
}

function isSpamContent(content: string): boolean {
  const spamPatterns = [
    /viagra|cialis|casino|lottery|prize|click here/gi,
    /[A-Z]{10,}/g,
  ];
  return spamPatterns.filter(p => (content.match(p) || []).length > 0).length > 1;
}

function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }
  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }
  if (record.count >= RATE_LIMIT_REQUESTS) {
    return { allowed: false, resetTime: record.resetTime };
  }
  record.count++;
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'しばらく時間をおいて再送信してください。' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

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
    if (isSpamContent(message) || isSpamContent(subject || '')) {
      return NextResponse.json({ success: false, error: '不審なコンテンツが含まれています' }, { status: 400 });
    }

    // Resend でメール送信
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({ success: false, error: 'メール設定エラー' }, { status: 500 });
    }

    const resend = new Resend(resendApiKey);

    const emailSubject = subject
      ? `[Gadget Journal] ${subject}`
      : `[Gadget Journal] お問い合わせ from ${name}`;

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
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">メール</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #2563eb;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">件名</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${subject || '（未入力）'}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <div style="color: #64748b; font-size: 13px; margin-bottom: 8px;">メッセージ</div>
            <div style="background: #f8fafc; border-radius: 8px; padding: 16px; color: #0f172a; line-height: 1.7; white-space: pre-wrap; font-size: 15px;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
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
        { status: 500 }
      );
    }

    console.log('Contact form sent:', { name, email, subject, timestamp: new Date().toISOString() });

    return NextResponse.json(
      { success: true, message: 'メッセージを送信しました。3営業日以内にご返信いたします。' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'サーバーエラーが発生しました。しばらく後でお試しください。' },
      { status: 500 }
    );
  }
}
