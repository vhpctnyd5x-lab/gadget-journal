# Vercel Production Deployment Checklist

This checklist ensures your Gadget Journal application is production-ready when deploying to Vercel.

## 1️⃣ Environment Variables Configuration

### Tasks:
- [ ] Create project on Vercel Dashboard
- [ ] Set up production environment variables:
  - [ ] `NEXT_PUBLIC_APP_URL` - Production domain
  - [ ] `NEXT_PUBLIC_ENVIRONMENT` - Set to "production"
  - [ ] `NEXT_PUBLIC_GA_ID` - Google Analytics ID
  - [ ] `NEXT_PUBLIC_SENTRY_DSN` - Error tracking (optional)
  - [ ] `NEXTAUTH_SECRET` - Authentication secret (if using NextAuth)
  - [ ] `NEXTAUTH_URL` - Authentication callback URL
  - [ ] `API_SECRET_KEY` - Backend API secret

### Reference:
- Copy `.env.example` to `.env.production.local`
- Never commit sensitive credentials to git
- Use Vercel's Environment Variables dashboard for production secrets
- Enable "Sensitive" checkbox for secret values

### Verification:
```bash
# Verify environment is loaded correctly
npm run build
npm start
# Check console for environment variable warnings
```

---

## 2️⃣ Performance Optimization

### Tasks:
- [ ] Enable Static Site Generation (SSG) for blog posts
- [ ] Configure ISR (Incremental Static Regeneration) for dynamic content
- [ ] Optimize images with next/image component
- [ ] Configure caching headers in vercel.json
- [ ] Enable compression and minification
- [ ] Set up CDN regions (iad1, pdx1, sfo1)

### Implemented:
✅ Image optimization with AVIF and WebP formats
✅ Font optimization enabled
✅ Production source maps disabled for size reduction
✅ Cache-Control headers for static assets (1 year for _next/static)
✅ Cache-Control headers for images (24 hours)

### Verification:
```bash
# Check Next.js build output for warnings
npm run build

# Run Lighthouse audit
npx lighthouse https://gadget-journal.vercel.app --chrome-flags="--headless"

# Monitor Vercel Analytics
# Dashboard > Analytics > Core Web Vitals
```

---

## 3️⃣ Security & Compliance

### Security Headers:
- [x] Strict-Transport-Security (HSTS)
- [x] X-Frame-Options (Clickjacking protection)
- [x] X-Content-Type-Options (MIME sniffing protection)
- [x] Referrer-Policy
- [x] Permissions-Policy (Feature policy)
- [x] Content-Security-Policy (CSP)
- [x] X-XSS-Protection

### Tasks:
- [ ] Enable SSL/TLS (automatic with Vercel)
- [ ] Configure custom domain with HTTPS
- [ ] Set up DNS records (CNAME/A records)
- [ ] Enable Vercel's DDoS protection
- [ ] Review and update CSP headers
- [ ] Enable bot protection if needed
- [ ] Set up security scanning
- [ ] Configure firewall rules

### Compliance:
- [ ] Verify GDPR compliance (Privacy Policy: `/privacy`)
- [ ] Verify Terms of Service (`/terms`)
- [ ] Check cookie consent implementation
- [ ] Set up analytics consent
- [ ] Review data retention policies

### Verification:
```bash
# Check security headers
curl -I https://gadget-journal.vercel.app

# SSL/TLS check
npx testssl.sh https://gadget-journal.vercel.app

# Security audit
npm audit
```

---

## 4️⃣ Monitoring & Logging

### Monitoring Setup:
- [ ] Enable Vercel Analytics Dashboard
- [ ] Set up error tracking (Sentry integration)
- [ ] Configure monitoring for Core Web Vitals
- [ ] Monitor API response times
- [ ] Set up uptime monitoring

### Logging:
- [ ] Enable Vercel Function Logs
- [ ] Configure application error logging
- [ ] Set up alerts for build failures
- [ ] Monitor deployment history
- [ ] Review edge cache hit rates

### Tools & Services:
- **Vercel Analytics**: Native Core Web Vitals monitoring
- **Sentry**: Real-time error tracking (optional)
- **Google Analytics**: User behavior analytics
- **Speedcurve**: Custom performance monitoring (optional)

### Tasks:
- [ ] Connect Sentry project (update `NEXT_PUBLIC_SENTRY_DSN`)
- [ ] Set up Google Analytics (update `NEXT_PUBLIC_GA_ID`)
- [ ] Configure email notifications for errors
- [ ] Create performance budgets
- [ ] Set up automated performance testing

### Monitoring Dashboard URLs:
```
Vercel Analytics: https://vercel.com/dashboard/gadget-journal/analytics
Error Tracking: https://sentry.io/organizations/[org]/issues/
Performance: https://pagespeed.web.dev/
Core Web Vitals: https://search.google.com/search-console/
```

### Key Metrics to Monitor:
- **Core Web Vitals**:
  - Largest Contentful Paint (LCP) < 2.5s
  - First Input Delay (FID) < 100ms
  - Cumulative Layout Shift (CLS) < 0.1

- **API Performance**:
  - Response time < 200ms
  - Error rate < 0.1%

- **Build Performance**:
  - Build time < 5 minutes
  - Bundle size < 500KB (gzipped)

---

## Pre-Deployment Checklist

### Code Quality:
- [ ] Run linter: `npm run lint`
- [ ] Check for console errors/warnings
- [ ] Test all routes locally: `npm start`
- [ ] Verify all links work correctly
- [ ] Test responsive design on mobile

### Build Verification:
```bash
npm run build
npm start
# Visit http://localhost:3000 and test all pages
```

### Git & Version Control:
- [ ] All changes committed
- [ ] Branch up to date with main
- [ ] No merge conflicts
- [ ] Meaningful commit messages

### Deployment:
- [ ] Latest dependency versions
- [ ] No deprecated packages
- [ ] Security vulnerabilities fixed (`npm audit fix`)
- [ ] Environment variables configured
- [ ] Deploy to staging first if available

---

## Post-Deployment Checklist

### Immediate (First 5 minutes):
- [ ] Visit production URL
- [ ] Check 404 pages
- [ ] Verify all critical routes work
- [ ] Check browser console for errors
- [ ] Verify environment variables loaded

### Short-term (First hour):
- [ ] Monitor Vercel logs for errors
- [ ] Check error tracking (Sentry) for new errors
- [ ] Monitor API response times
- [ ] Verify analytics are tracking
- [ ] Check SSL certificate validity

### Medium-term (First 24 hours):
- [ ] Review Core Web Vitals metrics
- [ ] Check for performance regressions
- [ ] Verify all external services working
- [ ] Review user error reports
- [ ] Monitor infrastructure health

### Ongoing:
- [ ] Weekly performance review
- [ ] Monthly security audits
- [ ] Quarterly dependency updates
- [ ] Continuous monitoring of metrics

---

## Common Issues & Solutions

### Build Failures:
```bash
# Clear cache and rebuild
vercel build --prod

# Check build logs
vercel logs --prod
```

### Performance Issues:
- Check Core Web Vitals in Vercel Analytics
- Review bundle analysis: `npm run build && npx webpack-bundle-analyzer`
- Optimize images and lazy load components
- Check for memory leaks in browser DevTools

### Environment Variable Issues:
- Verify variables are set in Vercel Dashboard
- Check `.env.local` file exists for local testing
- Ensure sensitive variables are marked as "Sensitive"

### SSL/TLS Issues:
- Vercel automatically manages SSL certificates
- Custom domains may take 24-48 hours to provision
- Check DNS propagation at https://dnschecker.org/

---

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Production Best Practices](https://nextjs.org/docs/going-to-production)
- [Web Vitals Guide](https://web.dev/vitals/)
- [OWASP Security Guidelines](https://owasp.org/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Last Updated**: 2026-04-06
**Framework**: Next.js 16.2.2
**Deployment**: Vercel
