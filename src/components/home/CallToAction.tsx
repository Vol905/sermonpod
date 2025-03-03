
import { ChevronRight, Sparkles } from 'lucide-react';
import { useInView, getAnimationClass } from '@/lib/animations';
import { GradientButton } from '@/components/ui/gradient-button';

const CallToAction = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  return (
    <section ref={ref} className="section relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Premium decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-teal-500/5 rounded-full filter blur-2xl"></div>
      <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-gold-300 rounded-full opacity-40 animate-pulse-light"></div>
      <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-purple-400 rounded-full opacity-30 animate-float"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={getAnimationClass(isInView, 'animate-fade-in')}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-teal-500/20 text-white text-sm font-medium mb-4 hover-lift">
              <Sparkles className="h-4 w-4 mr-2 text-teal-400" />
              Take The Next Step
            </div>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-white ${getAnimationClass(isInView, 'animate-fade-in', 100)}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Ready to Expand Your Church's Reach?
            </span>
          </h2>
          
          <p className={`text-lg text-gray-300 mb-8 max-w-2xl mx-auto ${getAnimationClass(isInView, 'animate-fade-in', 200)}`}>
            Let's discuss how SermonPod can help your ministry connect with more people through premium quality podcasting. Book a free consultation call today.
          </p>
          
          <div className={`flex flex-wrap justify-center gap-4 ${getAnimationClass(isInView, 'animate-fade-in', 300)}`}>
            <GradientButton 
              as="a"
              href="https://sermonpod.setmore.com" 
              className="text-base"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Book a Free Call
              <ChevronRight className="ml-1 h-4 w-4" />
            </GradientButton>
            
            <GradientButton 
              as="a"
              href="https://donate.stripe.com/cN26q33Iyako23u6op" 
              variant="secondary"
              className="text-base"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Support Our Ministry
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
