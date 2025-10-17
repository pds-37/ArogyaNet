import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, TrendingUp, Users, Bed, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Hospital = () => {
  const [aqi, setAqi] = useState("180");
  const [temperature, setTemperature] = useState("32");
  const [humidity, setHumidity] = useState("60");
  const [festival, setFestival] = useState("none");
  const [baseline, setBaseline] = useState("120");
  const [prediction, setPrediction] = useState<any>(null);

  const runPrediction = () => {
    // Mock prediction logic
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

    setPrediction({
      predicted,
      surgePercent,
      level,
      levelColor,
      confidence: 0.85,
      factors: ["AQI", festival !== "none" ? "Festival" : "Weather"],
      extraDoctors: surgePercent >= 40 ? 6 : surgePercent >= 20 ? 3 : 0,
      extraNurses: surgePercent >= 40 ? 10 : surgePercent >= 20 ? 5 : 0,
      extraBeds: surgePercent >= 40 ? 30 : surgePercent >= 20 ? 10 : 0,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Building2 className="w-10 h-10 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Hospital Dashboard</h1>
              <p className="text-sm text-muted-foreground">Predict surges & manage resources</p>
            </div>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Activity className="w-4 h-4 mr-2" />
            Live
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6 space-y-4">
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
              Run Prediction
            </Button>
          </Card>

          {prediction && (
            <Card className="p-6 space-y-4 animate-in fade-in slide-in-from-right duration-500">
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
                  <span className="text-sm text-muted-foreground">Confidence</span>
                  <span className="text-lg font-semibold">{(prediction.confidence * 100).toFixed(0)}%</span>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Top Factors</span>
                  <div className="flex gap-2 mt-2">
                    {prediction.factors.map((factor: string) => (
                      <Badge key={factor} variant="outline">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {prediction && (
          <Card className="p-6 animate-in fade-in slide-in-from-bottom duration-500">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Bed className="w-5 h-5 text-primary" />
              Resource Planner
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 bg-primary/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Extra Doctors</p>
                    <p className="text-3xl font-bold text-primary">+{prediction.extraDoctors}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary/50" />
                </div>
              </Card>

              <Card className="p-4 bg-accent/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Extra Nurses</p>
                    <p className="text-3xl font-bold text-accent">+{prediction.extraNurses}</p>
                  </div>
                  <Users className="w-8 h-8 text-accent/50" />
                </div>
              </Card>

              <Card className="p-4 bg-success/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Extra Beds</p>
                    <p className="text-3xl font-bold text-success">+{prediction.extraBeds}</p>
                  </div>
                  <Bed className="w-8 h-8 text-success/50" />
                </div>
              </Card>
            </div>

            <div className="mt-6 flex gap-4">
              <Button variant="outline" className="flex-1">
                Download PDF Report
              </Button>
              <Button className="flex-1">Send to Government</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Hospital;
