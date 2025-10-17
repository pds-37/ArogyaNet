import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Package, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const NGO = () => {
  const volunteers = [
    { name: "Raj Sharma", area: "Mumbai Central", status: "Active", tasks: 8 },
    { name: "Priya Patel", area: "Delhi NCR", status: "Active", tasks: 12 },
    { name: "Amit Kumar", area: "Bangalore", status: "Available", tasks: 5 },
    { name: "Sneha Reddy", area: "Pune", status: "Active", tasks: 10 },
  ];

  const supplies = [
    { item: "N95 Masks", stock: 5000, needed: 8000, priority: "HIGH" },
    { item: "Medical Supplies", stock: 3500, needed: 4000, priority: "MEDIUM" },
    { item: "Oxygen Cylinders", stock: 150, needed: 200, priority: "HIGH" },
    { item: "PPE Kits", stock: 2000, needed: 2500, priority: "MEDIUM" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-success/5 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Heart className="w-10 h-10 text-success" />
            <div>
              <h1 className="text-3xl font-bold">NGO Dashboard</h1>
              <p className="text-sm text-muted-foreground">Coordinate volunteers & relief efforts</p>
            </div>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            {volunteers.length} Active
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-success" />
              Volunteer Status
            </h2>

            <div className="space-y-3">
              {volunteers.map((volunteer, idx) => (
                <Card key={idx} className="p-4 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{volunteer.name}</h3>
                    <Badge variant={volunteer.status === "Active" ? "default" : "secondary"}>
                      {volunteer.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {volunteer.area}
                    </span>
                    <span className="text-muted-foreground">{volunteer.tasks} tasks completed</span>
                  </div>
                </Card>
              ))}
            </div>

            <Button className="w-full mt-4">Assign New Tasks</Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-success" />
              Supply Inventory
            </h2>

            <div className="space-y-4">
              {supplies.map((supply, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{supply.item}</span>
                    <Badge
                      variant={supply.priority === "HIGH" ? "destructive" : "default"}
                      className="text-xs"
                    >
                      {supply.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      Stock: {supply.stock} / {supply.needed}
                    </span>
                    <span>{Math.round((supply.stock / supply.needed) * 100)}%</span>
                  </div>
                  <Progress value={(supply.stock / supply.needed) * 100} className="h-2" />
                </div>
              ))}
            </div>

            <Button className="w-full mt-4" variant="outline">
              Request More Supplies
            </Button>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Active Advisories</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 bg-destructive/5 border-destructive/20">
              <Badge variant="destructive" className="mb-2">
                HIGH ALERT
              </Badge>
              <h3 className="font-semibold mb-2">Air Quality Crisis - Mumbai</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Deploy volunteers for mask distribution and public awareness campaigns. Focus on vulnerable
                populations.
              </p>
              <Button size="sm" className="w-full">
                Mobilize Team
              </Button>
            </Card>

            <Card className="p-4 bg-warning/5 border-warning/20">
              <Badge className="mb-2">MEDIUM</Badge>
              <h3 className="font-semibold mb-2">Festival Crowd Management - Delhi</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Support hospital staff with crowd control and resource distribution during festival season.
              </p>
              <Button size="sm" variant="outline" className="w-full">
                View Details
              </Button>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NGO;
