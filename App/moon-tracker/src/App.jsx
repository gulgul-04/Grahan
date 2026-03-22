import { useState, useEffect } from 'react';
import './App.css';
import MoonVisualizer from './components/MoonVisualizer';
import OrbitalMap from './components/OrbitalMap';

function App() {
  const [moonData, setMoonData] = useState({
    phaseAngle: 0, 
    location: "Noida, Uttar Pradesh, India", 
    isEclipse: false
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMoonData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/moon-data');
        const data = await response.json();
        
        // Merge the API data with our state
        setMoonData(prev => ({ ...prev, ...data }));
        setIsLoading(false);
      } catch (error) {
        console.error("Make sure your Python server is running!", error);
      }
    };

    fetchMoonData();
    const interval = setInterval(fetchMoonData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans p-8 flex flex-col items-center justify-center">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 drop-shadow-lg mb-2">
          LUNAR TRACKER
        </h1>
        <p className="text-blue-400 font-mono tracking-widest uppercase text-sm">
          Observer: {moonData.location}
        </p>
      </header>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64">
           <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
           <p className="text-xl text-blue-400 animate-pulse font-mono uppercase">Syncing with JPL Ephemeris...</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center w-full max-w-6xl">
          
          {/* Left Panel: Top-Down Orbit */}
          <OrbitalMap phaseAngle={moonData.phaseAngle} />

          {/* Right Panel: Earth's Perspective */}
          <div className="flex flex-col items-center bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-xl w-full max-w-md h-full justify-between">
             <h3 className="text-xl font-bold text-gray-300 mb-2 tracking-wide">OBSERVER VIEW</h3>
             <MoonVisualizer 
               phaseAngle={moonData.phaseAngle} 
               isEclipse={moonData.isEclipse} 
             />
             <div className="mt-8 text-blue-400 font-mono text-lg bg-gray-950 px-6 py-3 rounded-lg border border-blue-900/50 shadow-inner">
               Phase Angle: {moonData.phaseAngle}°
             </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;