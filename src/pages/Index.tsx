import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, FileText, Sparkles, ArrowRight, Send } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl gradient-primary shadow-glow">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">TeleInsight AI</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/auth">Login</Link>
          </Button>
          <Button variant="gradient" asChild>
            <Link to="/auth">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            AI-Powered Telegram Intelligence
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Transform Telegram Messages
            <br />
            <span className="text-gradient">Into Actionable Insights</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Automatically analyze, summarize, and extract key insights from your Telegram groups and channels with advanced AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <Button variant="gradient" size="xl" asChild>
              <Link to="/auth">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/auth">
                <Send className="w-5 h-5 mr-2" />
                Connect Telegram
              </Link>
            </Button>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {[
              {
                icon: MessageSquare,
                title: "Message Analysis",
                description: "Automatically fetch and analyze messages from any Telegram group or channel.",
              },
              {
                icon: Bot,
                title: "AI-Powered Insights",
                description: "Custom AI agents extract summaries, sentiment, and key topics from conversations.",
              },
              {
                icon: FileText,
                title: "Automated Reports",
                description: "Generate and receive scheduled reports delivered directly to your Telegram.",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl glass hover:shadow-lg transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-sm text-muted-foreground">
        <p>© 2024 TeleInsight AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
