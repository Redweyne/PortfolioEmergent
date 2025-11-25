import React from 'react';

const GlitchText = ({ text, className = '' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main text */}
      <span className="relative z-10">{text}</span>
      
      {/* Glitch layers */}
      <span 
        className="absolute top-0 left-0 w-full h-full text-[#ff00ff] opacity-70"
        style={{
          animation: 'glitch 2s infinite linear alternate-reverse',
          clipPath: 'inset(40% 0 61% 0)'
        }}
        aria-hidden="true"
      >
        {text}
      </span>
      <span 
        className="absolute top-0 left-0 w-full h-full text-[#00ffff] opacity-70"
        style={{
          animation: 'glitch2 3s infinite linear alternate-reverse',
          clipPath: 'inset(10% 0 85% 0)'
        }}
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  );
};

export default GlitchText;
