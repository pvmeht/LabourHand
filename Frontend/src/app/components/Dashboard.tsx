import { useState, useEffect } from "react";
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
import { projectApi, Project } from "../../utils/api";
import { SessionManager } from "../../utils/session";
import { ProjectMap } from "./ProjectMap";

import { DesktopNav } from "./DesktopNav";

export function Dashboard() {
  const [userMode, setUserMode] = useState<"worker" | "owner">("worker");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const navigate = useNavigate();
  const [nearbyOpportunities, setNearbyOpportunities] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = SessionManager.getCurrentUser();

  const [radius, setRadius] = useState<number>(10);

  useEffect(() => {
    if (currentUser) setUserMode(currentUser.role as 'worker' | 'owner');
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [radius]);

  const fetchProjects = () => {
    setLoading(true);
    projectApi.getNearby(12.9716, 77.5946, radius).then(setNearbyOpportunities).catch(console.error).finally(() => setLoading(false));
  };

  const jobCategories = [
    { id: 1, name: "Construction", icon: Hammer, color: "bg-orange-100" },
    { id: 2, name: "Plumbing", icon: Droplets, color: "bg-blue-100" },
    { id: 3, name: "Electrical", icon: Zap, color: "bg-yellow-100" },
    { id: 4, name: "Painting", icon: PaintBucket, color: "bg-purple-100" },
    { id: 5, name: "Carpentry", icon: Wrench, color: "bg-green-100" },
    { id: 6, name: "Masonry", icon: Home, color: "bg-red-100" },
  ];


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN_FOR_BIDS":
        return <Badge className="bg-green-100 text-green-800 border-0">Open for Bids</Badge>;
      case "IN_PROGRESS":
        return <Badge className="bg-blue-100 text-blue-800 border-0">In Progress</Badge>;
      case "COMPLETED":
        return <Badge className="bg-gray-100 text-gray-800 border-0">Completed</Badge>;
      case "PAYMENT_VERIFIED":
        return <Badge className="bg-green-100 text-green-800 border-0">Payment Verified</Badge>;
      default:
        return null;
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  return (
    <div className="flex bg-muted">
      <DesktopNav />
      <div className="flex-1 min-w-0 min-h-screen pb-24 md:pb-0">
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
            className={`transition-colors ${userMode === "worker" ? "text-foreground" : "text-muted-foreground"
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
            className={`transition-colors ${userMode === "owner" ? "text-foreground" : "text-muted-foreground"
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
          <div className="flex justify-between items-center mb-3">
            <h3>Nearby Opportunities</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Radius:</span>
              <input
                type="range"
                min="1"
                max="50"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-24 accent-primary"
              />
              <span className="text-sm text-muted-foreground w-12">{radius} km</span>
            </div>
          </div>
          <Card className="overflow-hidden">
            {/* Real React-Leaflet Map View */}
            <div className="relative h-64 z-0">
               {loading ? (
                   <div className="flex bg-gray-50 items-center justify-center w-full h-full text-muted-foreground">
                       Loading Map...
                   </div>
               ) : (
                   <ProjectMap projects={nearbyOpportunities} centerPos={[12.9716, 77.5946]} />
               )}
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
                    {job.distanceKm !== undefined ? job.distanceKm.toFixed(1) : '?'} km away
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
          className="fixed bottom-20 md:bottom-6 right-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-all z-50"
          onClick={() => navigate("/contractor")}
        >
          <Plus className="h-6 w-6" />
        </button>
      )}

      <BottomNav />
      </div>
    </div>
  );
}