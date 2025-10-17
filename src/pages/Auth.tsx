import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = (isLogin: boolean) => {
    if (!email || !password || !role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Mock auth - in production, call real API
    toast({
      title: isLogin ? "Login Successful" : "Registration Successful",
      description: `Welcome to AarogyaNet ${role} portal`,
    });

    // Redirect based on role
    const roleRoutes: Record<string, string> = {
      hospital: "/hospital",
      government: "/government",
      ngo: "/ngo",
      public: "/public",
    };

    navigate(roleRoutes[role] || "/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4">
      <Card className="w-full max-w-md p-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">
            AarogyaNet
          </h1>
          <p className="text-sm text-muted-foreground">Access your role-based dashboard</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="login-role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="ngo">NGO</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full" onClick={() => handleAuth(true)}>
              Sign In
            </Button>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <Input
                id="register-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="register-role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="ngo">NGO</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full" onClick={() => handleAuth(false)}>
              Create Account
            </Button>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
