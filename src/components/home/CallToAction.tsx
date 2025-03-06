
import { ChevronRight, Sparkles } from 'lucide-react';
import { useInView, getAnimationClass } from '@/lib/animations';
import { GradientButton } from '@/components/ui/gradient-button';

const CallToAction = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  return (
    <section ref={ref} className="section relative overflow-hidden bg-gray-50">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full opacity-70 blur-3xl -z-10 transform -translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-50 rounded-full opacity-60 blur-3xl -z-10"></div>
      <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-yellow-300 rounded-full opacity-50 blur-sm -z-10 animate-pulse-light"></div>
      <div className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-purple-300 rounded-full opacity-60 blur-sm -z-10 animate-float"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={getAnimationClass(isInView, 'animate-fade-in')}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-teal-500/20 text-purple-700 text-sm font-medium mb-4 hover-lift">
              <Sparkles className="h-4 w-4 mr-2 text-teal-600" />
              Take The Next Step
            </div>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-gray-900 ${getAnimationClass(isInView, 'animate-fade-in', 100)}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
              Ready to Expand Your Church's Reach?
            </span>
          </h2>
          
          <p className={`text-lg text-gray-600 mb-8 max-w-2xl mx-auto ${getAnimationClass(isInView, 'animate-fade-in', 200)}`}>
            Let's discuss how SermonPod can help your ministry connect with more people through premium quality podcasting. Book a free consultation call today.
          </p>
          
          <div className={`flex flex-wrap justify-center gap-4 ${getAnimationClass(isInView, 'animate-fade-in', 300)}`}>
            <GradientButton 
              href="https://sermonpod.setmore.com" 
              className="w-48 rounded-full py-3 bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-800 hover:shadow-[0_8px_25px_-5px_rgba(157,23,77,0.6)] transition-all duration-300"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Book a Free Call
              <ChevronRight className="ml-1 h-4 w-4" />
            </GradientButton>
            
            <GradientButton 
              href="https://donate.stripe.com/cN26q33Iyako23u6op" 
              variant="secondary"
              className="w-48 rounded-full py-3 bg-gradient-to-r from-blue-900 via-blue-700 to-teal-800 hover:shadow-[0_8px_25px_-5px_rgba(59,130,246,0.6)] transition-all duration-300"
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
