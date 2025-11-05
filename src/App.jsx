import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen w-full scroll-smooth bg-[#0a0a0a] text-white">
      {/* Top nav */}
      <header className="fixed inset-x-0 top-0 z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#hero" className="text-sm font-semibold tracking-widest text-emerald-400 drop-shadow-[0_0_18px_rgba(0,255,0,0.45)]">
          SHAHZAD.AKRAM
        </a>
        <nav className="hidden gap-6 text-sm md:flex">
          <a href="#about" className="text-white/80 transition hover:text-emerald-300">About</a>
          <a href="#projects" className="text-white/80 transition hover:text-emerald-300">Projects</a>
          <a href="#contact" className="text-white/80 transition hover:text-emerald-300">Contact</a>
        </nav>
      </header>

      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      <footer className="relative z-10 mx-auto max-w-7xl px-6 py-10 text-center text-sm text-emerald-200/70">
        © {new Date().getFullYear()} Shahzad Akram — Built with love, neon, and 3D.
      </footer>
    </div>
  );
}

export default App;
