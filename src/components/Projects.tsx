
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: 'University Management System',
      subtitle: 'UMS Student Dashboard',
      description: 'Professional student dashboard for university information management. Features interactive navigation, dark/light mode toggle, and dynamic timetable switching.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Material Icons'],
      gradient: 'from-cyan-400 to-blue-600',
      icon: '🎯',
      githubUrl: 'https://github.com/Shashank9048/UMS-Project',
      features: ['Interactive navigation menu', 'Dark/Light mode toggle', 'Dynamic timetable system', 'Professional UI animations']
    },
    {
      id: 2,
      title: 'SkillSeed',
      subtitle: 'AI-Powered Coding Education Platform',
      description: 'Next-gen educational platform for learning coding with AI assistance. Interactive personalized experience with real-time Q&A, note-making, and GitHub/LeetCode progress tracking.',
      tech: ['HTML', 'CSS', 'JavaScript', 'AI APIs', 'Firebase'],
      gradient: 'from-purple-400 to-pink-600',
      icon: '🎓',
      githubUrl: 'https://github.com/Shashank9048/SkillSeed',
      features: ['AI-powered Q&A integration', 'Downloadable PDF notes', 'GitHub/LeetCode tracking', 'Interactive video tutorials']
    },
    {
      id: 3,
      title: 'FitLife Planner Pro',
      subtitle: 'AI-Integrated Fitness Planner',
      description: 'Full-featured fitness planning web application with AI-powered personal trainer using Google\'s Gemini API. Features real-time chatbot for fitness advice, dynamic workout planners, and progress tracking dashboard.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Gemini API', 'Netlify'],
      gradient: 'from-green-400 to-emerald-600',
      icon: '💪',
      githubUrl: 'https://github.com/Shashank9048/FitLife-Planner-Pro-FitBot-Assistant',
      features: ['AI Chatbot for fitness queries', 'Dynamic workout & meal planners', 'Real-time progress tracking', 'Mobile & desktop responsive']
    },
    {
      id: 4,
      title: 'KisanSathi',
      subtitle: 'Farmer Query Support Platform',
      description: 'Web-based portal connecting farmers with agricultural experts. Designed for accessibility in rural areas with mobile-first approach for users with minimal tech literacy.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      gradient: 'from-orange-400 to-yellow-600',
      icon: '🌾',
      githubUrl: 'https://github.com/Shashank9048/KisanSathi',
      features: ['Form-based query system', 'Mobile-first responsive design', 'Accessibility focused', 'Social impact through technology']
    },
    {
      id: 5,
      title: 'Directory Management System',
      subtitle: 'Smart File Organizer & Duplicate Finder',
      description: 'Python-based desktop GUI application for efficient file system management. Automates file organization and locates duplicates using MD5 hashing with intuitive Tkinter interface.',
      tech: ['Python', 'Tkinter', 'Hashlib', 'Multithreading'],
      gradient: 'from-blue-400 to-indigo-600',
      icon: '📁',
      githubUrl: 'https://github.com/Shashank9048/Smart-Directory-Management-System',
      features: ['Automatic file categorization', 'Duplicate detection with MD5', 'Multithreaded operations', 'Undo functionality for safety']
    },
    {
      id: 6,
      title: 'TheMudrak',
      subtitle: 'Sustainable Printing & Packaging Store',
      description: 'Professional eco-conscious commercial website for a real-world sustainable printing brand. Live e-commerce-style site promoting green business practices with eco-friendly materials.',
      tech: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
      gradient: 'from-green-500 to-teal-600',
      icon: '🌱',
      link: 'https://themudrak.com',
      features: ['Live commercial website', 'Eco-friendly product showcase', 'SEO optimized', 'Fast-loading responsive design']
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
    <section ref={sectionRef} className="py-20 px-6 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-thin text-white mb-6 tracking-wide">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Projects</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            A showcase of my latest work, featuring AI-integrated applications, real-world commercial projects, and innovative solutions.
          </p>
        </div>

        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card glassmorphic rounded-xl overflow-hidden cursor-pointer group"
            >
              <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <span className="text-2xl">{project.icon}</span>
                  </div>
                </div>
                {project.link && (
                  <div className="absolute top-4 right-4">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4 text-white" />
                    </a>
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
                    className="px-3 py-2 bg-slate-700/50 border border-slate-600/30 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-all duration-300 hover:text-white"
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
