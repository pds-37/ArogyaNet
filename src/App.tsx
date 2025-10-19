import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Hospital from "./pages/Hospital";
import Government from "./pages/Government";
import NGO from "./pages/NGO";
import Public from "./pages/Public";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/hospital" 
              element={
                <ProtectedRoute allowedRole="hospital">
                  <Hospital />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/government" 
              element={
                <ProtectedRoute allowedRole="government">
                  <Government />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/ngo" 
              element={
                <ProtectedRoute allowedRole="ngo">
                  <NGO />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/public" 
              element={
                <ProtectedRoute allowedRole="public">
                  <Public />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
