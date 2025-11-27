import React from 'react';
import { personalInfo, stats } from '../data/mock';
import { User, Zap, Code2, Rocket } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="relative py-16 sm:py-24 lg:py-32 cyber-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[rgba(0,255,209,0.02)] to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative border border-[rgba(0,255,209,0.3)] bg-[rgba(0,0,0,0.5)] backdrop-blur-sm p-4 sm:p-6 lg:p-8">
              <div className="font-mono text-[8px] sm:text-[10px] lg:text-xs text-[rgba(0,255,209,0.6)] mb-4 sm:mb-6 leading-relaxed overflow-x-auto">
                <pre className="hidden sm:block">
{`╔═══════════════════════════════════════╗
║         SYSTEM PROFILE v2.0           ║
║       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓          ║
║              REDWEYNE                 ║
║         DIGITAL ARCHITECT             ║
╚═══════════════════════════════════════╝`}
                </pre>
                <pre className="sm:hidden">
{`╔═════════════════════╗
║  SYSTEM PROFILE 2.0 ║
║     ▓▓▓▓▓▓▓▓▓▓▓     ║
║      REDWEYNE       ║
║  DIGITAL ARCHITECT  ║
╚═════════════════════╝`}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="border border-[rgba(0,255,209,0.2)] bg-[rgba(0,255,209,0.03)] p-3 sm:p-4 hover:border-[rgba(0,255,209,0.5)] transition-all duration-300 group"
                  >
                    <p className="font-cyber text-xl sm:text-2xl lg:text-3xl font-bold text-[#00FFD1] group-hover:drop-shadow-[0_0_10px_rgba(0,255,209,0.5)] transition-all duration-300">
                      {stat.value}
                    </p>
                    <p className="font-mono text-[10px] sm:text-xs tracking-wider text-[rgba(255,255,255,0.5)] mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="absolute top-0 left-0 w-6 sm:w-8 h-6 sm:h-8 border-l-2 border-t-2 border-[#00FFD1]" />
              <div className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-r-2 border-b-2 border-[#00FFD1]" />
            </div>

            <div className="hidden sm:flex absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 border border-[rgba(0,255,209,0.2)] bg-[rgba(0,0,0,0.8)] items-center justify-center" style={{ animation: 'float 4s ease-in-out infinite' }}>
              <Code2 className="w-7 sm:w-8 lg:w-10 h-7 sm:h-8 lg:h-10 text-[#00FFD1]" />
            </div>
            <div className="hidden sm:flex absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 w-14 sm:w-16 lg:w-20 h-14 sm:h-16 lg:h-20 border border-[rgba(0,255,209,0.2)] bg-[rgba(0,0,0,0.8)] items-center justify-center" style={{ animation: 'float 5s ease-in-out infinite 0.5s' }}>
              <Rocket className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-[#00FFD1]" />
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 border border-[rgba(0,255,209,0.3)] bg-[rgba(0,255,209,0.05)]">
              <User className="w-3 sm:w-4 h-3 sm:h-4 text-[#00FFD1]" />
              <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[rgba(255,255,255,0.7)]">
                ABOUT_SYSTEM
              </span>
            </div>

            <h2 className="font-cyber text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              WHO_IS_<span className="text-[#00FFD1]">REDWEYNE</span>?
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <p className="font-mono text-sm sm:text-base leading-relaxed text-[rgba(255,255,255,0.7)]">
                {personalInfo.bio}
              </p>
              <p className="font-mono text-sm sm:text-base leading-relaxed text-[rgba(255,255,255,0.7)]">
                {personalInfo.philosophy}
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 pt-4 border-t border-[rgba(0,255,209,0.15)]">
              <div className="font-mono text-[10px] sm:text-xs text-[rgba(0,255,209,0.6)]">
                {'// CORE_PRINCIPLES'}
              </div>
              {[
                'Understand the core problem',
                'Eliminate unnecessary complexity',
                'Deliver results that speak louder than promises'
              ].map((principle, index) => (
                <div key={index} className="flex items-start sm:items-center gap-2 sm:gap-3">
                  <Zap className="w-3 sm:w-4 h-3 sm:h-4 text-[#00FFD1] mt-0.5 sm:mt-0 flex-shrink-0" />
                  <span className="font-mono text-xs sm:text-sm text-[rgba(255,255,255,0.8)]">
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
