import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Star, CheckCircle, Clock, IndianRupee, TrendingUp, Award, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BottomNav } from "./BottomNav";

export function CompareBids() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [selectedBid, setSelectedBid] = useState<string | null>(null);

  const project = {
    id: projectId || "1",
    title: "Apartment Painting",
    location: "Indiranagar, Bangalore",
    budget: "₹10,000",
    timeline: "5 days",
  };

  const bids = [
    {
      id: "1",
      worker: {
        id: "1",
        name: "Rajesh Kumar",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        rating: 4.8,
        completedJobs: 142,
        verified: true,
        skills: ["Painting", "Masonry", "Plastering"],
        location: "Bangalore",
        distance: "2.3 km",
      },
      amount: "₹9,500",
      timeline: "4 days",
      proposalText: "I have 15+ years of experience in residential painting. I can complete your 3BHK apartment within 4 days with high-quality materials. I specialize in texture painting and provide a 1-year warranty on my work.",
      submittedAt: "2 hours ago",
      recommended: true,
    },
    {
      id: "2",
      worker: {
        id: "2",
        name: "Amit Sharma",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        rating: 4.6,
        completedJobs: 89,
        verified: true,
        skills: ["Painting", "Waterproofing"],
        location: "Bangalore",
        distance: "3.1 km",
      },
      amount: "₹8,800",
      timeline: "5 days",
      proposalText: "Professional painter with expertise in Asian Paints products. I provide detailed surface preparation and ensure smooth finish. Free color consultation included.",
      submittedAt: "5 hours ago",
      recommended: false,
    },
    {
      id: "3",
      worker: {
        id: "3",
        name: "Vikram Singh",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop",
        rating: 4.9,
        completedJobs: 203,
        verified: true,
        skills: ["Painting", "Interior Design", "Texture Work"],
        location: "Bangalore",
        distance: "4.8 km",
      },
      amount: "₹11,200",
      timeline: "3 days",
      proposalText: "Premium painting service with designer finishes. I use only premium brands and eco-friendly paints. My team can complete the work in 3 days with minimal disruption.",
      submittedAt: "1 day ago",
      recommended: false,
    },
    {
      id: "4",
      worker: {
        id: "4",
        name: "Suresh Patel",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
        rating: 4.5,
        completedJobs: 67,
        verified: false,
        skills: ["Painting"],
        location: "Bangalore",
        distance: "5.2 km",
      },
      amount: "₹7,500",
      timeline: "6 days",
      proposalText: "Budget-friendly painting service. I work carefully and ensure customer satisfaction. References available upon request.",
      submittedAt: "1 day ago",
      recommended: false,
    },
  ];

  const sortedBids = {
    recommended: bids.filter(b => b.recommended),
    lowestPrice: [...bids].sort((a, b) => parseInt(a.amount.replace(/[₹,]/g, '')) - parseInt(b.amount.replace(/[₹,]/g, ''))),
    fastest: [...bids].sort((a, b) => parseInt(a.timeline) - parseInt(b.timeline)),
    topRated: [...bids].sort((a, b) => b.worker.rating - a.worker.rating),
  };

  const handleAcceptBid = (bidId: string) => {
    setSelectedBid(bidId);
    // Show confirmation dialog
    if (confirm("Are you sure you want to accept this bid? The worker will be notified and the project will begin.")) {
      alert("Bid accepted! The worker has been notified.");
      navigate("/contractor");
    }
  };

  const BidCard = ({ bid }: { bid: typeof bids[0] }) => (
    <Card className={`p-5 ${selectedBid === bid.id ? 'ring-2 ring-primary' : ''} transition-all`}>
      {bid.recommended && (
        <Badge className="bg-green-100 text-green-800 border-0 mb-3">
          <Award className="h-3 w-3 mr-1" />
          Recommended
        </Badge>
      )}
      
      {/* Worker Info */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="cursor-pointer"
          onClick={() => navigate(`/worker/${bid.worker.id}`)}
        >
          <Avatar className="h-14 w-14 border-2 border-gray-200">
            <AvatarImage src={bid.worker.avatar} />
            <AvatarFallback>{bid.worker.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div
              className="cursor-pointer"
              onClick={() => navigate(`/worker/${bid.worker.id}`)}
            >
              <h4 className="font-semibold flex items-center gap-2">
                {bid.worker.name}
                {bid.worker.verified && (
                  <CheckCircle className="h-4 w-4 text-secondary" />
                )}
              </h4>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{bid.worker.rating}</span>
            </div>
            <span>•</span>
            <span>{bid.worker.completedJobs} jobs</span>
          </div>
          
          <div className="flex flex-wrap gap-1.5 mb-2">
            {bid.worker.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs bg-accent">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-3.5 w-3.5" />
            <span>{bid.worker.distance} away</span>
          </div>
        </div>
      </div>

      {/* Bid Details */}
      <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-accent rounded-lg">
        <div>
          <p className="text-xs text-gray-600 mb-1">Bid Amount</p>
          <p className="text-xl font-bold text-primary">{bid.amount}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Timeline</p>
          <p className="text-xl font-bold">{bid.timeline}</p>
        </div>
      </div>

      {/* Proposal */}
      <div className="mb-4">
        <p className="text-sm text-gray-700 line-clamp-3">{bid.proposalText}</p>
        <button
          className="text-sm text-primary hover:underline mt-1"
          onClick={() => navigate(`/worker/${bid.worker.id}`)}
        >
          Read more
        </button>
      </div>

      {/* Submitted Time */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          <span>Submitted {bid.submittedAt}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => navigate(`/worker/${bid.worker.id}`)}
        >
          View Profile
        </Button>
        <Button
          className="flex-1 bg-primary hover:bg-primary/90"
          onClick={() => handleAcceptBid(bid.id)}
        >
          Accept Bid
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-muted pb-24">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-screen-lg mx-auto p-4">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/contractor")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h2 className="font-bold">Compare Bids</h2>
              <p className="text-sm text-gray-600">{project.title}</p>
            </div>
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-accent rounded-lg">
            <div>
              <p className="text-xs text-gray-600">Your Budget</p>
              <p className="font-semibold">{project.budget}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Timeline</p>
              <p className="font-semibold">{project.timeline}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Total Bids</p>
              <p className="font-semibold">{bids.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto p-4">
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="price">Price</TabsTrigger>
            <TabsTrigger value="speed">Speed</TabsTrigger>
            <TabsTrigger value="rating">Rating</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {sortedBids.recommended.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Recommended for You
                </h3>
                {sortedBids.recommended.map((bid) => (
                  <BidCard key={bid.id} bid={bid} />
                ))}
              </div>
            )}
            
            <div>
              <h3 className="mb-3 text-lg font-semibold">All Bids</h3>
              <div className="space-y-3">
                {bids.filter(b => !b.recommended).map((bid) => (
                  <BidCard key={bid.id} bid={bid} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="price" className="space-y-3">
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
              <IndianRupee className="h-4 w-4" />
              <span>Sorted by lowest price first</span>
            </div>
            {sortedBids.lowestPrice.map((bid) => (
              <BidCard key={bid.id} bid={bid} />
            ))}
          </TabsContent>

          <TabsContent value="speed" className="space-y-3">
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Sorted by fastest completion time</span>
            </div>
            {sortedBids.fastest.map((bid) => (
              <BidCard key={bid.id} bid={bid} />
            ))}
          </TabsContent>

          <TabsContent value="rating" className="space-y-3">
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
              <Star className="h-4 w-4" />
              <span>Sorted by highest rating first</span>
            </div>
            {sortedBids.topRated.map((bid) => (
              <BidCard key={bid.id} bid={bid} />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
}
