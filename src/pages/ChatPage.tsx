import { Header } from "@/components/layout/Header";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";

interface ChatPageProps {
  onBackToHome: () => void;
  onDashboardClick: () => void;
  userData?: any;
}

export function ChatPage({ onBackToHome, onDashboardClick, userData }: ChatPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        onChatClick={() => {}}
        onDashboardClick={onDashboardClick}
        onWeatherClick={() => {}}
      />
      
      <main className="container py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Quick Actions */}
          <div className="lg:col-span-1 space-y-4">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button 
                  className="w-full text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  onClick={onBackToHome}
                >
                  <span className="text-sm font-medium">🏠 Back to Home</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <span className="text-sm font-medium">🌾 My Crops</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <span className="text-sm font-medium">📅 Planting Calendar</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <span className="text-sm font-medium">💰 Market Prices</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <span className="text-sm font-medium">📚 Farming Tips</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h1 className="text-2xl font-bold font-display">AI Farming Assistant</h1>
              <p className="text-muted-foreground">
                Get expert advice on flood-resistant crops, weather patterns, and farming strategies.
              </p>
            </div>
            <ChatWindow />
          </div>

          {/* Right Sidebar - Weather & Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <WeatherWidget />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}