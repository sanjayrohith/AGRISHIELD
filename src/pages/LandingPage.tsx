import { useState } from "react";
import { motion } from "framer-motion"; // Animation library
import { ArrowRight, Cloud, TrendingUp, CheckCircle, MessageCircle, BarChart3, Sun, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-farm.jpg";
import aiAssistantImage from "@/assets/ai-assistant.jpg";
import resilientCropsImage from "@/assets/resilient-crops.jpg";

interface LandingPageProps {
  onGetStarted: () => void;
  onChatClick: () => void;
  userData?: any;
}

// Animation variants for cleaner code
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function LandingPage({ onGetStarted, onChatClick, userData }: LandingPageProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: MessageCircle,
      title: "AI-Powered Chat Assistant",
      description: "24/7 farming expert in your pocket. Get instant advice on crops, weather, and planting schedules in Hindi and English.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Cloud,
      title: "Weather Analysis",
      description: "Real-time weather monitoring with flood risk assessment. Plan your farming activities with accurate forecasts.",
      color: "text-sky-500",
      bg: "bg-sky-500/10"
    },
    {
      icon: TrendingUp,
      title: "Crop Recommendations",
      description: "Smart crop selection based on your soil, climate, and flood patterns. Maximize yield with resilient varieties.",
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      icon: BarChart3,
      title: "Yield Analytics",
      description: "Track your farm performance with detailed analytics. Compare seasons and optimize your farming strategy.",
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Haryana",
      text: "AGRISHIELD helped me switch to flood-resistant rice varieties. My yield increased by 30% even during heavy monsoons!",
      rating: 5,
      crop: "Rice Farmer"
    },
    {
      name: "Priya Singh",
      location: "Uttar Pradesh", 
      text: "The weather alerts saved my crops from unexpected flooding. Now I plan my entire season using AGRISHIELD's recommendations.",
      rating: 5,
      crop: "Vegetable Grower"
    },
    {
      name: "Arun Patel",
      location: "Gujarat",
      text: "The AI assistant speaks in my language and understands local farming practices. It's like having an expert with me always.",
      rating: 5,
      crop: "Cotton & Wheat"
    }
  ];

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Parallax feel */}
        <div 
          className="absolute inset-0 z-0 transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35)'
          }}
        />
        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10" />
        
        <div className="container relative z-20 py-20">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center text-white space-y-8"
          >
            <motion.div variants={fadeIn} className="flex justify-center">
              <Badge variant="secondary" className="bg-green-500/20 text-green-100 border-green-500/30 backdrop-blur-md px-4 py-1.5 mb-4 hover:bg-green-500/30 transition-colors">
                🌾 AI-Powered Farming Assistant
              </Badge>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Smart Farming for <br />
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Flood-Resilient Agriculture
              </span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
              Join 10,000+ farmers using AI to select flood-resistant crops, analyze weather patterns, 
              and maximize yield even in challenging conditions.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-500 text-white rounded-full h-14 px-8 text-lg font-medium shadow-[0_0_20px_-5px_rgba(22,163,74,0.5)] transition-all hover:scale-105"
                onClick={onChatClick}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Chat with AI
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 bg-white/5 text-white hover:bg-white/10 rounded-full h-14 px-8 text-lg backdrop-blur-sm transition-all hover:scale-105"
                onClick={onGetStarted}
              >
                Learn More
              </Button>
            </motion.div>

            {/* Floating Live Stats - Adds "Tech" feel */}
            <motion.div 
              variants={fadeIn}
              className="absolute hidden lg:block top-1/2 right-10 bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl animate-pulse-slow"
            >
               <div className="flex items-center gap-3 mb-2">
                 <div className="bg-yellow-500/20 p-2 rounded-full"><Sun className="h-5 w-5 text-yellow-400" /></div>
                 <div className="text-left">
                   <p className="text-xs text-gray-400">Live Weather</p>
                   <p className="text-sm font-bold">Sunny, 32°C</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="bg-blue-500/20 p-2 rounded-full"><Droplets className="h-5 w-5 text-blue-400" /></div>
                 <div className="text-left">
                   <p className="text-xs text-gray-400">Humidity</p>
                   <p className="text-sm font-bold">68% (Optimum)</p>
                 </div>
               </div>
            </motion.div>

            <motion.div variants={fadeIn} className="flex items-center justify-center space-x-8 sm:space-x-16 pt-12 text-white/80 border-t border-white/10 mt-12 max-w-2xl mx-auto">
              {[
                { val: "10k+", label: "Active Farmers" },
                { val: "40%", label: "Less Crop Loss" },
                { val: "24/7", label: "AI Support" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-white">{stat.val}</div>
                  <div className="text-sm text-green-200/70 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-green-600 text-green-700">
              🚀 Core Features
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Everything You Need for <span className="text-green-600">Smart Farming</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for Indian farmers dealing with flood challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={index}
              >
                <Card 
                  className={`h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white group relative overflow-hidden`}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${feature.color.split('-')[1]}-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                  
                  <CardContent className="p-8 text-center space-y-6">
                    <div className={`h-20 w-20 rounded-2xl ${feature.bg} flex items-center justify-center mx-auto transform group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-10 w-10 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                      <p className="text-slate-500 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800">
                  ✅ Proven Results
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  Why 10,000+ Farmers <br/>Trust AGRISHIELD
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our AI assistant combines traditional farming wisdom with modern technology 
                  to deliver results that matter to your livelihood.
                </p>
              </div>

              <div className="space-y-5">
                {["Reduce crop loss by 40% with resistant varieties", "Get weather alerts 5 days in advance", "24/7 farming support in Hindi & English", "Market price updates & Gov schemes"].map((benefit, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index} 
                    className="flex items-center space-x-4"
                  >
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-slate-700 font-medium">{benefit}</p>
                  </motion.div>
                ))}
              </div>

              <Button 
                size="lg" 
                className="bg-slate-900 text-white hover:bg-slate-800 px-8 h-12 rounded-full mt-4"
                onClick={onChatClick}
              >
                Try AI Assistant Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </motion.div>

            {/* Overlapping Images Layout */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] hidden lg:block"
            >
              <div className="absolute top-0 right-0 w-4/5 h-3/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10 transform hover:-translate-y-2 transition-transform duration-500">
                <img 
                  src={aiAssistantImage} 
                  alt="AI Interface"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 text-white">
                  <p className="font-mono text-xs text-green-400">AI ANALYSIS COMPLETE</p>
                  <p className="font-bold">Crop Risk: Low</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-4/5 h-3/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-0">
                <img 
                  src={resilientCropsImage} 
                  alt="Crops"
                  className="w-full h-full object-cover filter brightness-90"
                />
              </div>
              {/* Decorative Element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-green-900 z-0">
           <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
        </div>
        
        <div className="container relative z-10">
          <div className="bg-green-800/50 backdrop-blur-lg rounded-3xl p-8 md:p-16 text-center border border-white/10 shadow-2xl max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto mb-10">
              Join thousands of farmers already using AI to grow flood-resistant crops 
              and increase their yield. Start your free consultation today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-green-900 hover:bg-gray-100 w-full sm:w-auto h-14 px-8 text-lg font-bold"
                onClick={onChatClick}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Free Chat
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}