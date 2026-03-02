# LabourHand - Blue-Collar Job Bidding Platform

A comprehensive mobile-first job bidding platform designed for India's blue-collar workforce, featuring a clean modern aesthetic with Construction Orange (#F27121) and Safety Blue (#2E5BFF) accents.

## 📱 Complete App Flow

### 1. **Splash Screen** (`/`)
- Animated entry screen with LabourHand branding
- Auto-redirects to onboarding or dashboard based on session status
- Bilingual taglines (English/Hindi)

### 2. **Onboarding** (`/onboarding`)
- Language selection (English/Hindi) with Skills India verification
- Feature walkthrough showcasing key platform capabilities
- Direct navigation to registration

### 3. **Landing Page** (`/landing`) - Desktop Focused
- Professional landing page for desktop users
- Two-path signup: Workers and Employers
- Feature showcase, how-it-works section, and stats
- Responsive design for all screen sizes

### 4. **Authentication**
- **Login** (`/login`): Role-based authentication (Worker/Employer)
- **Register** (`/register`): Comprehensive signup with role selection
- Session management with 7-day token expiry
- Demo credentials provided for testing

### 5. **Main Dashboard** (`/dashboard`)
- Role toggle: Worker Mode / Owner Mode
- Language toggle button (top-right)
- Map-based job discovery
- Job categories with icons
- Nearby opportunities with distance indicators
- Status badges on all job cards
- Bottom navigation bar

### 6. **Job Details** (`/project/:id`)
- Comprehensive project information
- Distance indicator from user location
- Live bidding statistics
- Bid placement CTA
- Status badges

### 7. **Place Bid** (`/bid/:projectId`)
- Quote input with project budget reference
- Timeline estimation
- Proposal message to owner
- Tips for winning bids
- Session-aware submission

### 8. **Worker Profile** (`/worker/:id`)
- Digital identity with Skills India verification
- Rating and completion stats
- Skills showcase
- Past projects portfolio
- Contact actions

### 9. **My Bids** (`/my-bids`)
- Three tabs: Pending, Active, Completed
- Bid status tracking
- Progress indicators for active jobs
- Payment status for completed jobs
- Distance indicators on all bids

### 10. **Messages** (`/messages`)
- Conversation list with project context
- Unread message indicators
- Search functionality
- Direct links to related projects

### 11. **Compare Bids** (`/compare-bids/:projectId`) - Owner Feature
- Side-by-side bid comparison
- Four sorting options: All, Price, Speed, Rating
- Worker profile previews
- Recommended bids highlighted
- Distance indicators
- One-click bid acceptance

### 12. **Contractor Dashboard** (`/contractor`)
- Four main sections: Bids, Team, Projects, Schedule
- Projects awaiting bid review
- Team management with availability status
- Active project tracking with progress bars
- Weekly earnings chart (Recharts)
- Worker scheduling system

## 🎨 Design System

### Color Palette
- **Primary Orange**: `#F27121` - Actions, CTAs, highlights
- **Secondary Blue**: `#2E5BFF` - Trust, verification, links
- **Accent Green**: `#10B981` - Success, completion, payment verified
- **Accent Yellow**: `#F59E0B` - Warnings, pending states
- **Accent Red**: `#EF4444` - Errors, at-risk projects

### Status Badge Colors
- **Open for Bids**: Green background
- **In Progress**: Blue background
- **Completed**: Gray background
- **Payment Verified**: Green background with checkmark

### Typography
- **Primary Font**: Inter (English)
- **Hindi Font**: Noto Sans Devanagari
- **Base Size**: 16px
- **Scale**: xs(12px), sm(14px), base(16px), lg(18px), xl(20px), 2xl(24px)

### Component Styling
All UI variables are centralized in `/src/styles/theme.scss` for consistent reference across the application. This includes:
- Color definitions
- Typography scales
- Spacing system
- Border radius values
- Shadow presets
- Breakpoint definitions
- Mixins for common patterns

## 🔧 Technical Architecture

### Session Management (`/src/utils/session.ts`)
- **SessionManager Class**: Handles user authentication state
- **Local Storage**: Stores session data and user preferences
- **Token System**: 7-day expiry with automatic cleanup
- **Language Persistence**: Maintains language choice across sessions
- **Role Detection**: Helper methods for role-based UI rendering

### Routing Structure
```
/ (Splash)
├── /onboarding
├── /landing
├── /login
├── /register
└── /dashboard (Protected)
    ├── /project/:id
    ├── /bid/:projectId
    ├── /worker/:id
    ├── /my-bids
    ├── /messages
    ├── /contractor
    └── /compare-bids/:projectId
```

### Responsive Design
- **Mobile-First**: Optimized for touch interactions (44px min tap targets)
- **Tablet**: Adjusted layouts with grid systems
- **Desktop**: Multi-column layouts, expanded navigation
- **Breakpoints**: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

## 🚀 Key Features

### Universal Features
1. **Language Toggle**: Prominent button for English/Hindi switching
2. **Distance Indicators**: "Distance from you: X km" on every job card
3. **Status Badges**: Clear visual indicators for project status
4. **Bottom Navigation**: Persistent nav bar (Home, My Bids, Messages, Profile)
5. **Session Persistence**: 7-day auto-login with secure token management

### Worker Features
- Map-based job discovery
- Competitive bidding system
- Digital profile as professional identity
- Skills India verification badges
- Bid tracking and status updates
- Direct messaging with employers
- Earnings history

### Employer Features
- Job posting interface
- Multi-bid comparison dashboard
- Worker profile viewing
- Bid acceptance workflow
- Team management
- Project tracking with progress indicators
- Payment milestone system

## 📦 Component Architecture

### Reusable Components
- **BottomNav**: Mobile navigation used across all authenticated screens
- **Badge**: Status indicators with semantic colors
- **Card**: Container component for consistent spacing
- **Avatar**: User profile images with fallbacks
- **Tabs**: Content organization in dashboards

### Page Components
All major screens are standalone components in `/src/app/components/`:
- Splash.tsx
- Onboarding.tsx
- Landing.tsx
- Login.tsx / Register.tsx
- Dashboard.tsx
- ProjectDetails.tsx
- WorkerProfile.tsx
- PlaceBid.tsx
- MyBids.tsx
- Messages.tsx
- CompareBids.tsx
- ContractorDashboard.tsx

## 🎯 User Flows

### Worker Journey
1. Splash → Onboarding → Register (Worker) → Dashboard
2. Browse jobs with distance indicators
3. View job details with status badges
4. Place competitive bid
5. Track bid in "My Bids" section
6. Receive notification when bid is accepted
7. Update job progress
8. Receive payment with verification badge

### Employer Journey
1. Splash → Landing → Register (Employer) → Contractor Dashboard
2. Post new project
3. Receive bids from workers
4. Compare bids with sorting options
5. View worker profiles
6. Accept winning bid
7. Track project progress
8. Release milestone payments
9. Rate completed work

## 🔐 Session & Authentication

### Mock Authentication
For development purposes, the app uses mock authentication:
- **Email**: any@example.com
- **Password**: any 6+ character string
- **Roles**: Toggle between Worker and Employer during login/register

### Session Management
```typescript
SessionManager.createSession(user);     // Create new session
SessionManager.getCurrentUser();         // Get logged-in user
SessionManager.isLoggedIn();            // Check auth status
SessionManager.isWorker() / isOwner();  // Role checks
SessionManager.setLanguage('hi');       // Update language
SessionManager.clearSession();          // Logout
```

## 📱 Mobile Optimizations

1. **Touch-Friendly**: Minimum 44px tap targets
2. **Fixed Bottom Nav**: Always accessible primary navigation
3. **Pull-to-Refresh Ready**: Structure supports refresh patterns
4. **Optimized Loading**: Lazy-loaded images and components
5. **Responsive Images**: Optimized sizes for different viewports
6. **Safe Area Support**: Handles notches and bottom bars

## 🌐 Localization

### Supported Languages
- **English (en)**: Default
- **Hindi (hi)**: Full translation of UI strings

### Language Toggle
- Top-right button on Dashboard
- Persistent across sessions
- Instant UI updates
- No page reload required

## 📊 Data Visualization

### Charts (Recharts)
- **Earnings Chart**: Line chart showing daily/weekly earnings
- **Progress Bars**: Visual project completion indicators
- **Stats Cards**: Key metrics with icon indicators

## 🎭 Mock Data

All screens use comprehensive mock data for demonstration:
- Sample job listings with realistic details
- Worker profiles with ratings and skills
- Bid comparisons with multiple workers
- Team member data
- Project progress tracking
- Earnings statistics

## 🚦 Status Indicators

### Project Status
- **Open for Bids**: Green badge, accepting bids
- **In Progress**: Blue badge, work ongoing
- **Completed**: Gray badge, work finished
- **Payment Verified**: Green badge with checkmark

### Worker Status
- **Available**: Blue badge, ready for work
- **On Site**: Green badge, currently working
- **Verified**: Checkmark icon, Skills India verified

## 💡 Future Enhancements

1. Real API integration
2. Push notifications for bids and messages
3. Payment gateway integration
4. Real-time chat functionality
5. Video call support for consultations
6. Advanced search and filters
7. Reviews and rating system expansion
8. Government ID verification
9. Geolocation-based automatic job matching
10. Skill assessment tests

## 🎨 SASS Theme System

The `/src/styles/theme.scss` file serves as the single source of truth for all design tokens:
- Import in components for consistent styling
- Uses CSS custom properties for runtime theming
- Includes mixins for responsive design
- Provides utility functions for common patterns
- Enables easy theme customization

## 📝 Development Notes

### Getting Started
1. All routes are configured in `/src/app/routes.tsx`
2. Session utilities in `/src/utils/session.ts`
3. UI tokens in `/src/styles/theme.scss` and `/src/styles/theme.css`
4. Mock data is embedded in components for rapid development

### Adding New Features
1. Create component in `/src/app/components/`
2. Add route in `/src/app/routes.tsx`
3. Use SessionManager for auth checks
4. Reference theme variables from SCSS/CSS
5. Add to BottomNav if primary navigation item

---

**Built with React, TypeScript, Tailwind CSS v4, React Router, and Recharts**

*Empowering India's workforce through technology, trust, and transparency.*
