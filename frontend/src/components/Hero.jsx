import React, { Suspense, lazy, Component, useState, useEffect } from 'react';
import GlitchText from './GlitchText';
import MobileOrbFallback from './MobileOrbFallback';
import { personalInfo, stats } from '../data/mock';
import { ArrowDown, ChevronRight } from 'lucide-react';

const Spline = lazy(() => import('@splinetool/react-spline'));

class SplineErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <MobileOrbFallback />;
    }
    return this.props.children;
  }
}

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [splineFailed, setSplineFailed] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024);
      
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleSplineError = () => {
    setSplineFailed(true);
  };

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderDesktopSpline = () => {
    if (!hasWebGL || splineFailed) {
      return <MobileOrbFallback />;
    }

    return (
      <SplineErrorBoundary>
        <Suspense fallback={<MobileOrbFallback />}>
          <Spline 
            scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode"
            onError={handleSplineError}
          />
        </Suspense>
      </SplineErrorBoundary>
    );
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden cyber-grid">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[rgba(0,255,209,0.05)]" />
      
      <div className="absolute top-20 sm:top-24 left-4 sm:left-8 w-12 sm:w-20 h-12 sm:h-20 border-l-2 border-t-2 border-[rgba(0,255,209,0.3)] opacity-50" />
      <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 w-12 sm:w-20 h-12 sm:h-20 border-r-2 border-b-2 border-[rgba(0,255,209,0.3)] opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-0">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-[85vh] lg:min-h-[80vh]">
          
          {/* Mobile orb - always use CSS fallback for clean look */}
          <div className="lg:hidden w-full flex justify-center mt-20 sm:mt-24 order-first">
            <div className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]">
              <div className="absolute -inset-8 bg-gradient-radial from-[rgba(0,255,209,0.15)] to-transparent blur-2xl opacity-50" />
              <div className="relative w-full h-full overflow-hidden rounded-full">
                <MobileOrbFallback />
              </div>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6 text-center lg:text-left order-2 lg:order-first">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 border border-[rgba(0,255,209,0.3)] bg-[rgba(0,255,209,0.05)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFD1] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FFD1]" />
              </span>
              <span className="font-mono text-[10px] sm:text-xs tracking-wider text-[rgba(255,255,255,0.7)]">
                SYSTEM_STATUS: <span className="text-[#00FFD1]">ONLINE</span>
              </span>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <p className="font-mono text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-[rgba(255,255,255,0.5)]">
                {'// DIGITAL_ARCHITECT'}
              </p>
              <h1 className="font-cyber text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-none">
                <GlitchText text={personalInfo.name} />
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-4 font-mono text-sm sm:text-base md:text-lg text-[rgba(255,255,255,0.85)]">
                <span className="text-[#00FFD1]">&gt;</span>
                <span className="terminal-cursor">{personalInfo.tagline}</span>
              </div>
            </div>

            <p className="font-mono text-xs sm:text-sm leading-relaxed text-[rgba(255,255,255,0.6)] max-w-lg mx-auto lg:mx-0 border-l-2 border-[rgba(0,255,209,0.3)] pl-3 sm:pl-4 text-left">
              {personalInfo.heroStatement}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2 justify-center lg:justify-start">
              <button
                onClick={scrollToProjects}
                className="group flex items-center justify-center gap-2 px-5 sm:px-8 py-3 sm:py-4 bg-[#00FFD1] text-black font-mono text-xs sm:text-sm font-medium tracking-wider hover:bg-[rgba(0,255,209,0.1)] hover:text-[#00FFD1] transition-all duration-400 w-full sm:w-auto"
              >
                <span>VIEW_PROJECTS</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center justify-center gap-2 px-5 sm:px-8 py-3 sm:py-4 bg-[rgba(255,255,255,0.05)] text-white border border-[rgba(0,255,209,0.3)] font-mono text-xs sm:text-sm tracking-wider hover:bg-white hover:text-black hover:border-white transition-all duration-400 w-full sm:w-auto"
              >
                <span>CONTACT_ME</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 pt-4 sm:pt-6 border-t border-[rgba(0,255,209,0.15)]">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-0.5 sm:space-y-1">
                  <p className="font-cyber text-lg sm:text-2xl md:text-3xl font-bold text-[#00FFD1]">
                    {stat.value}
                  </p>
                  <p className="font-mono text-[9px] sm:text-xs tracking-wider text-[rgba(255,255,255,0.5)]">
                    {stat.unit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Spline - unchanged */}
          <div className="relative hidden lg:block order-last">
            <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-[rgba(0,255,209,0.1)] to-transparent blur-3xl opacity-30" />
            <div className="relative w-full h-[700px] overflow-visible">
              {renderDesktopSpline()}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 w-full flex justify-center">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="font-mono text-[10px] sm:text-xs tracking-wider text-[rgba(255,255,255,0.4)]">
            SCROLL_DOWN
          </span>
          <ArrowDown className="w-4 sm:w-5 h-4 sm:h-5 text-[#00FFD1]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
