import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Users,
  Briefcase,
  Calendar,
  TrendingUp,
  MapPin,
  CheckCircle,
  Clock,
  MoreVertical,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function ContractorDashboard() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("This Week");

  const teamMembers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Mason",
      status: "on-site",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      currentSite: "Project Alpha",
    },
    {
      id: 2,
      name: "Amit Patel",
      role: "Painter",
      status: "available",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      currentSite: null,
    },
    {
      id: 3,
      name: "Suresh Singh",
      role: "Electrician",
      status: "on-site",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      currentSite: "Project Beta",
    },
    {
      id: 4,
      name: "Vijay Kumar",
      role: "Plumber",
      status: "on-site",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      currentSite: "Project Gamma",
    },
    {
      id: 5,
      name: "Ravi Sharma",
      role: "Carpenter",
      status: "available",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
      currentSite: null,
    },
  ];

  const activeProjects = [
    {
      id: 1,
      name: "Project Alpha - Villa Construction",
      location: "Whitefield, Bangalore",
      progress: 65,
      workersAssigned: 3,
      deadline: "Mar 15, 2026",
      status: "on-track",
    },
    {
      id: 2,
      name: "Project Beta - Office Renovation",
      location: "Koramangala, Bangalore",
      progress: 40,
      workersAssigned: 2,
      deadline: "Mar 20, 2026",
      status: "on-track",
    },
    {
      id: 3,
      name: "Project Gamma - Apartment Complex",
      location: "Indiranagar, Bangalore",
      progress: 85,
      workersAssigned: 4,
      deadline: "Mar 10, 2026",
      status: "at-risk",
    },
  ];

  const projectsWithBids = [
    {
      id: 1,
      title: "Apartment Painting",
      location: "Indiranagar, Bangalore",
      budget: "₹10,000",
      bidsReceived: 4,
      postedAt: "2 days ago",
      status: "open-for-bids",
    },
    {
      id: 2,
      title: "Kitchen Renovation",
      location: "Koramangala, Bangalore",
      budget: "₹45,000",
      bidsReceived: 7,
      postedAt: "3 days ago",
      status: "open-for-bids",
    },
  ];

  const earningsData = [
    { day: "Mon", earnings: 8500 },
    { day: "Tue", earnings: 12000 },
    { day: "Wed", earnings: 15000 },
    { day: "Thu", earnings: 11000 },
    { day: "Fri", earnings: 18000 },
    { day: "Sat", earnings: 20000 },
    { day: "Sun", earnings: 9000 },
  ];

  const scheduleEvents = [
    {
      id: 1,
      date: "2026-03-03",
      worker: "Rajesh Kumar",
      project: "Project Alpha",
      time: "9:00 AM - 5:00 PM",
    },
    {
      id: 2,
      date: "2026-03-03",
      worker: "Suresh Singh",
      project: "Project Beta",
      time: "8:00 AM - 4:00 PM",
    },
    {
      id: 3,
      date: "2026-03-04",
      worker: "Vijay Kumar",
      project: "Project Gamma",
      time: "10:00 AM - 6:00 PM",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-site":
        return "bg-green-100 text-green-800";
      case "available":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-green-100 text-green-800";
      case "at-risk":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-muted pb-6">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h2>Contractor Dashboard</h2>
            </div>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              + New Project
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-primary" />
                <p className="text-xs text-muted-foreground">Team Size</p>
              </div>
              <p className="text-2xl font-bold">{teamMembers.length}</p>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="h-4 w-4 text-secondary" />
                <p className="text-xs text-muted-foreground">Active Projects</p>
              </div>
              <p className="text-2xl font-bold">{activeProjects.length}</p>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
              <p className="text-2xl font-bold">
                {teamMembers.filter((m) => m.status === "available").length}
              </p>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <p className="text-xs text-muted-foreground">Weekly Earnings</p>
              </div>
              <p className="text-2xl font-bold">₹93.5k</p>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4">
        <Tabs defaultValue="bids" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="bids">Bids</TabsTrigger>
            <TabsTrigger value="team">My Team</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          {/* Bids Tab */}
          <TabsContent value="bids" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3>Projects with Bids ({projectsWithBids.length})</h3>
            </div>

            <div className="space-y-3">
              {projectsWithBids.map((project) => (
                <Card key={project.id} className="p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="mb-2">{project.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Posted {project.postedAt}</span>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-0">
                      Open for Bids
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-accent rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Budget</p>
                      <p className="text-lg font-bold">{project.budget}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Bids Received</p>
                      <p className="text-lg font-bold text-secondary">{project.bidsReceived}</p>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => navigate(`/compare-bids/${project.id}`)}
                  >
                    Compare Bids
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Team Tab */}
          <TabsContent value="team" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3>Team Members ({teamMembers.length})</h3>
              <Button variant="outline" size="sm">
                + Add Worker
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <Card key={member.id} className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-12 w-12 border-2 border-secondary">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="text-base mb-1">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Badge className={getStatusColor(member.status)}>
                      {member.status === "on-site" ? "On Site" : "Available"}
                    </Badge>
                    {member.currentSite && (
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>{member.currentSite}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => navigate(`/worker/${member.id}`)}
                    >
                      View Profile
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3>Active Projects ({activeProjects.length})</h3>
            </div>

            <div className="space-y-3">
              {activeProjects.map((project) => (
                <Card key={project.id} className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="mb-2">{project.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                    <Badge className={getProjectStatusColor(project.status)}>
                      {project.status === "on-track" ? "On Track" : "At Risk"}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{project.workersAssigned} workers</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Due {project.deadline}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    View Details
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3>Worker Schedule</h3>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Calendar View
              </Button>
            </div>

            {/* Daily Earnings Chart */}
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h4>Daily Earnings</h4>
                <select
                  className="text-sm border border-border rounded px-3 py-1.5 bg-white"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option>This Week</option>
                  <option>Last Week</option>
                  <option>This Month</option>
                </select>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="day"
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => `₹${value / 1000}k`}
                  />
                  <Tooltip
                    formatter={(value) => [`₹${value}`, "Earnings"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#F27121"
                    strokeWidth={3}
                    dot={{ fill: "#F27121", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total</p>
                  <p className="text-xl font-bold text-primary">₹93,500</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Average</p>
                  <p className="text-xl font-bold">₹13,357</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Peak Day</p>
                  <p className="text-xl font-bold text-green-600">₹20,000</p>
                </div>
              </div>
            </Card>

            {/* Schedule List */}
            <div className="space-y-3">
              <h4>Upcoming Assignments</h4>
              {scheduleEvents.map((event) => (
                <Card key={event.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-base">{event.worker}</h4>
                        <span className="text-sm text-muted-foreground">
                          {event.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {event.project}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {new Date(event.date).toLocaleDateString("en-IN", {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}