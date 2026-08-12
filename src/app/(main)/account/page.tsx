'use client';

import AccountDashboardApp from '@/components/User/AccountDashboardApp';
import { motion } from 'motion/react';

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-obsidian pt-40 pb-20 px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_0%_0%,rgba(61,74,47,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_100%,rgba(184,149,63,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Noise Texture */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20256%20256%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noise%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noise)%22/%3E%3C/svg%3E')] bg-[length:200px_200px]" />

      <div className="relative z-10">
        <AccountDashboardApp />
      </div>
    </main>
  );
}
