import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  MoreVertical,
  MessageSquare,
  Play,
  Pause,
  Trash2,
  Edit,
  Calendar,
  Bot,
  RefreshCw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const mockSessions = [
  {
    id: "1",
    name: "Crypto Alpha Signals",
    source: "@crypto_alpha_signals",
    status: "active",
    messagesCount: 1247,
    lastSync: "2 hours ago",
    createdAt: "Dec 15, 2024",
  },
  {
    id: "2",
    name: "Tech News Channel",
    source: "@technews_official",
    status: "active",
    messagesCount: 892,
    lastSync: "5 hours ago",
    createdAt: "Dec 10, 2024",
  },
  {
    id: "3",
    name: "Trading Hub Discussion",
    source: "@trading_hub_group",
    status: "paused",
    messagesCount: 2341,
    lastSync: "1 day ago",
    createdAt: "Dec 5, 2024",
  },
  {
    id: "4",
    name: "AI Research Updates",
    source: "@ai_research_news",
    status: "active",
    messagesCount: 456,
    lastSync: "3 hours ago",
    createdAt: "Dec 20, 2024",
  },
];

const Sessions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sessions, setSessions] = useState(mockSessions);
  const [syncingIds, setSyncingIds] = useState<string[]>([]);

  const handleToggleStatus = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? { ...s, status: s.status === "active" ? "paused" : "active" }
          : s
      )
    );
    const session = sessions.find((s) => s.id === sessionId);
    toast.success(
      session?.status === "active" ? "Session paused" : "Session resumed"
    );
  };

  const handleSyncMessages = (sessionId: string) => {
    setSyncingIds((prev) => [...prev, sessionId]);
    setTimeout(() => {
      setSyncingIds((prev) => prev.filter((id) => id !== sessionId));
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId ? { ...s, lastSync: "Just now" } : s
        )
      );
      toast.success("Messages synced successfully");
    }, 2000);
  };

  const filteredSessions = sessions.filter((session) =>
    session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sessions</h1>
          <p className="text-muted-foreground mt-1">
            Manage your Telegram analysis sessions
          </p>
        </div>
        <Button variant="gradient" asChild>
          <Link to="/sessions/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Session
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search sessions..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Sessions grid */}
      {filteredSessions.length === 0 ? (
        <Card className="glass">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="p-4 rounded-full bg-muted mb-4">
              <MessageSquare className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No sessions found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchQuery
                ? "Try adjusting your search query"
                : "Create your first session to start analyzing Telegram messages"}
            </p>
            {!searchQuery && (
              <Button variant="gradient" asChild>
                <Link to="/sessions/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Session
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredSessions.map((session, index) => (
            <Card
              key={session.id}
              className="glass hover:shadow-lg transition-all duration-300 animate-fade-in-up group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
                    <Link to={`/sessions/${session.id}`}>{session.name}</Link>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {session.source}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/sessions/${session.id}`} className="flex items-center">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {session.status === "active" ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Resume
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
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

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Messages
                    </span>
                    <span className="font-medium">{session.messagesCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Bot className="w-3.5 h-3.5" />
                      Last sync
                    </span>
                    <span className="font-medium">{session.lastSync}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      Created
                    </span>
                    <span className="font-medium">{session.createdAt}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleToggleStatus(session.id)}
                  >
                    {session.status === "active" ? (
                      <>
                        <Pause className="w-3.5 h-3.5 mr-1.5" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 mr-1.5" />
                        Resume
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleSyncMessages(session.id)}
                    disabled={syncingIds.includes(session.id)}
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 mr-1.5 ${
                        syncingIds.includes(session.id) ? "animate-spin" : ""
                      }`}
                    />
                    Sync
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                  asChild
                >
                  <Link to={`/sessions/${session.id}`}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sessions;
