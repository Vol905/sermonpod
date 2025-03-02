
import { ChevronRight, Sparkles } from 'lucide-react';
import { useInView, getAnimationClass } from '@/lib/animations';

const CallToAction = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  return (
    <section ref={ref} className="section relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 bg-[url('/lovable-uploads/0f5062fe-bccc-491e-8771-103546dbcbbc.png')] bg-cover bg-center opacity-5"></div>
      
      {/* Premium decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-teal-500/5 rounded-full filter blur-2xl"></div>
      <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-gold-300 rounded-full opacity-40 animate-pulse-light"></div>
      <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-purple-400 rounded-full opacity-30 animate-float"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
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
              
              <p className={`text-lg text-gray-300 mb-8 ${getAnimationClass(isInView, 'animate-fade-in', 200)}`}>
                Let's discuss how SermonPod can help your ministry connect with more people through premium quality podcasting. Book a free consultation call today.
              </p>
              
              <div className={`flex flex-wrap gap-4 ${getAnimationClass(isInView, 'animate-fade-in', 300)}`}>
                <a 
                  href="https://sermonpod.setmore.com" 
                  className="btn-primary bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-xl text-base"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Book a Free Call
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
                
                <a 
                  href="https://donate.stripe.com/cN26q33Iyako23u6op" 
                  className="btn-outline border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600 text-base"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Support Our Ministry
                </a>
              </div>
            </div>
            
            <div className={`md:col-span-2 ${getAnimationClass(isInView, 'animate-scale-in', 200)}`}>
              <div className="relative hover-scale hover-glow">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600&h=400" 
                    alt="Person using laptop for podcast production" 
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-gradient-to-tr from-purple-600/30 to-teal-500/30 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
