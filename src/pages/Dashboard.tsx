import { useState } from "react";
import { BarChart3, Calendar, Edit, Eye, Heart, MessageCircle, Plus, Settings, Trash2, Upload } from "lucide-react";
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

  // Mock user data
  const userStats = {
    totalContributions: 24,
    totalViews: 1247,
    totalLikes: 156,
    totalComments: 89,
    joinDate: "2023-10-15"
  };

  // Mock contributions data
  const userContributions = [
    {
      id: 1,
      title: "అమ్మవారి దేవాలయం చరిత్ర",
      englishTitle: "Our Village Temple History",
      type: "Story",
      category: "Temples",
      image: villageTemple,
      status: "Published",
      views: 342,
      likes: 28,
      comments: 12,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "బతుకమ్మ పాట రికార్డింగ్",
      englishTitle: "Bathukamma Song Recording",
      type: "Audio",
      category: "Festivals",
      image: villageFestival,
      status: "Published",
      views: 189,
      likes: 34,
      comments: 8,
      date: "2024-01-10"
    },
    {
      id: 3,
      title: "అవ్వ జానపద కథలు",
      englishTitle: "Grandmother's Folk Tales",
      type: "Audio",
      category: "Stories",
      image: villageElder,
      status: "Draft",
      views: 0,
      likes: 0,
      comments: 0,
      date: "2024-01-08"
    }
  ];

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
              మీ డాష్‌బోర్డ్
            </h1>
            <p className="text-xl text-muted-foreground">
              Track your contributions and engagement
            </p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <NavLink to="/contribute">
              <Button className="bg-accent hover:bg-accent/90">
                <Plus className="w-4 h-4 mr-2" />
                New Contribution
              </Button>
            </NavLink>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-village">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{userStats.totalContributions}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-village">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{userStats.totalViews}</div>
              <p className="text-xs text-muted-foreground">
                +180 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-village">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-village-red">{userStats.totalLikes}</div>
              <p className="text-xs text-muted-foreground">
                +23 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-village">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comments</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{userStats.totalComments}</div>
              <p className="text-xs text-muted-foreground">
                +12 from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="contributions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contributions">My Contributions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="contributions" className="space-y-6">
            <Card className="shadow-village">
              <CardHeader>
                <CardTitle>Your Contributions</CardTitle>
                <CardDescription>
                  Manage and edit your shared stories, photos, and recordings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userContributions.map((contribution) => (
                    <div key={contribution.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex items-center space-x-4">
                        <img
                          src={contribution.image}
                          alt={contribution.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-primary telugu-text">
                            {contribution.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {contribution.englishTitle}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {getTypeIcon(contribution.type)} {contribution.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {contribution.category}
                            </Badge>
                            <Badge className={`text-xs ${getStatusColor(contribution.status)}`}>
                              {contribution.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{contribution.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{contribution.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{contribution.comments}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="shadow-village">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Engagement Analytics</span>
                </CardTitle>
                <CardDescription>
                  Track how your content is performing over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                  <div className="text-center space-y-4">
                    <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold">Analytics Coming Soon</h3>
                      <p className="text-muted-foreground">
                        Detailed analytics and insights for your contributions will be available here.
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
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest actions and community interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">Your story "అమ్మవారి దేవాలయం చరిత్ర"</span> received 5 new likes
                      </p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">Someone commented</span> on your Bathukamma recording
                      </p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">You saved a draft</span> "అవ్వ జానపద కథలు"
                      </p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
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