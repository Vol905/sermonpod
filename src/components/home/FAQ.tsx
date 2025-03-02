
import { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
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
    <section id="faq" ref={ref} className="section relative overflow-hidden bg-gradient-to-b from-purple-50 to-white">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full opacity-70 blur-3xl -z-10 transform -translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-50 rounded-full opacity-60 blur-3xl -z-10"></div>
      <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-yellow-300 rounded-full opacity-50 blur-sm -z-10 animate-pulse-light"></div>
      <div className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-purple-300 rounded-full opacity-60 blur-sm -z-10 animate-float"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={getAnimationClass(isInView, 'animate-fade-in')}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-teal-500/20 text-purple-700 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4 mr-2 text-teal-500" />
              Common Questions
            </div>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-gray-900 ${getAnimationClass(isInView, 'animate-fade-in', 100)}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-teal-600">
              Frequently Asked Questions
            </span>
          </h2>
          
          <p className={`text-lg text-gray-600 ${getAnimationClass(isInView, 'animate-fade-in', 200)}`}>
            Get answers to the most common questions about our podcast ministry service
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-purple-100 hover-glow">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`border-b border-purple-100/50 last:border-0 overflow-hidden transition-all duration-300
                ${getAnimationClass(isInView, 'animate-fade-in', 100 + (index * 50))}
                ${openIndex === index ? 'bg-gradient-to-r from-purple-50/80 to-transparent' : 'hover:bg-purple-50/50'}`}
            >
              <button 
                className="flex w-full justify-between items-center p-6 text-left"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-gray-800">{item.question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                  ${openIndex === index ? 'bg-gradient-to-r from-purple-600 to-teal-500 shadow-md' : 'bg-purple-100'}`}>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-white" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-purple-600" />
                  )}
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="p-6 pt-0 text-gray-600 bg-gradient-to-r from-purple-50/30 to-transparent">
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
