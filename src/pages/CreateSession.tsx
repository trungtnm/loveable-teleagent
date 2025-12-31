import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { SessionConfigForm, SessionFormData } from "@/components/sessions/SessionConfigForm";

const CreateSession = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<SessionFormData>({
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
        <SessionConfigForm form={form} onChange={setForm} />

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
