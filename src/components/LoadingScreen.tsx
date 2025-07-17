
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup
    gsap.set('.loading-text', { opacity: 0, y: 30, filter: 'blur(10px)' });
    gsap.set('.progress-bar-fill', { width: '0%' });
    gsap.set('.loading-glow', { opacity: 0, scale: 0.8 });

    // Animate loading text and glow
    tl.to('.loading-text', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    })
    .to('.loading-glow', {
      opacity: 0.6,
      scale: 1,
      duration: 1.5,
      ease: 'power2.out'
    }, '-=0.5');

    // Progress bar animation
    const progressTween = gsap.to('.progress-bar-fill', {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: () => {
        const progress = Math.round(progressTween.progress() * 100);
        setProgress(progress);
      },
      onComplete: () => {
        // Exit animation
        gsap.to('.preloader', {
          opacity: 0,
          scale: 0.95,
          filter: 'blur(10px)',
          duration: 1,
          delay: 0.5,
          ease: 'power2.inOut',
          onComplete: onLoadingComplete
        });
      }
    });

    // Floating orbs animation
    gsap.to('.loading-orb', {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.3
    });

  }, [onLoadingComplete]);

  return (
    <div className="preloader fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
      <div className="loading-glow absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent"></div>
      
      {/* Floating orbs */}
      <div className="loading-orb absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full blur-sm opacity-60"></div>
      <div className="loading-orb absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full blur-sm opacity-40"></div>
      <div className="loading-orb absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-400 rounded-full blur-sm opacity-80"></div>
      
      <div className="text-center">
        <div className="loading-text">
          <h1 className="text-6xl md:text-8xl font-thin text-white mb-8 tracking-wider">
            SHASHANK
          </h1>
          <div className="w-64 h-1 bg-slate-800 rounded-full mx-auto mb-4 overflow-hidden">
            <div className="progress-bar-fill h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-slate-300 text-lg font-light">{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
