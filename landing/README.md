# Saral Landing Page

A high-conversion, modern landing page for Saral - a Tutor Fee Tracking Platform.

## Features

- Modern, mobile-first design optimized for Indian tutors
- Interactive payment status cards with flip animations
- Smooth scroll animations using Framer Motion
- Responsive design with Tailwind CSS
- TypeScript for type safety
- Optimized for performance and SEO

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Fonts**: Inter (body), Clash Display (headings)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
landing/
├── app/
│   ├── components/     # Reusable React components
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── SolutionSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── TestimonialSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── Footer.tsx
│   │   ├── Button.tsx
│   │   └── PaymentCard.tsx
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── public/             # Static assets
├── tailwind.config.ts  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── next.config.ts      # Next.js configuration
```

## Design Philosophy

The landing page follows an "Educational Warmth meets Digital Precision" aesthetic:

- Warm amber/orange accents (#F59E0B) against deep slate backgrounds
- Bold, geometric Clash Display font for headings
- Interactive payment cards as the memorable element
- Mobile-first responsive design
- Smooth, intentional animations

## Customization

### Colors

Edit `tailwind.config.ts` to change the primary color palette:

```typescript
colors: {
  primary: {
    500: '#F59E0B', // Main accent color
    // ...
  }
}
```

### Content

All content is in component files under `app/components/`. Edit the relevant section files to update copy, testimonials, FAQs, or pricing.

## Performance Optimizations

- Font loading with `display: swap`
- Optimized animations with `will-change`
- Lazy loading with Framer Motion's `whileInView`
- Compressed assets
- Minimal JavaScript bundle

## License

Private - © 2026 Saral
