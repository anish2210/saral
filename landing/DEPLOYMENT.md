# Deployment Guide

This guide covers deploying the Saral landing page to various platforms.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git repository

## Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd landing
vercel
```

3. Follow the prompts to link your project.

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Next.js and configure build settings
6. Click "Deploy"

### Environment Variables

No environment variables are required for the landing page. All links point to placeholder URLs that you should update in the component files.

## Deploy to Netlify

1. Push your code to Git
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" > "Import an existing project"
4. Connect your Git provider
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. Click "Deploy site"

## Deploy to Custom Server

### Build for Production

```bash
cd landing
npm install
npm run build
```

### Start Production Server

```bash
npm start
```

The app will run on port 3000 by default.

### Using PM2 (Process Manager)

```bash
npm install -g pm2
pm2 start npm --name "saral-landing" -- start
pm2 save
pm2 startup
```

## Deploy via Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t saral-landing .
docker run -p 3000:3000 saral-landing
```

## Performance Checklist

Before deploying, ensure:

- [ ] All images are optimized
- [ ] Font loading is optimized (display: swap)
- [ ] Unused dependencies are removed
- [ ] Console errors are fixed
- [ ] Mobile responsiveness is tested
- [ ] Lighthouse score is 90+
- [ ] All CTAs link to correct URLs

## Post-Deployment

1. Update all placeholder links in components:
   - Hero CTA buttons
   - Navigation login/signup links
   - Footer links
   - CTA section buttons

2. Test all sections on mobile devices

3. Set up analytics (Google Analytics, Plausible, etc.)

4. Configure custom domain if needed

5. Test contact forms and support links

## Troubleshooting

### Build Fails

- Ensure Node.js version is 18+
- Clear `.next` folder and rebuild
- Check for TypeScript errors: `npm run lint`

### Fonts Not Loading

- Verify Google Fonts URL in layout.tsx
- Check Fontshare CDN is accessible

### Animations Not Working

- Ensure Framer Motion is installed
- Check browser compatibility for CSS animations

## Support

For deployment issues, contact: support@saral.app
