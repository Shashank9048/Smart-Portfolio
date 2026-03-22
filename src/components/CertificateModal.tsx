
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, Download } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  issuer: string;
  previewUrl: string;
  downloadUrl: string;
  status?: string;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  title,
  issuer,
  previewUrl,
  downloadUrl,
  status = 'Verified ✓',
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Entrance animation
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: 'cubic-bezier(0.34,1.56,0.64,1)',
      }
    );

    // Escape key handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.92,
      duration: 0.25,
      ease: 'power2.in',
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}
      onClick={(e) => {
        if (e.target === backdropRef.current) handleClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col"
        style={{ height: '90vh', background: 'rgb(15,23,42)' }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.7)] animate-pulse" />
            <div className="min-w-0">
              <h3 className="text-white font-medium text-lg truncate">{title}</h3>
              <p className="text-slate-400 text-sm truncate">{issuer}</p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs rounded-full flex-shrink-0">
              {status}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 font-medium"
              style={{ transition: 'none' }}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={handleClose}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              style={{ transition: 'none' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body – iframe */}
        <div className="flex-1 overflow-hidden relative">
          <iframe
            src={previewUrl}
            className="w-full h-full border-0"
            title={`${title} Preview`}
            allow="autoplay"
          />
          {/* overlay to prevent iframe click closing */}
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
