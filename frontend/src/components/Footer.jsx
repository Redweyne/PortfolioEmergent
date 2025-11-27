import React from 'react';
import { personalInfo, socialLinks } from '../data/mock';
import { Github, Linkedin, Mail, Terminal, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Github': return Github;
      case 'Linkedin': return Linkedin;
      case 'Mail': return Mail;
      default: return Mail;
    }
  };

  return (
    <footer className="relative bg-black border-t border-[rgba(0,255,209,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 items-center">
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
              <Terminal className="w-5 sm:w-6 h-5 sm:h-6 text-[#00FFD1]" />
              <span className="font-cyber text-lg sm:text-xl tracking-wider text-white">
                {personalInfo.name}
              </span>
            </div>
            <p className="font-mono text-[10px] sm:text-xs text-[rgba(255,255,255,0.5)] max-w-xs mx-auto sm:mx-0">
              {personalInfo.title} // Building exceptional digital experiences
            </p>
          </div>

          <div className="flex justify-center order-last sm:order-none lg:order-none">
            <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs">
              {['Projects', 'Skills', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.querySelector(`#${item.toLowerCase()}`);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[rgba(255,255,255,0.5)] hover:text-[#00FFD1] transition-colors duration-300 uppercase tracking-wider py-1"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex justify-center sm:justify-end gap-3 sm:gap-4">
            {socialLinks.map((link, index) => {
              const Icon = getIcon(link.icon);
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 border border-[rgba(0,255,209,0.2)] bg-[rgba(0,255,209,0.03)] hover:bg-[rgba(0,255,209,0.1)] hover:border-[rgba(0,255,209,0.5)] transition-all duration-300"
                  aria-label={link.name}
                >
                  <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-[#00FFD1]" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-[rgba(0,255,209,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="font-mono text-[10px] sm:text-xs text-[rgba(255,255,255,0.4)] text-center sm:text-left">
              <span className="text-[#00FFD1]">©</span> {currentYear} {personalInfo.name}. All systems operational.
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="relative flex h-1.5 sm:h-2 w-1.5 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFD1] opacity-75" />
                  <span className="relative inline-flex rounded-full h-full w-full bg-[#00FFD1]" />
                </span>
                <span className="font-mono text-[10px] sm:text-xs text-[rgba(255,255,255,0.4)]">
                  SYSTEM_ACTIVE
                </span>
              </div>
              
              <button
                onClick={scrollToTop}
                className="p-1.5 sm:p-2 border border-[rgba(0,255,209,0.2)] bg-[rgba(0,255,209,0.03)] hover:bg-[rgba(0,255,209,0.1)] hover:border-[rgba(0,255,209,0.5)] transition-all duration-300 group"
                aria-label="Back to top"
              >
                <ArrowUp className="w-3 sm:w-4 h-3 sm:h-4 text-[#00FFD1] group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-2 sm:py-3 bg-[rgba(0,255,209,0.03)] border-t border-[rgba(0,255,209,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-[8px] sm:text-[10px] text-[rgba(0,255,209,0.4)] text-center">
            {'> '} Designed & developed with <span className="text-[#00FFD1]">♥</span> by {personalInfo.name} {'// '} 
            <span className="text-[rgba(255,255,255,0.3)]">Powered by cutting-edge technology</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
