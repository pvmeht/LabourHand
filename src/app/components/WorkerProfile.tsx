import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  MapPin,
  Star,
  CheckCircle,
  Award,
  Briefcase,
  Calendar,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BottomNav } from "./BottomNav";

export function WorkerProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const worker = {
    id: id || "1",
    name: "Rajesh Kumar",
    specialization: "Senior Mason",
    yearsOfExperience: 15,
    rating: 4.8,
    completedJobs: 127,
    location: "Bangalore, Karnataka",
    verified: true,
    skillsIndiaVerified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    bio: "Experienced mason specializing in brick-laying, tiling, and concrete work. Committed to delivering high-quality craftsmanship on every project.",
  };

  const skills = [
    "Brick-laying",
    "Tiling",
    "Concrete Work",
    "Plastering",
    "Stone Masonry",
    "Waterproofing",
  ];

  const workHistory = [
    {
      id: 1,
      projectName: "Residential Villa Construction",
      client: "Arjun Mehta",
      date: "Jan 2026",
      rating: 5.0,
      review:
        "Excellent work! Rajesh completed the masonry work ahead of schedule with perfect quality.",
      duration: "45 days",
    },
    {
      id: 2,
      projectName: "Commercial Building Foundation",
      client: "Sunita Developers",
      date: "Nov 2025",
      rating: 4.8,
      review:
        "Very professional and skilled. The foundation work was done perfectly.",
      duration: "30 days",
    },
    {
      id: 3,
      projectName: "Apartment Complex - Tower B",
      client: "Prestige Constructions",
      date: "Aug 2025",
      rating: 4.9,
      review:
        "Outstanding quality and attention to detail. Highly recommend!",
      duration: "60 days",
    },
    {
      id: 4,
      projectName: "Kitchen Renovation",
      client: "Priya Sharma",
      date: "Jun 2025",
      rating: 4.7,
      review:
        "Good work on tiling and plastering. Completed on time.",
      duration: "12 days",
    },
  ];

  const certifications = [
    {
      id: 1,
      name: "Skills India Certified Mason",
      issuer: "National Skill Development Corporation",
      year: "2023",
    },
    {
      id: 2,
      name: "Construction Safety Training",
      issuer: "CIDC",
      year: "2024",
    },
  ];

  return (
    <div className="min-h-screen bg-muted pb-6">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-screen-lg mx-auto p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2>Worker Profile</h2>
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto p-4 space-y-4">
        {/* Profile Header Card */}
        <Card className="p-5">
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
            <Avatar className="h-24 w-24 border-4 border-secondary">
              <AvatarImage src={worker.avatar} />
              <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl">{worker.name}</h1>
                {worker.verified && (
                  <CheckCircle className="h-5 w-5 text-secondary" />
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Badge
                  variant="secondary"
                  className="bg-accent text-accent-foreground"
                >
                  {worker.specialization}
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{worker.yearsOfExperience} years experience</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-foreground text-base">
                    {worker.rating}
                  </span>
                  <span className="ml-1">({worker.completedJobs} jobs)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{worker.location}</span>
                </div>
              </div>
              {worker.skillsIndiaVerified && (
                <div className="flex items-center gap-2 p-2 bg-secondary/10 rounded-lg border border-secondary/30 inline-flex">
                  <Award className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-semibold text-secondary">
                    Skills India Verified
                  </span>
                </div>
              )}
            </div>
          </div>

          <p className="text-muted-foreground mb-4">{worker.bio}</p>

          <div className="flex gap-2">
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-11">
              Hire Now
            </Button>
            <Button variant="outline" className="h-11 px-6">
              Message
            </Button>
          </div>
        </Card>

        {/* Skills Section */}
        <Card className="p-5">
          <h3 className="mb-3">Skills & Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-3 py-1.5 text-sm border-primary/30 bg-accent"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Certifications */}
        <Card className="p-5">
          <h3 className="mb-3">Certifications</h3>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="flex items-start gap-3 p-3 bg-accent rounded-lg"
              >
                <div className="bg-secondary/20 p-2 rounded-lg">
                  <Award className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm mb-1">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer} • {cert.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Work History Timeline */}
        <Card className="p-5">
          <h3 className="mb-4">Work History</h3>
          <div className="space-y-4">
            {workHistory.map((project, index) => (
              <div key={project.id} className="relative">
                {/* Timeline line */}
                {index !== workHistory.length - 1 && (
                  <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-border" />
                )}

                <div className="flex gap-3">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="bg-accent p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="mb-1">{project.projectName}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <span>{project.client}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{project.date}</span>
                            </div>
                            <span>•</span>
                            <span>{project.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-sm">
                            {project.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        "{project.review}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Stats Card */}
        <Card className="p-5">
          <h3 className="mb-4">Performance Stats</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-accent rounded-lg">
              <p className="text-2xl font-bold text-primary">
                {worker.completedJobs}
              </p>
              <p className="text-sm text-muted-foreground">Projects Done</p>
            </div>
            <div className="text-center p-3 bg-accent rounded-lg">
              <p className="text-2xl font-bold text-primary">{worker.rating}</p>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </div>
            <div className="text-center p-3 bg-accent rounded-lg">
              <p className="text-2xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground">On-Time Rate</p>
            </div>
            <div className="text-center p-3 bg-accent rounded-lg">
              <p className="text-2xl font-bold text-primary">95%</p>
              <p className="text-sm text-muted-foreground">Rehire Rate</p>
            </div>
          </div>
        </Card>
      </div>
      
      <BottomNav />
    </div>
  );
}