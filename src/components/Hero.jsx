import React, { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

const NeonChip = ({ children, offset = { x: 0.1, y: 0.1 }, delay = 0 }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPos({ x, y });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return (
    <div
      className="pointer-events-none absolute select-none"
      style={{
        transform: `translate3d(${pos.x * 40 * offset.x}px, ${pos.y * 40 * offset.y}px, 0)`,
        transition: `transform 0.2s cubic-bezier(.2,.8,.2,1) ${delay}ms`,
      }}
    >
      <div className="backdrop-blur-sm rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 px-3 py-1.5 shadow-[0_0_20px_rgba(0,255,0,0.35)]">
        {children}
      </div>
    </div>
  );
};

export default function Hero() {
  const canvasRef = useRef(null);
  const animRef = useRef(0);

  // Binary rain background inside hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);
    const chars = '01';

    const draw = () => {
      ctx.fillStyle = 'rgba(10,10,10,0.25)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.shadowColor = '#00ff00';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#00ff00';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-white">
      {/* Matrix binary rain */}
      <canvas ref={canvasRef} className="fixed inset-0" style={{ zIndex: 0 }} />

      {/* Spline 3D scene */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* subtle gradients over the scene (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/30 to-[#0a0a0a]" style={{ zIndex: 2 }} />

      {/* Content */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pt-28 md:pt-36" style={{ zIndex: 3 }}>
        <h1 className="text-center text-4xl font-extrabold tracking-tight md:text-6xl">
          <span className="text-white drop-shadow-[0_0_30px_rgba(0,255,0,0.4)]">Shahzad Akram</span>
          <span className="block bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Software Developer</span>
        </h1>
        <p className="mt-6 max-w-2xl text-center text-emerald-200/90">
          Dark, futuristic engineering with interactive 3D, smooth motion, and cyberpunk precision.
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="#projects"
            className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 font-medium text-emerald-300 shadow-[0_0_20px_rgba(0,255,0,0.35)] transition hover:scale-[1.02] hover:border-emerald-400 hover:text-emerald-200 hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-medium text-white/90 backdrop-blur transition hover:scale-[1.02] hover:bg-white/10"
          >
            Contact Me
          </a>
        </div>

        {/* Floating holographic chips that follow cursor */}
        <div className="relative mt-16 h-48 w-full max-w-3xl">
          <NeonChip offset={{ x: 0.3, y: -0.2 }} delay={0}>
            React • Three.js • GSAP • FastAPI
          </NeonChip>
          <NeonChip offset={{ x: -0.2, y: 0.25 }} delay={90}>
            3D Interfaces & Parallax Systems
          </NeonChip>
          <NeonChip offset={{ x: 0.15, y: 0.35 }} delay={180}>
            Performance-First • Responsive • A11y
          </NeonChip>
        </div>
      </div>
    </section>
  );
}
