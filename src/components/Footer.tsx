
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!footerRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse'
      }
    });

    // Initial setup
    gsap.set('.footer-content', {
      opacity: 0,
      y: 60,
      filter: 'blur(10px)'
    });
    gsap.set('.footer-particle', {
      opacity: 0,
      scale: 0
    });

    // Animate content
    tl.to('.footer-content', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    }).to('.footer-particle', {
      opacity: 0.6,
      scale: 1,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power2.out'
    }, '-=0.5');

    // Floating particles animation
    gsap.to('.footer-particle', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5
    });
  }, []);
  const quickLinks = [{
    name: 'Home',
    href: '#home'
  }, {
    name: 'About',
    href: '#about'
  }, {
    name: 'Projects',
    href: '#projects'
  }, {
    name: 'Contact',
    href: '#contact'
  }];
  const socialLinks = [{
    name: 'GitHub',
    icon: '⚡',
    url: 'https://github.com/Shashank9048'
  }, {
    name: 'LinkedIn',
    icon: '💼',
    url: 'https://www.linkedin.com/in/shashank-singh-55025a298/'
  }, {
    name: 'LeetCode',
    icon: '💻',
    url: 'https://leetcode.com/u/Shashank96300/'
  }, {
    name: 'Email',
    icon: '✉️',
    url: 'mailto:shashanksingh9048@gmail.com'
  }];
  return <footer ref={footerRef} className="relative bg-gradient-to-t from-slate-900 to-slate-800/50 overflow-hidden">
      {/* Floating particles */}
      <div className="footer-particle absolute top-10 left-1/4 w-2 h-2 bg-cyan-400 rounded-full blur-sm"></div>
      <div className="footer-particle absolute top-20 right-1/3 w-3 h-3 bg-purple-400 rounded-full blur-sm"></div>
      <div className="footer-particle absolute top-16 left-1/2 w-1 h-1 bg-blue-400 rounded-full blur-sm"></div>
      <div className="footer-particle absolute top-8 right-1/4 w-2 h-2 bg-pink-400 rounded-full blur-sm"></div>

      <div className="footer-content relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-3xl font-thin text-white tracking-wider">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Shashank</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">Building impactful software through code and cloud. Let's turn ideas into powerful digital solutions.</p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-white">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map(link => <li key={link.name}>
                    <a href={link.href} className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 text-sm">
                      {link.name}
                    </a>
                  </li>)}
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-white">Connect</h4>
              <div className="flex space-x-4">
                {socialLinks.map(social => <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800/60 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-400/20 hover:to-purple-600/20 transition-all duration-300">
                    <span className="text-lg">{social.icon}</span>
                  </a>)}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          
        </div>
      </div>
    </footer>;
};
export default Footer;
