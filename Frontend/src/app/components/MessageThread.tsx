import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Send } from "lucide-react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { messageApi, ApiMessage, Conversation } from "../../utils/api";
import { SessionManager } from "../../utils/session";


export function MessageThread() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ApiMessage[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const currentUser = SessionManager.getCurrentUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const conversation = conversations.find(c => c.conversationId === Number(id));

  useEffect(() => {
    if (!id) return;
    messageApi.getConversations().then(setConversations).catch(console.error);
    messageApi.getMessages(Number(id)).then(setMessages).catch(console.error);
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!currentUser || !id) return;

    const token = localStorage.getItem('labourhand_session') ? JSON.parse(localStorage.getItem('labourhand_session')!).token : null;
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8081/ws"),
      connectHeaders: { Authorization: `Bearer ${token}` },
      onConnect: () => {
        client.subscribe(`/topic/messages/${currentUser.id}`, (message) => {
          if (message.body) {
            const apiMsg: ApiMessage = JSON.parse(message.body);
            if (apiMsg.conversationId === Number(id)) {
                setMessages(prev => [...prev, apiMsg]);
            }
          }
        });
      },
    });

    client.activate();
    return () => {
      client.deactivate();
    };
  }, [currentUser, id]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversation) return;

    try {
      const sentMsg = await messageApi.send(conversation.otherUserId, newMessage, conversation.projectId);
      setMessages(prev => [...prev, sentMsg]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="flex flex-col h-screen bg-muted">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center gap-3 sticky top-0 z-10 shrink-0">
        <Button variant="ghost" size="icon" onClick={() => navigate("/messages")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="font-semibold">{conversation?.otherUserName || 'Loading...'}</h2>
          {conversation?.projectName && <p className="text-xs text-muted-foreground">{conversation.projectName}</p>}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === Number(currentUser.id);
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  isMe ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-white rounded-bl-none shadow-sm'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <span className={`text-[10px] block mt-1 ${isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t shrink-0">
        <form onSubmit={handleSend} className="flex gap-2 max-w-screen-lg mx-auto">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-muted border-none"
          />
          <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
