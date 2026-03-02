import { useState } from "react";
import { useNavigate } from "react-router";
import {
  MapPin,
  Plus,
  Hammer,
  Wrench,
  Zap,
  PaintBucket,
  Droplets,
  Home,
  CheckCircle,
  User,
  Languages,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BottomNav } from "./BottomNav";

export function Dashboard() {
  const [userMode, setUserMode] = useState<"worker" | "owner">("worker");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const navigate = useNavigate();

  const jobCategories = [
    { id: 1, name: "Construction", icon: Hammer, color: "bg-orange-100" },
    { id: 2, name: "Plumbing", icon: Droplets, color: "bg-blue-100" },
    { id: 3, name: "Electrical", icon: Zap, color: "bg-yellow-100" },
    { id: 4, name: "Painting", icon: PaintBucket, color: "bg-purple-100" },
    { id: 5, name: "Carpentry", icon: Wrench, color: "bg-green-100" },
    { id: 6, name: "Masonry", icon: Home, color: "bg-red-100" },
  ];

  const nearbyOpportunities = [
    {
      id: 1,
      title: "Apartment Painting",
      location: "Indiranagar, Bangalore",
      budget: "₹10,000",
      distance: "2.5 km",
      status: "open-for-bids",
      lat: 12.9716,
      lng: 77.6412,
    },
    {
      id: 2,
      title: "Kitchen Renovation",
      location: "Koramangala, Bangalore",
      budget: "₹45,000",
      distance: "3.8 km",
      status: "open-for-bids",
      lat: 12.9352,
      lng: 77.6245,
    },
    {
      id: 3,
      title: "Electrical Wiring",
      location: "Whitefield, Bangalore",
      budget: "₹15,000",
      distance: "5.1 km",
      status: "in-progress",
      lat: 12.9698,
      lng: 77.7499,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open-for-bids":
        return (
          <Badge className="bg-green-100 text-green-800 border-0">
            Open for Bids
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-0">
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-gray-100 text-gray-800 border-0">
            Completed
          </Badge>
        );
      case "payment-verified":
        return (
          <Badge className="bg-green-100 text-green-800 border-0">
            Payment Verified
          </Badge>
        );
      default:
        return null;
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  return (
    <div className="min-h-screen bg-muted pb-24">
      {/* Header with Profile */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-screen-lg mx-auto p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-secondary">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" />
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg">Rajesh Kumar</h2>
                <Badge
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground gap-1 px-2 py-0"
                >
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Senior Mason</p>
            </div>
          </div>
          
          {/* Language Toggle Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="gap-2 h-9 px-3 font-semibold"
          >
            <Languages className="h-4 w-4" />
            {language === "en" ? "हिंदी" : "English"}
          </Button>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center justify-center gap-3 mt-4 p-3 bg-accent rounded-lg max-w-screen-lg mx-auto">
          <span
            className={`transition-colors ${
              userMode === "worker" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Worker Mode
          </span>
          <Switch
            checked={userMode === "owner"}
            onCheckedChange={(checked) =>
              setUserMode(checked ? "owner" : "worker")
            }
            className="data-[state=checked]:bg-primary"
          />
          <span
            className={`transition-colors ${
              userMode === "owner" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Owner Mode
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-lg mx-auto p-4 space-y-6">
        {/* Nearby Opportunities Map */}
        <div>
          <h3 className="mb-3">Nearby Opportunities</h3>
          <Card className="overflow-hidden">
            {/* Mock Map View */}
            <div className="relative bg-gradient-to-br from-blue-50 to-green-50 h-64">
              {/* Map placeholder with pins */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="h-12 w-12 text-primary mx-auto" />
                  <p className="text-sm text-muted-foreground px-4">
                    Interactive map showing nearby job opportunities
                  </p>
                </div>
              </div>
              {/* Location Pins */}
              {nearbyOpportunities.map((opp, idx) => (
                <div
                  key={opp.id}
                  className="absolute animate-bounce"
                  style={{
                    top: `${30 + idx * 20}%`,
                    left: `${25 + idx * 25}%`,
                    animationDelay: `${idx * 200}ms`,
                  }}
                >
                  <button
                    onClick={() => navigate(`/project/${opp.id}`)}
                    className="relative group"
                  >
                    <MapPin className="h-8 w-8 text-primary fill-primary drop-shadow-lg" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                      <div className="bg-white rounded-lg shadow-lg p-2 text-xs whitespace-nowrap">
                        <p className="font-semibold">{opp.title}</p>
                        <p className="text-muted-foreground">{opp.budget}</p>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Nearby Jobs List */}
        <div>
          <h3 className="mb-3">Jobs Near You</h3>
          <div className="space-y-3">
            {nearbyOpportunities.map((job) => (
              <Card
                key={job.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/project/${job.id}`)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="mb-1 flex-1">{job.title}</h4>
                      {getStatusBadge(job.status)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge className="bg-primary text-primary-foreground border-0 text-base px-3 py-1">
                    {job.budget}
                  </Badge>
                  
                  {/* Prominent Distance Indicator */}
                  <Badge 
                    variant="outline" 
                    className="bg-blue-50 border-secondary text-secondary gap-1.5 px-3 py-1 text-sm font-semibold"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    {job.distance} away
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Job Categories */}
        <div>
          <h3 className="mb-3">Browse by Category</h3>
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex gap-3 pb-2">
              {jobCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={category.id}
                    className="flex-shrink-0 w-28 p-4 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div
                        className={`${category.color} p-3 rounded-full`}
                      >
                        <Icon className="h-6 w-6 text-foreground" />
                      </div>
                      <span className="text-sm">{category.name}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions for Owner Mode */}
        {userMode === "owner" && (
          <div>
            <h3 className="mb-3">Quick Actions</h3>
            <div className="grid gap-3">
              <Card className="p-4">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14"
                  onClick={() => navigate("/contractor")}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Post a New Job
                </Button>
              </Card>
              <Card
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate("/contractor")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4>Manage Team</h4>
                    <p className="text-sm text-muted-foreground">
                      5 workers available
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button (for Owner mode) */}
      {userMode === "owner" && (
        <button
          className="fixed bottom-20 right-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-all z-50"
          onClick={() => navigate("/contractor")}
        >
          <Plus className="h-6 w-6" />
        </button>
      )}
      
      <BottomNav />
    </div>
  );
}