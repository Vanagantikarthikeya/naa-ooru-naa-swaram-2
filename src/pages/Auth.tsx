import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import villageElder from "@/assets/village-elder.jpg";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isEnglish } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 2000);
  };

  const teleguDistricts = [
    "అనంతపురం", "చిత్తూరు", "తూర్పు గోదావరి", "గుంటూరు", "కడప", "కృష్ణా", 
    "కర్నూలు", "నెల్లూరు", "ప్రకాశం", "శ్రీకాకుళం", "విశాఖపట్నం", "విజయనగరం", 
    "పశ్చిమ గోదావరి"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-secondary to-muted">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Motivational Content */}
        <div className="text-center lg:text-left space-y-6">
          <div className="relative">
            <img
              src={villageElder}
              alt="Village Elder"
              className="w-full max-w-md mx-auto lg:mx-0 rounded-xl shadow-village"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-primary telugu-text">
              {isEnglish ? "Keep your village stories alive" : "మీ గ్రామ కథలను జీవంతంగా ఉంచండి"}
            </h1>
            <p className="text-xl text-muted-foreground">
              {isEnglish ? "Keep your village stories alive and share them with the world" : "మీ గ్రామ కథలను జీవంతంగా ఉంచండి మరియు వాటిని ప్రపంచంతో పంచుకోండి"}
            </p>
            <blockquote className="text-lg italic text-primary/80 border-l-4 border-accent pl-4">
              {isEnglish ? '"A village without stories is like a tree without roots"' : '"కథలు లేని గ్రామం వేళ్లు లేని చెట్టు వంటిది"'}
            </blockquote>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <Card className="max-w-md mx-auto w-full shadow-village">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold telugu-text">
              {isEnglish ? "Welcome" : "స్వాగతం"}
            </CardTitle>
            <CardDescription>
              {isEnglish ? "Join our community to share your village heritage" : "మీ గ్రామ వారసత్వాన్ని పంచుకోవడానికి మా సమాజంలో చేరండి"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">{isEnglish ? "Login" : "లాగిన్"}</TabsTrigger>
                <TabsTrigger value="register">{isEnglish ? "Register" : "నమోదు"}</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{isEnglish ? "Email / Phone" : "ఇమెయిల్ / ఫోన్"}</Label>
                    <Input
                      id="email"
                      type="text"
                      placeholder={isEnglish ? "Enter your email or phone" : "మీ ఇమెయిల్ లేదా ఫోన్ నంబర్ నమోదు చేయండి"}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{isEnglish ? "Password" : "పాస్‌వర్డ్"}</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder={isEnglish ? "Enter your password" : "మీ పాస్‌వర్డ్ నమోదు చేయండి"}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (isEnglish ? "Signing in..." : "లాగిన్ అవుతోంది...") : (isEnglish ? "Sign In" : "లాగిన్")}
                  </Button>

                  <div className="relative my-4">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                      {isEnglish ? "OR" : "లేదా"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" type="button" className="w-full">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" type="button" className="w-full">
                      <svg className="w-4 h-4 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{isEnglish ? "Full Name" : "పూర్తి పేరు"}</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={isEnglish ? "Enter your full name" : "మీ పూర్తి పేరు నమోదు చేయండి"}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">{isEnglish ? "District / Region" : "జిల్లా / ప్రాంతం"}</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder={isEnglish ? "Select your district" : "మీ జిల్లాను ఎంచుకోండి"} />
                      </SelectTrigger>
                      <SelectContent className="pointer-events-auto">
                        {teleguDistricts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">{isEnglish ? "Phone / Email" : "ఫోన్ / ఇమెయిల్"}</Label>
                    <Input
                      id="contact"
                      type="text"
                      placeholder={isEnglish ? "Phone number or email" : "ఫోన్ నంబర్ లేదా ఇమెయిల్"}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">{isEnglish ? "Create Password" : "పాస్‌వర్డ్ సృష్టించండి"}</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder={isEnglish ? "Create a strong password" : "బలమైన పాస్‌వర్డ్ సృష్టించండి"}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (isEnglish ? "Creating Account..." : "ఖాతా సృష్టిస్తోంది...") : (isEnglish ? "Create Account" : "ఖాతా సృష్టించండి")}
                  </Button>

                  <div className="relative my-4">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                      {isEnglish ? "OR" : "లేదా"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" type="button" className="w-full">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" type="button" className="w-full">
                      <svg className="w-4 h-4 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isEnglish ? "By joining, you agree to preserve and respect our cultural heritage" : "చేరడం ద్వారా, మీరు మా సాంస్కృతిక వారసత్వాన్ని భద్రపరచడానికి మరియు గౌరవించడానికి అంగీకరిస్తున్నారు"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;