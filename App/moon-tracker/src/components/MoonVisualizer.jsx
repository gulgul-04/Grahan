import React from 'react';

export default function MoonVisualizer({ phaseAngle }) {
  // 1. Determine the name based on the angle
  const getPhaseName = (angle) => {
    if (angle === 0 || angle === 360) return "New Moon";
    if (angle > 0 && angle < 90) return "Waxing Crescent";
    if (angle === 90) return "First Quarter";
    if (angle > 90 && angle < 180) return "Waxing Gibbous";
    if (angle === 180) return "Full Moon";
    if (angle > 180 && angle < 270) return "Waning Gibbous";
    if (angle === 270) return "Last Quarter";
    if (angle > 270 && angle < 360) return "Waning Crescent";
    return "New Moon";
  };

  // 2. SVG Path Logic: This creates the "Spherical" curve
  const calculateMoonPath = (angle) => {
    const isWaxing = angle <= 180;
    
    // Normalize illumination (0 to 1)
    const illumination = isWaxing ? (angle / 180) : (2 - angle / 180);
    
    // Calculate the 'bending' of the middle curve (from 50 to -50)
    const midCurveX = 50 - (illumination * 100);

    // SVG Sweep Flags (determines if the curve bulges in or out)
    const sweep1 = isWaxing ? 0 : 1;
    const sweep2 = illumination > 0.5 ? sweep1 : 1 - sweep1;

    // The Path: 
    // M 50 0: Start at top center
    // A 50 50: Draw outer circle edge to bottom center
    // A Math.abs(midCurveX) 50: Draw the "terminator" line back to top
    return `M 50 0 A 50 50 0 1 ${sweep1} 50 100 A ${Math.max(1, Math.abs(midCurveX))} 50 0 1 ${sweep2} 50 0`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-white">
      <h2 className="text-2xl font-bold mb-10 tracking-widest text-blue-100 uppercase">
        {getPhaseName(phaseAngle)}
      </h2>
      
      {/* 3. The SVG Viewport */}
      <div className="relative w-48 h-48 drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {/* Background: Dark Moon */}
          <circle cx="50" cy="50" r="50" fill="#030712" />
          
          {/* Foreground: Lit Part (Calculated Curve) */}
          <path 
            d={calculateMoonPath(phaseAngle)} 
            fill="#e5e7eb"
            className="transition-all duration-1000 ease-in-out"
          />

          {/* Texture Overlay */}
          <circle cx="50" cy="50" r="50" fill="url(#moonGradient)" opacity="0.15" />
          
          <defs>
            <radialGradient id="moonGradient">
              <stop offset="60%" stopColor="transparent" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="mt-10 px-6 py-2 bg-blue-900/20 border border-blue-500/30 rounded-xl">
        <span className="text-blue-400 font-mono">Phase Angle: {phaseAngle}°</span>
      </div>
    </div>
  );
}