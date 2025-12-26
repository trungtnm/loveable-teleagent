import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Send,
  Check,
  Copy,
  ExternalLink,
  Shield,
  Key,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const steps = [
  {
    number: 1,
    title: "Login with Telegram",
    description: "Authenticate using your Telegram account to establish a secure connection.",
    icon: Send,
  },
  {
    number: 2,
    title: "Grant Permissions",
    description: "Allow access to read messages from your groups and channels.",
    icon: Shield,
  },
  {
    number: 3,
    title: "Obtain API Token",
    description: "Receive your secure API token to connect TeleInsight with Telegram.",
    icon: Key,
  },
];

const Telegram = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token] = useState("tg_sk_1a2b3c4d5e6f7g8h9i0j_XXXXXXXXXXXX");
  const [showToken, setShowToken] = useState(false);

  const handleConnect = () => {
    setIsLoading(true);
    // Simulate OAuth flow
    setTimeout(() => {
      setIsLoading(false);
      setIsConnected(true);
      toast({
        title: "Connected!",
        description: "Your Telegram account has been successfully connected.",
      });
    }, 2000);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
    toast({
      title: "Copied!",
      description: "Token copied to clipboard.",
    });
  };

  const maskedToken = token.slice(0, 15) + "••••••••••••••••";

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Telegram Integration</h1>
        <p className="text-muted-foreground mt-1">
          Connect your Telegram account to start analyzing messages
        </p>
      </div>

      {/* Connection status */}
      <Card className="glass mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${isConnected ? "gradient-telegram" : "bg-muted"}`}>
              <Send className={`w-6 h-6 ${isConnected ? "text-primary-foreground" : "text-muted-foreground"}`} />
            </div>
            <div>
              <CardTitle>Telegram Account</CardTitle>
              <CardDescription>
                {isConnected ? "Your account is connected" : "Not connected"}
              </CardDescription>
            </div>
          </div>
          <Badge
            className={
              isConnected
                ? "bg-success/10 text-success border-success/20"
                : "bg-muted text-muted-foreground"
            }
          >
            {isConnected ? (
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                Connected
              </span>
            ) : (
              "Disconnected"
            )}
          </Badge>
        </CardHeader>
        {isConnected && (
          <CardContent className="pt-0">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
              <div className="w-12 h-12 rounded-full gradient-telegram flex items-center justify-center text-primary-foreground font-bold text-lg">
                JD
              </div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">@johndoe_tg</p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {!isConnected ? (
        <>
          {/* Steps guide */}
          <Card className="glass mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Setup Guide</CardTitle>
              <CardDescription>
                Follow these steps to connect your Telegram account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className="flex items-start gap-4 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <step.icon className="w-4 h-4 text-primary" />
                        <h3 className="font-medium">{step.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Connect button */}
          <div className="flex justify-center">
            <Button
              variant="telegram"
              size="xl"
              onClick={handleConnect}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Connecting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Connect Telegram
                </>
              )}
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Token section */}
          <Card className="glass mb-8">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                API Token
              </CardTitle>
              <CardDescription>
                Your secure token for API access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Telegram API Token</Label>
                <div className="flex gap-2">
                  <Input
                    value={showToken ? token : maskedToken}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowToken(!showToken)}
                  >
                    {showToken ? "Hide" : "Show"}
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleCopyToken}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Alert className="bg-warning/5 border-warning/20">
                <AlertCircle className="h-4 w-4 text-warning" />
                <AlertDescription className="text-sm">
                  Keep this token secure. Never share it publicly or commit it to version control.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Permissions info */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-success" />
                Granted Permissions
              </CardTitle>
              <CardDescription>
                Current access level for your Telegram integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Read Messages", description: "Access to read messages from groups and channels" },
                  { name: "Channel Info", description: "View channel/group metadata and member counts" },
                  { name: "Message History", description: "Access historical messages for analysis" },
                ].map((permission) => (
                  <div
                    key={permission.name}
                    className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/20"
                  >
                    <Check className="w-4 h-4 text-success" />
                    <div>
                      <p className="text-sm font-medium">{permission.name}</p>
                      <p className="text-xs text-muted-foreground">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Telegram;
