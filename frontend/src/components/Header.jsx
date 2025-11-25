import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { personalInfo } from '../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SYSTEMS', href: '#skills' },
    { name: 'ABOUT', href: '#about' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-[rgba(0,255,209,0.15)]' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative">
              <Terminal className="w-8 h-8 text-[#00FFD1] transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(0,255,209,0.8)]" />
            </div>
            <span className="font-cyber text-lg tracking-wider text-white group-hover:text-[#00FFD1] transition-colors duration-300">
              {personalInfo.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="font-mono text-sm tracking-wider text-[rgba(255,255,255,0.5)] hover:text-[#00FFD1] transition-all duration-300 relative group"
              >
                <span className="text-[#00FFD1] opacity-0 group-hover:opacity-100 transition-opacity duration-300">[</span>
                {link.name}
                <span className="text-[#00FFD1] opacity-0 group-hover:opacity-100 transition-opacity duration-300">]</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00FFD1] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <button
            onClick={() => scrollToSection('#contact')}
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-[#00FFD1] text-black font-mono text-sm font-medium tracking-wider hover:bg-[rgba(0,255,209,0.1)] hover:text-[#00FFD1] transition-all duration-400 group"
          >
            <span>INITIATE_CONTACT</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">_</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#00FFD1]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-[rgba(0,255,209,0.15)] transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="font-mono text-sm tracking-wider text-[rgba(255,255,255,0.7)] hover:text-[#00FFD1] transition-colors duration-300 text-left py-2"
            >
              {'> '}{link.name}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#contact')}
            className="mt-4 px-6 py-3 bg-[#00FFD1] text-black font-mono text-sm font-medium tracking-wider"
          >
            INITIATE_CONTACT
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
