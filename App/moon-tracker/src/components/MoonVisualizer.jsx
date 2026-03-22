import React from 'react';

export default function MoonVisualizer({ phaseAngle, isEclipse }) {
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
    ? "drop-shadow(0 0 30px rgba(255, 69, 0, 0.8))"
    : "drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))";

  // Calculate the curved shadow offset based on the angle
  // This creates a much more realistic 3D sphere effect
  const calculateShadow = (angle) => {
    // Normalize angle to 0-100 range for the shadow shift
    let shift;
    if (angle <= 180) {
      shift = -100 + (angle / 180) * 100;
      return `inset ${shift}px 0px 0px 10px #030712`; // Dark shadow on left
    } else {
      shift = 100 - ((angle - 180) / 180) * 100;
      return `inset ${shift}px 0px 0px 10px #030712`; // Dark shadow on right
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-white">
      <h2 className="text-2xl font-bold mb-10 tracking-widest text-blue-100 uppercase">
        {getPhaseName(phaseAngle)}
      </h2>
      
      {/* The 3D Moon Canvas */}
      <div 
        className="relative w-48 h-48 rounded-full bg-gray-200 transition-all duration-1000 ease-in-out border border-gray-600"
        style={{ 
          filter: glowColor,
          boxShadow: calculateShadow(phaseAngle)
        }}
      >
        {/* Adds a slight crater texture overlay */}
        <div className="absolute inset-0 rounded-full opacity-10 bg-[radial-gradient(circle_at_30%_30%,_transparent_0%,_#000_100%)]"></div>
      </div>

      {isEclipse && (
        <span className="mt-10 px-4 py-1 bg-red-900/50 border border-red-500 text-red-200 rounded-full animate-pulse font-semibold tracking-wide text-sm">
          LUNAR ECLIPSE IN PROGRESS
        </span>
      )}
    </div>
  );
}