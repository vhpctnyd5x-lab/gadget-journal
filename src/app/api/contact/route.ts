import { NextRequest, NextResponse } from 'next/server';

// Rate limiting: Store IP -> count and timestamp
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Configuration
const RATE_LIMIT_REQUESTS = 5; // Max 5 requests
const RATE_LIMIT_WINDOW = 3600000; // per hour
const MAX_CONTENT_LENGTH = 5000; // Max message length
const RECIPIENT_EMAILS = [
  'akito.miura@icloud.com',
  'miura.13.ryoudai@gmail.com',
];

// Validation helpers
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
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

// Check for spam patterns
function isSpamContent(content: string): boolean {
  const spamPatterns = [
    /viagra|cialis|casino|lottery|prize|click here|href|<[^>]*>/gi,
    /http[s]?:\/\/[^\s]+/g, // URLs (allow some but flag excessive)
    /[A-Z]{10,}/g, // Excessive caps
  ];

  const spamChecks = spamPatterns.filter((pattern) => {
    const matches = content.match(pattern) || [];
    return matches.length > 0;
  });

  return spamChecks.length > 1 || /http[s]?:\/\//g.test(content);
}

// Rate limiting check
function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  // Reset if window has passed
  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  // Check limit
  if (record.count >= RATE_LIMIT_REQUESTS) {
    return { allowed: false, resetTime: record.resetTime };
  }

  // Increment count
  record.count++;
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
          resetTime: rateLimit.resetTime,
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!isValidName(name)) {
      return NextResponse.json(
        { success: false, error: 'Invalid name' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (!isValidMessage(message)) {
      return NextResponse.json(
        { success: false, error: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    if (subject && !isValidSubject(subject)) {
      return NextResponse.json(
        { success: false, error: 'Subject is too long' },
        { status: 400 }
      );
    }

    // Spam check
    if (isSpamContent(message) || isSpamContent(subject || '')) {
      return NextResponse.json(
        { success: false, error: 'Message contains suspicious content' },
        { status: 400 }
      );
    }

    // Log contact for admin (in production, use proper logging)
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      name,
      email,
      subject,
      messageLength: message.length,
      ip,
    });

    // In production, you would send an actual email here
    // For now, we'll just return success
    // Example with nodemailer or SendGrid would go here

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
