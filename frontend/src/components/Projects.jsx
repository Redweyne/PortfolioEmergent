import React, { useState } from 'react';
import { projects } from '../data/mock';
import { ExternalLink, ChevronRight, Cpu, Lock, AlertTriangle } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isClassified = project.isClassified;

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${
        isClassified 
          ? 'from-[rgba(255,50,50,0.1)] to-transparent' 
          : 'from-[rgba(0,255,209,0.1)] to-transparent'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {isClassified && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,50,50,0.1)_2px,rgba(255,50,50,0.1)_4px)]" />
        </div>
      )}
      
      <div className={`relative border ${
        isClassified 
          ? 'border-[rgba(255,50,50,0.3)]' 
          : 'border-[rgba(0,255,209,0.2)]'
      } bg-[rgba(0,0,0,0.5)] backdrop-blur-sm p-4 sm:p-6 lg:p-8 transition-all duration-500 ${
        isHovered 
          ? isClassified
            ? 'border-[rgba(255,50,50,0.6)] shadow-[0_0_30px_rgba(255,50,50,0.15)]'
            : 'border-[rgba(0,255,209,0.5)] shadow-[0_0_30px_rgba(0,255,209,0.15)]'
          : ''
      }`}>
        <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 gap-2 sm:gap-4">
          <div className="flex-1 min-w-0">
            <p className={`font-mono text-[10px] sm:text-xs tracking-widest mb-1 sm:mb-2 ${
              isClassified ? 'text-[rgba(255,50,50,0.6)]' : 'text-[rgba(0,255,209,0.6)]'
            }`}>
              {project.codename}
            </p>
            <h3 className={`font-cyber text-lg sm:text-xl lg:text-2xl font-bold transition-colors duration-300 break-words ${
              isClassified 
                ? 'text-[rgba(255,255,255,0.7)] group-hover:text-[#FF3232]' 
                : 'text-white group-hover:text-[#00FFD1]'
            }`}>
              {project.name}
            </h3>
          </div>
          <div className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 border flex-shrink-0 ${
            isClassified 
              ? 'border-[rgba(255,50,50,0.4)] bg-[rgba(255,50,50,0.1)]' 
              : 'border-[rgba(0,255,209,0.3)] bg-[rgba(0,255,209,0.05)]'
          }`}>
            {isClassified ? (
              <Lock className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#FF3232]" />
            ) : (
              <span className="relative flex h-1.5 sm:h-2 w-1.5 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFD1] opacity-75" />
                <span className="relative inline-flex rounded-full h-full w-full bg-[#00FFD1]" />
              </span>
            )}
            <span className={`font-mono text-[8px] sm:text-[10px] tracking-wider ${
              isClassified ? 'text-[#FF3232]' : 'text-[#00FFD1]'
            }`}>
              {project.status}
            </span>
          </div>
        </div>

        <p className={`font-mono text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 ${
          isClassified ? 'text-[rgba(255,255,255,0.5)] italic' : 'text-[rgba(255,255,255,0.6)]'
        }`}>
          {project.description}
        </p>

        <div className="mb-4 sm:mb-6">
          <p className={`font-mono text-[10px] sm:text-xs tracking-widest mb-2 sm:mb-3 ${
            isClassified ? 'text-[rgba(255,50,50,0.6)]' : 'text-[rgba(0,255,209,0.6)]'
          }`}>
            {isClassified ? '// INTEL_FRAGMENTS' : '// CORE_FEATURES'}
          </p>
          <ul className="space-y-1.5 sm:space-y-2">
            {project.features.map((feature, i) => (
              <li key={i} className={`flex items-start gap-2 sm:gap-3 font-mono text-[11px] sm:text-sm ${
                isClassified ? 'text-[rgba(255,255,255,0.5)]' : 'text-[rgba(255,255,255,0.7)]'
              }`}>
                {isClassified ? (
                  <AlertTriangle className="w-3 sm:w-4 h-3 sm:h-4 text-[#FF3232] flex-shrink-0 mt-0.5" />
                ) : (
                  <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 text-[#00FFD1] flex-shrink-0 mt-0.5" />
                )}
                <span className="break-words">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4 sm:mb-6">
          <p className={`font-mono text-[10px] sm:text-xs tracking-widest mb-2 sm:mb-3 ${
            isClassified ? 'text-[rgba(255,50,50,0.6)]' : 'text-[rgba(0,255,209,0.6)]'
          }`}>
            {'// TECH_STACK'}
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className={`px-2 sm:px-3 py-0.5 sm:py-1 font-mono text-[10px] sm:text-xs tracking-wider border transition-colors duration-300 ${
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

        {isClassified ? (
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-[rgba(255,50,50,0.1)] text-[#FF3232] border border-[rgba(255,50,50,0.3)] font-mono text-[10px] sm:text-sm font-medium tracking-wider cursor-not-allowed">
            <Lock className="w-3 sm:w-4 h-3 sm:h-4" />
            <span>ACCESS_DENIED</span>
          </div>
        ) : (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-[#00FFD1] text-black font-mono text-[10px] sm:text-sm font-medium tracking-wider hover:bg-[rgba(0,255,209,0.1)] hover:text-[#00FFD1] transition-all duration-400 group/btn"
          >
            <span>ACCESS_PROJECT</span>
            <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </a>
        )}

        <div className={`absolute top-0 left-0 w-3 sm:w-4 h-3 sm:h-4 border-l-2 border-t-2 ${
          isClassified ? 'border-[#FF3232]' : 'border-[#00FFD1]'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        <div className={`absolute bottom-0 right-0 w-3 sm:w-4 h-3 sm:h-4 border-r-2 border-b-2 ${
          isClassified ? 'border-[#FF3232]' : 'border-[#00FFD1]'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative py-16 sm:py-24 lg:py-32 cyber-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[rgba(0,255,209,0.02)] to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 border border-[rgba(0,255,209,0.3)] bg-[rgba(0,255,209,0.05)] mb-4 sm:mb-6">
            <Cpu className="w-3 sm:w-4 h-3 sm:h-4 text-[#00FFD1]" />
            <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[rgba(255,255,255,0.7)]">
              DEPLOYED_SYSTEMS
            </span>
          </div>
          <h2 className="font-cyber text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            FEATURED_<span className="text-[#00FFD1]">PROJECTS</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[rgba(255,255,255,0.5)] max-w-2xl mx-auto px-4">
            {'// A selection of systems that showcase expertise in building modern, user-centric applications'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
