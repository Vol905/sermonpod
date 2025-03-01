
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useInView, getAnimationClass } from '@/lib/animations';

// FAQ items
const faqItems = [
  {
    question: "How does SermonPod's podcast service work?",
    answer: "We handle the entire process - from recording assistance to editing, production, and distribution. We take your raw sermon recordings, enhance the audio quality, add professional intros/outros, and publish it to all major podcast platforms including Spotify, Apple Podcasts, and Google Podcasts."
  },
  {
    question: "How much time will our church staff need to invest?",
    answer: "Minimal time is required from your team. Once set up, you simply send us your weekly sermon recordings, and we handle everything else. This saves your staff valuable time and resources that can be focused on other ministry activities."
  },
  {
    question: "How quickly can we get our podcast up and running?",
    answer: "Most churches can have their podcast set up and the first episode published within 1-2 weeks of signing up with SermonPod. We handle all the technical details to get you started quickly."
  },
  {
    question: "Can we see analytics about our podcast's performance?",
    answer: "Yes! We provide detailed analytics that show listener demographics, download counts, platform preferences, and engagement metrics. This data helps you understand your audience and measure the impact of your podcast ministry."
  },
  {
    question: "What makes SermonPod different from other podcast services?",
    answer: "SermonPod is specifically designed for churches and ministries. We understand the unique needs of spiritual content and have expertise in reaching faith-based audiences. Our premium audio quality, strategic distribution, and ministry-focused approach set us apart from generic podcast services."
  },
  {
    question: "What if we already have a podcast but want to improve it?",
    answer: "We can help enhance your existing podcast with our premium production quality and expanded distribution. Many churches switch to SermonPod to upgrade their sound quality and reach a wider audience with their existing content."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={ref} className="section bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={getAnimationClass(isInView, 'animate-fade-in')}>
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium mb-4">
              Common Questions
            </div>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-gray-900 ${getAnimationClass(isInView, 'animate-fade-in', 100)}`}>
            Frequently Asked Questions
          </h2>
          
          <p className={`text-lg text-gray-600 ${getAnimationClass(isInView, 'animate-fade-in', 200)}`}>
            Get answers to the most common questions about our podcast ministry service
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`border-b border-gray-100 last:border-0 overflow-hidden transition-all duration-300
                ${getAnimationClass(isInView, 'animate-fade-in', 100 + (index * 50))}
                ${openIndex === index ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
            >
              <button 
                className="flex w-full justify-between items-center p-6 text-left"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-gray-900">{item.question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                  ${openIndex === index ? 'bg-blue-500 rotate-180' : 'bg-gray-100'}`}>
                  <ChevronDown className={`h-5 w-5 transition-colors ${openIndex === index ? 'text-white' : 'text-gray-500'}`} />
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="p-6 pt-0 text-gray-600 bg-gradient-to-r from-blue-50/30 to-transparent">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
