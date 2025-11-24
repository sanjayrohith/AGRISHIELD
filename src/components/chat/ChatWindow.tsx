import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Animation for messages
import { Send, Paperclip, Sparkles, Sprout, CloudRain, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageBubble } from "./MessageBubble";
import { AgrishieldLogo } from "@/components/ui/AgrishieldLogo"; // Keeping your custom logo
import clsx from "clsx";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Quick prompts to help farmers start the conversation
const SUGGESTED_QUESTIONS = [
  { icon: Sprout, text: "Best flood-resistant rice?" },
  { icon: CloudRain, text: "Will it rain tomorrow?" },
  { icon: IndianRupee, text: "Current Wheat prices?" },
];

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Namaste! I'm your AgriShield AI. I can analyze your soil, predict weather risks, and suggest crops. How can I help your farm today?",
    isBot: true,
    timestamp: new Date(),
  }
];

export function ChatWindow({ location }: { location: any }) {
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
          location: location, // Passing the location data
          date: new Date().toISOString(),
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
        text: "I'm having trouble connecting to the satellite. Please check your internet connection.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    // Changed to h-full to fit the parent container from ChatPage
    <Card className="flex flex-col h-full bg-transparent border-none shadow-none overflow-hidden relative">
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MessageBubble message={message} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-start space-x-3"
          >
             <div className="h-8 w-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center p-1">
              <AgrishieldLogo size={20} />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-white/10 border border-white/10 backdrop-blur-md">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions (Only show if few messages) */}
      {messages.length <= 2 && !isTyping && (
        <div className="px-4 pb-2">
           <p className="text-xs text-white/50 mb-2 font-medium uppercase tracking-wider">Suggested Questions</p>
           <div className="flex gap-2 flex-wrap">
             {SUGGESTED_QUESTIONS.map((q, i) => (
               <button 
                 key={i}
                 onClick={() => handleSendMessage(q.text)}
                 className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-sm px-3 py-2 rounded-full transition-all hover:scale-105"
               >
                 <q.icon className="w-3 h-3 text-green-400" />
                 {q.text}
               </button>
             ))}
           </div>
        </div>
      )}

      {/* Input Area - Floating Capsule Design */}
      <div className="p-4 pt-2">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-2 flex items-center gap-2 shadow-2xl relative">
          
          {/* Language Selector (Integrated into input bar) */}
          <div className="hidden md:flex bg-white/5 rounded-full p-1 border border-white/5">
             {['En', 'Hi', 'Ta'].map(langShort => {
                 const fullLang = langShort === 'En' ? 'English' : langShort === 'Hi' ? 'Hindi' : 'Tamil';
                 return (
                    <button
                        key={langShort}
                        onClick={() => setLanguage(fullLang)}
                        className={clsx(
                            "text-xs px-2 py-1 rounded-full transition-all",
                            language === fullLang ? "bg-green-600 text-white" : "text-white/60 hover:text-white"
                        )}
                    >
                        {langShort}
                    </button>
                 )
             })}
          </div>

          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask in ${language}...`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }
              }}
              className="bg-transparent border-none text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 py-2 h-auto text-base"
            />
          </div>

          <div className="flex items-center gap-1 pr-2">
             <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10 rounded-full">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button 
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className={clsx(
                    "h-10 w-10 rounded-full transition-all duration-300",
                    inputValue.trim() ? "bg-green-500 hover:bg-green-600 text-white" : "bg-white/10 text-white/40"
                )}
              >
                {isTyping ? <Sparkles className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 ml-0.5" />}
              </Button>
          </div>
        </div>
        <p className="text-center text-[10px] text-white/30 mt-2">
          AI can make mistakes. Please verify important farming decisions.
        </p>
      </div>
    </Card>
  );
}