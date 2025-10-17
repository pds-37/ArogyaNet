import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Wind, AlertCircle, Bell, Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Public = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = () => {
    if (!phone && !email) {
      toast({
        title: "Missing Information",
        description: "Please enter at least phone or email",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Subscribed Successfully",
      description: "You'll receive health alerts for your area",
    });

    setPhone("");
    setEmail("");
  };

  const currentAQI = 220;
  const aqiLevel = currentAQI > 200 ? "Severe" : currentAQI > 150 ? "Unhealthy" : "Moderate";
  const aqiColor = currentAQI > 200 ? "destructive" : currentAQI > 150 ? "warning" : "success";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-warning/5 to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-10 h-10 text-warning" />
          <div>
            <h1 className="text-3xl font-bold">AarogyaNet Public Portal</h1>
            <p className="text-sm text-muted-foreground">Stay informed about health alerts</p>
          </div>
        </div>

        <Card className="p-6 mb-6 bg-gradient-to-r from-warning/10 to-destructive/10 border-warning">
          <div className="flex items-start gap-4">
            <Wind className="w-12 h-12 text-warning flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">Current Air Quality</h2>
                <Badge variant={aqiColor as any} className="text-base px-3 py-1">
                  {aqiLevel}
                </Badge>
              </div>
              <div className="mb-3">
                <span className="text-5xl font-bold text-warning">{currentAQI}</span>
                <span className="text-lg text-muted-foreground ml-2">AQI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Mumbai Central · Last updated: 15 minutes ago
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6 bg-destructive/5 border-destructive/20">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
            <div className="flex-1">
              <Badge variant="destructive" className="mb-3">
                ACTIVE HEALTH ALERT
              </Badge>
              <h3 className="text-xl font-bold mb-3">High Air Pollution & Festival Crowd Warning</h3>

              <div className="space-y-3 text-sm mb-4">
                <div>
                  <p className="font-semibold mb-1">⚠️ Situation:</p>
                  <p className="text-muted-foreground">
                    High surge risk expected. Predicted 50-60% increase in patient load due to severe air
                    pollution (AQI: 220) and upcoming Diwali festivities.
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-1">🏥 Public Advisory:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                    <li>Wear N95 or cloth masks when outdoors</li>
                    <li>Limit outdoor activities, especially for children and elderly</li>
                    <li>Keep windows closed during peak pollution hours (6-10 AM, 6-10 PM)</li>
                    <li>Avoid large gatherings and crowded places</li>
                    <li>Visit hospitals only if necessary</li>
                    <li>Stay hydrated and monitor health conditions</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-1">📞 For Emergencies:</p>
                  <p className="text-muted-foreground">
                    Call 108 (Ambulance) · 102 (Health Helpline)
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">Issued 2 hours ago by Mumbai Health Department</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Subscribe to Health Alerts</h2>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Get real-time health advisories, air quality updates, and emergency alerts for your area via SMS
            and email.
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number (SMS Alerts)
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button onClick={handleSubscribe} className="w-full" size="lg">
              Subscribe to Alerts
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              You can unsubscribe anytime. Your data is protected and never shared.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Public;
