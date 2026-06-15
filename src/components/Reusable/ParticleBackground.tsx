import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['183, 0, 168', '118, 33, 176', '190, 76, 0', '215, 226, 234'];

    const spawnParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 0.8 + 0.3),
        size: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.4 + 0.1,
        life: 0,
        maxLife: Math.random() * 300 + 200,
      };
    };

    const maxParticles = 80;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particlesRef.current.length < maxParticles && Math.random() < 0.08) {
        particlesRef.current.push(spawnParticle());
      }

      const lines: { p1: Particle; p2: Particle; dist: number }[] = [];

      particlesRef.current = particlesRef.current.filter(p => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = Math.min(p.alpha, (1 - p.life / p.maxLife) * 0.5);
        return p.life < p.maxLife;
      });

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const q = particlesRef.current[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            lines.push({ p1: p, p2: q, dist });
          }
        }
      }

      for (const p of particlesRef.current) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
        ctx.fill();
      }

      for (const line of lines) {
        const alpha = (1 - line.dist / 150) * 0.12;
        const color = colors[Math.floor(Math.random() * colors.length)];
        ctx.beginPath();
        ctx.moveTo(line.p1.x, line.p1.y);
        ctx.lineTo(line.p2.x, line.p2.y);
        ctx.strokeStyle = `rgba(${color}, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
      particlesRef.current = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};
