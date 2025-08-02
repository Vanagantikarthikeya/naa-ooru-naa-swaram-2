import { useState } from "react";
import { BarChart3, Calendar, Edit, Eye, Heart, MessageCircle, Plus, Settings, Trash2, Upload } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NavLink } from "react-router-dom";
import villageTemple from "@/assets/village-temple.jpg";
import villageFestival from "@/assets/village-festival.jpg";
import villageElder from "@/assets/village-elder.jpg";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const { isEnglish } = useLanguage();

  // Fresh user data - no contributions yet
  const userStats = {
    totalContributions: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    joinDate: new Date().toISOString().split('T')[0]
  };

  // Empty contributions array
  const userContributions: any[] = [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Pending": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Audio": return "🎵";
      case "Video": return "🎥";
      case "Image": return "📸";
      default: return "📝";
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-primary telugu-text">
              {isEnglish ? "Your Dashboard" : "మీ డాష్‌బోర్డ్"}
            </h1>
            <p className="text-xl text-muted-foreground">
              {isEnglish ? "Track your contributions and engagement" : "మీ సహకారాలు మరియు సంఘర్షణను ట్రాక్ చేయండి"}
            </p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <NavLink to="/contribute">
              <Button className="bg-accent hover:bg-accent/90">
                <Plus className="w-4 h-4 mr-2" />
                {isEnglish ? "New Contribution" : "కొత్త సహకారం"}
              </Button>
            </NavLink>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              {isEnglish ? "Settings" : "సెట్టింగులు"}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-village">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{isEnglish ? "Total Contributions" : "మొత్తం సహకారాలు"}</CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{userStats.totalContributions}</div>
              <p className="text-xs text-muted-foreground">
                {isEnglish ? "Start contributing to see stats" : "గణాంకాలను చూడటానికి సహకారం చేయడం ప్రారంభించండి"}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-village">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{isEnglish ? "Total Views" : "మొత్తం వీక్షణలు"}</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{userStats.totalViews}</div>
              <p className="text-xs text-muted-foreground">
                {isEnglish ? "Views will show once you contribute" : "మీరు సహకారం అందించిన తర్వాత వీక్షణలు కనిపిస్తాయి"}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-village">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{isEnglish ? "Total Likes" : "మొత్తం లైక్‌లు"}</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-village-red">{userStats.totalLikes}</div>
              <p className="text-xs text-muted-foreground">
                {isEnglish ? "Share stories to get likes" : "లైక్‌లు పొందడానికి కథలను పంచుకోండి"}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-village">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{isEnglish ? "Comments" : "వ్యాఖ్యలు"}</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{userStats.totalComments}</div>
              <p className="text-xs text-muted-foreground">
                {isEnglish ? "Engage with community to get comments" : "వ్యాఖ్యలు పొందడానికి సమాజంతో నిమగ్నమవ్వండి"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="contributions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contributions">{isEnglish ? "My Contributions" : "నా సహకారాలు"}</TabsTrigger>
            <TabsTrigger value="analytics">{isEnglish ? "Analytics" : "విశ్లేషణలు"}</TabsTrigger>
            <TabsTrigger value="activity">{isEnglish ? "Recent Activity" : "ఇటీవలి కార్యకలాపాలు"}</TabsTrigger>
          </TabsList>

          <TabsContent value="contributions" className="space-y-6">
            <Card className="shadow-village">
              <CardHeader>
                <CardTitle>{isEnglish ? "Your Contributions" : "మీ సహకారాలు"}</CardTitle>
                <CardDescription>
                  {isEnglish ? "Manage and edit your shared stories, photos, and recordings" : "మీ పంచుకున్న కథలు, ఫోటోలు మరియు రికార్డింగ్‌లను నిర్వహించండి మరియు సవరించండి"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {isEnglish ? "No contributions yet" : "ఇంకా సహకారాలు లేవు"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {isEnglish ? "Start sharing your village stories to see them here" : "మీ గ్రామ కథలను పంచుకోవడం ప్రారంభించండి"}
                  </p>
                  <NavLink to="/contribute">
                    <Button className="bg-accent hover:bg-accent/90">
                      <Plus className="w-4 h-4 mr-2" />
                      {isEnglish ? "Add Your First Story" : "మీ మొదటి కథను జోడించండి"}
                    </Button>
                  </NavLink>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="shadow-village">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>{isEnglish ? "Engagement Analytics" : "ఎంగేజ్‌మెంట్ విశ్లేషణలు"}</span>
                </CardTitle>
                <CardDescription>
                  {isEnglish ? "Track how your content is performing over time" : "కాలక్రమేణా మీ కంటెంట్ ఎలా పనిచేస్తుందో ట్రాక్ చేయండి"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                  <div className="text-center space-y-4">
                    <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold">{isEnglish ? "Analytics Coming Soon" : "విశ్లేషణలు త్వరలో వస్తాయి"}</h3>
                      <p className="text-muted-foreground">
                        {isEnglish ? "Detailed analytics and insights for your contributions will be available here." : "మీ సహకారాల కోసం వివరణాత్మక విశ్లేషణలు మరియు అంతర్దృష్టులు ఇక్కడ అందుబాటులో ఉంటాయి."}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="shadow-village">
              <CardHeader>
                <CardTitle>{isEnglish ? "Recent Activity" : "ఇటీవలి కార్యకలాపాలు"}</CardTitle>
                <CardDescription>
                  {isEnglish ? "Your latest actions and community interactions" : "మీ తాజా చర్యలు మరియు సమాజ పరస్పర చర్యలు"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    {isEnglish ? "No recent activity. Start contributing to see your activity here." : "ఇటీవలి కార్యకలాపాలు లేవు. మీ కార్యకలాపాలను ఇక్కడ చూడటానికి సహకారం చేయడం ప్రారంభించండి."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;