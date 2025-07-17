
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // EmailJS configuration
  const emailJSConfig = {
    serviceId: 'service_lyb0tmn',
    templateId: 'template_4yjtt2w',
    publicKey: 'YRoS6gdpaOflh2eq6'
  };

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(emailJSConfig.publicKey);

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
    gsap.set('.contact-input', {
      opacity: 0,
      x: -50,
      filter: 'blur(5px)'
    });
    gsap.set('.contact-submit', {
      opacity: 0,
      y: 30,
      scale: 0.9
    });
    gsap.set('.social-icon', {
      opacity: 0,
      y: 20,
      scale: 0.8
    });

    // Animate elements
    tl.to('.contact-input', {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    }).to('.contact-submit', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)'
    }, '-=0.3').to('.social-icon', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=0.2');

    // Submit button pulse animation
    gsap.to('.contact-submit', {
      scale: 1.02,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    // Submit button animation
    const submitBtn = document.querySelector('.contact-submit');
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Shashank Singh', // Your name
      };

      console.log('Sending email with params:', templateParams);

      // Send email using EmailJS
      const response = await emailjs.send(
        emailJSConfig.serviceId,
        emailJSConfig.templateId,
        templateParams
      );

      console.log('Email sent successfully:', response);

      // Show success toast
      toast({
        title: "Message sent successfully! 🎉",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      // Success animation
      gsap.to(submitBtn, {
        backgroundColor: '#10b981',
        duration: 0.3,
        yoyo: true,
        repeat: 1
      });

    } catch (error) {
      console.error('Failed to send email:', error);
      
      // Show error toast
      toast({
        title: "Failed to send message",
        description: "Something went wrong. Please try again or contact me directly.",
        variant: "destructive",
      });

      // Error animation
      gsap.to(submitBtn, {
        backgroundColor: '#ef4444',
        duration: 0.3,
        yoyo: true,
        repeat: 1
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [{
    name: 'GitHub',
    icon: '⚡',
    url: 'https://github.com/Shashank9048',
    color: 'hover:text-purple-400'
  }, {
    name: 'LinkedIn',
    icon: '💼',
    url: 'https://www.linkedin.com/in/shashank-singh-55025a298/',
    color: 'hover:text-blue-400'
  }, {
    name: 'LeetCode',
    icon: '💻',
    url: 'https://leetcode.com/u/Shashank96300/',
    color: 'hover:text-orange-400'
  }, {
    name: 'Email',
    icon: '✉️',
    url: 'mailto:shashanksingh9048@gmail.com',
    color: 'hover:text-green-400'
  }];

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-gradient-to-b from-slate-800/50 to-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-thin text-white mb-6 tracking-wide">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Connect</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Ready to start your next project? Let's discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glassmorphic rounded-xl p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="contact-input">
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300" 
                  placeholder="Your name" 
                  required 
                  disabled={isSubmitting}
                />
              </div>

              <div className="contact-input">
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300" 
                  placeholder="your@email.com" 
                  required 
                  disabled={isSubmitting}
                />
              </div>

              <div className="contact-input">
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  rows={5} 
                  className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300 resize-none" 
                  placeholder="Tell me about your project..." 
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="contact-submit w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-lg hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            <div className="glassmorphic rounded-xl p-8">
              <h3 className="text-2xl font-light text-white mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm">Email</p>
                    <p className="text-white">shashanksingh9048@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📱</span>
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm">Phone</p>
                    <p className="text-white">+91 9630023003</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glassmorphic rounded-xl p-8">
              <h3 className="text-2xl font-light text-white mb-6">Follow Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon flex items-center space-x-3 p-3 rounded-lg bg-slate-800/40 border border-slate-600/30 text-slate-300 ${social.color} transition-all duration-300 hover:bg-slate-700/40`}
                  >
                    <span className="text-xl">{social.icon}</span>
                    <span className="font-medium">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
