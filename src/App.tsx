import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
const NotFound = lazy(() => import("./pages/NotFound"));
const YouTubePage = lazy(() => import("./pages/YouTube"));
const GamingPage = lazy(() => import("./pages/Gaming"));
const SkillsPage = lazy(() => import("./pages/Skills"));
const Developer = lazy(() => import("./pages/Developer"));
const Friend = lazy(() => import("./pages/Friend"));
const Gamer = lazy(() => import("./pages/Gamer"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/developer" element={<Developer />} />
          <Route path="/friend" element={<Friend />} />
          <Route path="/gamer" element={<Gamer />} />
          <Route path="/youtube" element={<YouTubePage />} />
          <Route path="/gaming" element={<GamingPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
