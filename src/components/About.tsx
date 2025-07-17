import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
gsap.registerPlugin(ScrollTrigger);
const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillCategories = [{
    emoji: '🚀',
    title: 'Cloud Platforms',
    skills: ['AWS', 'GCP']
  }, {
    emoji: '🧠',
    title: 'Programming Languages',
    skills: ['Java', 'C++', 'JavaScript', 'Python', 'Bash', 'Shell']
  }, {
    emoji: '🌐',
    title: 'Web Development',
    skills: ['HTML', 'CSS', 'WordPress']
  }, {
    emoji: '💻',
    title: 'Systems & Databases',
    skills: ['Linux', 'Windows', 'MySQL']
  }];
  const handleResumeDownload = () => {
    // Open the Google Drive resume link in a new tab
    const resumeUrl = 'https://drive.google.com/uc?export=download&id=14Ys4FXFRrF2OCrJzi3v4slTpTaZRXVpI';

    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.target = '_blank';
    link.download = 'Shashank_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
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
    gsap.set([imageRef.current, contentRef.current], {
      opacity: 0,
      filter: 'blur(10px)'
    });
    gsap.set(imageRef.current, {
      x: -50
    });
    gsap.set(contentRef.current, {
      x: 50
    });
    gsap.set('.skill-category', {
      opacity: 0,
      y: 30
    });

    // Animate elements
    tl.to([imageRef.current, contentRef.current], {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    }).to('.skill-category', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=0.5');

    // Image hover animation
    const profileImage = imageRef.current;
    if (profileImage) {
      const handleMouseEnter = () => {
        gsap.to(profileImage, {
          rotationY: 5,
          rotationX: 5,
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      const handleMouseLeave = () => {
        gsap.to(profileImage, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      profileImage.addEventListener('mouseenter', handleMouseEnter);
      profileImage.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        profileImage.removeEventListener('mouseenter', handleMouseEnter);
        profileImage.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);
  return <section ref={sectionRef} className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20 p-1">
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                  <img src="/lovable-uploads/63afa4e8-f067-4142-a164-2515c02ac071.png" alt="Shashank - Web Developer" className="w-full h-full object-cover object-top rounded-full scale-110" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-600/10 rounded-full blur-xl"></div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-thin text-white mb-6 tracking-wide">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Me</span>
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">I'm a passionate Computer Science student with hands-on experience in building web platforms, automating systems, and working with cloud technologies like AWS and GCP. I enjoy solving real-world problems using Java, C++, Python, and JavaScript, and thrive in Linux environments.</p>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">Outside of coding, I explore emerging technologies, build personal projects, and constantly push myself to learn, adapt, and grow as a developer.</p>
              
              {/* Resume Download Button */}
              <Button onClick={handleResumeDownload} className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </div>

            <div ref={skillsRef}>
              <h3 className="text-2xl font-light text-white mb-6">Skills</h3>
              <div className="space-y-4">
                {skillCategories.map((category, index) => <Collapsible key={category.title} className="skill-category">
                    <CollapsibleTrigger className="w-full glassmorphic p-4 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category.emoji}</span>
                          <h4 className="text-white font-medium text-left">{category.title}</h4>
                        </div>
                        <ChevronDown className="h-5 w-5 text-slate-400 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="pt-3 pb-1 px-4">
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map(skill => <span key={skill} className="px-3 py-1 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 text-slate-300 text-sm rounded-full border border-white/10 hover:border-white/20 transition-colors duration-200">
                              {skill}
                            </span>)}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;