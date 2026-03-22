
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const Navigation: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Certificates', id: 'certificates' },
    { name: 'Contact', id: 'contact' }
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

    // Scroll animation — hide on scroll down, show on scroll up
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        gsap.to(navRef.current, {
          y: -100,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.to(navRef.current, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
                src="/uploads/63afa4e8-f067-4142-a164-2515c02ac071.png"
                alt="Shashank"
                className="w-full h-full object-cover object-top scale-110"
              />
            </div>
            <span className="text-2xl font-medium text-white tracking-wider">
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
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="text-slate-300 hover:text-white transition-colors duration-300 font-medium relative group cursor-pointer"
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
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="text-slate-300 hover:text-white transition-colors duration-300 font-medium py-2 border-b border-slate-700/30 last:border-b-0 cursor-pointer"
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
