import React, { useState, useEffect } from 'react';
import { skills } from '../data/mock';
import { Terminal, ChevronRight, Zap } from 'lucide-react';

const TerminalLine = ({ text, delay = 0, isCommand = false }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setShowCursor(false);
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <div className="font-mono text-sm">
      {isCommand && <span className="text-[#00FFD1]">$ </span>}
      <span className={isCommand ? 'text-white' : 'text-[rgba(255,255,255,0.7)]'}>
        {displayText}
      </span>
      {showCursor && <span className="animate-pulse text-[#00FFD1]">|</span>}
    </div>
  );
};

const SkillCategory = ({ category, data, index }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`group relative border border-[rgba(0,255,209,0.2)] bg-[rgba(0,0,0,0.5)] backdrop-blur-sm transition-all duration-500 ${
        isActive ? 'border-[rgba(0,255,209,0.5)] shadow-[0_0_20px_rgba(0,255,209,0.1)]' : ''
      }`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(0,255,209,0.2)] bg-[rgba(0,255,209,0.03)]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[rgba(255,255,255,0.2)]" />
          <span className="w-3 h-3 rounded-full bg-[rgba(255,255,255,0.2)]" />
          <span className="w-3 h-3 rounded-full bg-[#00FFD1]" />
        </div>
        <span className="font-mono text-xs tracking-wider text-[rgba(255,255,255,0.5)]">
          {data.title}.sys
        </span>
      </div>

      {/* Terminal Content */}
      <div className="p-6 space-y-3">
        <div className="font-mono text-xs text-[rgba(0,255,209,0.6)]">
          {'// initializing module...'}
        </div>
        {data.items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 group/item">
            <ChevronRight className="w-4 h-4 text-[#00FFD1] opacity-50 group-hover/item:opacity-100 transition-opacity" />
            <span className="font-mono text-sm text-[rgba(255,255,255,0.8)] group-hover/item:text-[#00FFD1] transition-colors duration-300">
              {item}
            </span>
          </div>
        ))}
        <div className="font-mono text-xs text-[#00FFD1] pt-2">
          {'> module loaded successfully_'}
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,255,209,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

const Skills = () => {
  const skillCategories = Object.entries(skills);

  return (
    <section id="skills" className="relative py-32 bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(0, 255, 209, 0.1) 0%, transparent 25%),
              radial-gradient(circle at 80% 50%, rgba(0, 255, 209, 0.05) 0%, transparent 25%)
            `
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-[rgba(0,255,209,0.3)] bg-[rgba(0,255,209,0.05)] mb-6">
            <Terminal className="w-4 h-4 text-[#00FFD1]" />
            <span className="font-mono text-xs tracking-widest text-[rgba(255,255,255,0.7)]">
              SYSTEM_CAPABILITIES
            </span>
          </div>
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            SKILLS_&_<span className="text-[#00FFD1]">EXPERTISE</span>
          </h2>
          <p className="font-mono text-sm text-[rgba(255,255,255,0.5)] max-w-2xl mx-auto">
            {'// A comprehensive toolkit for building modern, scalable web applications'}
          </p>
        </div>

        {/* Main Terminal Display */}
        <div className="mb-12 border border-[rgba(0,255,209,0.3)] bg-[rgba(0,0,0,0.8)] backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(0,255,209,0.2)] bg-[rgba(0,255,209,0.03)]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="font-mono text-xs tracking-wider text-[rgba(255,255,255,0.5)]">
                redweyne@system:~$
              </span>
            </div>
            <Zap className="w-4 h-4 text-[#00FFD1]" />
          </div>
          
          {/* Terminal Content */}
          <div className="p-6 space-y-2">
            <TerminalLine text="cat /sys/capabilities/summary.txt" isCommand delay={0} />
            <TerminalLine text="" delay={500} />
            <TerminalLine text="=== DIGITAL ARCHITECT SYSTEM REPORT ==="  delay={600} />
            <TerminalLine text="" delay={700} />
            <TerminalLine text="STATUS: All systems operational" delay={800} />
            <TerminalLine text="SPECIALIZATION: Full-Stack Development | AI Integration | System Architecture" delay={1000} />
            <TerminalLine text="EXPERIENCE: Building exceptional digital experiences" delay={1200} />
            <TerminalLine text="" delay={1400} />
            <TerminalLine text="Loading skill modules..." delay={1500} />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map(([key, data], index) => (
            <SkillCategory
              key={key}
              category={key}
              data={data}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
