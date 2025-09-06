import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { ChatPage } from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [currentPage, setCurrentPage] = useState<"login" | "landing" | "chat" | "dashboard">("login");
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("agrishield_user");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
      setCurrentPage("landing");
    }
  }, []);

  const handleLogin = (user: any) => {
    setUserData(user);
    setCurrentPage("landing");
  };

  const handleGetStarted = () => {
    setCurrentPage("dashboard");
  };

  const handleChatClick = () => {
    setCurrentPage("chat");
  };

  const handleBackToHome = () => {
    setCurrentPage("landing");
  };

  const handleDashboardClick = () => {
    setCurrentPage("dashboard");
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "login":
        return <LoginPage onLogin={handleLogin} />;
      case "landing":
        return (
          <LandingPage 
            onGetStarted={handleGetStarted}
            onChatClick={handleChatClick}
            userData={userData}
          />
        );
      case "chat":
        return (
          <ChatPage 
            onBackToHome={handleBackToHome}
            onDashboardClick={handleDashboardClick}
            userData={userData}
          />
        );
      case "dashboard":
        return (
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Dashboard Coming Soon</h1>
              <p className="text-xl text-muted-foreground">
                Advanced analytics and farm management tools are being built.
              </p>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={handleChatClick}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover"
                >
                  Try AI Chat
                </button>
                <button 
                  onClick={handleBackToHome}
                  className="px-6 py-3 border border-border rounded-lg hover:bg-muted"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <NotFound />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={renderCurrentPage()} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
