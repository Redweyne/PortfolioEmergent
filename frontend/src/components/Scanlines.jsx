import React from 'react';

const Scanlines = () => {
  return (
    <>
      {/* Static scanlines overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 209, 0.1) 2px, rgba(0, 255, 209, 0.1) 4px)',
        }}
      />
      
      {/* Moving scanline */}
      <div 
        className="fixed left-0 right-0 h-[2px] pointer-events-none z-50"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 255, 209, 0.15), transparent)',
          animation: 'scanline 8s linear infinite',
        }}
      />
    </>
  );
};

export default Scanlines;
