import Navigation from './components/Navigation';
import SmoothScroll from './components/SmoothScroll';
import ScrollTracker from './components/ScrollTracker';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialSection from './components/TestimonialSection';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <SmoothScroll />
      <ScrollTracker />
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <TestimonialSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
