import { useState } from "react";
import { Menu, X, User, Bell, MessageCircle, Cloud, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  readonly onChatClick?: () => void;
  readonly onDashboardClick?: () => void;
  readonly onWeatherClick?: () => void;
}

export function Header({ onChatClick, onDashboardClick, onWeatherClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Dashboard", icon: BarChart3, onClick: onDashboardClick },
    { name: "Chat Assistant", icon: MessageCircle, onClick: onChatClick, badge: "AI" },
    { name: "Weather", icon: Cloud, onClick: onWeatherClick },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container relative py-4">
        {/* Glassmorphic Navigation Bar */}
        <nav className="glass-card bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 shadow-2xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="/agrishield-logo.png" 
                alt="AGRISHIELD Logo" 
                className="h-10 w-10"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold font-display text-white">AGRISHIELD</h1>
                <p className="text-xs text-white/70">Smart Farming Assistant</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  size="sm"
                  className="relative h-10 px-4 text-white hover:bg-white/20 hover:text-white transition-all duration-300 rounded-xl"
                  onClick={item.onClick}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                  {item.badge && (
                    <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs bg-white/20 text-white border-white/30">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative h-10 w-10 p-0 text-white hover:bg-white/20 rounded-xl">
                <Bell className="h-4 w-4" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center rounded-full">
                  3
                </Badge>
              </Button>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/20">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/api/placeholder/32/32" alt="Farmer" />
                      <AvatarFallback className="bg-white/20 text-white border border-white/30">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">Rajesh Kumar</p>
                      <p className="text-xs leading-none text-white/70">
                        rajesh.farmer@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-white hover:text-white">Profile Settings</DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:text-white">Farm Details</DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:text-white">Language: हिंदी</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-white hover:text-white">Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden h-10 w-10 p-0 text-white hover:bg-white/20 rounded-xl"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="glass-card bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="w-full justify-start h-11 text-white hover:bg-white/20 rounded-xl"
                    onClick={() => {
                      item.onClick?.();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.name}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-xs bg-white/20 text-white border-white/30">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}