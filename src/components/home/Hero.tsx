
import { ChevronRight } from 'lucide-react';
import { useInView, getAnimationClass } from '@/lib/animations';

const Hero = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Element */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-70 animate-float"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl opacity-70 animate-float animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className={getAnimationClass(isInView, 'animate-fade-in')}>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Amplify Your Church's Message
              </div>
            </div>
            
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${getAnimationClass(isInView, 'animate-fade-in', 100)}`}>
              Skyrocket Church Growth Through Podcast Ministry
            </h1>
            
            <p className={`text-lg md:text-xl text-gray-600 mb-8 max-w-xl ${getAnimationClass(isInView, 'animate-fade-in', 200)}`}>
              Convert your weekly sermons into premium quality podcasts available on all major platforms. Reach more people and grow your church community.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 ${getAnimationClass(isInView, 'animate-fade-in', 300)}`}>
              <a 
                href="https://sermonpod.setmore.com" 
                className="btn-primary text-base"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Book a Free Call
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
              
              <a 
                href="#features" 
                className="btn-outline text-base"
              >
                Learn More
              </a>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className={`relative ${getAnimationClass(isInView, 'animate-scale-in')}`}>
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600" 
                  alt="Podcast recording setup" 
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-primary/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
