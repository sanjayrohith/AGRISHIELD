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

export function MessageBubble({ message }: { message: Message }) {
  const { text, isBot, timestamp } = message;

  if (isBot) {
    return (
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground p-1">
            <AgrishieldLogo size={20} />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <div className="max-w-md rounded-lg rounded-tl-none bg-muted p-3">
            {/* Using whitespace-pre-wrap to respect newlines and formatting from the API */}
            <p className="text-sm text-foreground whitespace-pre-wrap">{text}</p>
          </div>
          <span className="mt-1 text-xs text-muted-foreground">{formatTime(timestamp)}</span>
        </div>
      </div>
    );
  }

  // --- This is the User's Message Bubble ---
  return (
    <div className="flex items-start gap-3 justify-end">
      <div className="flex flex-col items-end">
        {/* ✅ This is the main change: Added background and text colors for visibility */}
        <div className="max-w-md rounded-lg rounded-tr-none bg-primary text-primary-foreground p-3">
          <p className="text-sm">{text}</p>
        </div>
        <span className="mt-1 text-xs text-muted-foreground">{formatTime(timestamp)}</span>
      </div>
       <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-bold">
            R
          </AvatarFallback>
        </Avatar>
    </div>
  );
}