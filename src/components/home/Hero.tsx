
import { useInView, getAnimationClass } from '@/lib/animations';
import { GradientButton } from '@/components/ui/gradient-button';

const Hero = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gray-900 text-white">
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
              <GradientButton 
                href="https://donate.stripe.com/cN26q33Iyako23u6op" 
                className="w-48 rounded-full py-3 bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-800 hover:shadow-[0_8px_25px_-5px_rgba(157,23,77,0.6)] transition-all duration-300"
              >
                <span className="mr-2">🎧</span>
                Donate Now
              </GradientButton>
              
              <GradientButton 
                href="https://sermonpod-shop.fourthwall.com/en-cad/" 
                variant="outline"
                className="w-48 bg-white text-black border border-gray-200 hover:border-gray-300 rounded-full py-3 hover:shadow-[0_8px_25px_-5px_rgba(59,130,246,0.6)] transition-all duration-300"
              >
                <span className="mr-2">🛒</span>
                Shop Resources
              </GradientButton>
              
              <GradientButton 
                href="https://sermonpod.setmore.com" 
                variant="secondary"
                className="w-48 rounded-full py-3 bg-gradient-to-r from-blue-900 via-blue-700 to-teal-800 hover:shadow-[0_8px_25px_-5px_rgba(59,130,246,0.6)] transition-all duration-300"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <span className="mr-2">📅</span>
                Book a Consultation
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
