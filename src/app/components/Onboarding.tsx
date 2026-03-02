import { useState } from "react";
import { useNavigate } from "react-router";
import { Hammer, Languages, ArrowRight, CheckCircle, MapPin, User, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { SessionManager } from "../../utils/session";

export function Onboarding() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const content = {
    en: {
      welcome: "Welcome to LabourHand",
      subtitle: "India's trusted platform for blue-collar jobs",
      selectLanguage: "Choose Your Language",
      continue: "Continue",
      skip: "Skip",
      features: [
        {
          icon: MapPin,
          title: "Find Jobs Nearby",
          description: "Discover work opportunities in your area with real-time location tracking",
        },
        {
          icon: Briefcase,
          title: "Bid Competitively",
          description: "Set your own prices and showcase your skills to potential clients",
        },
        {
          icon: User,
          title: "Build Your Profile",
          description: "Create a digital identity with Skills India verification",
        },
      ],
      getStarted: "Get Started",
      alreadyHaveAccount: "Already have an account? Sign In",
    },
    hi: {
      welcome: "LabourHand में आपका स्वागत है",
      subtitle: "भारत का विश्वसनीय ब्लू-कॉलर जॉब प्लेटफॉर्म",
      selectLanguage: "अपनी भाषा चुनें",
      continue: "जारी रखें",
      skip: "छोड़ें",
      features: [
        {
          icon: MapPin,
          title: "पास में काम खोजें",
          description: "वास्तविक समय स्थान ट्रैकिंग के साथ अपने क्षेत्र में काम के अवसर खोजें",
        },
        {
          icon: Briefcase,
          title: "प्रतिस्पर्धी बोली लगाएं",
          description: "अपनी खुद की कीमतें सेट करें और संभावित ग्राहकों को अपने कौशल दिखाएं",
        },
        {
          icon: User,
          title: "अपनी प्रोफ़ाइल बनाएं",
          description: "स्किल इंडिया सत्यापन के साथ डिजिटल पहचान बनाएं",
        },
      ],
      getStarted: "शुरू करें",
      alreadyHaveAccount: "पहले से खाता है? साइन इन करें",
    },
  };

  const t = content[language];

  const handleLanguageSelect = (lang: 'en' | 'hi') => {
    setLanguage(lang);
    SessionManager.setLanguage(lang);
    setCurrentStep(1);
  };

  const handleGetStarted = () => {
    navigate("/auth");
  };

  const handleSkip = () => {
    navigate("/landing");
  };

  // Language Selection Step
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-12">
            <div className="bg-primary rounded-full p-6 shadow-lg inline-block mb-4">
              <Hammer className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              LabourHand
            </h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>

          {/* Language Selection */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Languages className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">
                {language === 'en' ? t.selectLanguage : 'भाषा चुनें'}
              </h2>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleLanguageSelect('en')}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  language === 'en'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-semibold text-lg">English</p>
                    <p className="text-sm text-gray-600">Continue in English</p>
                  </div>
                  {language === 'en' && (
                    <CheckCircle className="h-6 w-6 text-primary" />
                  )}
                </div>
              </button>

              <button
                onClick={() => handleLanguageSelect('hi')}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  language === 'hi'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-semibold text-lg font-hindi">हिंदी</p>
                    <p className="text-sm text-gray-600 font-hindi">
                      हिंदी में जारी रखें
                    </p>
                  </div>
                  {language === 'hi' && (
                    <CheckCircle className="h-6 w-6 text-primary" />
                  )}
                </div>
              </button>
            </div>
          </Card>

          <Button
            onClick={handleSkip}
            variant="ghost"
            className="w-full"
          >
            {language === 'en' ? 'Skip' : 'छोड़ें'}
          </Button>
        </div>
      </div>
    );
  }

  // Features Walkthrough
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 flex flex-col">
      {/* Header */}
      <div className="p-6 text-center">
        <div className="bg-primary rounded-full p-4 shadow-lg inline-block mb-4">
          <Hammer className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, Inter' : 'Inter' }}>
          {t.welcome}
        </h1>
        <p className="text-gray-600" style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, Inter' : 'Inter' }}>
          {t.subtitle}
        </p>
      </div>

      {/* Features */}
      <div className="flex-1 px-6 py-8 space-y-6">
        {t.features.map((feature, index) => (
          <Card
            key={index}
            className="p-6 transform transition-all duration-300 hover:shadow-lg"
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.2}s both`,
            }}
          >
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, Inter' : 'Inter' }}>
                  {feature.title}
                </h3>
                <p className="text-gray-600" style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, Inter' : 'Inter' }}>
                  {feature.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="p-6 space-y-3">
        <Button
          onClick={handleGetStarted}
          className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg"
          style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, Inter' : 'Inter' }}
        >
          {t.getStarted}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <button
          onClick={() => navigate("/login")}
          className="w-full text-gray-600 hover:text-gray-900 transition-colors py-3"
          style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, Inter' : 'Inter' }}
        >
          {t.alreadyHaveAccount}
        </button>
      </div>

      {/* Add animation keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}