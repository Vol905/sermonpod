
import { TestimonialType } from '@/lib/types';
import { useInView, getAnimationClass } from '@/lib/animations';
import { Star } from 'lucide-react';

const testimonials: TestimonialType[] = [
  {
    name: "Pastor John Smith",
    role: "Lead Pastor, Grace Community Church",
    location: "Nashville, TN",
    content: "SermonPod has completely transformed our church's outreach. Our sermons now reach people across the country, and we've seen a 40% increase in online engagement!",
    impact: "40% increase in online engagement",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Sarah Johnson",
    role: "Communications Director, Harvest Fellowship",
    location: "Denver, CO",
    content: "The team at SermonPod made the podcasting process so simple. Their expertise helped us create professional content that truly represents our ministry's message and has attracted younger members to our congregation.",
    impact: "25% growth in youth attendance",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Rev. Michael Williams",
    role: "Senior Pastor, New Life Church",
    location: "Atlanta, GA",
    content: "Since working with SermonPod, our weekly sermon downloads have grown from just a few dozen to over a thousand. The impact on our community has been incredible, and we're now reaching people in 12 different countries.",
    impact: "1000+ weekly downloads across 12 countries",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

const Testimonials = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  return (
    <section id="testimonials" ref={ref} className="section bg-gradient-to-b from-purple-50 to-white relative overflow-hidden py-20">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full opacity-70 blur-3xl -z-10 transform -translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-50 rounded-full opacity-60 blur-3xl -z-10"></div>
      <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-yellow-300 rounded-full opacity-50 blur-sm -z-10 animate-pulse-light"></div>
      <div className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-purple-300 rounded-full opacity-60 blur-sm -z-10 animate-float"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={getAnimationClass(isInView, 'animate-fade-in')}>
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 text-sm font-medium mb-4 hover-lift">
              Success Stories
            </div>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-gray-900 ${getAnimationClass(isInView, 'animate-fade-in', 100)}`}>
            Trusted By Church Leaders
          </h2>
          
          <p className={`text-lg text-gray-600 ${getAnimationClass(isInView, 'animate-fade-in', 200)}`}>
            See how SermonPod has helped churches of all sizes expand their reach and impact through podcast ministry.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className={`bg-gray-800 rounded-xl overflow-hidden transform transition-all duration-300 
                hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(59,130,246,0.3)] 
                ${getAnimationClass(isInView, 'animate-fade-in', 100 + (index * 100))}`}
            >
              <div className="flex flex-col h-full">
                <div className="p-6 pb-0">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="rounded-full overflow-hidden w-16 h-16 border-2 border-blue-500">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                      <p className="text-blue-300 text-sm">{testimonial.role}</p>
                      <p className="text-gray-400 text-xs">{testimonial.location}</p>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 pt-2 flex-grow">
                  <div className="text-5xl text-blue-300 font-serif leading-none mb-2">❝</div>
                  <p className="text-gray-300 italic mb-6">{testimonial.content}</p>
                </div>
                
                <div className="p-6 bg-gray-900 border-t border-gray-700">
                  <div className="font-semibold text-sm text-gray-400 mb-1">Impact:</div>
                  <p className="text-blue-300 font-semibold">{testimonial.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
