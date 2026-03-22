import React from 'react';

export default function OrbitalMap({ phaseAngle }) {
  // In this model, we'll imagine the Sun's light is coming from the right side of the screen.
  
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-900 rounded-xl border border-gray-800 shadow-xl w-full max-w-md">
      <h3 className="text-xl font-bold text-gray-300 mb-12 tracking-wide">TOP-DOWN ORBIT</h3>

      {/* The Space Canvas */}
      <div className="relative w-64 h-64 flex items-center justify-center">

        {/* Sun Direction Indicator */}
        <div className="absolute -right-16 text-yellow-500/50 font-bold tracking-widest flex flex-col items-center">
          <span className="text-3xl mb-1 animate-pulse">☀</span>
          <span className="text-xs">SUN RAYS</span>
        </div>

        {/* The Orbit Path (Dashed Circle) */}
        <div className="absolute w-56 h-56 border border-dashed border-gray-600 rounded-full opacity-50"></div>

        {/* The Earth (Center) */}
        <div className="absolute w-14 h-14 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.6)] z-10 border-2 border-blue-400 flex items-center justify-center">
            <div className="w-8 h-8 bg-green-500/40 rounded-full blur-[2px] absolute top-1 left-1"></div>
        </div>

        {/* The Rotating Moon Container */}
        <div
          className="absolute w-56 h-56 flex items-center justify-center transition-transform duration-1000 ease-in-out"
          style={{ transform: `rotate(${-phaseAngle}deg)` }} 
        >
          {/* The Moon */}
          <div className="absolute -right-3 w-6 h-6 bg-gray-200 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.9)] border border-gray-400">
             <div className="w-1/2 h-full bg-black/60 rounded-l-full absolute left-0"></div>
          </div>
        </div>

      </div>
      
      <div className="mt-12 text-xs text-gray-500 uppercase tracking-widest">
        Not to scale
      </div>
    </div>
  );
}