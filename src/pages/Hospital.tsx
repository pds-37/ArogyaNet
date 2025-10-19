import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, TrendingUp, Users, Bed, Activity, Send, Download, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const HospitalDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [aqi, setAqi] = useState("180");
  const [temperature, setTemperature] = useState("32");
  const [humidity, setHumidity] = useState("60");
  const [festival, setFestival] = useState("none");
  const [baseline, setBaseline] = useState("120");
  const [prediction, setPrediction] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [resources, setResources] = useState([
    { id: 1, name: "Ventilators", current: 45, required: 50 },
    { id: 2, name: "ICU Beds", current: 80, required: 100 },
    { id: 3, name: "N95 Masks", current: 2000, required: 5000 },
    { id: 4, name: "PPE Kits", current: 300, required: 500 },
  ]);
  const [staff, setStaff] = useState([
    { id: 1, name: "Dr. Sarah Johnson", dept: "Emergency", status: "Available" },
    { id: 2, name: "Dr. Michael Chen", dept: "ICU", status: "On-Shift" },
    { id: 3, name: "Dr. Priya Patel", dept: "Cardiology", status: "Available" },
    { id: 4, name: "Dr. James Wilson", dept: "Pulmonology", status: "On-Shift" },
  ]);

  // Listen for real-time allocation updates
  useEffect(() => {
    const channel = supabase
      .channel('resource-allocations')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'resource_allocations',
          filter: `to_hospital_id=eq.${user?.id}`
        },
        (payload: any) => {
          toast({
            title: "Resource Allocated!",
            description: `Government has allocated ${payload.new.quantity} ${payload.new.resource_name}`,
          });
        }
      )
      .subscribe();

    // Load existing alerts
    loadAlerts();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const loadAlerts = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .eq('hospital_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (!error && data) {
      setAlerts(data);
    }
  };

  const runPrediction = async () => {
    const aqiVal = parseInt(aqi);
    const baseVal = parseInt(baseline);
    let surgeFactor = 0.1;

    if (aqiVal < 100) surgeFactor = 0.1;
    else if (aqiVal < 200) surgeFactor = 0.3;
    else surgeFactor = 0.5;

    if (festival !== "none") surgeFactor += 0.2;

    const predicted = Math.round(baseVal * (1 + surgeFactor));
    const surgePercent = Math.round(surgeFactor * 100);

    let level = "LOW";
    let levelColor = "success";
    if (surgePercent >= 40) {
      level = "HIGH";
      levelColor = "destructive";
    } else if (surgePercent >= 20) {
      level = "MEDIUM";
      levelColor = "warning";
    }

    const predictionData = {
      predicted,
      surgePercent,
      level,
      levelColor,
      confidence: 0.85,
      factors: ["AQI", festival !== "none" ? "Festival" : "Weather"],
      extraDoctors: surgePercent >= 40 ? 6 : surgePercent >= 20 ? 3 : 0,
      extraNurses: surgePercent >= 40 ? 10 : surgePercent >= 20 ? 5 : 0,
      extraBeds: surgePercent >= 40 ? 30 : surgePercent >= 20 ? 10 : 0,
    };

    setPrediction(predictionData);

    // Save alert to database
    if (user) {
      const { error } = await supabase
        .from('alerts')
        .insert({
          hospital_id: user.id,
          alert_type: 'surge_prediction',
          severity: level.toLowerCase(),
          predicted_cases: predicted,
          confidence: 0.85,
          factors: JSON.stringify(predictionData.factors)
        });

      if (error) {
        console.error('Error saving alert:', error);
      } else {
        loadAlerts(); // Reload alerts
      }
    }

    toast({
      title: "Prediction Complete",
      description: `Surge level: ${level}. Predicted ${predicted} patients.`,
    });
  };

  const sendToGovernment = () => {
    toast({
      title: "Data Sent Successfully",
      description: "Prediction report has been sent to government authorities.",
    });
  };

  const downloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "PDF report has been downloaded successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <Navbar />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Building2 className="w-10 h-10 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Hospital Command Center</h1>
              <p className="text-sm text-muted-foreground">Real-time surge prediction & resource management</p>
            </div>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Activity className="w-4 h-4 mr-2" />
            Live
          </Badge>
        </div>

        <Tabs defaultValue="ops" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ops">Ops Center</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="staff">Staffing</TabsTrigger>
          </TabsList>

          {/* Tab 1: Ops Center (Agent Simulation) */}
          <TabsContent value="ops" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 space-y-4 hover:shadow-xl transition-all duration-300 border-primary/20">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Prediction Inputs
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="aqi">AQI Level</Label>
                    <Input
                      id="aqi"
                      type="number"
                      value={aqi}
                      onChange={(e) => setAqi(e.target.value)}
                      placeholder="180"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temp">Temperature (°C)</Label>
                    <Input
                      id="temp"
                      type="number"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      placeholder="32"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="humidity">Humidity (%)</Label>
                    <Input
                      id="humidity"
                      type="number"
                      value={humidity}
                      onChange={(e) => setHumidity(e.target.value)}
                      placeholder="60"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="baseline">Baseline Patients</Label>
                    <Input
                      id="baseline"
                      type="number"
                      value={baseline}
                      onChange={(e) => setBaseline(e.target.value)}
                      placeholder="120"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="festival">Upcoming Festival/Event</Label>
                  <Select value={festival} onValueChange={setFestival}>
                    <SelectTrigger id="festival">
                      <SelectValue placeholder="Select event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="diwali">Diwali</SelectItem>
                      <SelectItem value="holi">Holi</SelectItem>
                      <SelectItem value="eid">Eid</SelectItem>
                      <SelectItem value="christmas">Christmas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={runPrediction} className="w-full" size="lg">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Run AI Prediction
                </Button>
              </Card>

              {prediction && (
                <Card className="p-6 space-y-4 animate-in fade-in slide-in-from-right duration-500 hover:shadow-xl transition-all border-primary/20">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Prediction Results
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Surge Level</span>
                      <Badge variant={prediction.levelColor as any} className="text-lg px-4 py-1">
                        {prediction.level}
                      </Badge>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Predicted Patients</span>
                        <span className="text-3xl font-bold text-primary">{prediction.predicted}</span>
                      </div>
                      <Progress value={prediction.surgePercent} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {prediction.surgePercent}% increase from baseline
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">AI Confidence</span>
                      <span className="text-lg font-semibold">{(prediction.confidence * 100).toFixed(0)}%</span>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">Key Factors</span>
                      <div className="flex gap-2 mt-2">
                        {prediction.factors.map((factor: string) => (
                          <Badge key={factor} variant="outline">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t space-y-3">
                    <h3 className="font-semibold">Resource Requirements</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center p-2 bg-primary/5 rounded">
                        <div className="text-2xl font-bold text-primary">+{prediction.extraDoctors}</div>
                        <div className="text-xs text-muted-foreground">Doctors</div>
                      </div>
                      <div className="text-center p-2 bg-accent/5 rounded">
                        <div className="text-2xl font-bold text-accent">+{prediction.extraNurses}</div>
                        <div className="text-xs text-muted-foreground">Nurses</div>
                      </div>
                      <div className="text-center p-2 bg-success/5 rounded">
                        <div className="text-2xl font-bold text-success">+{prediction.extraBeds}</div>
                        <div className="text-xs text-muted-foreground">Beds</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" className="flex-1" onClick={downloadReport}>
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                    <Button className="flex-1" onClick={sendToGovernment}>
                      <Send className="w-4 h-4 mr-2" />
                      Send to Gov
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* Recent Alerts */}
            {alerts.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Recent Alerts & Predictions</h3>
                <div className="space-y-2">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <span className="font-medium">Surge Alert - {alert.predicted_cases} patients</span>
                        <div className="text-sm text-muted-foreground">
                          {new Date(alert.created_at).toLocaleString()}
                        </div>
                      </div>
                      <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Tab 2: Inventory Management */}
          <TabsContent value="inventory">
            <Card className="p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-primary" />
                Medical Supply Inventory
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource</TableHead>
                    <TableHead>In Stock</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((resource) => {
                    const percentage = (resource.current / resource.required) * 100;
                    const isLow = percentage < 50;
                    return (
                      <TableRow key={resource.id}>
                        <TableCell className="font-medium">{resource.name}</TableCell>
                        <TableCell>{resource.current}</TableCell>
                        <TableCell>{resource.required}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={percentage} className="w-24 h-2" />
                            <Badge variant={isLow ? "destructive" : "secondary"}>
                              {percentage.toFixed(0)}%
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Tab 3: Staff Management */}
          <TabsContent value="staff">
            <Card className="p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                On-Call Medical Staff
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {staff.map((person) => (
                  <Card key={person.id} className="p-4 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold">{person.name}</h3>
                        <p className="text-sm text-muted-foreground">{person.dept}</p>
                      </div>
                      <Badge variant={person.status === "Available" ? "secondary" : "default"}>
                        {person.status}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HospitalDashboard;
