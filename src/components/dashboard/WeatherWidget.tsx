import { useState, useEffect } from "react";
import { Cloud, CloudRain, Sun, Wind, Droplets, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Helper to get the day name from a date string (e.g., "2025-09-08")
const getDayName = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (date.getDate() === today.getDate()) return "Today";
  if (date.getDate() === tomorrow.getDate()) return "Tomorrow";
  
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};


// Main Component
export function WeatherWidget() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Effect to get user's location (no changes here)
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setIsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
      },
      () => {
        setError("Location access denied. Please enable it in your browser settings.");
        setIsLoading(false);
      }
    );
  }, []);

  // Effect to fetch weather data when location is available
  useEffect(() => {
    if (location) {
      const fetchWeatherData = async () => {
        // Using the new environment variable
        const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;
        // New API endpoint URL for WeatherAPI.com
        const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location.lat},${location.lon}&days=5&alerts=yes`;
        
        try {
          const response = await fetch(API_URL);
          if (!response.ok) throw new Error("Could not fetch weather data.");
          const data = await response.json();

          // === NEW: Transform data from WeatherAPI.com ===
          const transformedData = {
            current: {
              location: data.location.name,
              temperature: Math.round(data.current.temp_c),
              condition: data.current.condition.text,
              humidity: data.current.humidity,
              windSpeed: Math.round(data.current.wind_kph),
              precipitation: data.forecast.forecastday[0].day.totalprecip_mm,
            },
            forecast: data.forecast.forecastday.map((day: any) => ({
              day: getDayName(day.date),
              high: Math.round(day.day.maxtemp_c),
              low: Math.round(day.day.mintemp_c),
              condition: day.day.condition.text,
              rain: day.day.daily_chance_of_rain,
            })),
            alerts: (data.alerts?.alert || []).map((alert: any) => ({
              title: alert.headline,
              message: alert.desc,
              priority: alert.severity.toLowerCase() === 'moderate' ? 'medium' : 'high',
            })),
          };
          setWeatherData(transformedData);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchWeatherData();
    }
  }, [location]);

  // Helper functions for icons and colors
  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) {
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
    if (lowerCondition.includes('cloudy') || lowerCondition.includes('overcast')) {
        return <Cloud className="h-8 w-8 text-gray-400" />;
    }
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
        return <CloudRain className="h-8 w-8 text-blue-500" />;
    }
    return <Cloud className="h-8 w-8 text-gray-400" />;
  };

  const getForecastIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) return Sun;
    if (lowerCondition.includes('cloudy') || lowerCondition.includes('overcast')) return Cloud;
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) return CloudRain;
    return Cloud;
  };
  
  const getRainProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-red-500";
    if (probability >= 60) return "text-yellow-500";
    if (probability >= 40) return "text-blue-400";
    return "text-green-500";
  };
  
  // Conditional Rendering
  if (isLoading) {
    return <Card><CardContent className="pt-6">Detecting location and fetching weather...</CardContent></Card>;
  }

  if (error) {
    return <Card className="bg-destructive/10 border-destructive/20"><CardContent className="pt-6 text-destructive">{error}</CardContent></Card>;
  }

  if (!weatherData) {
    return null; // Don't render anything if there's no data
  }

  return (
    <div className="space-y-4">
      {/* Current Weather */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{weatherData.current.location}</CardTitle>
              <p className="text-sm text-muted-foreground">{weatherData.current.condition}</p>
            </div>
            {getWeatherIcon(weatherData.current.condition)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{weatherData.current.temperature}°C</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-right">
                <div className="flex items-center justify-end gap-1">
                  <Droplets className="h-3 w-3 text-accent" />
                  <span className="text-xs text-muted-foreground">Humidity</span>
                </div>
                <p className="text-sm font-medium">{weatherData.current.humidity}%</p>
                <div className="flex items-center justify-end gap-1">
                  <Wind className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Wind</span>
                </div>
                <p className="text-sm font-medium">{weatherData.current.windSpeed} km/h</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Today's Rainfall</span>
              <span className="text-sm text-accent font-medium">{weatherData.current.precipitation}mm</span>
            </div>
            <Progress value={weatherData.current.precipitation * 10} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      {weatherData.alerts.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span>Weather Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {weatherData.alerts.map((alert: any, index: number) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                  <Badge variant={alert.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs capitalize">{alert.priority}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{alert.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 5-Day Forecast */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 divide-y">
          {weatherData.forecast.map((day: any, index: number) => {
            const Icon = getForecastIcon(day.condition);
            return(
              <div key={index} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                <div className="flex items-center space-x-3 w-1/2">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <p className="font-medium text-sm">{day.day}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{day.high}°/{day.low}°</p>
                  <p className={`text-xs ${getRainProbabilityColor(day.rain)}`}>{day.rain}% rain</p>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  );
}