
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: 'SmartIntern Tracker',
      subtitle: 'AI-Powered Internship Management Platform',
      period: 'Feb 2026',
      bannerImage: '/Project Bannners/SmartInternTracker.png',
      description: 'Full-stack AI platform to streamline internship tracking, resume analysis, and performance prediction. Built with FastAPI + Gemini 1.5 Flash + ML models.',
      tech: ['FastAPI', 'Python', 'Gemini API', 'Scikit-learn', 'JavaScript', 'REST APIs'],
      gradient: 'from-violet-500 to-purple-700',
      icon: '🤖',
      githubUrl: 'https://github.com/Shashank9048/SmartIntern-Tracker',
      features: [
        'AI chatbot for real-time query resolution and resume insights',
        'ML-based internship performance prediction with Scikit-learn',
        'Scalable FastAPI backend with auth and REST APIs',
        'Personalized responsive dashboards'
      ]
    },
    {
      id: 2,
      title: 'TechConnect3003',
      subtitle: 'Community Networking Platform (MERN Stack)',
      period: 'Jul–Aug 2025',
      bannerImage: '/Project Bannners/techconnect.png',
      description: 'Community-driven MERN stack networking platform for technical discussions, peer collaboration, and structured engagement.',
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs'],
      gradient: 'from-cyan-400 to-blue-600',
      icon: '🌐',
      githubUrl: 'https://github.com/Shashank9048/TechConnect3003',
      features: [
        'Dynamic reusable React components for seamless UX',
        'Session-based auth with Node.js + Express',
        'Optimized MongoDB schema for efficient data persistence',
        'Fully responsive front-end'
      ]
    },
    {
      id: 3,
      title: 'Smart Portfolio',
      subtitle: 'AI-Enhanced Personal Portfolio',
      period: 'Jul 2025',
      bannerImage: '/Project Bannners/Smart-Portfolio.png',
      description: 'Professional personal portfolio with Gemini AI-powered chatbot, fully responsive, deployed on Netlify.',
      tech: ['HTML', 'CSS', 'TypeScript', 'Tailwind CSS', 'Gemini AI'],
      gradient: 'from-pink-400 to-rose-600',
      icon: '💼',
      githubUrl: 'https://github.com/Shashank9048/Smart-Portfolio',
      features: [
        'Gemini AI chatbot for visitor engagement',
        'Fully responsive across all devices',
        'Deployed on Netlify with GitHub source',
        'Tailwind CSS + GSAP animations'
      ]
    },
    {
      id: 4,
      title: 'Directory Management System',
      subtitle: 'Smart File Organizer & Duplicate Finder',
      period: 'Apr 2025',
      bannerImage: '/Project Bannners/Directory Management System.png',
      description: 'Python desktop app for intelligent file organization and duplicate detection using hashing and MIME type detection.',
      tech: ['Python', 'Tkinter', 'OS Module', 'Hashlib', 'Magic', 'Multithreading'],
      gradient: 'from-yellow-400 to-orange-500',
      icon: '🗂️',
      githubUrl: 'https://github.com/Shashank9048/Smart-Directory-Management-System',
      features: [
        'Hashlib-based duplicate file detection',
        'Magic library for MIME type identification',
        'Multithreaded processing for performance',
        'Tkinter GUI for easy use'
      ]
    },
    {
      id: 5,
      title: 'KisanSathi',
      subtitle: 'Farmer Support Platform',
      period: 'Mar 2025',
      bannerImage: '/Project Bannners/KisanSathi.png',
      description: 'Web portal connecting farmers with agricultural experts. Mobile-first approach for rural accessibility.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      gradient: 'from-green-400 to-emerald-600',
      icon: '🌾',
      githubUrl: 'https://github.com/Shashank9048/KisanSathi',
      features: [
        'Form-based agricultural query system',
        'Mobile-first responsive design',
        'Accessibility-focused for low-tech-literacy users',
        'Social impact focused'
      ]
    },
    {
      id: 6,
      title: 'FitLife Planner Pro',
      subtitle: 'AI-Integrated Fitness Planner + FitBot',
      period: 'Feb 2025',
      bannerImage: '/Project Bannners/Fit life planner pro .png',
      description: 'Full-featured fitness planning app with Gemini-powered AI personal trainer chatbot, workout planner, and progress dashboard.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Gemini API', 'Netlify'],
      gradient: 'from-blue-400 to-indigo-600',
      icon: '💪',
      githubUrl: 'https://github.com/Shashank9048/FitLife-Planner-Pro-FitBot-Assistant',
      features: [
        'FitBot AI chatbot powered by Gemini API',
        'Dynamic workout planner',
        'Real-time progress tracking',
        'Mobile responsive, deployed on Netlify'
      ]
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Initial setup
    gsap.set('.project-card', {
      opacity: 0,
      y: 60,
      scale: 0.9,
      filter: 'blur(10px)'
    });

    // Animate cards
    tl.to('.project-card', {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // Card hover animations
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-6 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Projects</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            A showcase of my latest work, featuring AI-integrated applications, full-stack platforms, and innovative solutions.
          </p>
        </div>

        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card glassmorphic rounded-xl overflow-hidden cursor-pointer group"
            >
              {/* Banner — always render gradient as base, image sits on top */}
              <div className="relative h-44 overflow-hidden rounded-t-2xl flex-shrink-0">
                {/* Gradient base layer — always visible as fallback */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />

                {/* Real banner image */}
                {project.bannerImage && (
                  <img
                    src={project.bannerImage}
                    alt={`${project.title} banner`}
                    loading="lazy"
                    className="project-banner-img absolute inset-0 object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}

                {/* Dark + brand overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent pointer-events-none" />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 pointer-events-none`} />

                {/* Icon bubble — bottom left */}
                <div className="absolute bottom-3 left-4 z-10">
                  <div className="w-11 h-11 bg-black/30 rounded-xl flex items-center justify-center backdrop-blur-md text-xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    {project.icon}
                  </div>
                </div>

                {/* Period badge — top right */}
                {project.period && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-xs bg-black/50 text-white/90 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      {project.period}
                    </span>
                  </div>
                )}
              </div>


              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-cyan-400 text-sm font-medium">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-slate-300 text-sm mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="mb-4">
                  <p className="text-xs text-slate-400 mb-2 font-medium">Key Features:</p>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {project.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-cyan-400 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full border border-slate-600/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-end">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 border border-slate-600/30 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-all duration-300 hover:text-white"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
