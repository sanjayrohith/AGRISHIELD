import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, User, Bell, MessageCircle, Cloud, 
  BarChart3, Sprout, LogOut, Settings, ChevronDown 
} from "lucide-react";
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
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";

interface HeaderProps {
  readonly onChatClick?: () => void;
  readonly onDashboardClick?: () => void;
  readonly onWeatherClick?: () => void;
  readonly activeTab?: 'dashboard' | 'chat' | 'weather'; // New prop to track active state
}

export function Header({ 
  onChatClick, 
  onDashboardClick, 
  onWeatherClick, 
  activeTab = 'dashboard' 
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const navigationItems = [
    { id: 'dashboard', name: "Dashboard", icon: BarChart3, onClick: onDashboardClick },
    { id: 'chat', name: "AI Assistant", icon: MessageCircle, onClick: onChatClick, badge: "PRO" },
    { id: 'weather', name: "Weather", icon: Cloud, onClick: onWeatherClick },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Glass Bar */}
        <nav className="glass-card bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl relative z-50">
          <div className="flex items-center justify-between">
            
            {/* 1. Logo Section */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={onDashboardClick}>
              <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg border border-white/10">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold font-display text-white tracking-tight">AGRISHIELD</h1>
                <div className="flex items-center gap-1.5">
                   <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
                   <p className="text-[10px] text-green-100/70 font-medium uppercase tracking-wider">Live System</p>
                </div>
              </div>
            </div>

            {/* 2. Desktop Navigation with Active State Indicator */}
            <div className="hidden md:flex items-center bg-white/5 rounded-xl p-1 border border-white/5">
              {navigationItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    size="sm"
                    className={clsx(
                      "relative h-9 px-4 transition-all duration-300 rounded-lg text-sm font-medium",
                      isActive ? "text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                    onClick={item.onClick}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white/10 border border-white/10 rounded-lg shadow-sm"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center">
                      <item.icon className={clsx("h-4 w-4 mr-2", isActive ? "text-green-400" : "text-white/60")} />
                      {item.name}
                      {item.badge && (
                        <Badge className="ml-2 h-4 px-1 text-[9px] bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30">
                          {item.badge}
                        </Badge>
                      )}
                    </span>
                  </Button>
                );
              })}
            </div>

            {/* 3. Right Section (User & Alerts) */}
            <div className="flex items-center space-x-2">
              
              {/* Notification Bell with Ping Animation */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-white/70 hover:text-white hover:bg-white/10 rounded-xl w-10 h-10"
                onClick={() => setHasUnread(false)}
              >
                <Bell className="h-5 w-5" />
                {hasUnread && (
                  <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-black"></span>
                  </span>
                )}
              </Button>

              {/* User Dropdown - Styled for Dark Mode */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="pl-2 pr-1 h-10 rounded-full hover:bg-white/10 gap-2 group">
                    <Avatar className="h-8 w-8 border border-white/20 transition-transform group-hover:scale-105">
                      <AvatarImage src="/api/placeholder/32/32" alt="Farmer" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                        RK
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-60 bg-black/90 backdrop-blur-xl border border-white/10 text-white shadow-2xl p-2" align="end">
                  <DropdownMenuLabel className="font-normal p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">Rajesh Kumar</p>
                      <p className="text-xs leading-none text-white/50">rajesh.farmer@gmail.com</p>
                    </div>
                    <Badge variant="outline" className="mt-2 text-xs border-green-500/50 text-green-400 bg-green-900/20">
                      Verfied Farmer
                    </Badge>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer rounded-lg">
                      <User className="mr-2 h-4 w-4 text-white/70" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer rounded-lg">
                      <Settings className="mr-2 h-4 w-4 text-white/70" /> Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer rounded-lg">
                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10 rounded-xl"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </nav>

        {/* 4. Mobile Navigation Drawer (AnimatePresence) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-20 left-4 right-4 z-40"
            >
              <nav className="glass-card bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden">
                <div className="space-y-1">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className={clsx(
                        "w-full justify-start h-12 rounded-xl text-base",
                        activeTab === item.id ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                      onClick={() => {
                        item.onClick?.();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <item.icon className={clsx("h-5 w-5 mr-3", activeTab === item.id ? "text-green-400" : "text-white/50")} />
                      {item.name}
                      {item.badge && (
                        <Badge className="ml-auto bg-green-500/20 text-green-400 border-green-500/30">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10 px-2 pb-2">
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5">
                    <Avatar className="h-10 w-10 border border-white/10">
                      <AvatarImage src="/api/placeholder/32/32" />
                      <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Rajesh Kumar</p>
                      <p className="text-xs text-white/50">Verified • Tamil Nadu</p>
                    </div>
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}