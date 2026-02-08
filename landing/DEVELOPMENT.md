# Development Guide

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Code editor (VS Code recommended)

### Installation

1. Navigate to the landing directory:
```bash
cd E:\saral\landing
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
landing/
├── app/
│   ├── components/         # React components
│   │   ├── Navigation.tsx  # Fixed navigation bar
│   │   ├── HeroSection.tsx # Hero/landing section
│   │   ├── ProblemSection.tsx
│   │   ├── SolutionSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── TestimonialSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── Footer.tsx
│   │   ├── Button.tsx      # Reusable button component
│   │   ├── PaymentCard.tsx # Interactive payment card
│   │   └── SmoothScroll.tsx
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main page composition
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript config
└── next.config.ts          # Next.js config
```

## Key Technologies

### Next.js 15 (App Router)
- Server Components by default
- File-based routing
- Built-in optimization

### TypeScript
- Type safety for props and components
- Better IDE support
- Catch errors early

### Tailwind CSS
- Utility-first CSS framework
- Responsive design classes
- Custom color palette in config

### Framer Motion
- Smooth animations and transitions
- Scroll-triggered animations
- Interactive gestures

## Component Guidelines

### Creating New Components

1. Create file in `app/components/`:
```typescript
'use client'; // Add if component uses hooks/interactions

import { motion } from 'framer-motion';

interface MyComponentProps {
  title: string;
  // ... other props
}

export default function MyComponent({ title }: MyComponentProps) {
  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold">{title}</h2>
      </motion.div>
    </section>
  );
}
```

2. Import in page.tsx:
```typescript
import MyComponent from './components/MyComponent';
```

### Animation Patterns

**Fade up on scroll:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

**Staggered children:**
```typescript
{items.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
```

**Hover effects:**
```typescript
<motion.div
  whileHover={{ y: -5, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
```

## Styling Guidelines

### Responsive Design

Mobile-first approach with breakpoints:
- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+

Example:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Color Usage

Primary colors (amber/orange):
```tsx
bg-primary-500    // Background
text-primary-500  // Text
border-primary-500 // Border
```

Slate colors (backgrounds/text):
```tsx
bg-slate-950      // Main background
bg-slate-900      // Card backgrounds
text-slate-300    // Body text
text-slate-400    // Muted text
```

### Touch Targets

Minimum 44px for mobile touch targets:
```tsx
className="min-h-[44px] px-4 py-2"
```

## Customization

### Changing Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#YOUR_COLOR', // Main accent
    600: '#DARKER_SHADE',
  }
}
```

### Changing Fonts

1. Import in `app/layout.tsx`:
```typescript
import { Your_Font } from 'next/font/google';

const yourFont = Your_Font({
  subsets: ['latin'],
  variable: '--font-your-font',
});
```

2. Update Tailwind config:
```typescript
fontFamily: {
  display: ['var(--font-your-font)'],
}
```

### Updating Content

All content is in component files. Edit directly:
- Hero headline: `HeroSection.tsx`
- Features: `SolutionSection.tsx`
- Testimonials: `TestimonialSection.tsx`
- Pricing: `PricingSection.tsx`
- FAQs: `FAQSection.tsx`

## Performance Tips

1. Use Next.js Image component for images
2. Lazy load heavy components
3. Use `viewport={{ once: true }}` for scroll animations
4. Minimize use of client components
5. Optimize custom fonts with `display: swap`

## Testing

### Local Testing

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

### Mobile Testing

1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Access from phone: `http://YOUR_IP:3000`

### Browser Testing

Test in:
- Chrome/Edge (Desktop + Mobile)
- Firefox
- Safari (Mac/iOS)

## Common Tasks

### Adding a New Section

1. Create component in `app/components/NewSection.tsx`
2. Import in `app/page.tsx`
3. Add to component tree
4. Add navigation link if needed

### Updating CTAs

Search for `href="#get-started"` and replace with actual signup URL.

### Changing Animations

Edit motion props in components:
- `initial`: Starting state
- `animate` or `whileInView`: End state
- `transition`: Animation timing
- `delay`: Stagger delay

## Troubleshooting

### Animations not working
- Check 'use client' directive
- Verify Framer Motion is installed
- Check browser console for errors

### Styles not applying
- Rebuild Tailwind: restart dev server
- Check class name typos
- Verify Tailwind config

### TypeScript errors
- Run `npm run lint`
- Check component prop types
- Verify imports

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
