'use client';

import React, { useEffect, useRef } from 'react';

interface ThankYouAnimationProps {
  onComplete?: () => void;
}

const ThankYouAnimation = ({ onComplete }: ThankYouAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;
    let particles: Spark[] = [];

    class Spark {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      life: number;
      maxLife: number;
      gravity: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        // Explosion velocity
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 15 + 5;
        this.speedX = Math.cos(angle) * velocity;
        this.speedY = Math.sin(angle) * velocity;
        
        // Forest / Earth palette
        const colors = ['#2D4A2E', '#4A6741', '#B8863A', '#7A8B6F'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.maxLife = Math.random() * 60 + 40;
        this.life = this.maxLife;
        this.gravity = 0.2;
      }

      update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.speedX *= 0.98;
        this.speedY *= 0.98;
      }

      draw() {
        if (!ctx) return;
        const opacity = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const init = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      for (let i = 0; i < 150; i++) {
        particles.push(new Spark(centerX, centerY));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.life <= 0) {
          particles.splice(index, 1);
        }
      });

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(animate);
      } else if (onComplete) {
        onComplete();
      }
    };

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default ThankYouAnimation;
