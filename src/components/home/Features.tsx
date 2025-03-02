
import { Mic, Globe, BarChart, Users, Clock, Award } from 'lucide-react';
import { FeatureType } from '@/lib/types';
import { useInView, getAnimationClass } from '@/lib/animations';

const features: FeatureType[] = [
  {
    title: "Premium Audio Quality",
    description: "Professional grade audio editing and production for crystal clear sermon podcasts that engage listeners.",
    icon: Mic
  },
  {
    title: "Global Distribution",
    description: "Your sermons published on all major platforms including Spotify, Apple Podcasts, Google Podcasts, and more.",
    icon: Globe
  },
  {
    title: "Growth Analytics",
    description: "Track your podcast performance with detailed analytics to understand your audience and measure growth.",
    icon: BarChart
  },
  {
    title: "Audience Expansion",
    description: "Reach beyond your local community and connect with listeners across the world.",
    icon: Users
  },
  {
    title: "Time Saving",
    description: "We handle the entire process from recording to publishing, saving your team valuable time and resources.",
    icon: Clock
  },
  {
    title: "Expert Guidance",
    description: "Benefit from our specialized knowledge in podcasting for ministries and churches.",
    icon: Award
  }
];

const Features = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  return (
    <section id="features" ref={ref} className="section py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-purple-100 opacity-50"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-blue-100 opacity-30"></div>
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-teal-100 opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className={getAnimationClass(isInView, 'animate-fade-in')}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[#8957fc]/20 to-[#7647e1]/20 text-[#7647e1] font-semibold mb-6 backdrop-blur-sm hover-lift">
              Why Choose SermonPod
            </div>
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 text-gray-900 leading-tight ${getAnimationClass(isInView, 'animate-fade-in', 100)}`}>
            Transform Your Weekly Sermons <br/>
            <span className="bg-gradient-to-r from-[#7647e1] to-[#10b981] bg-clip-text text-transparent">Into A Global Ministry</span>
          </h2>
          
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto ${getAnimationClass(isInView, 'animate-fade-in', 200)}`}>
            Our comprehensive podcast service helps churches extend their reach beyond Sunday services, connecting with more people throughout the week.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`bg-white rounded-2xl p-8 shadow-xl border border-gray-100 
                hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 
                group relative z-10 overflow-hidden ${getAnimationClass(isInView, 'animate-fade-in', 100 + (index * 100))}`}
            >
              {/* Gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8957fc]/5 to-[#10b981]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8957fc]/10 to-[#10b981]/10 flex items-center justify-center mb-6 
                  group-hover:from-[#8957fc]/20 group-hover:to-[#10b981]/20 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="h-8 w-8 text-[#7647e1] group-hover:text-[#5e32c5] transition-colors duration-300" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-[#7647e1] transition-colors duration-300">{feature.title}</h3>
              
              <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              
              {/* Subtle decorative accent */}
              <div className="absolute bottom-0 right-0 w-20 h-20 rounded-tl-3xl bg-gradient-to-tl from-[#8957fc]/5 to-[#10b981]/5 -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
