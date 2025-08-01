import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import villageElder from "@/assets/village-elder.jpg";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);

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
              మీ గ్రామ కథలను జీవంతంగా ఉంచండి
            </h1>
            <p className="text-xl text-muted-foreground">
              Keep your village stories alive and share them with the world
            </p>
            <blockquote className="text-lg italic text-primary/80 border-l-4 border-accent pl-4">
              "A village without stories is like a tree without roots"
            </blockquote>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <Card className="max-w-md mx-auto w-full shadow-village">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold telugu-text">స్వాగతం</CardTitle>
            <CardDescription>
              Join our community to share your village heritage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email / Phone</Label>
                    <Input
                      id="email"
                      type="text"
                      placeholder="Enter your email or phone"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">District / Region</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your district" />
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
                    <Label htmlFor="contact">Phone / Email</Label>
                    <Input
                      id="contact"
                      type="text"
                      placeholder="Phone number or email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Create Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Create a strong password"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                By joining, you agree to preserve and respect our cultural heritage
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;