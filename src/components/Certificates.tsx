
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Download, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Certificate {
  icon: string;
  gradient: string;
  title: string;
  issuer: string;
  date: string;
  imageSrc: string;
}

const certificates: Certificate[] = [
  {
    icon: '🌐',
    gradient: 'from-cyan-400 to-blue-600',
    title: 'Full-Stack Development using MERN',
    issuer: 'Cipher Schools',
    date: 'Jul 2025',
    imageSrc: '/Certificates/4.png',
  },
  {
    icon: '☁️',
    gradient: 'from-orange-400 to-amber-500',
    title: 'Cloud Computing Internship & Training',
    issuer: 'InternsVeda Edutech Pvt. Ltd.',
    date: 'Jan 2025',
    imageSrc: '/Certificates/5.png',
  },
  {
    icon: '📊',
    gradient: 'from-green-400 to-teal-500',
    title: 'Analyze Asset & Fund Management Strategies',
    issuer: 'EDUCBA',
    date: '2024',
    imageSrc: '/Certificates/6.png',
  },
  {
    icon: '🖥️',
    gradient: 'from-blue-500 to-indigo-600',
    title: 'Introduction to Hardware and Operating Systems',
    issuer: 'IBM',
    date: '2024',
    imageSrc: '/Certificates/7.png',
  },
  {
    icon: '🔗',
    gradient: 'from-red-400 to-pink-500',
    title: 'The Bits and Bytes of Computer Networking',
    issuer: 'Google',
    date: '2024',
    imageSrc: '/Certificates/8.png',
  },
  {
    icon: '🗣️',
    gradient: 'from-purple-400 to-violet-600',
    title: 'Communication in the 21st Century Workplace',
    issuer: 'University of California, Irvine (UCI)',
    date: '2024',
    imageSrc: '/Certificates/9.png',
  },
  {
    icon: '🌐',
    gradient: 'from-yellow-400 to-orange-500',
    title: 'Peer-to-Peer Protocols and Local Area Networks',
    issuer: 'University of Colorado',
    date: '2024',
    imageSrc: '/Certificates/10.png',
  },
];

const Certificates: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [modalCert, setModalCert] = useState<Certificate | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Title
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

    // Cards
    gsap.set('.cert-card', { opacity: 0, y: 60, scale: 0.9 });
    gsap.to('.cert-card', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.75,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.cert-card',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });

    // Hover
    document.querySelectorAll('.cert-card').forEach((card) => {
      const handleEnter = () =>
        gsap.to(card, { y: -8, boxShadow: '0 0 40px rgba(168, 85, 247, 0.25)', duration: 0.3, ease: 'power2.out' });
      const handleLeave = () =>
        gsap.to(card, { y: 0, boxShadow: '0 0 0 rgba(168,85,247,0)', duration: 0.3, ease: 'power2.out' });
      card.addEventListener('mouseenter', handleEnter);
      card.addEventListener('mouseleave', handleLeave);
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="py-24 px-6 bg-slate-800/30 relative overflow-hidden"
    >
      {/* Divider top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #22d3ee, #a855f7, transparent)' }}
      />

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-slate-300 text-sm mb-6">
            📜 Verified Credentials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
            My{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Certificates
            </span>
          </h2>
        </div>

        {/* All 7 certificates in 3-col grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="cert-card bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden group cursor-default"
            >
              {/* Top gradient banner */}
              <div className={`h-1.5 bg-gradient-to-r ${cert.gradient}`} />

              <div className="p-6">
                <div className="flex items-start gap-4 mb-5">
                  {/* Icon bubble */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}
                  >
                    {cert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-white font-medium text-sm leading-snug group-hover:text-cyan-400 transition-colors duration-300">
                        {cert.title}
                      </h3>
                      {/* Verified badge */}
                      <span className="flex-shrink-0 flex items-center gap-1 px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs rounded-full font-medium">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                        Verified ✓
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs">{cert.issuer}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{cert.date}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setModalCert(cert)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-300 text-xs font-medium hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    Preview
                  </button>
                  <a
                    href={cert.imageSrc}
                    download
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500/80 to-purple-500/80 rounded-xl text-white text-xs font-medium hover:opacity-90 transition-opacity duration-200"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #a855f7, #22d3ee, transparent)' }}
      />

      {/* Preview Modal */}
      {modalCert && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModalCert(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors z-10"
              onClick={() => setModalCert(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={modalCert.imageSrc}
              alt={modalCert.title}
              className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-3 flex items-center justify-between px-1">
              <div>
                <p className="text-white font-medium text-sm">{modalCert.title}</p>
                <p className="text-slate-400 text-xs">{modalCert.issuer} · {modalCert.date}</p>
              </div>
              <a
                href={modalCert.imageSrc}
                download
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500/80 to-purple-500/80 rounded-lg text-white text-xs font-medium hover:opacity-90"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
