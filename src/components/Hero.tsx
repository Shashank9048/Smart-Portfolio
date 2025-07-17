import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline({
      delay: 0.5
    });

    // Initial setup
    gsap.set([headlineRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    });
    gsap.set(splineRef.current, {
      opacity: 0,
      x: 100,
      filter: 'blur(5px)'
    });

    // Animate elements
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.5,
      ease: 'power2.out'
    }).to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    }, '-=0.8').to(splineRef.current, {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 1.5,
      ease: 'power2.out'
    }, '-=1');

    // CTA hover animation
    const ctaButton = ctaRef.current;
    if (ctaButton) {
      const handleMouseEnter = () => {
        gsap.to(ctaButton, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      const handleMouseLeave = () => {
        gsap.to(ctaButton, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      ctaButton.addEventListener('mouseenter', handleMouseEnter);
      ctaButton.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        ctaButton.removeEventListener('mouseenter', handleMouseEnter);
        ctaButton.removeEventListener('mouseleave', handleMouseLeave);
      };
    }

    // Floating orbs animation
    gsap.to('.hero-orb', {
      y: -30,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5
    });
  }, []);
  return <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
      {/* Background orbs */}
      <div className="hero-orb absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl"></div>
      <div className="hero-orb absolute top-1/3 right-1/4 w-24 h-24 bg-purple-400/30 rounded-full blur-lg"></div>
      <div className="hero-orb absolute bottom-1/4 left-1/3 w-40 h-40 bg-blue-400/15 rounded-full blur-2xl"></div>

      {/* Spline 3D Background */}
      <div ref={splineRef} className="absolute inset-0 z-0">
        <iframe src='https://my.spline.design/genkubgreetingrobot-s55yJy2JmLjbFecaEdMI0IQG/' frameBorder='0' width='100%' height='100%' className="pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 mt-32 md:mt-40">
        <div ref={headlineRef} className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin text-white mb-4 tracking-wider">
            Hi, I'm <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-[#ba6fe9]">Shashank</span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 text-[#6c92a7]">Software Engineer & Cloud Enthusiast</p>
        </div>

        <button ref={ctaRef} className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25">
          <span className="relative z-10">Hire Me</span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </section>;
};
export default Hero;