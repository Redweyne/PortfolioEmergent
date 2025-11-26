import React, { useState } from 'react';
import { projects } from '../data/mock';
import { ExternalLink, ChevronRight, Cpu, Shield, Lock, AlertTriangle } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isClassified = project.isClassified;

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Background with Holographic Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        isClassified 
          ? 'from-[rgba(255,50,50,0.1)] to-transparent' 
          : 'from-[rgba(0,255,209,0.1)] to-transparent'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Scanline effect for classified */}
      {isClassified && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,50,50,0.1)_2px,rgba(255,50,50,0.1)_4px)]" />
        </div>
      )}
      
      <div className={`relative border ${
        isClassified 
          ? 'border-[rgba(255,50,50,0.3)]' 
          : 'border-[rgba(0,255,209,0.2)]'
      } bg-[rgba(0,0,0,0.5)] backdrop-blur-sm p-8 transition-all duration-500 ${
        isHovered 
          ? isClassified
            ? 'border-[rgba(255,50,50,0.6)] shadow-[0_0_30px_rgba(255,50,50,0.15)]'
            : 'border-[rgba(0,255,209,0.5)] shadow-[0_0_30px_rgba(0,255,209,0.15)]'
          : ''
      }`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            {/* Codename */}
            <p className={`font-mono text-xs tracking-widest mb-2 ${
              isClassified ? 'text-[rgba(255,50,50,0.6)]' : 'text-[rgba(0,255,209,0.6)]'
            }`}>
              {project.codename}
            </p>
            {/* Project Name */}
            <h3 className={`font-cyber text-2xl font-bold transition-colors duration-300 ${
              isClassified 
                ? 'text-[rgba(255,255,255,0.7)] group-hover:text-[#FF3232]' 
                : 'text-white group-hover:text-[#00FFD1]'
            }`}>
              {project.name}
            </h3>
          </div>
          {/* Status Badge */}
          <div className={`flex items-center gap-2 px-3 py-1 border ${
            isClassified 
              ? 'border-[rgba(255,50,50,0.4)] bg-[rgba(255,50,50,0.1)]' 
              : 'border-[rgba(0,255,209,0.3)] bg-[rgba(0,255,209,0.05)]'
          }`}>
            {isClassified ? (
              <Lock className="w-3 h-3 text-[#FF3232]" />
            ) : (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFD1] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FFD1]" />
              </span>
            )}
            <span className={`font-mono text-[10px] tracking-wider ${
              isClassified ? 'text-[#FF3232]' : 'text-[#00FFD1]'
            }`}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className={`font-mono text-sm leading-relaxed mb-6 ${
          isClassified ? 'text-[rgba(255,255,255,0.5)] italic' : 'text-[rgba(255,255,255,0.6)]'
        }`}>
          {project.description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <p className={`font-mono text-xs tracking-widest mb-3 ${
            isClassified ? 'text-[rgba(255,50,50,0.6)]' : 'text-[rgba(0,255,209,0.6)]'
          }`}>
            {isClassified ? '// INTEL_FRAGMENTS' : '// CORE_FEATURES'}
          </p>
          <ul className="space-y-2">
            {project.features.map((feature, i) => (
              <li key={i} className={`flex items-center gap-3 font-mono text-sm ${
                isClassified ? 'text-[rgba(255,255,255,0.5)]' : 'text-[rgba(255,255,255,0.7)]'
              }`}>
                {isClassified ? (
                  <AlertTriangle className="w-4 h-4 text-[#FF3232]" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-[#00FFD1]" />
                )}
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <p className={`font-mono text-xs tracking-widest mb-3 ${
            isClassified ? 'text-[rgba(255,50,50,0.6)]' : 'text-[rgba(0,255,209,0.6)]'
          }`}>
            {'// TECH_STACK'}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className={`px-3 py-1 font-mono text-xs tracking-wider border transition-colors duration-300 ${
                  isClassified
                    ? 'text-[#FF3232] border-[rgba(255,50,50,0.3)] bg-[rgba(255,50,50,0.05)] hover:bg-[rgba(255,50,50,0.1)]'
                    : 'text-[#00FFD1] border-[rgba(0,255,209,0.3)] bg-[rgba(0,255,209,0.05)] hover:bg-[rgba(0,255,209,0.1)]'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        {isClassified ? (
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[rgba(255,50,50,0.1)] text-[#FF3232] border border-[rgba(255,50,50,0.3)] font-mono text-sm font-medium tracking-wider cursor-not-allowed">
            <Lock className="w-4 h-4" />
            <span>ACCESS_DENIED</span>
          </div>
        ) : (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-[#00FFD1] text-black font-mono text-sm font-medium tracking-wider hover:bg-[rgba(0,255,209,0.1)] hover:text-[#00FFD1] transition-all duration-400 group/btn"
          >
            <span>ACCESS_PROJECT</span>
            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </a>
        )}

        {/* Corner Decorations */}
        <div className={`absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 ${
          isClassified ? 'border-[#FF3232]' : 'border-[#00FFD1]'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        <div className={`absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 ${
          isClassified ? 'border-[#FF3232]' : 'border-[#00FFD1]'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative py-32 cyber-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[rgba(0,255,209,0.02)] to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-[rgba(0,255,209,0.3)] bg-[rgba(0,255,209,0.05)] mb-6">
            <Cpu className="w-4 h-4 text-[#00FFD1]" />
            <span className="font-mono text-xs tracking-widest text-[rgba(255,255,255,0.7)]">
              DEPLOYED_SYSTEMS
            </span>
          </div>
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            FEATURED_<span className="text-[#00FFD1]">PROJECTS</span>
          </h2>
          <p className="font-mono text-sm text-[rgba(255,255,255,0.5)] max-w-2xl mx-auto">
            {'// A selection of systems that showcase expertise in building modern, user-centric applications'}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
