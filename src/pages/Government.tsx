import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shield, AlertTriangle, MapPin, Send, Package, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Government = () => {
  const { toast } = useToast();
  const [advisoryText, setAdvisoryText] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const hospitals = [
    { name: "City Central Hospital", surge: "HIGH", predicted: 240, id: "1" },
    { name: "Metro General Hospital", surge: "MEDIUM", predicted: 180, id: "2" },
    { name: "District Medical Center", surge: "HIGH", predicted: 220, id: "3" },
    { name: "Community Health Hospital", surge: "LOW", predicted: 130, id: "4" },
  ];

  const generateAdvisory = () => {
    const template = `⚠️ HEALTH ALERT for ${selectedArea || "Mumbai Central"}

HIGH surge risk expected. Predicted patient increase due to:
• High Air Pollution (AQI: 220)
• Upcoming Festival (Diwali)

PUBLIC ADVISORY:
• Wear N95 or cloth masks when outdoors
• Limit outdoor activities, especially for children and elderly
• Keep windows closed during peak pollution hours
• Avoid large gatherings
• Visit hospitals only if necessary
• Stay hydrated and monitor health conditions

HOSPITAL ADVISORY:
• Prepare for 50-60% increase in patient load
• Increase staffing and supplies
• Prioritize respiratory cases

For emergencies, call: 108`;

    setAdvisoryText(template);
    
    toast({
      title: "Template Generated",
      description: "Advisory template has been created. You can now edit and publish.",
    });
  };

  const allocateResources = () => {
    toast({
      title: "Resources Allocated",
      description: "Emergency resources dispatched to high-surge hospitals.",
    });
  };

  const publishAdvisory = () => {
    if (!advisoryText.trim()) {
      toast({
        title: "Error",
        description: "Please enter an advisory message before publishing.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Advisory Published",
      description: "Health advisory has been published to all subscribers.",
    });

    // Reset form
    setAdvisoryText("");
    setSelectedArea("");
  };

  const previewAdvisory = () => {
    if (!advisoryText.trim()) {
      toast({
        title: "No Content",
        description: "Please enter an advisory message to preview.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Preview Mode",
      description: "Opening preview window...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10 text-accent" />
            <div>
              <h1 className="text-3xl font-bold">Government Dashboard</h1>
              <p className="text-sm text-muted-foreground">Monitor & coordinate responses</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="hospitals" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="hospitals">Hospital Status</TabsTrigger>
            <TabsTrigger value="advisory">Advisory Center</TabsTrigger>
          </TabsList>

          <TabsContent value="hospitals" className="space-y-4">
            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-accent/20">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                Regional Hospital Status
              </h2>

              <div className="space-y-3">
                {hospitals.map((hospital) => (
                  <Card
                    key={hospital.id}
                    className="p-4 flex items-center justify-between hover:shadow-lg transition-all hover:scale-[1.02] duration-300"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{hospital.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Predicted: {hospital.predicted} patients
                      </p>
                    </div>
                    <Badge
                      variant={
                        hospital.surge === "HIGH"
                          ? "destructive"
                          : hospital.surge === "MEDIUM"
                          ? "default"
                          : "secondary"
                      }
                      className="ml-4"
                    >
                      {hospital.surge}
                    </Badge>
                  </Card>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-destructive/10 to-warning/10 border-destructive/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1 animate-pulse" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 text-lg">Critical Alert</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    2 hospitals showing HIGH surge levels. Immediate resource allocation recommended.
                  </p>
                  <Button size="sm" onClick={allocateResources} className="w-full md:w-auto">
                    <Package className="w-4 h-4 mr-2" />
                    Allocate Resources
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="advisory" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 space-y-4 hover:shadow-xl transition-all duration-300 border-accent/20">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Send className="w-5 h-5 text-accent" />
                  Create Advisory
                </h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="area">Target Area</Label>
                    <Select value={selectedArea} onValueChange={setSelectedArea}>
                      <SelectTrigger id="area">
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mumbai-central">Mumbai Central</SelectItem>
                        <SelectItem value="delhi-ncr">Delhi NCR</SelectItem>
                        <SelectItem value="bangalore-south">Bangalore South</SelectItem>
                        <SelectItem value="pune-city">Pune City</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={generateAdvisory} variant="outline" className="w-full">
                    Generate Template
                  </Button>

                  <div className="space-y-2">
                    <Label htmlFor="advisory">Advisory Message</Label>
                    <Textarea
                      id="advisory"
                      value={advisoryText}
                      onChange={(e) => setAdvisoryText(e.target.value)}
                      placeholder="Enter advisory message here..."
                      className="min-h-[300px] font-mono text-sm"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1" onClick={publishAdvisory}>
                      <Send className="w-4 h-4 mr-2" />
                      Publish Advisory
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={previewAdvisory}>
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-accent/20">
                <h2 className="text-xl font-bold mb-4">Recent Advisories</h2>
                <div className="space-y-3">
                  <Card className="p-4 bg-muted/50 hover:bg-muted transition-all duration-300 cursor-pointer hover:scale-[1.02]">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="destructive">HIGH ALERT</Badge>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-sm font-medium mb-1">Air Quality Warning - Mumbai Central</p>
                    <p className="text-xs text-muted-foreground">Published to 50,000 subscribers</p>
                  </Card>

                  <Card className="p-4 bg-muted/50 hover:bg-muted transition-all duration-300 cursor-pointer hover:scale-[1.02]">
                    <div className="flex items-start justify-between mb-2">
                      <Badge>MEDIUM</Badge>
                      <span className="text-xs text-muted-foreground">5 hours ago</span>
                    </div>
                    <p className="text-sm font-medium mb-1">Festival Crowd Advisory - Delhi NCR</p>
                    <p className="text-xs text-muted-foreground">Published to 35,000 subscribers</p>
                  </Card>

                  <Card className="p-4 bg-muted/50 hover:bg-muted transition-all duration-300 cursor-pointer hover:scale-[1.02]">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">INFO</Badge>
                      <span className="text-xs text-muted-foreground">1 day ago</span>
                    </div>
                    <p className="text-sm font-medium mb-1">Weather Update - Bangalore</p>
                    <p className="text-xs text-muted-foreground">Published to 28,000 subscribers</p>
                  </Card>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Government;
