from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from skyfield.api import load, wgs84

# Initialize the API
app = FastAPI()

# Allow React (running on port 5173) to talk to Python (running on port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load NASA orbital data 
# Note: The very first time you run this, it will pause for a few seconds to download a 15MB file!
print("Loading NASA ephemeris data...")
eph = load('de421.bsp')
ts = load.timescale()
sun, moon, earth = eph['sun'], eph['moon'], eph['earth']

# Set the observer location to Noida, UP
observer = earth + wgs84.latlon(28.5355, 77.3910)

@app.get("/api/moon-data")
def get_moon_data():
    t = ts.now()
    
    # Observe the Sun and Moon from Earth
    astrometric_sun = earth.at(t).observe(sun).apparent()
    astrometric_moon = earth.at(t).observe(moon).apparent()
    
    # Get their ecliptic longitudes
    _, slon, _ = astrometric_sun.ecliptic_latlon()
    _, mlon, _ = astrometric_moon.ecliptic_latlon()
    
    # The phase angle is the difference between their longitudes
    phase_angle = (mlon.degrees - slon.degrees) % 360.0
    
    return {
        "phaseAngle": round(phase_angle, 2),
        "location": "Noida, Uttar Pradesh, India",
        "isEclipse": False 
    }