import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search } from "lucide-react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { BottomNav } from "./BottomNav";
import { messageApi, Conversation } from "../../utils/api";
import { SessionManager } from "../../utils/session";

export function Messages() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const currentUser = SessionManager.getCurrentUser();

  const loadConversations = () => {
    messageApi.getConversations().then(setConversations).catch(console.error);
  };

  useEffect(() => {
    loadConversations();

    if (!currentUser) return;

    // Connect to STOMP WebSocket
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8081/ws"),
      onConnect: () => {
        console.log("Connected to STOMP broker");
        // Subscribe to messages intended for the current user
        client.subscribe(`/topic/messages/${currentUser.id}`, (message) => {
          if (message.body) {
            console.log("New message received via WebSocket:", message.body);
            // Reload conversations to show new message/unread count
            loadConversations();
          }
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [currentUser]);

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
            key={conversation.conversationId}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              /* Handle navigation to inner chat thread */
              navigate(`/messages/${conversation.conversationId}`);
            }}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src={conversation.otherUserAvatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {conversation.otherUserName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {conversation.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-semibold">
                      {conversation.unreadCount}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-base truncate font-semibold">{conversation.otherUserName}</h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {new Date(conversation.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p
                  className={`text-sm truncate mb-2 ${
                    conversation.unreadCount > 0
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {conversation.lastMessage}
                </p>
                {conversation.projectName && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-accent border-primary/30"
                  >
                    {conversation.projectName}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
        {conversations.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
                <p>No conversations yet.</p>
            </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
