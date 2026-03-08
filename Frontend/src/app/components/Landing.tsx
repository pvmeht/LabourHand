import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Hammer, MapPin, TrendingUp, Shield, Users, CheckCircle, ArrowRight, Briefcase, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { SessionManager } from "../../utils/session";

export function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = SessionManager.getCurrentUser();
    if (currentUser) {
      if (currentUser.role.toLowerCase() === 'worker') {
        navigate('/dashboard');
      } else {
        navigate('/contractor');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-lg p-2">
                <Hammer className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                LabourHand
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                How It Works
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-secondary/5 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">Trusted by 50,000+ Workers</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Work,<br />
                Your Worth
              </h1>
              
              <p className="text-xl text-gray-600 mb-4">
                India's most trusted platform connecting skilled workers with quality job opportunities.
              </p>
              
              <p className="text-lg text-gray-600 mb-8 font-hindi">
                भारत का सबसे विश्वसनीय प्लेटफॉर्म जो कुशल कामगारों को गुणवत्तापूर्ण नौकरी के अवसरों से जोड़ता है।
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Card className="flex-1 p-6 hover:shadow-lg transition-all cursor-pointer border-2 border-primary bg-primary/5" onClick={() => navigate("/register?role=worker")}>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary rounded-lg p-3">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">For Workers</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Find jobs, build your profile, grow your income
                      </p>
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <span>Get Started</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="flex-1 p-6 hover:shadow-lg transition-all cursor-pointer border-2 border-secondary bg-secondary/5" onClick={() => navigate("/register?role=owner")}>
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary rounded-lg p-3">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">For Employers</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Post jobs, compare bids, hire skilled workers
                      </p>
                      <div className="flex items-center gap-2 text-secondary font-medium">
                        <span>Get Started</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-gray-900">50K+</p>
                  <p className="text-sm text-gray-600">Active Workers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">2.5L+</p>
                  <p className="text-sm text-gray-600">Jobs Posted</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">4.8★</p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
              </div>
            </div>

            {/* Right Content - Image/Illustration */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
                <Card className="relative p-8 bg-white/80 backdrop-blur-sm">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-semibold">Skills India Verified</p>
                        <p className="text-sm text-gray-600">Government-backed certifications</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <MapPin className="h-6 w-6 text-secondary" />
                      <div>
                        <p className="font-semibold">Location-based Jobs</p>
                        <p className="text-sm text-gray-600">Find work near you</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-semibold">Competitive Bidding</p>
                        <p className="text-sm text-gray-600">Set your own rates</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose LabourHand?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering India's workforce with technology, trust, and transparency
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Verified Workers",
                description: "All workers undergo Skills India verification for quality assurance",
              },
              {
                icon: MapPin,
                title: "Location-Based",
                description: "Smart matching based on proximity to reduce travel time",
              },
              {
                icon: TrendingUp,
                title: "Fair Pricing",
                description: "Transparent bidding system ensures competitive and fair wages",
              },
              {
                icon: Users,
                title: "Build Your Network",
                description: "Connect with employers and grow your professional network",
              },
              {
                icon: CheckCircle,
                title: "Secure Payments",
                description: "Platform-secured payments with milestone-based releases",
              },
              {
                icon: Hammer,
                title: "Multiple Categories",
                description: "Construction, Plumbing, Electrical, Painting, and more",
              },
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to start earning or hiring
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Workers */}
            <Card className="p-8">
              <div className="bg-primary rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-6">
                <User className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6">For Workers</h3>
              <div className="space-y-4">
                {[
                  "Create your profile and verify skills",
                  "Browse nearby job opportunities",
                  "Place competitive bids on projects",
                  "Get hired and complete work",
                  "Receive secure payments",
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-semibold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* For Employers */}
            <Card className="p-8">
              <div className="bg-secondary rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-6">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6">For Employers</h3>
              <div className="space-y-4">
                {[
                  "Post your job requirements",
                  "Receive multiple bids from workers",
                  "Compare profiles and ratings",
                  "Select the best fit for your project",
                  "Track progress and release payments",
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-secondary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-secondary font-semibold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of workers and employers already using LabourHand
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100 h-12 px-8 text-lg"
              onClick={() => navigate("/register?role=worker")}
            >
              I'm Looking for Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 h-12 px-8 text-lg"
              onClick={() => navigate("/register?role=owner")}
            >
              I Want to Hire
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary rounded-lg p-2">
                  <Hammer className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">LabourHand</span>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting India's workforce with opportunities
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Workers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Find Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Create Profile</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Skills Verification</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Post Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Find Workers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 LabourHand. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
