import { Link } from "react-router-dom";
import { Building2, Shield, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Landing = () => {
  const roles = [
    {
      title: "Hospital",
      icon: Building2,
      description: "Predict patient surges and manage resources efficiently",
      path: "/hospital",
      color: "bg-primary/10 hover:bg-primary/20",
    },
    {
      title: "Government",
      icon: Shield,
      description: "Monitor regions and coordinate emergency responses",
      path: "/government",
      color: "bg-accent/10 hover:bg-accent/20",
    },
    {
      title: "NGO",
      icon: Heart,
      description: "Coordinate volunteers and track relief efforts",
      path: "/ngo",
      color: "bg-success/10 hover:bg-success/20",
    },
    {
      title: "Public",
      icon: Users,
      description: "Stay informed with health alerts and advisories",
      path: "/public",
      color: "bg-warning/10 hover:bg-warning/20",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-in fade-in duration-700">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
            AarogyaNet
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2">
            Health Surge Prediction & Coordination Platform
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Predicting hospital surges using AQI, weather, festivals, and historical data to enable
            proactive healthcare resource management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {roles.map((role, index) => (
            <Card
              key={role.title}
              className={`p-6 ${role.color} border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-in fade-in slide-in-from-bottom-4`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={role.path} className="block">
                <div className="flex flex-col items-center text-center space-y-4">
                  <role.icon className="w-12 h-12 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                  <Button className="w-full">Access Dashboard</Button>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link to="/auth">Sign In / Register</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
