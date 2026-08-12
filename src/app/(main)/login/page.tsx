'use client';

import LoginFormApp from '@/components/User/LoginFormApp';
import { motion } from 'motion/react';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(184,149,63,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_50%_100%,rgba(61,74,47,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Noise Texture */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20256%20256%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noise%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noise)%22/%3E%3C/svg%3E')] bg-[length:200px_200px]" />

      <div className="relative z-10 w-full flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-px h-12 bg-accent-gold mx-auto mb-8" />
          <p className="text-accent-gold text-[10px] uppercase tracking-[0.4em] mb-4">Authentication Required</p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter">My <em className="italic text-accent-gold">Sanctuary</em></h1>
        </motion.div>

        <LoginFormApp />

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-text-muted text-sm font-light">
            Don't have an account yet? <br />
            <span className="text-white/50 text-[10px] uppercase tracking-widest mt-2 block">Registration is currently restricted to invited seekers.</span>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
