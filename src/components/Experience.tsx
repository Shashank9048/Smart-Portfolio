
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  title: string;
  company: string;
  period: string;
  tag: string;
  bullets: string[];
  tags: string[];
  gradient: string;
  tagColor: string;
}

const experiences: TimelineEntry[] = [
  {
    title: 'Freelance Web Developer',
    company: 'WowwDecors & Events',
    period: 'Oct 2025 – Nov 2025',
    tag: 'Freelance',
    bullets: [
      'Collaborated with a cross-functional team to develop a fully responsive website for a US-based event management startup.',
      'Implemented dynamic image galleries, event booking form, and client testimonial sections to boost engagement.',
      'Designed a clean, modern UI showcasing services and past projects.',
    ],
    tags: ['HTML', 'Tailwind CSS', 'JavaScript', 'jQuery'],
    gradient: 'from-blue-400 to-cyan-500',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
  {
    title: 'Freelance Web Developer',
    company: 'TheMudrak – Eco-Friendly Printing & Packaging',
    period: 'Jan 2025 – Mar 2025',
    tag: 'Freelance',
    bullets: [
      'Built a fully responsive website for a sustainable eco-friendly brand ensuring smooth performance across all devices.',
      'Integrated WordPress for dynamic content management alongside HTML/CSS/JS.',
      'Designed intuitive UI/UX showcasing eco-friendly products with fast loading speeds.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
    gradient: 'from-green-400 to-emerald-500',
    tagColor: 'bg-green-500/20 text-green-300 border-green-500/30',
  },
  {
    title: 'Cloud Computing Intern & Trainee',
    company: 'InternsVeda Edutech Pvt. Ltd.',
    period: 'Dec 2024 – Jan 2025',
    tag: 'Internship',
    bullets: [
      'Completed combined training and internship in cloud computing with hands-on virtualization and deployment experience.',
      'Collaborated on real-world cloud projects optimizing performance, scalability, and security.',
    ],
    tags: ['Cloud Computing', 'Virtualization', 'Infrastructure', 'Deployment', 'Security'],
    gradient: 'from-orange-400 to-amber-500',
    tagColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  },
];

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const entriesRef = useRef<HTMLDivElement[]>([]);

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

    // Entry animations – alternating left/right
    entriesRef.current.forEach((entry, index) => {
      if (!entry) return;
      const xFrom = index % 2 === 0 ? -60 : 60;
      gsap.set(entry, { opacity: 0, x: xFrom, scale: 0.95, filter: 'blur(8px)' });
      gsap.to(entry, {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: entry,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Hover animations
    entriesRef.current.forEach((card) => {
      if (!card) return;
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
          boxShadow: '0 0 0px rgba(168, 85, 247, 0)',
          duration: 0.3,
          ease: 'power2.out',
        });
      card.addEventListener('mouseenter', handleEnter);
      card.addEventListener('mouseleave', handleLeave);
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 px-6 bg-slate-800/30 relative overflow-hidden"
    >
      {/* Section divider top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, #22d3ee, #a855f7, transparent)',
        }}
      />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-slate-300 text-sm mb-6">
            💼 Professional Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
            Work{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Experience
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 md:left-6 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, #22d3ee, #8b5cf6, #22d3ee)',
            }}
          />

          <div className="space-y-10 pl-14 md:pl-20">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative"
                ref={(el) => {
                  if (el) entriesRef.current[index] = el;
                }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-10 md:-left-[3.85rem] top-6 w-4 h-4 rounded-full border-2 border-cyan-400 bg-slate-900 pulse-glow"
                  style={{ boxShadow: '0 0 10px 2px rgba(34,211,238,0.5)' }}
                />

                {/* Card */}
                <div className="glassmorphic rounded-2xl p-6 md:p-8 cursor-default">
                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="text-xl font-medium text-white">{exp.title}</h3>
                        <span
                          className={`px-2.5 py-0.5 text-xs rounded-full border font-medium ${exp.tagColor}`}
                        >
                          {exp.tag}
                        </span>
                      </div>
                      <p
                        className={`text-transparent bg-clip-text bg-gradient-to-r ${exp.gradient} font-medium text-sm`}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-slate-400 text-sm font-medium whitespace-nowrap flex-shrink-0 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                      {exp.period}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2 mb-5">
                    {exp.bullets.map((bullet, bi) => (
                      <li key={bi} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                        <span
                          className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gradient-to-br ${exp.gradient}`}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/5 text-slate-400 text-xs rounded-full border border-white/10 hover:border-white/20 hover:text-slate-300 transition-colors duration-200"
                        style={{ transition: 'none' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section divider bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, #a855f7, #22d3ee, transparent)',
        }}
      />
    </section>
  );
};

export default Experience;
