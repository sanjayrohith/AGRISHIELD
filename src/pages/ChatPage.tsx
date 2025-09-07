import { Header } from "@/components/layout/Header";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import heroImage from "@/assets/hero-farm.jpg";

interface ChatPageProps {
  readonly onBackToHome: () => void;
  readonly onDashboardClick: () => void;
  readonly userData?: any;
}

export function ChatPage({ onBackToHome, onDashboardClick, userData }: ChatPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Farm Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)'
        }}
      />
      <div className="absolute inset-0 bg-green-900/20 z-10" />
      
      <div className="relative z-20">
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
              <div className="glass-card bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl">
                <h2 className="text-lg font-semibold mb-4 text-white">Quick Actions</h2>
                <div className="space-y-2">
                  <button 
                    className="w-full text-left p-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-md text-white"
                    onClick={onBackToHome}
                  >
                    <span className="text-sm font-medium">🏠 Back to Home</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-md text-white">
                    <span className="text-sm font-medium">🌾 My Crops</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-md text-white">
                    <span className="text-sm font-medium">📅 Planting Calendar</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-md text-white">
                    <span className="text-sm font-medium">💰 Market Prices</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-md text-white">
                    <span className="text-sm font-medium">📚 Farming Tips</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <div className="glass-card bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-2xl mb-4">
              <h1 className="text-2xl font-bold font-display text-white">AI Farming Assistant</h1>
              <p className="text-white/90">
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
  </div>
);
}