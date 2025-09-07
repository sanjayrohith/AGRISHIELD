import { useState } from "react";
import { ArrowRight, Zap, Cloud, TrendingUp, Users, Star, CheckCircle, MessageCircle, BarChart3 } from "lucide-react";
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

export function LandingPage({ onGetStarted, onChatClick, userData }: LandingPageProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: MessageCircle,
      title: "AI-Powered Chat Assistant",
      description: "24/7 farming expert in your pocket. Get instant advice on crops, weather, and planting schedules in Hindi and English.",
      color: "text-primary"
    },
    {
      icon: Cloud,
      title: "Weather Analysis",
      description: "Real-time weather monitoring with flood risk assessment. Plan your farming activities with accurate forecasts.",
      color: "text-accent"
    },
    {
      icon: TrendingUp,
      title: "Crop Recommendations",
      description: "Smart crop selection based on your soil, climate, and flood patterns. Maximize yield with resilient varieties.",
      color: "text-success"
    },
    {
      icon: BarChart3,
      title: "Yield Analytics",
      description: "Track your farm performance with detailed analytics. Compare seasons and optimize your farming strategy.",
      color: "text-warning"
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

  const benefits = [
    "Reduce crop loss by up to 40% with flood-resistant varieties",
    "Get weather alerts 5 days in advance",
    "24/7 farming support in Hindi & English",
    "Proven techniques from 10,000+ successful farmers",
    "Free crop market price updates",
    "Government scheme notifications"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-hero z-10" />
        
        <div className="container relative z-20 py-20">
          <div className="max-w-4xl mx-auto text-center text-white space-y-8">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-4">
              🌾 AI-Powered Farming Assistant
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold font-display leading-tight">
              Smart Farming for
              <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Flood-Resilient Agriculture
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join 10,000+ farmers using AI to select flood-resistant crops, analyze weather patterns, 
              and maximize yield even in challenging conditions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button 
                size="xl" 
                variant="ghost"
                className="btn-glass-primary group relative overflow-hidden"
                onClick={onChatClick}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Chat with AI
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="xl" 
                variant="ghost"
                className="btn-glass-secondary relative overflow-hidden"
                onClick={onGetStarted}
              >
                Learn More
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 pt-8 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold">10,000+</div>
                <div className="text-sm">Active Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">40%</div>
                <div className="text-sm">Less Crop Loss</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              🚀 Core Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Everything You Need for Smart Farming
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed specifically for Indian farmers dealing with flood challenges
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`farm-card cursor-pointer transition-all duration-300 ${
                  hoveredFeature === index ? 'scale-105 shadow-lg' : ''
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`h-16 w-16 rounded-full bg-gradient-primary/10 flex items-center justify-center mx-auto`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge variant="secondary" className="mb-4">
                  ✅ Proven Results
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                  Why 10,000+ Farmers Trust AGRISHIELD
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our AI assistant combines traditional farming wisdom with modern technology 
                  to deliver results that matter to your livelihood.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 animate-fade-in">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                    <p className="text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                variant="hero"
                className="btn-hover"
                onClick={onChatClick}
              >
                Try AI Assistant Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            <div className="grid gap-4">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={aiAssistantImage} 
                  alt="AI Farming Assistant Interface"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={resilientCropsImage} 
                  alt="Flood-Resilient Crops"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-earth">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              💬 Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Real Farmers, Real Results
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how AGRISHIELD is transforming agriculture across India
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="farm-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-warning fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground italic">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {testimonial.crop}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center text-white space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold font-display">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of farmers already using AI to grow flood-resistant crops 
              and increase their yield. Start your free consultation today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
              <Button 
                size="xl" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary btn-hover w-full sm:w-auto"
                onClick={onChatClick}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Free Chat
              </Button>
              
              <Button 
                size="xl" 
                variant="secondary"
                className="btn-hover w-full sm:w-auto"
                onClick={onGetStarted}
              >
                View Dashboard
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
          <div className="absolute top-40 right-20 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 border border-white/20 rounded-full"></div>
        </div>
      </section>
    </div>
  );
}