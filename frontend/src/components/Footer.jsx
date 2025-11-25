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
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6 text-[#00FFD1]" />
              <span className="font-cyber text-xl tracking-wider text-white">
                {personalInfo.name}
              </span>
            </div>
            <p className="font-mono text-xs text-[rgba(255,255,255,0.5)] max-w-xs">
              {personalInfo.title} // Building exceptional digital experiences
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center">
            <nav className="flex flex-wrap gap-6 font-mono text-xs">
              {['Projects', 'Skills', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.querySelector(`#${item.toLowerCase()}`);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[rgba(255,255,255,0.5)] hover:text-[#00FFD1] transition-colors duration-300 uppercase tracking-wider"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex justify-end gap-4">
            {socialLinks.map((link, index) => {
              const Icon = getIcon(link.icon);
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-[rgba(0,255,209,0.2)] bg-[rgba(0,255,209,0.03)] hover:bg-[rgba(0,255,209,0.1)] hover:border-[rgba(0,255,209,0.5)] transition-all duration-300"
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5 text-[#00FFD1]" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[rgba(0,255,209,0.1)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="font-mono text-xs text-[rgba(255,255,255,0.4)]">
              <span className="text-[#00FFD1]">©</span> {currentYear} {personalInfo.name}. All systems operational.
            </div>

            {/* System Status */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFD1] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FFD1]" />
                </span>
                <span className="font-mono text-xs text-[rgba(255,255,255,0.4)]">
                  SYSTEM_ACTIVE
                </span>
              </div>
              
              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="p-2 border border-[rgba(0,255,209,0.2)] bg-[rgba(0,255,209,0.03)] hover:bg-[rgba(0,255,209,0.1)] hover:border-[rgba(0,255,209,0.5)] transition-all duration-300 group"
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4 text-[#00FFD1] group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Line at Very Bottom */}
      <div className="py-3 bg-[rgba(0,255,209,0.03)] border-t border-[rgba(0,255,209,0.1)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="font-mono text-[10px] text-[rgba(0,255,209,0.4)] text-center">
            {'> '} Designed & developed with <span className="text-[#00FFD1]">♥</span> by {personalInfo.name} {'// '} 
            <span className="text-[rgba(255,255,255,0.3)]">Powered by cutting-edge technology</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
