import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, IndianRupee, Clock, MessageSquare, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { BottomNav } from "./BottomNav";

export function PlaceBid() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [bidAmount, setBidAmount] = useState("");
  const [completionTime, setCompletionTime] = useState("");
  const [message, setMessage] = useState("");

  const project = {
    id: projectId || "1",
    title: "Apartment Painting",
    description:
      "Need experienced painters for a 3BHK apartment. Walls and ceiling work required.",
    budget: "₹10,000",
    timeline: "5 days",
    location: "Indiranagar, Bangalore",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle bid submission
    alert("Bid submitted successfully!");
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-muted pb-6">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-screen-lg mx-auto p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/project/${projectId}`)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2>Place Your Bid</h2>
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto p-4 space-y-4">
        {/* Project Summary */}
        <Card className="p-5">
          <h3 className="mb-3">Project Summary</h3>
          <div className="space-y-2">
            <h4 className="text-lg">{project.title}</h4>
            <p className="text-sm text-muted-foreground">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="bg-accent p-1.5 rounded">
                  <IndianRupee className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Budget</p>
                  <p className="font-semibold">{project.budget}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="bg-accent p-1.5 rounded">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Timeline</p>
                  <p className="font-semibold">{project.timeline}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Info Box */}
        <Card className="p-4 bg-blue-50 border-secondary">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="bg-secondary/20 p-2 rounded-full">
                <Info className="h-5 w-5 text-secondary" />
              </div>
            </div>
            <div>
              <h4 className="text-sm mb-1">How Bidding Works</h4>
              <p className="text-sm text-muted-foreground">
                Submit a competitive quote based on your expertise and the
                project requirements. The bidding system ensures fair wages and
                helps you showcase your skills to potential clients. Be honest
                about your timeline and pricing to build trust.
              </p>
            </div>
          </div>
        </Card>

        {/* Bid Form */}
        <form onSubmit={handleSubmit}>
          <Card className="p-5">
            <h3 className="mb-4">Your Bid Details</h3>

            {/* Your Quote */}
            <div className="mb-6">
              <Label htmlFor="bidAmount" className="mb-2 block">
                Your Quote (₹) *
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <IndianRupee className="h-5 w-5" />
                </div>
                <Input
                  id="bidAmount"
                  type="number"
                  placeholder="Enter your quote amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="pl-10 h-12 text-lg"
                  required
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Owner's budget: {project.budget}
              </p>
            </div>

            {/* Estimated Completion Time */}
            <div className="mb-6">
              <Label htmlFor="completionTime" className="mb-2 block">
                Estimated Completion Time (days) *
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                </div>
                <Input
                  id="completionTime"
                  type="number"
                  placeholder="Number of days"
                  value={completionTime}
                  onChange={(e) => setCompletionTime(e.target.value)}
                  className="pl-10 h-12 text-lg"
                  required
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Expected timeline: {project.timeline}
              </p>
            </div>

            {/* Message to Owner */}
            <div className="mb-6">
              <Label htmlFor="message" className="mb-2 block">
                Message to Owner *
              </Label>
              <div className="relative">
                <Textarea
                  id="message"
                  placeholder="Introduce yourself and explain why you're the best fit for this project. Mention your relevant experience and what makes your bid competitive."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[120px] resize-none"
                  required
                />
                <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                  {message.length}/500
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Tip: Highlight your experience, certifications, and what
                differentiates your service.
              </p>
            </div>

            {/* Tips for Success */}
            <Card className="p-4 bg-accent mb-6">
              <h4 className="text-sm mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                Tips for a Winning Bid
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-6 list-disc">
                <li>Be realistic with your pricing and timeline</li>
                <li>Mention relevant experience and past similar projects</li>
                <li>Highlight any certifications or special skills</li>
                <li>Be professional and clear in your communication</li>
                <li>Respond promptly to owner inquiries</li>
              </ul>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg"
            >
              Submit Bid
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-3">
              By submitting this bid, you agree to LabourHand's terms of service
              and commit to the details provided above.
            </p>
          </Card>
        </form>

        {/* Additional Info */}
        <Card className="p-4">
          <h4 className="text-sm mb-2">What Happens Next?</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              1. The project owner will review your bid along with others
            </p>
            <p>
              2. You may receive follow-up questions from the owner
            </p>
            <p>
              3. If selected, you'll be notified and can begin work
            </p>
            <p>
              4. Payment is secured through LabourHand's platform
            </p>
          </div>
        </Card>
      </div>
      
      <BottomNav />
    </div>
  );
}