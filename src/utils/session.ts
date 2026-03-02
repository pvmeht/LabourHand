// Session Management Utility for LabourHand Platform

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'worker' | 'owner';
  avatar?: string;
  verified?: boolean;
  language?: 'en' | 'hi';
  // Worker specific fields
  skills?: string[];
  rating?: number;
  completedJobs?: number;
  // Owner specific fields
  companyName?: string;
  projectsPosted?: number;
}

const SESSION_KEY = 'labourhand_session';
const USER_KEY = 'labourhand_user';

export class SessionManager {
  // Create a new session
  static createSession(user: User): void {
    const sessionData = {
      user,
      token: this.generateToken(),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // Get current session
  static getSession() {
    try {
      const sessionData = localStorage.getItem(SESSION_KEY);
      if (!sessionData) return null;

      const session = JSON.parse(sessionData);
      
      // Check if session is expired
      if (new Date(session.expiresAt) < new Date()) {
        this.clearSession();
        return null;
      }

      return session;
    } catch (error) {
      console.error('Error reading session:', error);
      return null;
    }
  }

  // Get current user
  static getCurrentUser(): User | null {
    try {
      const session = this.getSession();
      if (!session) return null;
      
      return session.user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Update user data
  static updateUser(updates: Partial<User>): void {
    const session = this.getSession();
    if (!session) return;

    const updatedUser = { ...session.user, ...updates };
    session.user = updatedUser;

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  }

  // Check if user is logged in
  static isLoggedIn(): boolean {
    return this.getSession() !== null;
  }

  // Check user role
  static isWorker(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'worker';
  }

  static isOwner(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'owner';
  }

  // Clear session (logout)
  static clearSession(): void {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(USER_KEY);
  }

  // Generate a random token (mock implementation)
  private static generateToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // Update language preference
  static setLanguage(lang: 'en' | 'hi'): void {
    const user = this.getCurrentUser();
    if (user) {
      this.updateUser({ language: lang });
    } else {
      // Store language preference even without login
      localStorage.setItem('labourhand_language', lang);
    }
  }

  // Get language preference
  static getLanguage(): 'en' | 'hi' {
    const user = this.getCurrentUser();
    if (user?.language) {
      return user.language;
    }
    return (localStorage.getItem('labourhand_language') as 'en' | 'hi') || 'en';
  }
}

// Mock user data for development
export const mockUsers = {
  worker: {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 9876543210',
    role: 'worker' as const,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    verified: true,
    skills: ['Masonry', 'Painting', 'Plastering'],
    rating: 4.8,
    completedJobs: 142,
    language: 'en' as const,
  },
  owner: {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 9876543211',
    role: 'owner' as const,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    verified: true,
    companyName: 'Sharma Constructions',
    projectsPosted: 24,
    language: 'en' as const,
  },
};

// Mock authentication functions
export const mockAuth = {
  login: async (email: string, password: string, role: 'worker' | 'owner'): Promise<User> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (password.length < 6) {
      throw new Error('Invalid credentials');
    }

    // Return mock user based on role
    return role === 'worker' ? mockUsers.worker : mockUsers.owner;
  },

  register: async (userData: Partial<User>): Promise<User> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create new user with mock data
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      name: userData.name || 'New User',
      email: userData.email || '',
      phone: userData.phone || '',
      role: userData.role || 'worker',
      avatar: userData.avatar,
      verified: false,
      language: userData.language || 'en',
      ...(userData.role === 'worker' ? {
        skills: userData.skills || [],
        rating: 0,
        completedJobs: 0,
      } : {
        companyName: userData.companyName || '',
        projectsPosted: 0,
      }),
    };

    return newUser;
  },

  logout: () => {
    SessionManager.clearSession();
  },
};
