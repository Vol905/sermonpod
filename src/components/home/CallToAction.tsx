
import { ChevronRight } from 'lucide-react';
import { useInView, getAnimationClass } from '@/lib/animations';

const CallToAction = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  return (
    <section ref={ref} className="section relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 bg-[url('/lovable-uploads/17c04ee1-a43d-4690-a835-81b7105cb55e.png')] bg-cover bg-center opacity-10"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-400/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-300/10 rounded-full filter blur-2xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <div className={getAnimationClass(isInView, 'animate-fade-in')}>
                <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4 hover-lift">
                  Take The Next Step
                </div>
              </div>
              
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-white ${getAnimationClass(isInView, 'animate-fade-in', 100)}`}>
                Ready to Expand Your Church's Reach?
              </h2>
              
              <p className={`text-lg text-blue-100 mb-8 ${getAnimationClass(isInView, 'animate-fade-in', 200)}`}>
                Let's discuss how SermonPod can help your ministry connect with more people through premium quality podcasting. Book a free consultation call today.
              </p>
              
              <div className={`flex flex-wrap gap-4 ${getAnimationClass(isInView, 'animate-fade-in', 300)}`}>
                <a 
                  href="https://sermonpod.setmore.com" 
                  className="btn-primary bg-white text-blue-600 hover:bg-blue-50 shadow-xl text-base"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Book a Free Call
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
                
                <a 
                  href="https://donate.stripe.com/cN26q33Iyako23u6op" 
                  className="btn-outline border-white/40 text-white hover:bg-white/10 text-base"
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
                <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-white/30 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
