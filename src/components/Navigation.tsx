
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Navigation: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    if (!navRef.current) return;

    // Initial animation
    gsap.fromTo(navRef.current, 
      {
        opacity: 0,
        y: -50,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        delay: 2,
        ease: 'power2.out'
      }
    );

    // Scroll animation
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        gsap.to(navRef.current, {
          y: -100,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        // Scrolling up
        gsap.to(navRef.current, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      gsap.fromTo('.mobile-menu',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    } else {
      gsap.to('.mobile-menu',
        { opacity: 0, y: -20, duration: 0.3, ease: 'power2.out' }
      );
    }
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="glassmorphic rounded-full px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img 
                src="/lovable-uploads/63afa4e8-f067-4142-a164-2515c02ac071.png" 
                alt="Shashank"
                className="w-full h-full object-cover object-top scale-110"
              />
            </div>
            <span className="text-2xl font-thin text-white tracking-wider">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Shashank
              </span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-300 hover:text-white transition-colors duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1 group"
          >
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu md:hidden mt-4 glassmorphic rounded-2xl p-6">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-300 hover:text-white transition-colors duration-300 font-medium py-2 border-b border-slate-700/30 last:border-b-0"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
