import React from 'react';
import { personalInfo, stats } from '../data/mock';
import { User, Zap, Code2, Rocket } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="relative py-32 cyber-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[rgba(0,255,209,0.02)] to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual Element */}
          <div className="relative">
            {/* Main Container */}
            <div className="relative border border-[rgba(0,255,209,0.3)] bg-[rgba(0,0,0,0.5)] backdrop-blur-sm p-8">
              {/* ASCII Art Style Header */}
              <div className="font-mono text-xs text-[rgba(0,255,209,0.6)] mb-6 leading-relaxed">
                <pre className="overflow-hidden">
{`╔═══════════════════════════════════════╗
║         SYSTEM PROFILE v2.0           ║
║       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓          ║
║              REDWEYNE                 ║
║         DIGITAL ARCHITECT             ║
╚═══════════════════════════════════════╝`}
                </pre>
              </div>

              {/* Stats Display */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="border border-[rgba(0,255,209,0.2)] bg-[rgba(0,255,209,0.03)] p-4 hover:border-[rgba(0,255,209,0.5)] transition-all duration-300 group"
                  >
                    <p className="font-cyber text-3xl font-bold text-[#00FFD1] group-hover:drop-shadow-[0_0_10px_rgba(0,255,209,0.5)] transition-all duration-300">
                      {stat.value}
                    </p>
                    <p className="font-mono text-xs tracking-wider text-[rgba(255,255,255,0.5)] mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#00FFD1]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#00FFD1]" />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-[rgba(0,255,209,0.2)] bg-[rgba(0,0,0,0.8)] flex items-center justify-center" style={{ animation: 'float 4s ease-in-out infinite' }}>
              <Code2 className="w-10 h-10 text-[#00FFD1]" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 border border-[rgba(0,255,209,0.2)] bg-[rgba(0,0,0,0.8)] flex items-center justify-center" style={{ animation: 'float 5s ease-in-out infinite 0.5s' }}>
              <Rocket className="w-8 h-8 text-[#00FFD1]" />
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            {/* Section Label */}
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-[rgba(0,255,209,0.3)] bg-[rgba(0,255,209,0.05)]">
              <User className="w-4 h-4 text-[#00FFD1]" />
              <span className="font-mono text-xs tracking-widest text-[rgba(255,255,255,0.7)]">
                ABOUT_SYSTEM
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white">
              WHO_IS_<span className="text-[#00FFD1]">REDWEYNE</span>?
            </h2>

            {/* Content */}
            <div className="space-y-6">
              <p className="font-mono text-base leading-relaxed text-[rgba(255,255,255,0.7)]">
                {personalInfo.bio}
              </p>
              <p className="font-mono text-base leading-relaxed text-[rgba(255,255,255,0.7)]">
                {personalInfo.philosophy}
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-4 pt-4 border-t border-[rgba(0,255,209,0.15)]">
              <div className="font-mono text-xs text-[rgba(0,255,209,0.6)]">
                {'// CORE_PRINCIPLES'}
              </div>
              {[
                'Understand the core problem',
                'Eliminate unnecessary complexity',
                'Deliver results that speak louder than promises'
              ].map((principle, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-[#00FFD1]" />
                  <span className="font-mono text-sm text-[rgba(255,255,255,0.8)]">
                    {principle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
