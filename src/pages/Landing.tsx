import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Activity, TrendingUp, Users, Brain, Zap, Shield, Bell, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({ hospitals: 0, predictions: 0, accuracy: 0, alerts: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animated counter for stats
  useEffect(() => {
    const duration = 2000;
    const fps = 60;
    const frames = (duration / 1000) * fps;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / frames;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setStats({
        hospitals: Math.floor(easeOut * 150),
        predictions: Math.floor(easeOut * 10000),
        accuracy: Math.floor(easeOut * 94),
        alerts: Math.floor(easeOut * 5000),
      });

      if (frame >= frames) clearInterval(timer);
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, []);

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl transition-all duration-300"
          style={{
            left: mousePosition.x * 0.05,
            top: mousePosition.y * 0.05,
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] bg-medical/15 rounded-full blur-3xl transition-all duration-500"
          style={{
            right: -mousePosition.x * 0.03,
            bottom: -mousePosition.y * 0.03,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo/Brand with pulsing effect */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4 group">
            <div className="relative">
              <Activity className="w-16 h-16 text-primary animate-pulse" />
              <div className="absolute inset-0 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-medical to-accent bg-clip-text text-transparent animate-gradient">
              AarogyaNet
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Brain className="w-4 h-4 text-primary animate-pulse" />
            <span>Powered by AI</span>
            <span className="mx-2">•</span>
            <Shield className="w-4 h-4 text-medical animate-pulse" />
            <span>Healthcare Intelligence</span>
          </div>
        </div>

        {/* Quote with typing effect styling */}
        <div className="max-w-3xl text-center mb-12 animate-fade-in delay-200">
          <p className="text-2xl md:text-3xl text-foreground font-semibold mb-4">
            "Predicting Health Surges Before They Happen"
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Multi-agent AI platform predicting hospital patient surges using real-time AQI, weather, festivals & historical data
          </p>
        </div>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in delay-300">
          <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 hover:scale-105 transition-transform cursor-pointer">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm">Real-time Predictions</span>
          </div>
          <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 hover:scale-105 transition-transform cursor-pointer">
            <Bell className="w-4 h-4 text-accent" />
            <span className="text-sm">Multi-lingual Alerts</span>
          </div>
          <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 hover:scale-105 transition-transform cursor-pointer">
            <Users className="w-4 h-4 text-medical" />
            <span className="text-sm">4 Role-Based Dashboards</span>
          </div>
          <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 hover:scale-105 transition-transform cursor-pointer">
            <Sparkles className="w-4 h-4 text-success" />
            <span className="text-sm">94% Accuracy</span>
          </div>
        </div>

        {/* CTA Button with glow effect */}
        <div className="mb-16 animate-fade-in delay-400">
          <Link to="/auth">
            <Button 
              size="lg" 
              className="text-lg px-12 py-7 hover:scale-105 transition-all relative group shadow-lg shadow-primary/20 hover:shadow-2xl hover:shadow-primary/40"
            >
              <span className="relative z-10 flex items-center gap-2">
                Access Your Dashboard
                <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-medical to-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
            </Button>
          </Link>
        </div>

        {/* Animated Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl w-full animate-fade-in delay-500">
          <div className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-6 text-center hover:scale-105 hover:border-primary/50 transition-all group cursor-pointer">
            <Users className="w-10 h-10 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <div className="text-3xl font-bold text-foreground mb-1">{stats.hospitals}+</div>
            <div className="text-sm text-muted-foreground">Hospitals Connected</div>
          </div>
          <div className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-6 text-center hover:scale-105 hover:border-medical/50 transition-all group cursor-pointer">
            <Brain className="w-10 h-10 text-medical mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <div className="text-3xl font-bold text-foreground mb-1">{stats.predictions.toLocaleString()}+</div>
            <div className="text-sm text-muted-foreground">AI Predictions Made</div>
          </div>
          <div className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-6 text-center hover:scale-105 hover:border-accent/50 transition-all group cursor-pointer">
            <TrendingUp className="w-10 h-10 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <div className="text-3xl font-bold text-foreground mb-1">{stats.accuracy}%</div>
            <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
          </div>
          <div className="bg-card/60 backdrop-blur-md border border-border rounded-xl p-6 text-center hover:scale-105 hover:border-primary/50 transition-all group cursor-pointer">
            <Bell className="w-10 h-10 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <div className="text-3xl font-bold text-foreground mb-1">{stats.alerts.toLocaleString()}+</div>
            <div className="text-sm text-muted-foreground">Alerts Sent</div>
          </div>
        </div>

        {/* Live indicator */}
        <div className="mt-12 flex items-center gap-2 text-sm text-muted-foreground animate-fade-in delay-700">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span>System Active • Monitoring 24/7</span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
