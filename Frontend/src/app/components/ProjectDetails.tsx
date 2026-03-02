import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  IndianRupee,
  Star,
  CheckCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BottomNav } from "./BottomNav";

export function ProjectDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const project = {
    id: id || "1",
    title: "Apartment Painting",
    description:
      "Need experienced painters for a 3BHK apartment. Walls and ceiling work required. High-quality finish expected.",
    timeline: "5 days",
    budget: "₹10,000",
    location: "Indiranagar, Bangalore",
    distance: "2.5 km",
    postedBy: "Priya Sharma",
    postedDate: "2 days ago",
    status: "open-for-bids",
  };

  const bids = [
    {
      id: 1,
      workerName: "Rajesh Kumar",
      workerId: "1",
      rating: 4.8,
      completedJobs: 127,
      bidAmount: "₹9,500",
      estimatedDays: 4,
      message: "I have 15 years of experience in painting. Can provide samples.",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      workerName: "Amit Patel",
      workerId: "2",
      rating: 4.6,
      completedJobs: 89,
      bidAmount: "₹9,800",
      estimatedDays: 5,
      message: "Quality work guaranteed. Free touch-up for 6 months.",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      workerName: "Suresh Singh",
      workerId: "3",
      rating: 4.9,
      completedJobs: 156,
      bidAmount: "₹10,200",
      estimatedDays: 4,
      message: "Expert painter with Asian Paints certification.",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
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

  return (
    <div className="min-h-screen bg-muted pb-24">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-screen-lg mx-auto p-4">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2>Project Details</h2>
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto p-4 space-y-4">
        {/* Project Info Card */}
        <Card className="p-5">
          <div className="flex items-start justify-between mb-3">
            <h1 className="flex-1">{project.title}</h1>
            {getStatusBadge(project.status)}
          </div>
          <p className="text-muted-foreground mb-4">{project.description}</p>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="bg-accent p-2 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Timeline</p>
                <p className="font-semibold">{project.timeline}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-accent p-2 rounded-lg">
                <IndianRupee className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="font-semibold">{project.budget}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-accent p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold">{project.location}</p>
              </div>
            </div>
          </div>

          {/* Prominent Distance Indicator */}
          <div className="mb-4">
            <Badge
              variant="outline"
              className="bg-blue-50 border-secondary text-secondary gap-1.5 px-3 py-1.5 text-sm font-semibold"
            >
              <MapPin className="h-4 w-4" />
              Distance from you: {project.distance}
            </Badge>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Posted by <span className="font-semibold text-foreground">{project.postedBy}</span> • {project.postedDate}
            </p>
          </div>
        </Card>

        {/* Live Bids Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3>Live Bids ({bids.length})</h3>
            <Button
              variant="outline"
              size="sm"
              className="h-9"
            >
              Compare Bids
            </Button>
          </div>

          <div className="space-y-3">
            {bids.map((bid) => (
              <Card key={bid.id} className="p-4">
                {/* Worker Info */}
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-14 w-14 border-2 border-secondary">
                    <AvatarImage src={bid.avatar} />
                    <AvatarFallback>{bid.workerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base">{bid.workerName}</h4>
                      {bid.verified && (
                        <CheckCircle className="h-4 w-4 text-secondary" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-foreground">
                          {bid.rating}
                        </span>
                      </div>
                      <span>•</span>
                      <span>{bid.completedJobs} jobs</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/worker/${bid.workerId}`)}
                  >
                    View Profile
                  </Button>
                </div>

                {/* Bid Details */}
                <div className="bg-accent p-3 rounded-lg mb-3">
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Bid Amount</p>
                      <p className="text-xl font-bold text-primary">
                        {bid.bidAmount}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Completion Time
                      </p>
                      <p className="text-xl font-bold">{bid.estimatedDays} days</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "{bid.message}"
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-11"
                  >
                    Accept Bid
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 px-6"
                  >
                    Message
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Place Your Bid (for workers viewing) */}
        <Card className="p-4 bg-accent border-primary">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="mb-1">Interested in this project?</h4>
              <p className="text-sm text-muted-foreground">
                Submit your bid to get hired
              </p>
            </div>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => navigate(`/bid/${project.id}`)}
            >
              Place Bid
            </Button>
          </div>
        </Card>
      </div>
      
      <BottomNav />
    </div>
  );
}