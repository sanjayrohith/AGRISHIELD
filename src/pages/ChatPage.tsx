import { useState, useEffect } from "react";
import { Header } from "../components/layout/Header";
import { ChatWindow } from "../components/chat/ChatWindow";
import { WeatherWidget } from "../components/dashboard/WeatherWidget";
import heroImage from "../assets/hero-farm.jpg"; // Corrected path assumption

interface ChatPageProps {
  readonly onBackToHome: () => void;
  readonly onDashboardClick: () => void;
  readonly userData?: any;
}

export function ChatPage({ onBackToHome, onDashboardClick, userData }: ChatPageProps) {
  // --- Logic for fetching location and weather ---
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setWeatherError("Geolocation is not supported by your browser.");
      setIsLoadingWeather(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation = { lat: latitude, lon: longitude };
        setLocation(currentLocation);

        const fetchWeatherData = async () => {
          const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;
          const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=5&alerts=yes`;
          
          try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Could not fetch weather data.");
            const data = await response.json();
            setWeatherData(data); 
          } catch (err: any) {
            setWeatherError(err.message);
          } finally {
            setIsLoadingWeather(false);
          }
        };

        fetchWeatherData();
      },
      () => {
        setWeatherError("Location access denied.");
        setIsLoadingWeather(false);
      }
    );
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Farm Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)'
        }}
      />
      <div className="absolute inset-0 bg-green-900/20 z-10" />
      
      <div className="relative z-20">
        <Header 
          onChatClick={() => {}}
          onDashboardClick={onDashboardClick}
          onWeatherClick={() => {}}
        />
        
        <main className="container py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Quick Actions */}
          <div className="lg:col-span-1 space-y-4">
            <div className="sticky top-24">
              <div className="glass-card bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl">
                <h2 className="text-lg font-semibold mb-4 text-white">Quick Actions</h2>
                <div className="space-y-2">
                  <button 
                    className="w-full text-left p-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-md text-white"
                    onClick={onBackToHome}
                  >
                    <span className="text-sm font-medium">🏠 Back to Home</span>
                  </button>
                  {/* Other buttons remain the same */}
                  <button className="w-full text-left p-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-md text-white">
                    <span className="text-sm font-medium">🌾 My Crops</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-md text-white">
                    <span className="text-sm font-medium">📅 Planting Calendar</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-md text-white">
                    <span className="text-sm font-medium">💰 Market Prices</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-md text-white">
                    <span className="text-sm font-medium">📚 Farming Tips</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <div className="glass-card bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-2xl mb-4">
              <h1 className="text-2xl font-bold font-display text-white">AI Farming Assistant</h1>
              <p className="text-white/90">
                Get expert advice on flood-resistant crops, weather patterns, and farming strategies.
              </p>
            </div>
            {/* Pass location data to the ChatWindow */}
            <ChatWindow location={location} />
          </div>

          {/* Right Sidebar - Weather & Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Pass weather data and status to the WeatherWidget */}
              <WeatherWidget 
                weatherData={weatherData}
                isLoading={isLoadingWeather}
                error={weatherError}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
);
}