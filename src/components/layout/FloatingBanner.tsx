
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const FloatingBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if banner was previously closed
    const bannerState = localStorage.getItem('bannerClosed');
    if (bannerState === 'true') {
      setIsVisible(false);
    }
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
    localStorage.setItem('bannerClosed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-lg border-t border-gray-200 transform transition-transform duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="/lovable-uploads/51c20cc7-20d3-486d-8099-d00ead60b7c2.png"
            alt="SermonPod Banner"
            className="h-10 w-auto"
          />
          <div className="text-sm md:text-base font-medium text-gray-700">
            Get your church's podcast launched in less than 7 days!
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="#" 
            className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Learn More
          </a>
          <button 
            onClick={closeBanner}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingBanner;
