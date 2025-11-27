import React from 'react';

const particlePositions = [
  { top: '20%', left: '30%', opacity: 0.6, delay: 0 },
  { top: '35%', left: '65%', opacity: 0.5, delay: 0.5 },
  { top: '60%', left: '25%', opacity: 0.4, delay: 1 },
  { top: '75%', left: '60%', opacity: 0.5, delay: 1.5 },
];

const MobileOrbFallback = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* Main orb glow */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(0,255,209,0.5) 0%, rgba(0,255,209,0.15) 40%, transparent 70%)',
            boxShadow: '0 0 40px rgba(0,255,209,0.4), inset 0 0 40px rgba(0,255,209,0.15)',
            animation: 'orbPulse 4s ease-in-out infinite'
          }}
        />
        
        {/* Inner glow layer */}
        <div 
          className="absolute inset-[15%] rounded-full"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(0,255,209,0.4) 0%, transparent 60%)',
            boxShadow: 'inset 0 0 30px rgba(0,255,209,0.25)',
            animation: 'orbRotate 8s linear infinite'
          }}
        />
        
        {/* Core highlight */}
        <div 
          className="absolute inset-[30%] rounded-full"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(0,255,209,0.6) 0%, rgba(0,255,209,0.25) 30%, transparent 60%)',
            boxShadow: '0 0 20px rgba(0,255,209,0.5)',
            animation: 'orbPulse 3s ease-in-out infinite reverse'
          }}
        />
        
        {/* Outer rotating ring */}
        <div 
          className="absolute inset-0 rounded-full border border-[rgba(0,255,209,0.4)]"
          style={{ animation: 'orbRotate 12s linear infinite' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00FFD1]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full bg-[rgba(0,255,209,0.7)]" />
        </div>
        
        {/* Inner rotating ring */}
        <div 
          className="absolute inset-[12%] rounded-full border border-[rgba(0,255,209,0.2)]"
          style={{ animation: 'orbRotate 15s linear infinite reverse' }}
        >
          <div className="absolute top-1/4 right-0 translate-x-1/2 w-1 h-1 rounded-full bg-[#00FFD1]" />
        </div>
        
        {/* Floating particles */}
        {particlePositions.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#00FFD1]"
            style={{
              top: particle.top,
              left: particle.left,
              opacity: particle.opacity,
              animation: `particleFloat ${3 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileOrbFallback;
