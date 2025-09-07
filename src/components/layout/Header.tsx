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
  onChatClick?: () => void;
  onDashboardClick?: () => void;
  onWeatherClick?: () => void;
  userData?: {
    name: string;
    email: string;
    language: string;
    region: string;
  };
}

export function Header({ onChatClick, onDashboardClick, onWeatherClick, userData }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Dashboard", icon: BarChart3, onClick: onDashboardClick },
    { name: "Chat Assistant", icon: MessageCircle, onClick: onChatClick, badge: "AI" },
    { name: "Weather", icon: Cloud, onClick: onWeatherClick },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src="/agrishield-logo.png" 
            alt="AGRISHIELD Logo" 
            className="h-10 w-10"
          />
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold font-display text-foreground">AGRISHIELD</h1>
            <p className="text-xs text-muted-foreground">Smart Farming Assistant</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              size="sm"
              className="relative h-9 px-3"
              onClick={item.onClick}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.name}
              {item.badge && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
            <Bell className="h-4 w-4" />
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center rounded-full">
              3
            </Badge>
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/api/placeholder/32/32" alt="Farmer" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userData?.name ? userData.name.split(' ').map(n => n[0]).join('').toUpperCase() : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userData?.name || "Guest User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userData?.email || "guest@example.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Farm Details</DropdownMenuItem>
              <DropdownMenuItem>Language: हिंदी</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden h-9 w-9 p-0"
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

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <nav className="container py-4 space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start h-11"
                onClick={() => {
                  item.onClick?.();
                  setIsMobileMenuOpen(false);
                }}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.name}
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}