import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Home, User, Users, Plus, Image, BookOpen, Languages, LogOut, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isEnglish, toggleLanguage } = useLanguage();
  const { user, isAdmin, signOut } = useAuth();

  const getNavItems = () => {
    const baseItems = [
      { to: "/", label: isEnglish ? "Home" : "హోమ్", icon: Home },
      { to: "/about", label: isEnglish ? "About" : "గురించి", icon: BookOpen },
      { to: "/contribute", label: isEnglish ? "Contribute" : "కంట్రిబ్యూట్", icon: Plus },
      { to: "/gallery", label: isEnglish ? "Gallery" : "గ్యాలరీ", icon: Image },
    ];

    if (user) {
      baseItems.push({ to: "/dashboard", label: isEnglish ? "Dashboard" : "డాష్‌బోర్డ్", icon: Users });
      if (isAdmin) {
        baseItems.push({ to: "/admin", label: isEnglish ? "Admin Panel" : "అడ్మిన్ ప్యానెల్", icon: Shield });
      }
    } else {
      baseItems.push({ to: "/auth", label: isEnglish ? "Login" : "లాగిన్", icon: User });
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full gradient-village"></div>
            <span className="text-xl font-bold text-primary telugu-text">
              {isEnglish ? "Naa Ooru Naa Sarvam" : "నా ఊరు నా సర్వం"}
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors telugu-text ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
            
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-muted-foreground hover:text-foreground"
            >
              <Languages className="w-4 h-4 mr-2" />
              {isEnglish ? "తెలుగు" : "English"}
            </Button>

            {/* User Actions */}
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {isEnglish ? "Logout" : "లాగ్ అవుట్"}
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors telugu-text ${
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
                
                {/* Language Toggle Mobile */}
                <Button
                  variant="ghost"
                  onClick={toggleLanguage}
                  className="justify-start px-4 py-3 text-muted-foreground hover:text-foreground"
                >
                  <Languages className="w-5 h-5 mr-3" />
                  {isEnglish ? "తెలుగు" : "English"}
                </Button>

                {/* User Actions Mobile */}
                {user && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="justify-start px-4 py-3 text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    {isEnglish ? "Logout" : "లాగ్ అవుట్"}
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;