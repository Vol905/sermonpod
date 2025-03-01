
import { TestimonialType } from '@/lib/types';
import { useInView, getAnimationClass } from '@/lib/animations';

const testimonials: TestimonialType[] = [
  {
    name: "Pastor Michael Johnson",
    role: "Grace Community Church",
    content: "SermonPod transformed how we reach our community. Our podcast ministry now reaches thousands of people beyond our walls every week. The quality and service are exceptional."
  },
  {
    name: "Reverend Sarah Williams",
    role: "Faith Center Ministries",
    content: "Since working with SermonPod, our church has seen a 40% increase in online engagement. Their team is professional, responsive, and truly understands ministry needs."
  },
  {
    name: "Pastor David Chen",
    role: "New Life Fellowship",
    content: "The analytics and insights from our podcast have helped us tailor our message to better serve our community. SermonPod has been an invaluable ministry partner."
  }
];

const Testimonials = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  return (
    <section id="testimonials" ref={ref} className="section">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={getAnimationClass(isInView, 'animate-fade-in')}>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 hover-lift">
              Success Stories
            </div>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${getAnimationClass(isInView, 'animate-fade-in', 100)}`}>
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
              className={`bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover-scale hover-glow ${getAnimationClass(isInView, 'animate-fade-in', 100 + (index * 100))}`}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.13456 9H5.25245C5.25245 10.0938 5.25245 11.5938 6.66054 12.7004C7.77517 13.5942 8.00427 14.9219 8.00427 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.8974 9H16.0153C16.0153 10.0938 16.0153 11.5938 17.4234 12.7004C18.538 13.5942 18.7671 14.9219 18.7671 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 flex-grow">{testimonial.content}</p>
                
                <div className="mt-auto border-t border-gray-200 pt-4">
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-primary text-sm">{testimonial.role}</p>
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
