
import { useState, useEffect } from 'react';
import { NavLinkType } from '@/lib/types';
import { Menu, X, ChevronRight } from 'lucide-react';

const navLinks: NavLinkType[] = [
  { label: 'Home', url: '#' },
  { label: 'Features', url: '#features' },
  { label: 'Testimonials', url: '#testimonials' },
  { label: 'Podcast', url: '#podcast' },
  { label: 'Store', url: 'https://sermonpod-shop.fourthwall.com/en-cad/' },
  { label: 'Donate', url: 'https://donate.stripe.com/cN26q33Iyako23u6op' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <span className="font-display text-xl md:text-2xl font-bold">SermonPod</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.url}
                className="nav-link text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <a 
              href="https://sermonpod.setmore.com" 
              className="btn-primary"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Book a Free Call
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 animate-fade-in">
          <div className="flex flex-col p-4">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.url}
                className="py-3 px-4 text-lg font-medium border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 pb-2 px-4">
              <a 
                href="https://sermonpod.setmore.com" 
                className="w-full flex items-center justify-center btn-primary"
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book a Free Call
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
