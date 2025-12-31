import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  MessageSquare,
  Send,
  Bot,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export interface SessionFormData {
  name: string;
  telegramSource: string;
  alertChannelId: string;
  aiPrompt: string;
}

interface SessionConfigFormProps {
  form: SessionFormData;
  onChange: (form: SessionFormData) => void;
  readOnly?: boolean;
}

const DEFAULT_PROMPT = `You are an AI assistant analyzing Telegram messages. Your task is to:

1. Summarize key topics and discussions
2. Identify important announcements or updates
3. Extract actionable insights
4. Highlight trending topics or sentiment shifts

Provide clear, concise analysis with relevant context.`;

export const SessionConfigForm = ({ form, onChange, readOnly = false }: SessionConfigFormProps) => {
  const updateField = (field: keyof SessionFormData, value: string) => {
    onChange({ ...form, [field]: value });
  };

  return (
    <div className="space-y-6">
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
              onChange={(e) => updateField("name", e.target.value)}
              readOnly={readOnly}
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
              onChange={(e) => updateField("telegramSource", e.target.value)}
              readOnly={readOnly}
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
              onChange={(e) => updateField("alertChannelId", e.target.value)}
              readOnly={readOnly}
            />
            <p className="text-xs text-muted-foreground">
              Receive AI-generated reports and alerts in this channel
            </p>
          </div>

          {!readOnly && (
            <Alert className="bg-primary/5 border-primary/20">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm">
                Make sure you've connected your Telegram account and have access to the specified group/channel.{" "}
                <Link to="/telegram" className="text-primary hover:underline">
                  Connect Telegram →
                </Link>
              </AlertDescription>
            </Alert>
          )}
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
              {!readOnly && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => updateField("aiPrompt", DEFAULT_PROMPT)}
                  className="text-xs text-primary"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Use default prompt
                </Button>
              )}
            </div>
            <Textarea
              id="prompt"
              placeholder="Describe how you want the AI to analyze the messages..."
              className="min-h-[200px] resize-none"
              value={form.aiPrompt}
              onChange={(e) => updateField("aiPrompt", e.target.value)}
              readOnly={readOnly}
              required
            />
            <p className="text-xs text-muted-foreground">
              This prompt instructs the AI on how to process and analyze messages from the source
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionConfigForm;
