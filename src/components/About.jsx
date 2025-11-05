import React, { useEffect } from 'react';

const skills = [
  { name: 'JavaScript / TypeScript', level: 92 },
  { name: 'React / Vite / Next.js', level: 90 },
  { name: 'Three.js / WebGL', level: 85 },
  { name: 'GSAP / Framer Motion', level: 88 },
  { name: 'Node.js / FastAPI', level: 82 },
  { name: 'MongoDB / Postgres', level: 80 },
];

export default function About() {
  useEffect(() => {
    // animate bars on mount
    const timers = [];
    document.querySelectorAll('[data-skill]')?.forEach((el, i) => {
      const level = Number(el.getAttribute('data-skill'));
      timers.push(
        setTimeout(() => {
          el.style.width = level + '%';
        }, 150 + i * 120)
      );
    });
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-24 text-white">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">About</h2>
        <p className="mt-3 max-w-2xl text-emerald-200/80">
          I craft interactive, cinematic web experiences with a focus on performance, accessibility,
          and precision engineering. My style blends cyberpunk aesthetics with refined UX.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-xl font-semibold text-emerald-300">Skills</h3>
          <div className="space-y-4">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-white/90">{s.name}</span>
                  <span className="text-emerald-300">{s.level}%</span>
                </div>
                <div className="h-2 w-full rounded bg-white/10">
                  <div
                    data-skill={s.level}
                    className="h-2 w-0 rounded bg-emerald-500 shadow-[0_0_20px_rgba(0,255,0,0.45)] transition-[width] duration-700 ease-out"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold text-emerald-300">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {[ 'React', 'Three.js', 'GSAP', 'Framer Motion', 'FastAPI', 'Node.js', 'MongoDB', 'Tailwind' ].map((t) => (
              <span
                key={t}
                className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-emerald-200 shadow-[0_0_16px_rgba(0,255,0,0.35)]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <pre className="overflow-x-auto text-sm leading-relaxed text-emerald-200">
{`// Interactive snippet
const neon = (text) => ` + "`" + `${'`'}` + `\x1b[38;2;0;255;0m${text}\x1b[0m` + "`" + `;
console.log(neon('Hello, world!'));
`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
