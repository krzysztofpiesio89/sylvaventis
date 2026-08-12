'use client';

import React, { useEffect, useRef } from 'react';

const SparksEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let particles: Particle[] = [];
    const particleCount = 40;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      life: number;
      maxLife: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = canvas!.height + Math.random() * 100;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = -Math.random() * 2 - 1;
        this.maxLife = Math.random() * 100 + 100;
        this.life = this.maxLife;
        this.color = `rgba(255, ${Math.floor(Math.random() * 100 + 100)}, 0, `;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        
        // Add slight horizontal drift
        this.speedX += (Math.random() - 0.5) * 0.1;
      }

      draw() {
        if (!ctx) return;
        const opacity = this.life / this.maxLife;
        ctx.fillStyle = this.color + opacity + ')';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'orange';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
          particle.update();
          particle.draw();

          if (particle.life <= 0 || particle.y < -20) {
            particles[index] = new Particle();
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none opacity-60"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default SparksEffect;
