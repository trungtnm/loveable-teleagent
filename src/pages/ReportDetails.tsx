import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Download,
  FileText,
  Calendar,
  MessageSquare,
  TrendingUp,
  Users,
  Clock,
  BarChart3,
  Share2,
} from "lucide-react";

const mockReportDetails = {
  id: "1",
  title: "Weekly Summary - Crypto Alpha Signals",
  session: "Crypto Alpha Signals",
  sessionId: "1",
  generatedAt: "Dec 24, 2024 - 10:30 AM",
  status: "completed",
  messagesAnalyzed: 342,
  timeRange: "Dec 17 - Dec 24, 2024",
  summary: `This week saw significant activity in the Crypto Alpha Signals channel with 342 messages analyzed. Key highlights include:

• Bitcoin showed strong bullish momentum with multiple buy signals identified
• Ethereum gas fees remained relatively low, presenting good entry opportunities
• Several altcoins including SOL and AVAX received positive sentiment
• Risk management discussions increased by 23% compared to last week

The overall sentiment was predominantly bullish (67%) with cautious optimism around year-end market movements.`,
  keyMetrics: {
    totalMessages: 342,
    uniqueContributors: 28,
    avgResponseTime: "4.2 min",
    sentimentScore: 72,
  },
  topTopics: [
    { topic: "Bitcoin Analysis", mentions: 89 },
    { topic: "Market Trends", mentions: 67 },
    { topic: "Risk Management", mentions: 45 },
    { topic: "Altcoin Signals", mentions: 38 },
    { topic: "Technical Analysis", mentions: 31 },
  ],
  sentimentBreakdown: {
    bullish: 67,
    neutral: 24,
    bearish: 9,
  },
};

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, fetch report by id
  const report = mockReportDetails;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/reports")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{report.title}</h1>
            <p className="text-muted-foreground mt-1">
              Generated from {report.session}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="default" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <Badge
          className={
            report.status === "completed"
              ? "bg-success/10 text-success border-success/20"
              : "bg-warning/10 text-warning border-warning/20"
          }
        >
          {report.status === "completed" ? "Completed" : "Processing"}
        </Badge>
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {report.generatedAt}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {report.timeRange}
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare className="w-4 h-4" />
          {report.messagesAnalyzed} messages analyzed
        </span>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{report.keyMetrics.totalMessages}</p>
                <p className="text-xs text-muted-foreground">Total Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{report.keyMetrics.uniqueContributors}</p>
                <p className="text-xs text-muted-foreground">Contributors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Clock className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{report.keyMetrics.avgResponseTime}</p>
                <p className="text-xs text-muted-foreground">Avg Response</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <TrendingUp className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{report.keyMetrics.sentimentScore}%</p>
                <p className="text-xs text-muted-foreground">Sentiment Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Summary */}
        <Card className="glass md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
              {report.summary}
            </p>
          </CardContent>
        </Card>

        {/* Sentiment Breakdown */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Bullish</span>
                <span className="font-medium text-success">{report.sentimentBreakdown.bullish}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success rounded-full transition-all"
                  style={{ width: `${report.sentimentBreakdown.bullish}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Neutral</span>
                <span className="font-medium">{report.sentimentBreakdown.neutral}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-muted-foreground/50 rounded-full transition-all"
                  style={{ width: `${report.sentimentBreakdown.neutral}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Bearish</span>
                <span className="font-medium text-destructive">{report.sentimentBreakdown.bearish}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-destructive rounded-full transition-all"
                  style={{ width: `${report.sentimentBreakdown.bearish}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Topics */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Top Discussion Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {report.topTopics.map((item, index) => (
              <div key={item.topic} className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground w-6">
                  #{index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{item.topic}</span>
                    <span className="text-sm text-muted-foreground">{item.mentions} mentions</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary/70 rounded-full transition-all"
                      style={{ width: `${(item.mentions / report.topTopics[0].mentions) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportDetails;
