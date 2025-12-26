import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Send,
  FileText,
  Plus,
  ArrowRight,
  Activity,
  TrendingUp,
  Clock,
} from "lucide-react";

const stats = [
  {
    title: "Total Sessions",
    value: "12",
    change: "+2 this week",
    icon: MessageSquare,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Active Sources",
    value: "8",
    change: "3 groups, 5 channels",
    icon: Send,
    color: "text-telegram",
    bgColor: "bg-telegram/10",
  },
  {
    title: "Reports Generated",
    value: "47",
    change: "+12 this month",
    icon: FileText,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "session",
    title: "Crypto Alpha Signals analysis completed",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    type: "report",
    title: "Weekly summary report generated",
    time: "5 hours ago",
    status: "completed",
  },
  {
    id: 3,
    type: "session",
    title: "Tech News Channel session started",
    time: "1 day ago",
    status: "active",
  },
  {
    id: 4,
    type: "alert",
    title: "New messages detected in Trading Hub",
    time: "1 day ago",
    status: "pending",
  },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your Telegram analysis.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/telegram">
              <Send className="w-4 h-4 mr-2" />
              Connect Telegram
            </Link>
          </Button>
          <Button variant="gradient" asChild>
            <Link to="/sessions/new">
              <Plus className="w-4 h-4 mr-2" />
              New Session
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="glass hover:shadow-lg transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-success" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions & Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <Card className="glass lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common tasks to get you started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-between group" asChild>
              <Link to="/sessions/new">
                Create New Session
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between group" asChild>
              <Link to="/telegram">
                Connect Telegram Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between group" asChild>
              <Link to="/reports">
                View All Reports
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates from your sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`p-2 rounded-lg ${
                    activity.type === "session" ? "bg-primary/10" :
                    activity.type === "report" ? "bg-accent/10" : "bg-warning/10"
                  }`}>
                    {activity.type === "session" ? (
                      <MessageSquare className="w-4 h-4 text-primary" />
                    ) : activity.type === "report" ? (
                      <FileText className="w-4 h-4 text-accent" />
                    ) : (
                      <Activity className="w-4 h-4 text-warning" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge
                    variant={
                      activity.status === "completed" ? "default" :
                      activity.status === "active" ? "secondary" : "outline"
                    }
                    className={
                      activity.status === "completed" ? "bg-success/10 text-success border-success/20" :
                      activity.status === "active" ? "bg-primary/10 text-primary border-primary/20" :
                      "bg-warning/10 text-warning border-warning/20"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
