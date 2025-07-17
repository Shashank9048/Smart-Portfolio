
import React, { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingChatbot from '../components/FloatingChatbot';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <div className="relative">
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      {!isLoading && (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
          <Navigation />
          <main>
            <section id="home">
              <Hero />
            </section>
            <section id="about">
              <About />
            </section>
            <section id="projects">
              <Projects />
            </section>
            <section id="contact">
              <Contact />
            </section>
          </main>
          <Footer />
          <FloatingChatbot />
          <Toaster />
        </div>
      )}
    </div>
  );
};

export default Index;
