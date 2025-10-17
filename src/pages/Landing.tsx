import { Link } from "react-router-dom";
import { Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in duration-1000">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6 animate-in zoom-in duration-700">
            <div className="relative">
              <Activity className="w-20 h-20 text-primary animate-pulse" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
            </div>
          </div>

          {/* Brand Name */}
          <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '200ms' }}>
            AarogyaNet
          </h1>

          {/* Quote */}
          <div className="animate-in fade-in duration-700" style={{ animationDelay: '400ms' }}>
            <blockquote className="text-2xl md:text-3xl font-light text-foreground/90 italic mb-4">
              "Predicting tomorrow's health challenges,
              <br />
              <span className="text-primary font-medium">empowering today's decisions"</span>
            </blockquote>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              AI-powered health surge prediction using real-time AQI, weather patterns, and festival data 
              to enable proactive healthcare resource management
            </p>
          </div>

          {/* CTA Button */}
          <div className="animate-in zoom-in duration-500" style={{ animationDelay: '600ms' }}>
            <Button 
              asChild 
              size="lg" 
              className="text-lg px-8 py-6 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group"
            >
              <Link to="/auth" className="flex items-center gap-2">
                Access Your Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Stats or features */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 animate-in fade-in duration-700" style={{ animationDelay: '800ms' }}>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">4</p>
              <p className="text-sm text-muted-foreground">Role Types</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">24/7</p>
              <p className="text-sm text-muted-foreground">Monitoring</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-success">Real-time</p>
              <p className="text-sm text-muted-foreground">Predictions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
