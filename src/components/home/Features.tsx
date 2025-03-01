
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
    <section id="features" ref={ref} className="section bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={getAnimationClass(isInView, 'animate-fade-in')}>
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium mb-4 hover-lift">
              Why Choose SermonPod
            </div>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-gray-900 ${getAnimationClass(isInView, 'animate-fade-in', 100)}`}>
            Transform Your Weekly Sermons Into A Global Ministry
          </h2>
          
          <p className={`text-lg text-gray-600 ${getAnimationClass(isInView, 'animate-fade-in', 200)}`}>
            Our comprehensive podcast service helps churches extend their reach beyond Sunday services, connecting with more people throughout the week.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`bg-white rounded-xl p-6 shadow-lg border-l-4 border-l-blue-500 border-t border-r border-b border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${getAnimationClass(isInView, 'animate-fade-in', 100 + (index * 100))}`}
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-blue-500/20">
                <feature.icon className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
