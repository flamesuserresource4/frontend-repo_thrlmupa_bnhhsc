import React, { useEffect, useRef } from 'react';

export default function Contact() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = 260);

    const create = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: 1 + Math.random() * 2,
    });

    particlesRef.current = Array.from({ length: 80 }, create);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.shadowColor = '#00ff00';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#00ff00';
        ctx.fill();
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const q = particlesRef.current[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.strokeStyle = 'rgba(0,255,0,0.15)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = 260;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-white">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Contact</h2>
      <p className="mt-3 text-emerald-200/80">Open to collaborations, consulting, and full-time opportunities.</p>

      <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-x-6 top-6 h-[260px] w-[calc(100%-3rem)]" />
        <form className="relative z-10 grid gap-4 pt-52">
          <input type="text" placeholder="Your name" className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 outline-none ring-emerald-500/50 placeholder:text-white/40 focus:ring-2" />
          <input type="email" placeholder="Your email" className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 outline-none ring-emerald-500/50 placeholder:text-white/40 focus:ring-2" />
          <textarea placeholder="Your message" rows="4" className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 outline-none ring-emerald-500/50 placeholder:text-white/40 focus:ring-2" />
          <button type="submit" className="mt-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 font-medium text-emerald-300 shadow-[0_0_20px_rgba(0,255,0,0.35)] transition hover:scale-[1.02] hover:border-emerald-400 hover:text-emerald-200 hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
