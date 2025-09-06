import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Mic, Camera, MapPin, Calendar, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MessageBubble } from "./MessageBubble";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'text' | 'recommendation' | 'weather';
  data?: any;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "नमस्ते! मैं आपका AI फार्मिंग असिस्टेंट हूं। मैं बाढ़-प्रतिरोधी फसलों, मौसम विश्लेषण, और बुआई की सलाह के लिए यहां हूं। आप मुझसे कैसे मदद चाह सकते हैं?",
    isBot: true,
    timestamp: new Date(),
    type: 'text'
  },
  {
    id: '2',
    text: "Hello! I'm your AI Farming Assistant. I can help you with flood-resistant crop selection, weather analysis, and planting schedules. How can I assist you today?",
    isBot: true,
    timestamp: new Date(),
    type: 'text'
  }
];

const quickActions = [
  { label: "Weather Forecast", icon: Cloud, action: "weather" },
  { label: "Crop Advice", icon: MapPin, action: "crops" },
  { label: "Planting Schedule", icon: Calendar, action: "schedule" },
];

const sampleResponses: Record<string, Message> = {
  weather: {
    id: Date.now().toString(),
    text: "Based on current weather patterns, here's what I recommend:\n\n🌧️ **Monsoon Alert**: Heavy rainfall expected in 3-5 days\n☔ **Flood Risk**: Medium to High in low-lying areas\n🌡️ **Temperature**: 26-32°C (optimal for rice cultivation)\n\n**Recommendations:**\n• Plant flood-tolerant rice varieties like Swarna Sub-1\n• Ensure proper drainage in fields\n• Avoid planting in next 5 days\n\nWould you like specific crop recommendations for your area?",
    isBot: true,
    timestamp: new Date(),
    type: 'weather'
  },
  crops: {
    id: Date.now().toString(),
    text: "Here are the best flood-resistant crops for your region:\n\n🌾 **Rice Varieties:**\n• Swarna Sub-1 (submergence tolerant up to 14 days)\n• Sambha Mahsuri Sub-1 (high yield, flood resistant)\n• IR64 Sub-1 (early maturity, 115 days)\n\n🥬 **Vegetables:**\n• Water spinach (कलमी साग) - thrives in waterlog\n• Bottle gourd (लौकी) - flood tolerant vine\n• Okra (भिंडी) - quick drainage recovery\n\n📊 **Success Rate**: 85-90% in flood-prone areas\n💰 **Investment**: ₹12,000-18,000 per acre\n\nWhich crop interests you most? I can provide detailed planting guidelines.",
    isBot: true,
    timestamp: new Date(),
    type: 'recommendation'
  },
  schedule: {
    id: Date.now().toString(),
    text: "Here's your optimized planting schedule:\n\n📅 **Current Phase**: Pre-Monsoon Preparation\n\n**Next 15 Days:**\n• **Today-May 25**: Prepare nursery beds for rice\n• **May 26-30**: Sow rice seeds in nursery\n• **June 1-5**: Field preparation & leveling\n• **June 6-15**: Transplant rice seedlings\n\n⚠️ **Weather Consideration**: Delay planting if heavy rain predicted\n\n**Monthly Overview:**\n• **June**: Rice transplanting, vegetable sowing\n• **July**: First fertilizer application\n• **August**: Weed management, pest monitoring\n• **September**: Mid-season care\n• **October**: Harvest preparation\n\nWould you like reminders for these activities?",
    isBot: true,
    timestamp: new Date(),
    type: 'text'
  }
};

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Simulate AI thinking
    setIsTyping(true);
    
    setTimeout(() => {
      let botResponse: Message;
      
      // Simple keyword matching for demo
      const lowerText = text.toLowerCase();
      if (lowerText.includes('weather') || lowerText.includes('rain') || lowerText.includes('मौसम')) {
        botResponse = sampleResponses.weather;
      } else if (lowerText.includes('crop') || lowerText.includes('plant') || lowerText.includes('फसल')) {
        botResponse = sampleResponses.crops;
      } else if (lowerText.includes('schedule') || lowerText.includes('calendar') || lowerText.includes('समय')) {
        botResponse = sampleResponses.schedule;
      } else {
        botResponse = {
          id: Date.now().toString(),
          text: `मैं समझ गया कि आप "${text}" के बारे में पूछ रहे हैं। मैं भारतीय कृषि में विशेषज्ञ हूं और बाढ़-प्रतिरोधी फसलों की सलाह देता हूं।\n\nI understand you're asking about "${text}". I specialize in Indian agriculture and flood-resistant farming. Could you please be more specific about:\n\n• Which crops you're currently growing\n• Your field size and location\n• Specific challenges you're facing\n\nThis will help me provide better recommendations!`,
          isBot: true,
          timestamp: new Date(),
          type: 'text'
        };
      }
      
      setIsTyping(false);
      setMessages(prev => [...prev, { ...botResponse, id: Date.now().toString() }]);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      weather: "What's the weather forecast for farming?",
      crops: "What flood-resistant crops do you recommend?",
      schedule: "Show me the planting schedule"
    };
    
    handleSendMessage(actionMessages[action] || "Help me with farming advice");
  };

  return (
    <Card className="flex flex-col h-[600px] lg:h-[700px]">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-primary/5">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">AI</span>
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">Farm Assistant</h3>
            <p className="text-sm text-muted-foreground">
              {isTyping ? "AI is thinking..." : "Online • Flood-resistant crop expert"}
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-success/10 text-success">
          Active
        </Badge>
      </div>

      {/* Messages Area */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs font-bold">AI</span>
            </div>
            <div className="message-bot">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Quick Actions */}
      <div className="p-4 border-t bg-muted/30">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickActions.map((action) => (
            <Button
              key={action.action}
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              onClick={() => handleQuickAction(action.action)}
            >
              <action.icon className="h-3 w-3 mr-1" />
              {action.label}
            </Button>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about flood-resistant crops, weather, or planting advice..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }
              }}
              className="pr-20"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Paperclip className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Camera className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Mic className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Button 
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim()}
            className="btn-hover"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}