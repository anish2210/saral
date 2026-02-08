# Customization Guide

This guide helps you customize the Saral landing page to match your branding and content needs.

## Quick Customization Checklist

- [ ] Update brand colors
- [ ] Replace placeholder links with actual URLs
- [ ] Update testimonials with real data
- [ ] Adjust pricing plans
- [ ] Update FAQ content
- [ ] Add your logo/favicon
- [ ] Configure contact information
- [ ] Update social media links

## Brand Colors

### Primary Color (Accent)

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#FFFBEB',   // Lightest
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',  // Main (change this)
    600: '#D97706',  // Hover state
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',  // Darkest
  }
}
```

Current: Warm Amber (#F59E0B)

Popular alternatives:
- Blue: `#3B82F6`
- Green: `#10B981`
- Purple: `#8B5CF6`
- Red: `#EF4444`

### Background Colors

Current scheme: Dark mode with slate backgrounds

To change to light mode:
1. Update `globals.css`:
```css
body {
  @apply bg-white text-slate-900;
}
```

2. Update section backgrounds throughout components

## Typography

### Heading Font (Clash Display)

Current: Clash Display (bold, geometric)

To change:

1. Pick a font from [Google Fonts](https://fonts.google.com)

2. Update `app/layout.tsx`:
```typescript
import { Your_Font } from 'next/font/google';

const yourFont = Your_Font({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-your-font',
});
```

3. Update `tailwind.config.ts`:
```typescript
fontFamily: {
  display: ['var(--font-your-font)', 'system-ui', 'sans-serif'],
}
```

### Body Font (Inter)

Already configured. To change, follow same steps as above but modify the `sans` family.

## Content Updates

### Hero Section

File: `app/components/HeroSection.tsx`

```typescript
// Main headline
<h1>
  Stop Chasing
  <span>Fee Payments</span>
</h1>

// Subheadline
<p>
  Track student payments in seconds...
</p>

// CTA buttons
<Button href="#get-started">Start Free Trial</Button>
```

### Features/Solution

File: `app/components/SolutionSection.tsx`

Update the `features` array:

```typescript
const features = [
  {
    icon: '⚡', // Emoji or use React Icons
    title: 'Your Feature Title',
    description: 'Feature description...',
    color: 'primary',
  },
  // Add more features
];
```

### Testimonials

File: `app/components/TestimonialSection.tsx`

```typescript
const testimonials = [
  {
    name: 'Customer Name',
    role: 'Title, Location',
    avatar: '👨‍🏫', // Emoji or image URL
    quote: 'Your testimonial text...',
    rating: 5,
  },
];
```

### Pricing Plans

File: `app/components/PricingSection.tsx`

```typescript
const plans = [
  {
    name: 'Plan Name',
    price: '₹199', // Or '$19' for USD
    period: 'per month',
    description: 'Plan description',
    features: [
      'Feature 1',
      'Feature 2',
      // ...
    ],
    cta: 'Button Text',
    popular: true, // Highlights this plan
  },
];
```

### FAQs

File: `app/components/FAQSection.tsx`

```typescript
const faqs = [
  {
    question: 'Your question?',
    answer: 'Your detailed answer...',
  },
];
```

## Links and CTAs

### Update All CTAs

Search and replace these placeholder URLs:

1. **Signup Links**
   - Current: `#get-started`
   - Replace with: `https://app.saral.com/signup`

2. **Login Links**
   - Current: `https://app.saral.com/login`
   - Update if different

3. **Support Email**
   - Current: `support@saral.app`
   - Replace with actual support email

### Navigation Links

File: `app/components/Navigation.tsx`

```typescript
<a href="#features">Features</a>
<a href="#pricing">Pricing</a>
<Button href="YOUR_SIGNUP_URL">Get Started</Button>
```

### Footer Links

File: `app/components/Footer.tsx`

Update the `footerLinks` object with your actual pages:

```typescript
const footerLinks = {
  Product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
  ],
  // ... more sections
};
```

## Images and Assets

### Logo

Replace logo in `app/components/Navigation.tsx`:

```typescript
// Text logo (current)
<a href="#" className="text-2xl font-bold">Saral</a>

// Image logo (recommended)
<a href="#">
  <Image src="/logo.svg" alt="Saral" width={120} height={40} />
</a>
```

Add logo to `public/logo.svg`

### Favicon

Add to `public/`:
- `favicon.ico` (32x32)
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)

Update `app/layout.tsx`:
```typescript
export const metadata = {
  icons: {
    icon: '/favicon.ico',
  },
};
```

### Hero Images

Add product screenshots or illustrations to the hero section.

## Animations

### Disable Animations

For accessibility or performance, reduce animations:

1. Add to `globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Adjust Animation Speed

Edit Framer Motion `transition` props:

```typescript
// Faster
transition={{ duration: 0.3 }}

// Slower
transition={{ duration: 1.0 }}
```

### Change Animation Style

Replace fade-up with slide-in:

```typescript
// Fade up (current)
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// Slide from left
initial={{ opacity: 0, x: -30 }}
animate={{ opacity: 1, x: 0 }}

// Scale up
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
```

## Social Media

### Social Links

File: `app/components/Footer.tsx`

```typescript
<a href="https://twitter.com/yourhandle">𝕏</a>
<a href="https://linkedin.com/company/yourcompany">in</a>
<a href="https://instagram.com/yourhandle">📷</a>
```

### Social Preview Images

Create images for social sharing:
- **Twitter**: 1200x675px
- **Facebook**: 1200x630px

Add to `public/og-image.png`

Update `app/layout.tsx`:
```typescript
openGraph: {
  images: ['/og-image.png'],
},
twitter: {
  images: ['/og-image.png'],
},
```

## Trust Indicators

### Update Statistics

File: `app/components/TestimonialSection.tsx`

```typescript
<div>
  <p className="text-4xl font-bold">500+</p>
  <p>Active Tutors</p>
</div>
```

Replace with your actual numbers.

### Add Logos

Add partner/client logos in a new section or testimonials.

## Call-to-Action Optimization

### Primary CTA

The main action you want users to take:
- Current: "Start Free Trial"
- Alternatives: "Get Started Free", "Try Saral Now", "Join Free"

### Secondary CTA

Supporting action:
- Current: "See How It Works"
- Alternatives: "Watch Demo", "View Examples", "Learn More"

### CTA Placement

Current placements:
1. Hero section
2. After "How It Works"
3. Final CTA section

Consider adding CTAs:
- After testimonials
- In navigation
- After pricing

## Mobile Optimization

### Touch Targets

Ensure buttons are at least 44px tall:
```typescript
className="min-h-[44px]"
```

### Text Size

Mobile-optimized text scaling:
```typescript
className="text-base sm:text-lg lg:text-xl"
```

### Spacing

Adequate padding on mobile:
```typescript
className="px-4 py-20 sm:px-6 lg:px-8"
```

## Advanced Customization

### Add Google Analytics

1. Get tracking ID from Google Analytics
2. Add to `app/layout.tsx`:

```typescript
import Script from 'next/script';

// In body:
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_TRACKING_ID');
  `}
</Script>
```

### Add Live Chat

Integrate Intercom, Crisp, or other chat widgets in layout.tsx.

### Custom Domain

Configure in your hosting platform (Vercel/Netlify):
1. Add domain in dashboard
2. Update DNS records
3. Enable HTTPS

## Testing Your Changes

After customization:

1. Test locally: `npm run dev`
2. Check mobile: Access from phone using local IP
3. Test all CTAs and links
4. Verify all sections load correctly
5. Test in different browsers
6. Run Lighthouse audit in Chrome DevTools

## Need Help?

If you need custom design work or development:
- Email: support@saral.app
- Or hire a developer familiar with Next.js and Tailwind CSS
