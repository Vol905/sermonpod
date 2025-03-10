
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import PodcastPlayer from '@/components/home/PodcastPlayer';
import FAQ from '@/components/home/FAQ';
import CallToAction from '@/components/home/CallToAction';
import FloatingBanner from '@/components/layout/FloatingBanner';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add custom CSS variables for the SermonPod color scheme
    document.documentElement.style.setProperty('--sermonpod-teal', '#4e9999');  // Teal from the logo
    document.documentElement.style.setProperty('--sermonpod-gold', '#c9a059');  // Gold from the logo
    document.documentElement.style.setProperty('--sermonpod-purple', '#7647e1');  // Purple for premium look
    document.documentElement.style.setProperty('--sermonpod-green', '#10b981');  // Green accent
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <FloatingBanner />
      <main className="flex-grow">
        <Hero />
        <Features />
        <PodcastPlayer />
        <FAQ />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
