
import { ChevronRight } from 'lucide-react';
import { useInView, getAnimationClass } from '@/lib/animations';

const Hero = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#111111]">
      {/* Background texture overlay */}
      <div className="absolute inset-0 bg-[url('/lovable-uploads/d25fc086-4da0-452e-bfa2-76739e55976b.png')] bg-cover bg-center opacity-20"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <div className={getAnimationClass(isInView, 'animate-fade-in', 0)}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-white mx-auto max-w-5xl">
              From Sermon to Podcast: Reach a Global Congregation and Grow Your Ministry!
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We Handle the Technical Setup and Monthly Management, So You Can Focus on Your Ministry.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a 
                href="https://donate.stripe.com/cN26q33Iyako23u6op" 
                className="btn-primary bg-[#8957fc] hover:bg-[#7647e1] text-white px-8 py-3 rounded-full flex items-center justify-center text-base"
              >
                <span className="mr-2">🎧</span>
                Donate Now
              </a>
              
              <a 
                href="https://sermonpod-shop.fourthwall.com/en-cad/" 
                className="btn-outline bg-white text-black border border-gray-200 hover:border-gray-300 px-8 py-3 rounded-full flex items-center justify-center text-base"
              >
                <span className="mr-2">🛒</span>
                Shop Resources
              </a>
              
              <a 
                href="https://sermonpod.setmore.com" 
                className="btn-primary bg-[#10b981] hover:bg-[#0d9668] text-white px-8 py-3 rounded-full flex items-center justify-center text-base"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <span className="mr-2">📅</span>
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
