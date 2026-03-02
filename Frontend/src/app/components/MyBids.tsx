import { useNavigate } from "react-router";
import { ArrowLeft, Clock, IndianRupee, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BottomNav } from "./BottomNav";

export function MyBids() {
  const navigate = useNavigate();

  const myBids = [
    {
      id: 1,
      projectTitle: "Apartment Painting",
      location: "Indiranagar, Bangalore",
      distance: "2.5 km",
      myBid: "₹9,500",
      status: "pending",
      submittedDate: "1 day ago",
      estimatedDays: 4,
    },
    {
      id: 2,
      projectTitle: "Kitchen Renovation",
      location: "Koramangala, Bangalore",
      distance: "3.8 km",
      myBid: "₹44,000",
      status: "accepted",
      submittedDate: "3 days ago",
      estimatedDays: 7,
    },
    {
      id: 3,
      projectTitle: "Electrical Wiring",
      location: "Whitefield, Bangalore",
      distance: "5.1 km",
      myBid: "₹14,500",
      status: "rejected",
      submittedDate: "5 days ago",
      estimatedDays: 3,
    },
  ];

  const activeJobs = [
    {
      id: 1,
      projectTitle: "Kitchen Renovation",
      location: "Koramangala, Bangalore",
      progress: 45,
      status: "in-progress",
      payment: "₹44,000",
      daysLeft: 4,
    },
  ];

  const completedJobs = [
    {
      id: 1,
      projectTitle: "Bathroom Tiling",
      location: "HSR Layout, Bangalore",
      completedDate: "Feb 28, 2026",
      payment: "₹8,500",
      status: "payment-verified",
      rating: 4.8,
    },
    {
      id: 2,
      projectTitle: "Wall Plastering",
      location: "BTM Layout, Bangalore",
      completedDate: "Feb 20, 2026",
      payment: "₹6,200",
      status: "completed",
      rating: 4.9,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Open for Bids</Badge>
        );
      case "accepted":
        return <Badge className="bg-green-100 text-green-800">Accepted</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Not Selected</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>;
      case "payment-verified":
        return (
          <Badge className="bg-green-100 text-green-800">
            Payment Verified
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted pb-24">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-screen-lg mx-auto p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2>My Bids</h2>
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto p-4">
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          {/* Pending Bids */}
          <TabsContent value="pending" className="space-y-3">
            {myBids.map((bid) => (
              <Card
                key={bid.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/project/${bid.id}`)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="flex-1">{bid.projectTitle}</h4>
                  {getStatusBadge(bid.status)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{bid.location}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg mb-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Your Bid
                    </p>
                    <p className="text-lg font-bold text-primary">{bid.myBid}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">
                      Timeline
                    </p>
                    <p className="text-lg font-bold">{bid.estimatedDays}d</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {bid.distance} away
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {bid.submittedDate}
                  </span>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Active Jobs */}
          <TabsContent value="active" className="space-y-3">
            {activeJobs.map((job) => (
              <Card key={job.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="flex-1">{job.projectTitle}</h4>
                  {getStatusBadge(job.status)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{job.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-primary" />
                    <span className="font-bold">{job.payment}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{job.daysLeft} days left</span>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Completed Jobs */}
          <TabsContent value="completed" className="space-y-3">
            {completedJobs.map((job) => (
              <Card key={job.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="flex-1">{job.projectTitle}</h4>
                  {getStatusBadge(job.status)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Payment
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      {job.payment}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Rating</p>
                    <p className="text-lg font-bold">⭐ {job.rating}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Completed on {job.completedDate}
                </p>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
}
