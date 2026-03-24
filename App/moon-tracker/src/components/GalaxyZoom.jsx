import React, { useState, useEffect } from 'react';

export default function GalaxyZoom({ children }) {
  const [stage, setStage] = useState('entering'); 

  useEffect(() => {
    // 1. Wait 1 second so the user can see the galaxy
    const zoomTimer = setTimeout(() => setStage('zooming'), 1000);
    
    // 2. After 4 seconds of zooming, the animation is done
    const arriveTimer = setTimeout(() => setStage('arrived'), 5000);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(arriveTimer);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#030712]">
      
      {/* THE GALAXY LAYER */}
      <div
        className={`absolute inset-0 z-50 flex items-center justify-center transition-all ease-in origin-center
          ${stage === 'entering' ? 'opacity-100 scale-100 duration-0' : ''}
          ${stage === 'zooming' ? 'opacity-0 scale-[40] blur-md duration-[4000ms]' : ''}
          ${stage === 'arrived' ? 'hidden' : ''}
        `}
        style={{
          // A pure CSS glowing galaxy core
          backgroundImage: 'radial-gradient(ellipse at center, rgba(30, 58, 138, 0.4) 0%, rgba(3, 7, 18, 1) 60%)',
        }}
      >
        {/* Fake stars to give the zoom a sense of speed */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white]"></div>
        <div className="absolute top-3/4 left-2/3 w-2 h-2 bg-blue-200 rounded-full shadow-[0_0_10px_white] blur-[1px]"></div>
        <div className="absolute top-1/3 left-3/4 w-1 h-1 bg-yellow-100 rounded-full shadow-[0_0_8px_white]"></div>
        <div className="absolute top-2/3 left-1/5 w-1 h-1 bg-white rounded-full shadow-[0_0_4px_white]"></div>

        {/* The Title that fades out as we zoom past it */}
        <div className={`flex flex-col items-center transition-opacity duration-[2000ms] ${stage === 'zooming' ? 'opacity-0' : 'opacity-100'}`}>
          <h1 className="text-white text-sm tracking-[1em] font-light mb-2 opacity-70">MILKY WAY GALAXY</h1>
          <p className="text-blue-400 text-xs tracking-widest animate-pulse">LOCATING OBSERVER...</p>
        </div>
      </div>

      {/* THE DASHBOARD LAYER */}
      <div
        className={`w-full h-full transition-all duration-[3000ms] ease-out
          ${stage === 'entering' ? 'opacity-0 scale-95 blur-sm' : ''}
          ${stage === 'zooming' ? 'opacity-100 scale-100 blur-0 delay-[1000ms]' : ''}
          ${stage === 'arrived' ? 'opacity-100 scale-100 blur-0' : ''}
        `}
      >
        {children}
      </div>

    </div>
  );
}