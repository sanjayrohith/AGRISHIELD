import { useMemo } from "react";
import { Cloud, CloudRain, Sun, Wind, Droplets, AlertTriangle, Umbrella, Thermometer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import clsx from "clsx";

interface WeatherWidgetProps {
  weatherData: any | null; // Raw data from the API passed from ChatPage
  isLoading: boolean;
  error: string | null;
}

export function WeatherWidget({ weatherData, isLoading, error }: WeatherWidgetProps) {

  // Transform the raw API data into a clean structure for the UI
  // We use useMemo so it doesn't recalculate on every render
  const data = useMemo(() => {
    if (!weatherData) return null;

    const getDayName = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        
        // Simple comparison ignoring time
        if (date.toDateString() === today.toDateString()) return "Today";
        if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    return {
      current: {
        location: weatherData.location?.name || "Unknown Location",
        temperature: Math.round(weatherData.current?.temp_c || 0),
        condition: weatherData.current?.condition?.text || "Unknown",
        iconCode: weatherData.current?.condition?.code,
        humidity: weatherData.current?.humidity || 0,
        windSpeed: Math.round(weatherData.current?.wind_kph || 0),
        precipitation: weatherData.forecast?.forecastday[0]?.day?.totalprecip_mm || 0,
      },
      forecast: (weatherData.forecast?.forecastday || []).map((day: any) => ({
        day: getDayName(day.date),
        high: Math.round(day.day.maxtemp_c),
        low: Math.round(day.day.mintemp_c),
        condition: day.day.condition.text,
        rain: day.day.daily_chance_of_rain,
      })),
      alerts: (weatherData.alerts?.alert || []).map((alert: any) => ({
        title: alert.headline,
        message: alert.desc,
        priority: alert.severity?.toLowerCase() === 'moderate' ? 'medium' : 'high',
      })),
    };
  }, [weatherData]);

  // --- Helper: Icon Selection ---
  const getWeatherIcon = (condition: string, className = "h-6 w-6") => {
    const lower = condition.toLowerCase();
    if (lower.includes('sunny') || lower.includes('clear')) return <Sun className={clsx(className, "text-yellow-400")} />;
    if (lower.includes('partly cloudy')) return <Cloud className={clsx(className, "text-yellow-200")} />;
    if (lower.includes('cloud')) return <Cloud className={clsx(className, "text-gray-400")} />;
    if (lower.includes('rain') || lower.includes('drizzle')) return <CloudRain className={clsx(className, "text-blue-400")} />;
    if (lower.includes('storm') || lower.includes('thunder')) return <CloudRain className={clsx(className, "text-purple-400")} />;
    return <Cloud className={clsx(className, "text-gray-400")} />;
  };

  const getRainColor = (prob: number) => {
    if (prob >= 75) return "text-red-400 font-bold";
    if (prob >= 50) return "text-yellow-400 font-medium";
    return "text-green-400/80";
  };

  // --- Loading State (Skeleton UI) ---
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-48 bg-white/5 rounded-2xl border border-white/10"></div>
        <div className="h-64 bg-white/5 rounded-2xl border border-white/10"></div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm text-center">
        <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-red-400" />
        {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-4 text-white font-sans">
      
      {/* 1. Alerts Section (Only shows if critical) */}
      {data.alerts.length > 0 && (
         <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl p-4 flex items-start gap-3"
         >
            <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <div>
               <h4 className="font-bold text-sm text-red-100">{data.alerts[0].title}</h4>
               <p className="text-xs text-red-200/70 mt-1 line-clamp-2">{data.alerts[0].message}</p>
            </div>
         </motion.div>
      )}

      {/* 2. Main Current Weather Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="glass-card bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{data.current.location}</h2>
            <p className="text-white/60 text-sm flex items-center gap-1">
              {data.current.condition}
            </p>
          </div>
          <div className="p-2 bg-white/5 rounded-full ring-1 ring-white/10">
             {getWeatherIcon(data.current.condition, "h-8 w-8")}
          </div>
        </div>

        {/* Big Temp */}
        <div className="mb-6">
           <span className="text-6xl font-bold bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
             {data.current.temperature}°
           </span>
        </div>

        {/* Grid Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="flex items-center gap-2 mb-1">
               <Droplets className="h-3.5 w-3.5 text-blue-400" />
               <span className="text-xs text-white/50">Humidity</span>
            </div>
            <p className="font-semibold">{data.current.humidity}%</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="flex items-center gap-2 mb-1">
               <Wind className="h-3.5 w-3.5 text-gray-400" />
               <span className="text-xs text-white/50">Wind</span>
            </div>
            <p className="font-semibold">{data.current.windSpeed} <span className="text-xs font-normal">km/h</span></p>
          </div>
          <div className="col-span-2 bg-white/5 rounded-xl p-3 border border-white/5">
             <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <CloudRain className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-xs text-white/50">Rainfall (24h)</span>
                </div>
                <span className="text-xs font-bold text-cyan-300">{data.current.precipitation} mm</span>
             </div>
             <Progress value={Math.min(data.current.precipitation * 10, 100)} className="h-1.5 bg-white/10" indicatorClassName="bg-cyan-400" />
          </div>
        </div>
      </motion.div>

      {/* 3. 5-Day Forecast */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="glass-card bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl"
      >
        <h3 className="text-sm font-semibold text-white/80 mb-4 flex items-center gap-2">
          <Umbrella className="h-4 w-4" /> 5-Day Forecast
        </h3>
        
        <div className="space-y-4">
          {data.forecast.map((day: any, index: number) => (
            <div key={index} className="grid grid-cols-12 items-center gap-2 text-sm">
              {/* Day Name */}
              <div className="col-span-3 text-white/60 font-medium">{day.day}</div>
              
              {/* Icon */}
              <div className="col-span-2 flex justify-center">
                 {getWeatherIcon(day.condition, "h-5 w-5")}
              </div>
              
              {/* Rain Chance */}
              <div className={clsx("col-span-3 text-xs text-right", getRainColor(day.rain))}>
                {day.rain > 0 ? `${day.rain}% Rain` : ''}
              </div>
              
              {/* Min/Max Temp Bar */}
              <div className="col-span-4 flex items-center justify-end gap-2">
                <span className="text-white/40 text-xs">{day.low}°</span>
                <div className="w-12 h-1 bg-white/10 rounded-full relative overflow-hidden">
                   <div className="absolute inset-y-0 bg-gradient-to-r from-blue-400 to-yellow-400 opacity-60 w-full" />
                </div>
                <span className="text-white font-medium text-xs">{day.high}°</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}