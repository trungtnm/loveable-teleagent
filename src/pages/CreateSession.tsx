import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  MessageSquare,
  Send,
  Bot,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CreateSession = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    telegramSource: "",
    alertChannelId: "",
    aiPrompt: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate creation
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Session created!",
        description: `"${form.name}" has been created successfully.`,
      });
      navigate("/sessions");
    }, 1500);
  };

  const defaultPrompt = `You are an AI assistant analyzing Telegram messages. Your task is to:

1. Summarize key topics and discussions
2. Identify important announcements or updates
3. Extract actionable insights
4. Highlight trending topics or sentiment shifts

Provide clear, concise analysis with relevant context.`;

  return (
    <div className="p-6 max-w-3xl mx-auto animate-fade-in">
      {/* Back button */}
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link to="/sessions">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sessions
        </Link>
      </Button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Create New Session</h1>
        <p className="text-muted-foreground mt-1">
          Set up a new Telegram analysis session with AI-powered insights
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Session Information
            </CardTitle>
            <CardDescription>
              Basic details about your analysis session
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Session Name</Label>
              <Input
                id="name"
                placeholder="e.g., Crypto Alpha Signals Analysis"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Telegram source */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Send className="w-5 h-5 text-telegram" />
              Telegram Source
            </CardTitle>
            <CardDescription>
              Configure the Telegram group or channel to analyze
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="source">Group/Channel Username or ID</Label>
              <Input
                id="source"
                placeholder="@channel_username or -1001234567890"
                value={form.telegramSource}
                onChange={(e) => setForm({ ...form, telegramSource: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter the Telegram channel username (with @) or the numeric chat ID
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alertChannel">Alert Channel ID (Optional)</Label>
              <Input
                id="alertChannel"
                placeholder="-1001234567890"
                value={form.alertChannelId}
                onChange={(e) => setForm({ ...form, alertChannelId: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Receive AI-generated reports and alerts in this channel
              </p>
            </div>

            <Alert className="bg-primary/5 border-primary/20">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm">
                Make sure you've connected your Telegram account and have access to the specified group/channel.{" "}
                <Link to="/telegram" className="text-primary hover:underline">
                  Connect Telegram →
                </Link>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* AI Configuration */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5 text-accent" />
              AI Agent Configuration
            </CardTitle>
            <CardDescription>
              Customize how the AI analyzes and summarizes messages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="prompt">AI Analysis Prompt</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setForm({ ...form, aiPrompt: defaultPrompt })}
                  className="text-xs text-primary"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Use default prompt
                </Button>
              </div>
              <Textarea
                id="prompt"
                placeholder="Describe how you want the AI to analyze the messages..."
                className="min-h-[200px] resize-none"
                value={form.aiPrompt}
                onChange={(e) => setForm({ ...form, aiPrompt: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">
                This prompt instructs the AI on how to process and analyze messages from the source
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button type="button" variant="outline" asChild>
            <Link to="/sessions">Cancel</Link>
          </Button>
          <Button type="submit" variant="gradient" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                Creating...
              </>
            ) : (
              "Create Session"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateSession;
