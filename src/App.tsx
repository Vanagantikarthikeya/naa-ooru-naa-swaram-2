import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Contribute from "./pages/Contribute";
import Gallery from "./pages/Gallery";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <AuthProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/about" element={<About />} />
                <Route path="/contribute" element={<Contribute />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  </TooltipProvider>
);

export default App;
