import { useNavigate, useLocation } from "react-router";
import { Home, FileText, MessageSquare, User } from "lucide-react";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "bids", label: "My Bids", icon: FileText, path: "/my-bids" },
    { id: "messages", label: "Messages", icon: MessageSquare, path: "/messages" },
    { id: "profile", label: "Profile", icon: User, path: "/worker/1" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 safe-area-bottom">
      <div className="max-w-screen-lg mx-auto px-2">
        <div className="grid grid-cols-4 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center py-2 px-2 transition-colors ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon
                  className={`h-6 w-6 mb-1 ${active ? "fill-primary/20" : ""}`}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
