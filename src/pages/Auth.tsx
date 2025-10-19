import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Building2, Shield, Heart, Users, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type Role = "hospital" | "government" | "ngo" | "public" | null;

const Auth = () => {
  const [step, setStep] = useState<"identity" | "credentials">("identity");
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp, user, role } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user && role) {
      navigate(`/${role}`);
    }
  }, [user, role, navigate]);

  const roles = [
    {
      id: "hospital" as Role,
      title: "Hospital",
      icon: Building2,
      description: "Predict surges & manage resources",
      color: "primary",
      bgClass: "hover:bg-primary/10 border-primary/20",
    },
    {
      id: "government" as Role,
      title: "Government",
      icon: Shield,
      description: "Monitor & coordinate responses",
      color: "accent",
      bgClass: "hover:bg-accent/10 border-accent/20",
    },
    {
      id: "ngo" as Role,
      title: "NGO",
      icon: Heart,
      description: "Coordinate volunteer efforts",
      color: "success",
      bgClass: "hover:bg-success/10 border-success/20",
    },
    {
      id: "public" as Role,
      title: "Public",
      icon: Users,
      description: "Stay informed with alerts",
      color: "warning",
      bgClass: "hover:bg-warning/10 border-warning/20",
    },
  ];

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setTimeout(() => setStep("credentials"), 300);
  };

  const handleAuth = async () => {
    if (!email || !password || !selectedRole) {
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, selectedRole);
      }
    } catch (error) {
      // Error handling is done in the auth context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {step === "identity" ? (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-3">
                Welcome to AarogyaNet
              </h1>
              <p className="text-lg text-muted-foreground">Who are you?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {roles.map((role, idx) => (
                <Card
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 ${role.bgClass} animate-in slide-in-from-bottom-4`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-${role.color}/10`}>
                      <role.icon className={`w-8 h-8 text-${role.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{role.title}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Card className="w-full max-w-md mx-auto p-8 animate-in fade-in zoom-in-95 duration-500">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep("identity")}
              className="mb-4 -ml-2 hover:translate-x-1 transition-transform"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Change Role
            </Button>

            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                {roles.find(r => r.id === selectedRole) && (
                  <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                    {(() => {
                      const RoleIcon = roles.find(r => r.id === selectedRole)!.icon;
                      return <RoleIcon className="w-5 h-5 text-primary" />;
                    })()}
                    <span className="font-semibold capitalize">{selectedRole}</span>
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {isLogin ? "Sign In" : "Create Account"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Welcome back!" : "Join AarogyaNet today"}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>

              <Button 
                onClick={handleAuth} 
                className="w-full" 
                size="lg"
                disabled={loading}
              >
                {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
              </Button>

              <div className="text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
                >
                  {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Auth;
