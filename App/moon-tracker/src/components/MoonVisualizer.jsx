import React from 'react';

export default function MoonVisualizer({ phaseAngle, isEclipse }) {
  // Determine the text name of the phase
  const getPhaseName = (angle) => {
    if (angle === 0 || angle === 360) return "New Moon";
    if (angle > 0 && angle < 90) return "Waxing Crescent";
    if (angle === 90) return "First Quarter";
    if (angle > 90 && angle < 180) return "Waxing Gibbous";
    if (angle === 180) return "Full Moon";
    if (angle > 180 && angle < 270) return "Waning Gibbous";
    if (angle === 270) return "Last Quarter";
    if (angle > 270 && angle < 360) return "Waning Crescent";
  };

  const glowColor = isEclipse 
    ? "drop-shadow(0 0 30px rgba(255, 69, 0, 0.8))" // Blood Moon for eclipse
    : "drop-shadow(0 0 20px rgba(255, 255, 255, 0.4))"; // Standard white glow

  return (
    <div className="flex flex-col items-center justify-center p-8 text-white">
      <h2 className="text-2xl font-bold mb-8 tracking-widest text-blue-100 uppercase">
        {getPhaseName(phaseAngle)}
      </h2>
      
      {/* The Moon Canvas */}
      <div 
        className="relative w-48 h-48 rounded-full bg-gray-200 overflow-hidden transition-all duration-1000 ease-in-out"
        style={{ filter: glowColor }}
      >
        {/* The Shadow Overlay */}
        <div 
          className="absolute top-0 w-full h-full bg-gray-950 transition-all duration-1000 ease-in-out"
          style={{
             left: `${(phaseAngle / 360) * 100}%`,
             borderRadius: phaseAngle > 180 ? '50% 0 0 50%' : '0 50% 50% 0'
          }}
        ></div>
      </div>

      {isEclipse && (
        <span className="mt-8 px-4 py-1 bg-red-900/50 border border-red-500 text-red-200 rounded-full animate-pulse font-semibold tracking-wide">
          LUNAR ECLIPSE IN PROGRESS
        </span>
      )}
    </div>
  );
}