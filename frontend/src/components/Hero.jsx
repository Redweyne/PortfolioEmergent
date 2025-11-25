import React, { Suspense, lazy } from 'react';
import GlitchText from './GlitchText';
import { personalInfo, stats } from '../data/mock';
import { ArrowDown, ChevronRight } from 'lucide-react';

// Lazy load Spline for better performance
const Spline = lazy(() => import('@splinetool/react-spline'));

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden cyber-grid">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[rgba(0,255,209,0.05)]" />
      
      {/* Animated Corner Brackets */}
      <div className="absolute top-24 left-8 w-20 h-20 border-l-2 border-t-2 border-[rgba(0,255,209,0.3)] opacity-50" />
      <div className="absolute bottom-24 right-8 w-20 h-20 border-r-2 border-b-2 border-[rgba(0,255,209,0.3)] opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Status Indicator */}
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-[rgba(0,255,209,0.3)] bg-[rgba(0,255,209,0.05)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFD1] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FFD1]" />
              </span>
              <span className="font-mono text-xs tracking-wider text-[rgba(255,255,255,0.7)]">
                SYSTEM_STATUS: <span className="text-[#00FFD1]">ONLINE</span>
              </span>
            </div>

            {/* Main Headline with Glitch */}
            <div className="space-y-4">
              <p className="font-mono text-sm tracking-[0.3em] text-[rgba(255,255,255,0.5)]">
                {'// DIGITAL_ARCHITECT'}
              </p>
              <h1 className="font-cyber text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white">
                <GlitchText text={personalInfo.name} />
              </h1>
              <div className="flex items-center gap-4 font-mono text-lg text-[rgba(255,255,255,0.85)]">
                <span className="text-[#00FFD1]">&gt;</span>
                <span className="terminal-cursor">{personalInfo.tagline}</span>
              </div>
            </div>

            {/* Description */}
            <p className="font-mono text-base leading-relaxed text-[rgba(255,255,255,0.6)] max-w-lg border-l-2 border-[rgba(0,255,209,0.3)] pl-4">
              {personalInfo.bio.slice(0, 200)}...
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={scrollToProjects}
                className="group flex items-center gap-3 px-8 py-4 bg-[#00FFD1] text-black font-mono text-sm font-medium tracking-wider hover:bg-[rgba(0,255,209,0.1)] hover:text-[#00FFD1] transition-all duration-400"
              >
                <span>VIEW_PROJECTS</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-3 px-8 py-4 bg-[rgba(255,255,255,0.05)] text-white border border-[rgba(0,255,209,0.3)] font-mono text-sm tracking-wider hover:bg-white hover:text-black hover:border-white transition-all duration-400"
              >
                <span>CONTACT_ME</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[rgba(0,255,209,0.15)]">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <p className="font-cyber text-2xl md:text-3xl font-bold text-[#00FFD1]">
                    {stat.value}
                  </p>
                  <p className="font-mono text-xs tracking-wider text-[rgba(255,255,255,0.5)]">
                    {stat.unit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - 3D Spline */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-[rgba(0,255,209,0.1)] to-transparent blur-3xl opacity-30" />
            <div className="relative w-full h-[700px] overflow-visible">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="font-mono text-[#00FFD1] animate-pulse">LOADING_3D_INTERFACE...</div>
                </div>
              }>
                <Spline scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode" />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-mono text-xs tracking-wider text-[rgba(255,255,255,0.4)]">
          SCROLL_DOWN
        </span>
        <ArrowDown className="w-5 h-5 text-[#00FFD1]" />
      </div>
    </section>
  );
};

export default Hero;
