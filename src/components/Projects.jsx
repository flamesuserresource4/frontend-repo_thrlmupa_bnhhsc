import React from 'react';

const projects = [
  {
    title: 'Neon Commerce',
    desc: 'A high-performance storefront with 3D product previews and cinematic transitions.',
    tags: ['React', 'Three.js', 'Stripe'],
    link: '#',
    code: `function NeonButton(){\n  return <button className=\"neon\">BUY</button>\n}`,
  },
  {
    title: 'Holo Dashboard',
    desc: 'Realtime analytics with parallax depth, holographic widgets, and smooth motion.',
    tags: ['Vite', 'WebSockets', 'Framer Motion'],
    link: '#',
    code: `const useFPS = ()=>{/* measure frames */};`,
  },
  {
    title: 'XR Portfolio',
    desc: 'An immersive developer portfolio with cursor-reactive 3D and matrix rain.',
    tags: ['Three.js', 'GSAP', 'Tailwind'],
    link: '#',
    code: `const Scene = () => <canvas id=\"webgl\" />;`,
  },
];

function ProjectCard({ p }) {
  return (
    <a
      href={p.link}
      className="group relative block h-64 w-full transform-gpu [perspective:1200px]"
    >
      <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 p-0.5 transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* front */}
        <div className="absolute inset-0 rounded-2xl bg-[#0d0f0d] p-5 [backface-visibility:hidden]">
          <h4 className="text-lg font-semibold text-white">{p.title}</h4>
          <p className="mt-2 line-clamp-3 text-sm text-emerald-200/80">{p.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="rounded border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
                {t}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-emerald-500/10 to-transparent" />
        </div>
        {/* back */}
        <div className="absolute inset-0 rounded-2xl bg-[#0a0a0a] p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <pre className="h-full overflow-auto rounded-lg border border-emerald-500/30 bg-black/60 p-4 text-emerald-300 shadow-[0_0_30px_rgba(0,255,0,0.35)]">
            <code>{p.code}</code>
          </pre>
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 mx-auto max-w-6xl px-6 py-24 text-white">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Projects</h2>
      <p className="mt-3 max-w-2xl text-emerald-200/80">
        Cinematic builds that merge art, code, and performance.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>

      {/* GitHub contribution graph */}
      <div className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-xl font-semibold text-emerald-300">GitHub Contributions</h3>
        <p className="mb-4 text-emerald-200/80">Activity heatmap for @shahzadakram786</p>
        <div className="overflow-auto rounded-lg border border-white/10 bg-black/40 p-4">
          <img
            src="https://ghchart.rshah.org/00ff00/shahzadakram786"
            alt="GitHub contributions chart"
            className="mx-auto block"
          />
        </div>
      </div>
    </section>
  );
}
