import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Hammer, Sparkles } from "lucide-react";
import { SessionManager } from "../../utils/session";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user is already logged in
      if (SessionManager.isLoggedIn()) {
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-secondary flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Logo and Brand */}
      <div className="relative z-10 text-center">
        {/* Icon Container */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative bg-white rounded-full p-8 shadow-2xl inline-block">
            <Hammer className="h-20 w-20 text-primary animate-bounce" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkles className="h-8 w-8 text-yellow-300 animate-spin-slow" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
          LabourHand
        </h1>
        
        {/* Tagline */}
        <p className="text-xl md:text-2xl text-white/90 mb-2 font-medium">
          Your Work, Your Worth
        </p>
        
        {/* Hindi Tagline */}
        <p className="text-lg text-white/80 font-hindi mb-8">
          आपका काम, आपकी कीमत
        </p>

        {/* Loading Indicator */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce"></div>
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce delay-200"></div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-white/70 text-sm">
          Connecting India's Workforce
        </p>
        <p className="text-white/60 text-xs mt-1 font-hindi">
          भारत की श्रमशक्ति को जोड़ना
        </p>
      </div>
    </div>
  );
}