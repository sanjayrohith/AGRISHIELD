import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AgrishieldLogo } from "@/components/ui/AgrishieldLogo";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// A simple function to format the time (e.g., 01:42 PM)
const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export function MessageBubble({ message }: { readonly message: Message }) {
  const { text, isBot, timestamp } = message;

  if (isBot) {
    return (
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-white/20 backdrop-blur-sm border border-white/30 p-1 shadow-sm">
            <AgrishieldLogo size={20} />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <div className="max-w-md rounded-lg rounded-tl-none bg-white/20 backdrop-blur-xl border border-white/30 p-3 shadow-lg">
            {/* Using whitespace-pre-wrap to respect newlines and formatting from the API */}
            <p className="text-sm text-white whitespace-pre-wrap">{text}</p>
          </div>
          <span className="mt-1 text-xs text-white/70">{formatTime(timestamp)}</span>
        </div>
      </div>
    );
  }

  // User's Message Bubble
  return (
    <div className="flex items-start gap-3 justify-end">
      <div className="flex flex-col items-end">
        <div className="max-w-md rounded-lg rounded-tr-none bg-gradient-to-r from-green-500/80 to-emerald-500/80 backdrop-blur-xl text-white p-3 shadow-lg border border-white/20">
          <p className="text-sm">{text}</p>
        </div>
        <span className="mt-1 text-xs text-white/70">{formatTime(timestamp)}</span>
      </div>
       <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-white/20 backdrop-blur-sm border border-white/30 text-xs font-bold text-white shadow-sm">
            R
          </AvatarFallback>
        </Avatar>
    </div>
  );
}