import { Calendar, MapPin, Thermometer, Droplets, TrendingUp, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'text' | 'recommendation' | 'weather';
  data?: any;
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const renderMessageContent = () => {
    // Split message into lines and format them
    const lines = message.text.split('\n');
    
    return (
      <div className="space-y-2">
        {lines.map((line, index) => {
          // Handle headers (lines starting with **)
          if (line.includes('**')) {
            const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            return (
              <div 
                key={index}
                className="font-semibold text-sm"
                dangerouslySetInnerHTML={{ __html: formattedLine }}
              />
            );
          }
          
          // Handle bullet points
          if (line.startsWith('•') || line.startsWith('-')) {
            return (
              <div key={index} className="flex items-start space-x-2 text-sm">
                <span className="text-primary mt-1 text-xs">•</span>
                <span>{line.substring(1).trim()}</span>
              </div>
            );
          }
          
          // Handle emoji lines (weather, status indicators)
          if (line.match(/^[🌾🥬📅📊💰⚠️☔🌧️🌡️]/)) {
            return (
              <div key={index} className="flex items-center space-x-2 text-sm font-medium">
                <span>{line}</span>
              </div>
            );
          }
          
          // Regular text
          if (line.trim()) {
            return (
              <p key={index} className="text-sm leading-relaxed">
                {line}
              </p>
            );
          }
          
          return null;
        })}
      </div>
    );
  };

  const getMessageIcon = () => {
    switch (message.type) {
      case 'weather':
        return <Thermometer className="h-4 w-4" />;
      case 'recommendation':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getMessageBadge = () => {
    switch (message.type) {
      case 'weather':
        return <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs bg-accent/20 text-accent">Weather</Badge>;
      case 'recommendation':
        return <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs bg-success/20 text-success">Crops</Badge>;
      default:
        return null;
    }
  };

  if (message.isBot) {
    return (
      <div className="flex items-start space-x-3 animate-fade-in">
        <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
          {getMessageIcon() || <span className="text-xs font-bold text-primary-foreground">AI</span>}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-muted-foreground">Farm Assistant</span>
            {getMessageBadge()}
            <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
          </div>
          <div className="message-bot max-w-lg">
            {renderMessageContent()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-3 justify-end animate-fade-in">
      <div className="flex-1 space-y-1 text-right">
        <div className="flex items-center justify-end space-x-2">
          <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
          <span className="text-xs font-medium text-muted-foreground">You</span>
        </div>
        <div className="message-user max-w-lg ml-auto">
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
      </div>
      <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-bold text-secondary-foreground">R</span>
      </div>
    </div>
  );
}