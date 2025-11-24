import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AgrishieldLogo } from "@/components/ui/AgrishieldLogo";
import { Copy, Check, Volume2, StopCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Helper to format time
const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

// Helper to render simple Markdown (Bold text) without heavy libraries
const renderFormattedText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="text-green-300 font-bold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export function MessageBubble({ message }: { readonly message: Message }) {
  const { text, isBot, timestamp } = message;
  const [isCopied, setIsCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Function to handle Text-to-Speech
  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN'; // Indian English accent if available
    utterance.rate = 1;
    utterance.pitch = 1;
    
    utterance.onend = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (isBot) {
    return (
      <div className="flex items-start gap-3 group">
        <Avatar className="h-9 w-9 border border-white/10 shadow-lg">
          <AvatarFallback className="bg-gradient-to-br from-green-900 to-black text-white">
            <AgrishieldLogo size={20} />
          </AvatarFallback>
        </Avatar>
        
        <div className="flex flex-col items-start max-w-[85%] sm:max-w-[75%]">
          <div className="relative rounded-2xl rounded-tl-none bg-black/40 backdrop-blur-md border border-white/10 p-4 shadow-xl">
            <p className="text-sm md:text-base text-gray-100 leading-relaxed whitespace-pre-wrap">
              {renderFormattedText(text)}
            </p>
            
            {/* Action Buttons for Bot */}
            <div className="flex items-center gap-1 mt-3 pt-3 border-t border-white/5">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-white/40 hover:text-green-400 hover:bg-white/5"
                onClick={handleSpeak}
                title="Read Aloud"
              >
                {isSpeaking ? <StopCircle className="h-3.5 w-3.5 animate-pulse text-red-400" /> : <Volume2 className="h-3.5 w-3.5" />}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-white/40 hover:text-green-400 hover:bg-white/5"
                onClick={handleCopy}
                title="Copy Response"
              >
                {isCopied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>
          <span className="mt-1.5 text-[10px] font-medium text-white/40 ml-1">
            AgriShield AI • {formatTime(timestamp)}
          </span>
        </div>
      </div>
    );
  }

  // User's Message Bubble
  return (
    <div className="flex items-start gap-3 justify-end group">
      <div className="flex flex-col items-end max-w-[85%] sm:max-w-[75%]">
        <div className="rounded-2xl rounded-tr-none bg-gradient-to-br from-green-600 to-emerald-700 text-white p-4 shadow-lg shadow-green-900/20 border border-green-500/20">
          <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium">
            {text}
          </p>
        </div>
        <span className="mt-1.5 text-[10px] font-medium text-white/40 mr-1">
          You • {formatTime(timestamp)}
        </span>
      </div>
      
      <Avatar className="h-9 w-9 border-2 border-green-600/30 shadow-lg">
        <AvatarFallback className="bg-white/10 backdrop-blur-md text-white">
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}