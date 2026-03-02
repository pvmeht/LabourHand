import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAuth, UserRole } from "../context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, register, language } = useAuth();
  
  const role = (searchParams.get("role") as UserRole) || "worker";
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Login Form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register Form
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const translations = {
    en: {
      backToOnboarding: "Back to Onboarding",
      workerLogin: "Worker Login",
      ownerLogin: "Owner Login",
      workerSignup: "Worker Signup",
      ownerSignup: "Owner Signup",
      login: "Login",
      register: "Register",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      name: "Full Name",
      phone: "Phone Number",
      loginButton: "Sign In",
      registerButton: "Create Account",
      forgotPassword: "Forgot Password?",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      orContinueWith: "Or continue with",
      googleLogin: "Continue with Google",
      enterEmail: "Enter your email",
      enterPassword: "Enter your password",
      enterName: "Enter your full name",
      enterPhone: "Enter your phone number",
      passwordMismatch: "Passwords do not match",
      loginSuccess: "Login successful!",
      registerSuccess: "Account created successfully!",
    },
    hi: {
      backToOnboarding: "ऑनबोर्डिंग पर वापस जाएं",
      workerLogin: "कामगार लॉगिन",
      ownerLogin: "मालिक लॉगिन",
      workerSignup: "कामगार साइनअप",
      ownerSignup: "मालिक साइनअप",
      login: "लॉगिन",
      register: "रजिस्टर",
      email: "ईमेल",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      name: "पूरा नाम",
      phone: "फ़ोन नंबर",
      loginButton: "साइन इन करें",
      registerButton: "खाता बनाएं",
      forgotPassword: "पासवर्ड भूल गए?",
      noAccount: "खाता नहीं है?",
      hasAccount: "पहले से खाता है?",
      orContinueWith: "या जारी रखें",
      googleLogin: "Google के साथ जारी रखें",
      enterEmail: "अपना ईमेल दर्ज करें",
      enterPassword: "अपना पासवर्ड दर्ज करें",
      enterName: "अपना पूरा नाम दर्ज करें",
      enterPhone: "अपना फ़ोन नंबर दर्ज करें",
      passwordMismatch: "पासवर्ड मेल नहीं खाते",
      loginSuccess: "लॉगिन सफल!",
      registerSuccess: "खाता सफलतापूर्वक बनाया गया!",
    },
  };

  const t = translations[language];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(loginEmail, loginPassword, role);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerPassword !== registerConfirmPassword) {
      alert(t.passwordMismatch);
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name: registerName,
        email: registerEmail,
        phone: registerPhone,
        password: registerPassword,
        role,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      {/* Header */}
      <div className="p-4 md:p-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/onboarding")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.backToOnboarding}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">
              {activeTab === "login"
                ? role === "worker"
                  ? t.workerLogin
                  : t.ownerLogin
                : role === "worker"
                ? t.workerSignup
                : t.ownerSignup}
            </h1>
            <p className="text-muted-foreground">
              {role === "worker"
                ? language === "en"
                  ? "Find jobs and build your career"
                  : "नौकरियां खोजें और अपना करियर बनाएं"
                : language === "en"
                ? "Post jobs and hire skilled workers"
                : "नौकरियां पोस्ट करें और कुशल कामगारों को काम पर रखें"}
            </p>
          </div>

          {/* Auth Card */}
          <Card className="p-6">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">{t.login}</TabsTrigger>
                <TabsTrigger value="register">{t.register}</TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">{t.email}</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder={t.enterEmail}
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="login-password">{t.password}</Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t.enterPassword}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="button"
                      className="text-sm text-primary hover:underline"
                    >
                      {t.forgotPassword}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-primary hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        {language === "en" ? "Signing in..." : "साइन इन हो रहा है..."}
                      </>
                    ) : (
                      t.loginButton
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Register Form */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="register-name">{t.name}</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder={t.enterName}
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-phone">{t.phone}</Label>
                    <Input
                      id="register-phone"
                      type="tel"
                      placeholder={t.enterPhone}
                      value={registerPhone}
                      onChange={(e) => setRegisterPhone(e.target.value)}
                      required
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-email">{t.email}</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder={t.enterEmail}
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-password">{t.password}</Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t.enterPassword}
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-confirm-password">
                      {t.confirmPassword}
                    </Label>
                    <Input
                      id="register-confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t.confirmPassword}
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      required
                      className="mt-1.5"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-primary hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        {language === "en" ? "Creating account..." : "खाता बनाया जा रहा है..."}
                      </>
                    ) : (
                      t.registerButton
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Google Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-muted-foreground">
                    {t.orContinueWith}
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full mt-4 h-11"
                onClick={() => alert("Google login coming soon!")}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {t.googleLogin}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
