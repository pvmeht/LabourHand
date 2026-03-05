import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Hammer, Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { SessionManager } from "../../utils/session";
import { authApi } from "../../utils/api";

export function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: (searchParams.get("role") as "worker" | "owner") || "worker",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token, user } = await authApi.login(formData.email, formData.password);
      // Persist JWT for API client
      localStorage.setItem('labourhand_token', token);
      // Map backend user to session shape
      SessionManager.createSession({
        id: String(user.id),
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role === 'WORKER' ? 'worker' : 'owner',
        avatar: user.avatar,
        verified: user.verified,
        language: (user.language as 'en' | 'hi') || 'en',
        skills: user.skills,
        rating: user.rating,
        completedJobs: user.completedJobs,
        companyName: user.companyName,
        projectsPosted: user.projectsPosted,
      });
      const redirectPath = searchParams.get("redirect");
      if (redirectPath) {
        navigate(redirectPath);
      } else if (user.role === 'WORKER') {
        navigate('/dashboard');
      } else {
        navigate('/contractor');
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card className="p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="bg-primary rounded-full p-4 shadow-lg inline-block mb-4">
              <Hammer className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to continue to LabourHand
            </p>
          </div>

          {/* Role Selector */}
          <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: "worker" })}
              className={`py-2 px-4 rounded-md font-medium transition-all ${formData.role === "worker"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-600"
                }`}
            >
              Worker
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: "owner" })}
              className={`py-2 px-4 rounded-md font-medium transition-all ${formData.role === "owner"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-600"
                }`}
            >
              Employer
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email">Email or Phone</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email or phone"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 h-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 h-11"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs font-semibold text-blue-900 mb-2">
              Demo Credentials:
            </p>
            <p className="text-xs text-blue-700">
              Worker: rajesh@labourhand.com / worker123
              <br />
              Owner: priya@labourhand.com / owner123
            </p>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate(`/register?role=${formData.role}`)}
                className="text-primary font-medium hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}