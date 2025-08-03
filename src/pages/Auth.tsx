import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import villageElder from "@/assets/village-elder.jpg";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupDistrict, setSignupDistrict] = useState("");
  const { isEnglish } = useLanguage();
  const { user, signIn, signUp, signInWithGoogle, signInWithFacebook } = useAuth();

  const teluguDistricts = [
    "Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna",
    "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram",
    "West Godavari", "Hyderabad", "Karimnagar", "Khammam", "Mahbubnagar",
    "Medak", "Nalgonda", "Nizamabad", "Rangareddy", "Warangal"
  ];

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn(loginEmail, loginPassword);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signUp(signupEmail, signupPassword, signupName, signupDistrict);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookAuth = async () => {
    setIsLoading(true);
    try {
      await signInWithFacebook();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Inspirational Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-accent p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={villageElder}
            alt="Village Elder"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center max-w-md">
          <h1 className="text-4xl font-bold mb-6 telugu-text">
            {isEnglish ? "Welcome to Our Village Community" : "మా గ్రామ సమాజంలోకి స్వాగతం"}
          </h1>
          <p className="text-xl mb-4 opacity-90">
            {isEnglish 
              ? "Every story matters, every voice deserves to be heard."
              : "ప్రతి కథ ముఖ్యం, ప్రతి గొంతుకు వినబడాల్సిన అవసరం ఉంది."
            }
          </p>
          <p className="text-lg opacity-80">
            {isEnglish
              ? "Join us in preserving and sharing the rich heritage of our villages."
              : "మా గ్రామాల గొప్ప వారసత్వాన్ని భద్రపరచడంలో మరియు పంచుకోవడంలో మాతో చేరండి."
            }
          </p>
        </div>
      </div>

      {/* Right Side - Authentication Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">
              {isEnglish ? "Devalaya Dhaara" : "దేవాలయ ధార"}
            </CardTitle>
            <CardDescription>
              {isEnglish ? "Connect with your village community" : "మీ గ్రామ సమాజంతో కనెక్ట్ అవ్వండి"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">
                  {isEnglish ? "Login" : "లాగిన్"}
                </TabsTrigger>
                <TabsTrigger value="register">
                  {isEnglish ? "Register" : "రిజిస్టర్"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">
                      {isEnglish ? "Email or Phone" : "ఇమెయిల్ లేదా ఫోన్"}
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder={isEnglish ? "Enter your email" : "మీ ఇమెయిల్ ఎంటర్ చేయండి"}
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">
                      {isEnglish ? "Password" : "పాస్‌వర్డ్"}
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder={isEnglish ? "Enter your password" : "మీ పాస్‌వర్డ్ ఎంటర్ చేయండి"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading 
                      ? (isEnglish ? "Signing In..." : "లాగిన్ అవుతోంది...") 
                      : (isEnglish ? "Sign In" : "లాగిన్")}
                  </Button>
                </form>

                <Separator />

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleAuth}
                    disabled={isLoading}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {isEnglish ? "Continue with Google" : "గూగుల్‌తో కొనసాగించండి"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleFacebookAuth}
                    disabled={isLoading}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    {isEnglish ? "Continue with Facebook" : "ఫేస్‌బుక్‌తో కొనసాగించండి"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">
                      {isEnglish ? "Full Name" : "పూర్తి పేరు"}
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder={isEnglish ? "Enter your full name" : "మీ పూర్తి పేరు ఎంటర్ చేయండి"}
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-district">
                      {isEnglish ? "District/Region" : "జిల్లా/ప్రాంతం"}
                    </Label>
                    <Select value={signupDistrict} onValueChange={setSignupDistrict} required>
                      <SelectTrigger>
                        <SelectValue placeholder={isEnglish ? "Select your district" : "మీ జిల్లాను ఎంచుకోండి"} />
                      </SelectTrigger>
                      <SelectContent>
                        {teluguDistricts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">
                      {isEnglish ? "Email" : "ఇమెయిల్"}
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder={isEnglish ? "Enter your email" : "మీ ఇమెయిల్ ఎంటర్ చేయండి"}
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">
                      {isEnglish ? "Password" : "పాస్‌వర్డ్"}
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder={isEnglish ? "Create a password" : "పాస్‌వర్డ్ సృష్టించండి"}
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading 
                      ? (isEnglish ? "Creating Account..." : "అకౌంట్ సృష్టిస్తోంది...") 
                      : (isEnglish ? "Create Account" : "అకౌంట్ సృష్టించండి")}
                  </Button>
                </form>

                <Separator />

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleAuth}
                    disabled={isLoading}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {isEnglish ? "Sign up with Google" : "గూగుల్‌తో సైన్ అప్"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleFacebookAuth}
                    disabled={isLoading}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    {isEnglish ? "Sign up with Facebook" : "ఫేస్‌బుక్‌తో సైన్ అప్"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;