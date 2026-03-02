import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Hammer } from "lucide-react";
import { motion } from "motion/react";

export function SplashScreen() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show animation
    setShowContent(true);

    // Navigate after animation
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-secondary flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl" />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={showContent ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Logo Container */}
        <motion.div
          initial={{ rotate: -180 }}
          animate={showContent ? { rotate: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-3xl shadow-2xl">
            <Hammer className="h-20 w-20 text-primary" strokeWidth={2.5} />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl font-extrabold text-white mb-2 tracking-tight">
            LabourHand
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl text-white/90 font-medium"
          >
            Your Work, Your Way
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Loading Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-12 flex flex-col items-center gap-4"
      >
        <div className="flex gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            className="w-2.5 h-2.5 bg-white rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            className="w-2.5 h-2.5 bg-white rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            className="w-2.5 h-2.5 bg-white rounded-full"
          />
        </div>
        <p className="text-white/70 text-sm">Loading...</p>
      </motion.div>
    </div>
  );
}
