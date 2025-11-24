import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Home, 
  Sprout, 
  Calendar, 
  Coins, 
  BookOpen, 
  Bot, 
  Zap,
  MapPin
} from "lucide-react";
import { Header } from "../components/layout/Header";
import { ChatWindow } from "../components/chat/ChatWindow";
import { WeatherWidget } from "../components/dashboard/WeatherWidget";
import heroImage from "../assets/hero-farm.jpg";

interface ChatPageProps {
  readonly onBackToHome: () => void;
  readonly onDashboardClick: () => void;
  readonly userData?: any;
}

export function ChatPage({ onBackToHome, onDashboardClick, userData }: ChatPageProps) {
  // --- Logic for fetching location and weather (Preserved) ---
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
          // Added error handling for missing key
          if (!API_KEY) {
             console.warn("Weather API Key is missing");
             setIsLoadingWeather(false);
             return;
          }
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

  const navItems = [
    { icon: Home, label: "Back to Home", action: onBackToHome, color: "text-blue-400" },
    { icon: Sprout, label: "My Crops", action: () => {}, color: "text-green-400" },
    { icon: Calendar, label: "Planting Calendar", action: () => {}, color: "text-amber-400" },
    { icon: Coins, label: "Market Prices", action: () => {}, color: "text-yellow-400" },
    { icon: BookOpen, label: "Farming Tips", action: () => {}, color: "text-purple-400" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* Background with Darker Overlay for better text contrast */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-1000"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4) blur(2px)' // Added slight blur for focus on content
        }}
      />
      
      {/* Mesh gradient overlay for modern feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-black/40 to-slate-900/40 z-10" />
      
      <div className="relative z-20 flex flex-col h-screen">
        <Header 
          onChatClick={() => {}}
          onDashboardClick={onDashboardClick}
          onWeatherClick={() => {}}
        />
        
        <main className="container flex-1 py-6 overflow-hidden">
          <div className="grid lg:grid-cols-4 gap-6 h-full">
            
            {/* Left Sidebar - Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1 hidden lg:flex flex-col gap-4"
            >
              <div className="glass-card bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
                <div className="flex items-center gap-2 mb-6 text-white/80 px-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider">Quick Actions</h2>
                </div>
                
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button 
                      key={index}
                      whileHover={{ scale: 1.02, x: 5, backgroundColor: "rgba(255,255,255,0.1)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 transition-all duration-200 text-white group"
                      onClick={item.action}
                    >
                      <item.icon className={`w-5 h-5 ${item.color} group-hover:text-white transition-colors`} />
                      <span className="text-sm font-medium opacity-90 group-hover:opacity-100">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Location Status Card */}
              <div className="glass-card bg-green-900/20 backdrop-blur-xl border border-green-500/20 rounded-2xl p-5 mt-auto">
                 <div className="flex items-center gap-3">
                    <div className="bg-green-500/20 p-2 rounded-full">
                        <MapPin className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                        <p className="text-xs text-green-200/60">Detected Location</p>
                        <p className="text-sm font-medium text-white">
                            {location ? `${location.lat.toFixed(2)}, ${location.lon.toFixed(2)}` : "Locating..."}
                        </p>
                    </div>
                 </div>
              </div>
            </motion.div>

            {/* Main Chat Area */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 flex flex-col h-full"
            >
              {/* Enhanced Header */}
              <div className="glass-card bg-black/20 backdrop-blur-md border border-white/10 rounded-t-2xl p-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center shadow-lg">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        {/* Pulsing Online Dot */}
                        <span className="absolute bottom-0 right-0 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-black"></span>
                        </span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold font-display text-white">AI Farming Assistant</h1>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-green-400 font-medium">● Online</span>
                            <span className="text-xs text-white/40">|</span>
                            <span className="text-xs text-white/60">Powered by AgriShield Intelligence</span>
                        </div>
                    </div>
                </div>
              </div>
              
              {/* Chat Container - Ensures full height usage */}
              <div className="flex-1 bg-black/20 backdrop-blur-sm border-x border-b border-white/10 rounded-b-2xl overflow-hidden relative shadow-2xl">
                {/* Pass location data to the ChatWindow */}
                <ChatWindow location={location} />
              </div>
            </motion.div>

            {/* Right Sidebar - Weather & Info */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-6">
                {/* Wrapped weather widget for consistent styling if widget itself is transparent */}
                <div className="backdrop-blur-none">
                    <WeatherWidget 
                        weatherData={weatherData}
                        isLoading={isLoadingWeather}
                        error={weatherError}
                    />
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}