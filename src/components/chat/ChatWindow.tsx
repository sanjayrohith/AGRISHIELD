import { useState, useRef, useEffect } from "react";
import { AgrishieldLogo } from "@/components/ui/AgrishieldLogo";
import { Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MessageBubble } from "./MessageBubble";
import clsx from "clsx";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hello! I'm your AI Farming Assistant. I can help you with flood-resistant crop selection, weather analysis, and planting schedules. How can I assist you today? Please select your preferred language.",
    isBot: true,
    timestamp: new Date(),
  }
];

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("English");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const apiResponse = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          language: language,
        }),
      });

      if (!apiResponse.ok) throw new Error("Failed to get response.");

      const data = await apiResponse.json();
      
      const botResponse: Message = {
        id: Date.now().toString() + "-bot",
        text: data.response,
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      const errorResponse: Message = {
        id: Date.now().toString() + "-error",
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px] lg:h-[700px]">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center p-1">
            <AgrishieldLogo size={28} />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">Farm Assistant</h3>
            <p className="text-sm text-muted-foreground">
              {isTyping ? "AI is thinking..." : "Online • Flood-resistant crop expert"}
            </p>
          </div>
        </div>
        
        {/* Language Selector */}
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            {['English', 'Hindi', 'Tamil'].map(lang => (
                <Button 
                    key={lang}
                    variant="ghost" 
                    size="sm"
                    className={clsx(
                        'text-xs h-7 font-semibold transition-all duration-200',
                        {
                            'bg-background text-primary shadow-sm': language === lang,
                            'text-muted-foreground': language !== lang,
                        }
                    )}
                    onClick={() => setLanguage(lang)}
                >
                    {lang === 'Hindi' ? 'हिन्दी' : lang === 'Tamil' ? 'தமிழ்' : 'English'}
                </Button>
            ))}
        </div>
      </div>

      {/* Messages Area */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2">
             <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center p-1">
              <AgrishieldLogo size={20} />
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Input Area */}
      <div className="p-4 border-t bg-muted/30">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask for farming advice in your chosen language..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }
              }}
              className="pr-12"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button 
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}