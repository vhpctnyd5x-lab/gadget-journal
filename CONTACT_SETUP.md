# Contact Form Setup Guide

The contact form has been updated to use Gmail's SMTP service via Nodemailer. This removes the dependency on Resend and provides a simple, self-contained solution.

## Setup Instructions

### 1. Enable 2-Factor Authentication on Your Google Account

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click "Security" in the left menu
3. Scroll to "How you sign in to Google"
4. Enable "2-Step Verification" if not already enabled

### 2. Generate a Gmail App Password

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer" (or your device)
3. Click "Generate"
4. Google will display a 16-character password (spaces included)
5. Copy this password

### 3. Set Environment Variables

Create a `.env.local` file in the project root:

```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

Replace:
- `your-email@gmail.com` with your Gmail address
- `xxxx xxxx xxxx xxxx` with the 16-character app password from step 2

### 4. Update Recipient Emails (Optional)

Edit `/src/app/api/contact/route.ts` and update the `RECIPIENT_EMAILS` array:

```typescript
const RECIPIENT_EMAILS = [
  'your-email@gmail.com',
  'another-email@gmail.com',
];
```

### 5. Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000/contact` and submit a test message.

## Deployment to Vercel

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add:
   - Key: `GMAIL_USER`, Value: `your-email@gmail.com`
   - Key: `GMAIL_APP_PASSWORD`, Value: `your-16-char-app-password`
4. Redeploy your project

## Troubleshooting

**"メール設定エラー" error:**
- Ensure `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set correctly
- Verify the app password is the 16-character version (with spaces)

**"メールの送信に失敗しました" error:**
- Check that Gmail 2FA and app password are properly configured
- Ensure your Gmail account allows "Less secure app access" (if not using app password)
- Check server logs for detailed error information

**Form not submitting:**
- Verify environment variables are set
- Check browser console for error messages
- Ensure the origin is in the allowed list in `route.ts`

## Security Notes

- Never commit `.env.local` to version control (it's in `.gitignore`)
- The Gmail app password grants access to your email—treat it like a secret
- The form includes rate limiting (5 requests per IP per hour)
- All user input is sanitized to prevent injection attacks
