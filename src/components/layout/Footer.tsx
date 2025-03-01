
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';
import { SocialLinkType } from '@/lib/types';

const socialLinks: SocialLinkType[] = [
  {
    name: "Facebook",
    url: "https://facebook.com/sermonpodcast",
    icon: Facebook
  },
  {
    name: "Instagram",
    url: "https://instagram.com/sermonpodcast",
    icon: Instagram
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@sermonpodcast/videos",
    icon: Youtube
  }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold mb-2">SermonPod</h2>
              <p className="text-gray-300">Transforming sermons into global ministry through premium podcasting services.</p>
            </div>
            
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.url}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            
            <div className="flex items-center text-gray-300 hover:text-primary transition-colors">
              <Mail className="h-5 w-5 mr-2" />
              <a href="mailto:info@sermonpod.com">info@sermonpod.com</a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-300 hover:text-primary transition-colors">Features</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-primary transition-colors">Testimonials</a></li>
              <li><a href="#podcast" className="text-gray-300 hover:text-primary transition-colors">Podcast</a></li>
              <li>
                <a 
                  href="https://sermonpod-shop.fourthwall.com/en-cad/" 
                  className="text-gray-300 hover:text-primary transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Store
                </a>
              </li>
              <li>
                <a 
                  href="https://donate.stripe.com/cN26q33Iyako23u6op" 
                  className="text-gray-300 hover:text-primary transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Donate
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.sermonpod.com/terms-of-service" 
                  className="text-gray-300 hover:text-primary transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="https://www.sermonpod.com/privacy-policy" 
                  className="text-gray-300 hover:text-primary transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} SermonPod Ministries. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
