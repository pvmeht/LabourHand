import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  IndianRupee,
  Star,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BottomNav } from "./BottomNav";
import { projectApi, bidApi, Project, Bid } from "../../utils/api";
import { ProjectMap } from "./ProjectMap";

export function ProjectDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      projectApi.getById(Number(id)),
      bidApi.getProjectBids(Number(id)),
    ])
      .then(([p, b]) => { setProject(p); setBids(b); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Project not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 px-4 py-3 flex items-center gap-3 border-b">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-semibold text-gray-900">Project Details</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Project Info */}
        <Card className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{project.title}</h2>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <MapPin className="h-4 w-4" />
                {project.location}
                {project.distanceKm && (
                  <span className="ml-1">· {project.distanceKm.toFixed(1)} km away</span>
                )}
              </div>
            </div>
            <Badge
              className={
                project.status === "OPEN_FOR_BIDS"
                  ? "bg-green-100 text-green-800"
                  : project.status === "IN_PROGRESS"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
              }
            >
              {project.status === "OPEN_FOR_BIDS"
                ? "Open for Bids"
                : project.status === "IN_PROGRESS"
                  ? "In Progress"
                  : project.status.replace(/_/g, " ")}
            </Badge>
          </div>

          <p className="text-gray-600 text-sm mb-4">{project.description}</p>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <IndianRupee className="h-5 w-5 text-green-600 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Budget</p>
              <p className="font-semibold text-sm">₹{project.budget.toLocaleString()}</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Timeline</p>
              <p className="font-semibold text-sm">{project.timelineDays} days</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Avatar className="h-5 w-5 mx-auto mb-1">
                <AvatarFallback className="text-xs bg-purple-200">
                  {project.ownerName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className="text-xs text-gray-500">Posted by</p>
              <p className="font-semibold text-sm truncate">{project.ownerName}</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-3">Posted {project.postedAt}</p>
        </Card>

        {/* Location Map */}
        <Card className="overflow-hidden p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Project Location</h3>
          <div className="h-48 w-full rounded-lg overflow-hidden relative z-0">
             <ProjectMap projects={[project]} centerPos={project.lat && project.lng ? [project.lat, project.lng] : [12.9716, 77.5946]} />
          </div>
        </Card>

        {/* Bids */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            Bids ({bids.length})
          </h3>
          {bids.length === 0 ? (
            <Card className="p-6 text-center text-gray-500">
              No bids yet. Be the first to bid!
            </Card>
          ) : (
            <div className="space-y-3">
              {bids.map((bid) => (
                <Card key={bid.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={bid.workerAvatar} />
                      <AvatarFallback>{bid.workerName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{bid.workerName}</span>
                        {bid.workerVerified && (
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {bid.workerRating} · {bid.workerCompletedJobs} jobs
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{bid.message}</p>
                      <div className="flex gap-3 text-sm">
                        <span className="font-semibold text-green-600">
                          ₹{bid.amount.toLocaleString()}
                        </span>
                        <span className="text-gray-500">{bid.estimatedDays} days</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Place Bid Button */}
        {project.status === "OPEN_FOR_BIDS" && (
          <Button
            className="w-full"
            onClick={() => navigate(`/project/${id}/bid`)}
          >
            Place Your Bid
          </Button>
        )}
      </div>

      <BottomNav />
    </div>
  );
}