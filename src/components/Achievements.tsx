
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Download, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AchievementCard {
  icon: string;
  gradient: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  link?: string;
}

const achievements: AchievementCard[] = [
  {
    icon: '🏆',
    gradient: 'from-yellow-400 to-orange-500',
    title: 'LeetCode 100 Days Badge',
    subtitle: 'Consistency & Problem Solving',
    date: 'Jan 2025',
    description:
      'Earned the 100 Days of LeetCode badge by completing 100 consecutive days of DSA problem solving, demonstrating persistence in data structures and algorithms.',
    link: 'https://leetcode.com/u/Shashank96300/',
  },
  {
    icon: '👑',
    gradient: 'from-purple-400 to-violet-600',
    title: 'Club President – College Tech Club',
    subtitle: 'Leadership Excellence',
    date: '2024–Present',
    description:
      'Led the college tech club as president, organizing hackathons, workshops, and events for 200+ members, demonstrating strong leadership and event management skills.',
  },
  {
    icon: '☁️',
    gradient: 'from-green-400 to-emerald-600',
    title: 'Cloud Computing Internship Certificate',
    subtitle: 'InternsVeda Edutech Pvt. Ltd.',
    date: 'Jan 2025',
    description:
      'Completed a certified internship in cloud computing covering virtualization, infrastructure management, deployment, and security best practices.',
  },
];

// All 3 hackathon certificate images
const hackathonImages = [
  {
    src: '/Hackathon/1.png',
    label: 'Hackathon Certificate 1',
  },
  {
    src: '/Hackathon/2.jpeg',
    label: 'Hackathon Certificate 2',
  },
  {
    src: '/Hackathon/3.jpeg',
    label: 'Hackathon Certificate 3',
  },
];

const Achievements: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hackTitleRef = useRef<HTMLDivElement>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Title animation
    gsap.set(titleRef.current, { opacity: 0, y: 50, filter: 'blur(10px)' });
    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Achievement cards
    gsap.set('.achievement-card', { opacity: 0, y: 60, scale: 0.9 });
    gsap.to('.achievement-card', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.achievement-card',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });

    // Hack title
    if (hackTitleRef.current) {
      gsap.set(hackTitleRef.current, { opacity: 0, y: 30, filter: 'blur(8px)' });
      gsap.to(hackTitleRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: hackTitleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    // Hackathon cards
    gsap.set('.hack-card', { opacity: 0, y: 40, scale: 0.93 });
    gsap.to('.hack-card', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.hack-card',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    // Hover
    document.querySelectorAll('.achievement-card').forEach((card) => {
      const handleEnter = () =>
        gsap.to(card, {
          y: -8,
          boxShadow: '0 0 40px rgba(168, 85, 247, 0.25)',
          duration: 0.3,
          ease: 'power2.out',
        });
      const handleLeave = () =>
        gsap.to(card, {
          y: 0,
          boxShadow: '0 0 0 rgba(168,85,247,0)',
          duration: 0.3,
          ease: 'power2.out',
        });
      card.addEventListener('mouseenter', handleEnter);
      card.addEventListener('mouseleave', handleLeave);
    });
  }, []);

  const handleDownload = (src: string, label: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${label}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="py-24 px-6 bg-slate-900/50 relative overflow-hidden"
    >
      {/* Section divider top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #22d3ee, #a855f7, transparent)' }}
      />

      {/* Background subtle glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-72 h-72 bg-yellow-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-purple-500/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* ── A) ACHIEVEMENTS ── */}
        <div ref={titleRef} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-slate-300 text-sm mb-6">
            🏆 Milestones & Recognition
          </div>
          <h2 className="text-4xl md:text-5xl font-thin text-white tracking-wide">
            Achievements &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Honors
            </span>
          </h2>
        </div>

        {/* Achievement Cards – grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="achievement-card glassmorphic rounded-2xl p-6 cursor-default group"
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl shadow-lg`}
                >
                  {item.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-white font-medium text-base leading-snug group-hover:text-cyan-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <span className="text-slate-500 text-xs flex-shrink-0 mt-0.5">{item.date}</span>
                  </div>
                  <p
                    className={`text-transparent bg-clip-text bg-gradient-to-r ${item.gradient} text-xs font-medium mb-3`}
                  >
                    {item.subtitle}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-cyan-400 text-xs hover:text-cyan-300 transition-colors duration-200 font-medium"
                      style={{ transition: 'none' }}
                    >
                      View Profile →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── B) HACKATHONS ── */}
        <div ref={hackTitleRef} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-slate-300 text-sm mb-4">
            ⚡ Hackathons & Competitions
          </div>
        </div>

        {/* Hackathon Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Real hackathon card */}
          {hackathonImages.map((img, i) => (
            <div
              key={i}
              className="hack-card relative rounded-2xl overflow-hidden cursor-default group"
              style={{
                border: '1.5px solid rgba(34,211,238,0.3)',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              {/* Thumbnail */}
              <div className="h-40 overflow-hidden rounded-t-xl">
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105"
                  style={{ transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                />
              </div>
              {/* Label & buttons */}
              <div className="p-4">
                <p className="text-cyan-400 text-sm font-medium mb-3">{img.label}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPreviewImg(img.src)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 glassmorphic rounded-lg text-slate-300 text-xs hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    Preview
                  </button>
                  <button
                    onClick={() => handleDownload(img.src, img.label)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-cyan-400/80 to-purple-500/80 rounded-lg text-white text-xs hover:opacity-90 transition-opacity duration-200"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}

        
        </div>
      </div>

      {/* Section divider bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #a855f7, #22d3ee, transparent)' }}
      />

      {/* Fullscreen Image Preview Modal */}
      {previewImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPreviewImg(null)}
        >
          <button
            className="absolute top-5 right-5 text-white bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors"
            onClick={() => setPreviewImg(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={previewImg}
            alt="Certificate Preview"
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Achievements;
