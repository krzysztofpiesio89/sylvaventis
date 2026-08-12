'use client';

import Link from 'next/link';
import ThankYouAnimation from '@/components/Checkout/ThankYouAnimation';
import { motion } from 'motion/react';

export default function ThankYouPage() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#0f0d0a] flex flex-col items-center justify-center p-6 md:p-12 text-center overflow-hidden touch-none">
      {/* Immersive background particles */}
      <ThankYouAnimation />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 max-w-2xl w-full space-y-8 md:space-y-12"
      >
        {/* Success Icon with Glow */}
        <div className="relative w-20 h-20 md:w-28 md:h-28 mx-auto mb-8 md:mb-16">
          <div className="absolute inset-0 bg-success/20 rounded-full blur-3xl animate-pulse" />
          <div className="relative w-full h-full bg-success/10 rounded-full flex items-center justify-center border border-success/30 shadow-[0_0_50px_rgba(50,215,75,0.2)]">
            <svg className="w-10 h-10 md:w-14 md:h-14 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-8xl font-light text-white tracking-tighter leading-none">
            The journey <br />
            <span className="italic font-bold text-accent-gold drop-shadow-[0_0_30px_rgba(184,149,63,0.3)]">begins.</span>
          </h1>
          <div className="w-12 h-px bg-accent-gold/30 mx-auto mt-8" />
        </div>
        
        <p className="text-white/60 text-[10px] md:text-xs uppercase tracking-[0.4em] leading-[2.2] max-w-md mx-auto font-syne px-4">
          Your order has been received and is being processed by our specialists. 
          Check your email for details of your upcoming experience.
        </p>

        <div className="pt-12 md:pt-20">
          <Link 
            href="/" 
            className="group relative inline-flex items-center justify-center px-12 md:px-20 py-4 md:py-6 bg-accent-gold text-obsidian font-bold uppercase tracking-[0.3em] text-[11px] md:text-xs transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Continue Discovery</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </Link>
          
          <p className="mt-8 text-[9px] uppercase tracking-widest text-white/20">
            Amanita Sale · Est. in the Northern Forests
          </p>
        </div>
      </motion.div>

      {/* Noise overlay for premium feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20256%20256%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noise%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%3E%3C/feTurbulence%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noise)%22%3E%3C/rect%3E%3C/svg%3E')] mix-blend-overlay" />
    </div>
  );
}
