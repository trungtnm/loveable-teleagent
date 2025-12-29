import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Sessions from "./pages/Sessions";
import SessionDetails from "./pages/SessionDetails";
import CreateSession from "./pages/CreateSession";
import Reports from "./pages/Reports";
import Telegram from "./pages/Telegram";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/sessions/new" element={<CreateSession />} />
            <Route path="/sessions/:id" element={<SessionDetails />} />
            <Route path="/sessions/:id/chat" element={<SessionDetails />} />
            <Route path="/sessions/:id/edit" element={<CreateSession />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/telegram" element={<Telegram />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
