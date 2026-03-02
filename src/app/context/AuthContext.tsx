import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "worker" | "owner";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  verified?: boolean;
  // Worker specific
  skills?: string[];
  experience?: number;
  rating?: number;
  completedJobs?: number;
  // Owner specific
  company?: string;
  projectsPosted?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  language: "en" | "hi";
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setLanguage: (lang: "en" | "hi") => void;
  updateUser: (data: Partial<User>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguageState] = useState<"en" | "hi">("en");

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("labourhand_user");
    const storedLang = localStorage.getItem("labourhand_language");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedLang) {
      setLanguageState(storedLang as "en" | "hi");
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock user data based on role
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: role === "worker" ? "Rajesh Kumar" : "Priya Sharma",
      phone: "+91 98765 43210",
      role,
      avatar:
        role === "worker"
          ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
          : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      verified: true,
    };

    if (role === "worker") {
      mockUser.skills = ["Masonry", "Plastering", "Tiling"];
      mockUser.experience = 8;
      mockUser.rating = 4.8;
      mockUser.completedJobs = 156;
    } else {
      mockUser.company = "Dream Homes Pvt Ltd";
      mockUser.projectsPosted = 23;
    }

    setUser(mockUser);
    localStorage.setItem("labourhand_user", JSON.stringify(mockUser));
  };

  const register = async (data: RegisterData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      verified: false,
    };

    if (data.role === "worker") {
      newUser.skills = [];
      newUser.experience = 0;
      newUser.rating = 0;
      newUser.completedJobs = 0;
    } else {
      newUser.projectsPosted = 0;
    }

    setUser(newUser);
    localStorage.setItem("labourhand_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("labourhand_user");
  };

  const setLanguage = (lang: "en" | "hi") => {
    setLanguageState(lang);
    localStorage.setItem("labourhand_language", lang);
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("labourhand_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        language,
        login,
        register,
        logout,
        setLanguage,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
