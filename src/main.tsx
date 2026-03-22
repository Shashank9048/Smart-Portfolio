import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Performance config for ScrollTrigger
ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
});

// Refresh once after full load to fix position calculation errors
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});

createRoot(document.getElementById('root')!).render(<App />);
