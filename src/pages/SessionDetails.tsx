import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  MessageSquare,
  Bot,
  Calendar,
  Play,
  Pause,
  RefreshCw,
  Send,
  Settings,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

type SessionStatus = "active" | "paused";
type MessageRole = "user" | "assistant";

interface SessionConfig {
  aiPrompt: string;
  syncInterval: string;
  language: string;
  filterKeywords: string[];
  autoSummarize: boolean;
}

interface Session {
  id: string;
  name: string;
  source: string;
  status: SessionStatus;
  messagesCount: number;
  lastSync: string;
  createdAt: string;
  tags: string[];
  description: string;
  config: SessionConfig;
}

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

// Mock session data
const mockSession: Session = {
  id: "1",
  name: "Crypto Alpha Signals",
  source: "@crypto_alpha_signals",
  status: "active",
  messagesCount: 1247,
  lastSync: "2 hours ago",
  createdAt: "Dec 15, 2024",
  tags: ["crypto", "trading", "signals"],
  description: "Premium crypto signals and market analysis from verified traders.",
  config: {
    aiPrompt: "You are an AI assistant that analyzes crypto trading signals. Extract key information such as: trading pairs, entry/exit prices, stop loss levels, and sentiment. Summarize trends and provide actionable insights based on the indexed messages.",
    syncInterval: "Every 30 minutes",
    language: "English",
    filterKeywords: ["BTC", "ETH", "signal", "buy", "sell", "target"],
    autoSummarize: true,
  },
};

const mockMessages: ChatMessage[] = [
  { id: "1", role: "assistant", content: "Hello! I'm ready to help you retrieve information from the 1,247 indexed messages in this session. What would you like to know?" },
];

const SessionDetails = () => {
  const { id } = useParams();
  const [session, setSession] = useState(mockSession);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState(mockMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleStatus = () => {
    setSession((prev) => ({
      ...prev,
      status: prev.status === "active" ? "paused" : "active",
    }));
    toast.success(session.status === "active" ? "Session paused" : "Session resumed");
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSession((prev) => ({ ...prev, lastSync: "Just now" }));
      toast.success("Messages synced successfully");
    }, 2000);
  };


  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = { id: Date.now().toString(), role: "user" as const, content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: `Based on the indexed messages, I found relevant information about "${inputMessage}". Here are some key insights from the session data:\n\n• Multiple discussions mentioning this topic were found\n• The sentiment appears to be generally positive\n• Key contributors include several verified accounts\n\nWould you like me to provide more specific details?`,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/sessions">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{session.name}</h1>
          <p className="text-muted-foreground">{session.source}</p>
        </div>
        <Badge
          variant={session.status === "active" ? "default" : "secondary"}
          className={
            session.status === "active"
              ? "bg-success/10 text-success border-success/20"
              : "bg-muted text-muted-foreground"
          }
        >
          {session.status === "active" ? (
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
              Active
            </span>
          ) : (
            "Paused"
          )}
        </Badge>
      </div>

      {/* Quick Stats & Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MessageSquare className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Messages</p>
                <p className="text-lg font-semibold">{session.messagesCount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last Sync</p>
                <p className="text-lg font-semibold">{session.lastSync}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="text-lg font-semibold">{session.createdAt}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleToggleStatus}
            >
              {session.status === "active" ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleSync}
              disabled={isSyncing}
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Config
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-base">Retrieval Chat</CardTitle>
              <p className="text-sm text-muted-foreground">
                Ask questions to retrieve information from {session.messagesCount.toLocaleString()} indexed messages
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto space-y-4 p-4 rounded-lg bg-muted/30">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-background border p-3 rounded-lg">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                  placeholder="Ask about indexed messages..."
                  disabled={isLoading}
                />
                <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-base">Configuration</CardTitle>
              <p className="text-sm text-muted-foreground">
                Current session settings and AI agent configuration
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* AI Prompt */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">AI Agent Prompt</h4>
                <div className="p-3 rounded-lg bg-muted/30 border">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {session?.config?.aiPrompt || "No prompt configured"}
                  </p>
                </div>
              </div>

              {/* Settings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Sync Interval</h4>
                  <div className="p-3 rounded-lg bg-muted/30 border">
                    <p className="text-sm text-muted-foreground">{session?.config?.syncInterval || "Not set"}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Language</h4>
                  <div className="p-3 rounded-lg bg-muted/30 border">
                    <p className="text-sm text-muted-foreground">{session?.config?.language || "Not set"}</p>
                  </div>
                </div>
              </div>

              {/* Filter Keywords */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Filter Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {session?.config?.filterKeywords?.map((keyword) => (
                    <Badge key={keyword} variant="secondary">
                      {keyword}
                    </Badge>
                  )) || <span className="text-sm text-muted-foreground">No keywords configured</span>}
                </div>
              </div>

              {/* Auto Summarize Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
                <div>
                  <h4 className="text-sm font-medium text-foreground">Auto Summarize</h4>
                  <p className="text-xs text-muted-foreground">Automatically generate summaries for new messages</p>
                </div>
                <Badge variant={session?.config?.autoSummarize ? "default" : "secondary"}>
                  {session?.config?.autoSummarize ? "Enabled" : "Disabled"}
                </Badge>
              </div>

              {/* Edit Button */}
              <Button variant="outline" asChild className="w-full">
                <Link to={`/sessions/${id}/edit`}>
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Configuration
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-base">Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Generated reports and analytics will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SessionDetails;
