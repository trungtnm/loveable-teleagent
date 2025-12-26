import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Search,
  Download,
  Eye,
  Calendar,
  MessageSquare,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockReports = [
  {
    id: "1",
    title: "Weekly Summary - Crypto Alpha Signals",
    session: "Crypto Alpha Signals",
    generatedAt: "Dec 24, 2024 - 10:30 AM",
    status: "completed",
    messagesAnalyzed: 342,
  },
  {
    id: "2",
    title: "Daily Digest - Tech News Channel",
    session: "Tech News Channel",
    generatedAt: "Dec 23, 2024 - 6:00 PM",
    status: "completed",
    messagesAnalyzed: 128,
  },
  {
    id: "3",
    title: "Sentiment Analysis - Trading Hub",
    session: "Trading Hub Discussion",
    generatedAt: "Dec 22, 2024 - 9:15 AM",
    status: "completed",
    messagesAnalyzed: 567,
  },
  {
    id: "4",
    title: "Weekly Summary - AI Research Updates",
    session: "AI Research Updates",
    generatedAt: "Dec 21, 2024 - 11:00 AM",
    status: "processing",
    messagesAnalyzed: 89,
  },
];

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.session.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground mt-1">
          View and download AI-generated analysis reports
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reports</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reports list */}
      {filteredReports.length === 0 ? (
        <Card className="glass">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="p-4 rounded-full bg-muted mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No reports found</h3>
            <p className="text-muted-foreground text-center">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your filters"
                : "Reports will appear here once sessions generate them"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((report, index) => (
            <Card
              key={report.id}
              className="glass hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-accent/10">
                      <FileText className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {report.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {report.session}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {report.generatedAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          {report.messagesAnalyzed} messages
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-auto">
                    <Badge
                      className={
                        report.status === "completed"
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-warning/10 text-warning border-warning/20"
                      }
                    >
                      {report.status === "completed" ? "Completed" : "Processing"}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={report.status !== "completed"}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
