import React from 'react';

const particlePositions = [
  { top: '25%', left: '35%', opacity: 0.5, delay: 0 },
  { top: '40%', left: '60%', opacity: 0.7, delay: 0.5 },
  { top: '55%', left: '30%', opacity: 0.4, delay: 1 },
  { top: '70%', left: '55%', opacity: 0.6, delay: 1.5 },
  { top: '35%', left: '45%', opacity: 0.5, delay: 2 },
  { top: '60%', left: '40%', opacity: 0.3, delay: 2.5 },
];

const MobileOrbFallback = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,255,209,0.05)] to-transparent" />
      
      <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px]">
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(0,255,209,0.4) 0%, rgba(0,255,209,0.1) 40%, transparent 70%)',
            boxShadow: '0 0 60px rgba(0,255,209,0.3), inset 0 0 60px rgba(0,255,209,0.1)',
            animation: 'orbPulse 4s ease-in-out infinite'
          }}
        />
        
        <div 
          className="absolute inset-[15%] rounded-full"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(0,255,209,0.3) 0%, transparent 60%)',
            boxShadow: 'inset 0 0 40px rgba(0,255,209,0.2)',
            animation: 'orbRotate 8s linear infinite'
          }}
        />
        
        <div 
          className="absolute inset-[30%] rounded-full"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(0,255,209,0.5) 0%, rgba(0,255,209,0.2) 30%, transparent 60%)',
            boxShadow: '0 0 30px rgba(0,255,209,0.4)',
            animation: 'orbPulse 3s ease-in-out infinite reverse'
          }}
        />
        
        <div 
          className="absolute inset-0 rounded-full border border-[rgba(0,255,209,0.3)]"
          style={{ animation: 'orbRotate 12s linear infinite' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00FFD1]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[rgba(0,255,209,0.6)]" />
        </div>
        
        <div 
          className="absolute inset-[10%] rounded-full border border-[rgba(0,255,209,0.15)]"
          style={{ animation: 'orbRotate 15s linear infinite reverse' }}
        >
          <div className="absolute top-1/4 right-0 translate-x-1/2 w-1 h-1 rounded-full bg-[#00FFD1]" />
        </div>
        
        <div 
          className="absolute -inset-8 rounded-full"
          style={{
            background: 'radial-gradient(circle, transparent 50%, rgba(0,255,209,0.05) 70%, transparent 100%)',
            animation: 'orbGlow 5s ease-in-out infinite'
          }}
        />
        
        {particlePositions.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#00FFD1]"
            style={{
              top: particle.top,
              left: particle.left,
              opacity: particle.opacity,
              animation: `particleFloat ${3 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <div className="font-mono text-xs text-[rgba(0,255,209,0.6)] tracking-widest">DIGITAL_ORB</div>
        <div className="font-mono text-[10px] text-[rgba(255,255,255,0.3)] mt-1">INTERACTIVE_MODE</div>
      </div>
    </div>
  );
};

export default MobileOrbFallback;
