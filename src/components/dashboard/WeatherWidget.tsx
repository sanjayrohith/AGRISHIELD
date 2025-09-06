import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const weatherData = {
  current: {
    location: "Haryana, India",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 78,
    windSpeed: 12,
    visibility: 8,
    uvIndex: 6,
    precipitation: 12.5
  },
  forecast: [
    { day: "Today", high: 32, low: 22, condition: "Cloudy", rain: 85, icon: Cloud },
    { day: "Tomorrow", high: 30, low: 20, condition: "Rain", rain: 95, icon: CloudRain },
    { day: "Thursday", high: 29, low: 21, condition: "Heavy Rain", rain: 90, icon: CloudRain },
    { day: "Friday", high: 31, low: 23, condition: "Partly Cloudy", rain: 60, icon: Sun },
    { day: "Saturday", high: 33, low: 24, condition: "Sunny", rain: 20, icon: Sun },
  ],
  alerts: [
    {
      type: "warning",
      title: "Heavy Rainfall Alert",
      message: "Expected 60-80mm rainfall in next 48 hours. Prepare drainage systems.",
      priority: "high"
    },
    {
      type: "info", 
      title: "Flood Risk Assessment",
      message: "Medium flood risk in low-lying areas. Consider delayed planting.",
      priority: "medium"
    }
  ]
};

export function WeatherWidget() {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-warning" />;
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className="h-8 w-8 text-muted-foreground" />;
      case 'rain':
      case 'heavy rain':
        return <CloudRain className="h-8 w-8 text-accent" />;
      default:
        return <Cloud className="h-8 w-8 text-muted-foreground" />;
    }
  };

  const getRainProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-danger";
    if (probability >= 60) return "text-warning";
    if (probability >= 40) return "text-accent";
    return "text-success";
  };

  return (
    <div className="space-y-4">
      {/* Current Weather */}
      <Card className="weather-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Current Weather</CardTitle>
              <p className="text-sm text-muted-foreground">{weatherData.current.location}</p>
            </div>
            {getWeatherIcon(weatherData.current.condition)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{weatherData.current.temperature}°C</div>
              <p className="text-sm text-muted-foreground">{weatherData.current.condition}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-right">
              <div className="space-y-1">
                <div className="flex items-center justify-end space-x-1">
                  <Droplets className="h-3 w-3 text-accent" />
                  <span className="text-xs text-muted-foreground">Humidity</span>
                </div>
                <p className="text-sm font-medium">{weatherData.current.humidity}%</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-end space-x-1">
                  <Wind className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Wind</span>
                </div>
                <p className="text-sm font-medium">{weatherData.current.windSpeed} km/h</p>
              </div>
            </div>
          </div>

          {/* Precipitation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Today's Rainfall</span>
              <span className="text-sm text-accent font-medium">{weatherData.current.precipitation}mm</span>
            </div>
            <Progress value={weatherData.current.precipitation * 4} className="h-2" />
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
            {weatherData.alerts.map((alert, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                  <Badge 
                    variant={alert.priority === 'high' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {alert.priority}
                  </Badge>
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
        <CardContent className="space-y-3">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div className="flex items-center space-x-3">
                <day.icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">{day.day}</p>
                  <p className="text-xs text-muted-foreground">{day.condition}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{day.high}°/{day.low}°</p>
                  <p className={`text-xs ${getRainProbabilityColor(day.rain)}`}>
                    {day.rain}% rain
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Farming Advice */}
      <Card className="bg-success/5 border-success/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
              <span className="text-success text-xs font-bold">🌾</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-sm text-success">Today's Farming Tip</h4>
              <p className="text-xs text-success/80">
                High humidity and expected rainfall make this ideal for rice cultivation. 
                Prepare your fields for monsoon planting but ensure proper drainage systems are in place.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}