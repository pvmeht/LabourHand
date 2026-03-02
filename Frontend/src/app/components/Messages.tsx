import { useNavigate } from "react-router";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { BottomNav } from "./BottomNav";

export function Messages() {
  const navigate = useNavigate();

  const conversations = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      lastMessage: "Can you start the painting work tomorrow?",
      time: "2m ago",
      unread: 2,
      project: "Apartment Painting",
    },
    {
      id: 2,
      name: "Arjun Mehta",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
      lastMessage: "Great work on the masonry! Payment released.",
      time: "1h ago",
      unread: 0,
      project: "Villa Construction",
    },
    {
      id: 3,
      name: "Sunita Developers",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
      lastMessage: "Please share your availability for next week",
      time: "3h ago",
      unread: 1,
      project: "Commercial Building",
    },
    {
      id: 4,
      name: "Vikram Singh",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop",
      lastMessage: "Thank you for the quote. We'll get back to you.",
      time: "1d ago",
      unread: 0,
      project: "Kitchen Renovation",
    },
  ];

  return (
    <div className="min-h-screen bg-muted pb-24">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-screen-lg mx-auto p-4">
          <div className="flex items-center gap-3 mb-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2>Messages</h2>
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto p-4 space-y-2">
        {conversations.map((conversation) => (
          <Card
            key={conversation.id}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              /* Navigate to conversation */
            }}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={conversation.avatar} />
                  <AvatarFallback>
                    {conversation.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {conversation.unread > 0 && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-semibold">
                      {conversation.unread}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-base truncate">{conversation.name}</h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {conversation.time}
                  </span>
                </div>
                <p
                  className={`text-sm truncate mb-2 ${
                    conversation.unread > 0
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {conversation.lastMessage}
                </p>
                <Badge
                  variant="outline"
                  className="text-xs bg-accent border-primary/30"
                >
                  {conversation.project}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
