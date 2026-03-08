import { useNavigate, useLocation } from "react-router";
import { Home, Search, PlusCircle, MessageCircle, User } from "lucide-react";
import { SessionManager } from "../../utils/session";

export function DesktopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const isOwner = SessionManager.isOwner();

  const navItems = isOwner
    ? [
        { icon: Home, label: "Dashboard", path: "/contractor" },
        { icon: Search, label: "Browse", path: "/contractor" }, // Adjust as needed
        { icon: PlusCircle, label: "Post", path: "/contractor" },
        { icon: MessageCircle, label: "Messages", path: "/messages" },
        { icon: User, label: "Profile", path: "/contractor" },
      ]
    : [
        { icon: Home, label: "Jobs", path: "/dashboard" },
        { icon: Search, label: "My Bids", path: "/my-bids" },
        { icon: PlusCircle, label: "Bid", path: "/dashboard" },
        { icon: MessageCircle, label: "Messages", path: "/messages" },
        { icon: User, label: "Profile", path: "/dashboard" },
      ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-border h-[100dvh] sticky top-0 py-6 px-4 shrink-0">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold text-primary">LabourHand</h1>
      </div>
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      {/* Spacer or Footer elements could go here */}
    </div>
  );
}
