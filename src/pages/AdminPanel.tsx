import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, Users, FileText, Activity, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  display_name: string;
  total_contributions: number;
  created_at: string;
}

interface Contribution {
  id: string;
  title: string;
  type: string;
  user_email: string;
  like_count: number;
  comment_count: number;
  created_at: string;
}

interface Analytics {
  totalUsers: number;
  totalContributions: number;
  totalLikes: number;
  totalComments: number;
  recentActivity: any[];
}

const AdminPanel = () => {
  const { user, isAdmin, loading } = useAuth();
  const { isEnglish } = useLanguage();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalUsers: 0,
    totalContributions: 0,
    totalLikes: 0,
    totalComments: 0,
    recentActivity: []
  });
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (user && isAdmin) {
      loadDashboardData();
    }
  }, [user, isAdmin]);

  const loadDashboardData = async () => {
    try {
      setLoadingData(true);
      
      // Load users
      const { data: usersData } = await supabase
        .from('profiles')
        .select('id, user_id, email, display_name, total_contributions, created_at')
        .order('created_at', { ascending: false });

      // Load contributions with user email
      const { data: contributionsData } = await supabase
        .from('contributions')
        .select(`
          id, title, type, like_count, comment_count, created_at, user_id
        `)
        .order('created_at', { ascending: false});

      // Load analytics
      const { data: analyticsData } = await supabase
        .from('analytics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      setUsers(usersData || []);
      
      // Match contributions with user emails
      const formattedContributions = contributionsData?.map(contrib => {
        const user = usersData?.find(u => u.user_id === contrib.user_id);
        return {
          ...contrib,
          user_email: user?.email || 'Unknown'
        };
      }) || [];
      setContributions(formattedContributions);

      // Calculate analytics
      const totalLikes = contributionsData?.reduce((sum, c) => sum + (c.like_count || 0), 0) || 0;
      const totalComments = contributionsData?.reduce((sum, c) => sum + (c.comment_count || 0), 0) || 0;

      setAnalytics({
        totalUsers: usersData?.length || 0,
        totalContributions: contributionsData?.length || 0,
        totalLikes,
        totalComments,
        recentActivity: analyticsData || []
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load dashboard data",
      });
    } finally {
      setLoadingData(false);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User deleted successfully",
      });

      loadDashboardData();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete user",
      });
    }
  };

  const deleteContribution = async (contributionId: string) => {
    try {
      const { error } = await supabase
        .from('contributions')
        .delete()
        .eq('id', contributionId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Contribution deleted successfully",
      });

      loadDashboardData();
    } catch (error) {
      console.error('Error deleting contribution:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete contribution",
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 bg-card rounded-lg border">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            {isEnglish ? "Admin Panel Access" : "అడ్మిన్ ప్యానెల్ యాక్సెస్"}
          </h2>
          <p className="text-muted-foreground mb-4">
            {isEnglish 
              ? "Please log in with admin credentials to access the admin panel." 
              : "అడ్మిన్ ప్యానెల్‌ను యాక్సెస్ చేయడానికి దయచేసి అడ్మిన్ క్రెడెన్షియల్స్‌తో లాగిన్ చేయండి."}
          </p>
          <p className="text-sm text-muted-foreground">
            {isEnglish 
              ? "Admin Email: vanagantikarthik@gmail.com" 
              : "అడ్మిన్ ఇమెయిల్: vanagantikarthik@gmail.com"}
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 bg-card rounded-lg border">
          <h2 className="text-2xl font-bold mb-4 text-destructive">
            {isEnglish ? "Access Denied" : "యాక్సెస్ తిరస్కరించబడింది"}
          </h2>
          <p className="text-muted-foreground mb-4">
            {isEnglish 
              ? "Only administrators can access this panel. Please contact the admin if you believe this is an error." 
              : "అడ్మినిస్ట్రేటర్లు మాత్రమే ఈ ప్యానెల్‌ను యాక్సెస్ చేయగలరు. ఇది ఎర్రర్ అని మీరు నమ్మితే దయచేసి అడ్మిన్‌ని సంప్రదించండి."}
          </p>
          <p className="text-sm text-muted-foreground">
            {isEnglish 
              ? "Admin Email: vanagantikarthik@gmail.com" 
              : "అడ్మిన్ ఇమెయిల్: vanagantikarthik@gmail.com"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            {isEnglish ? "Admin Panel" : "అడ్మిన్ ప్యానెల్"}
          </h1>
          <p className="text-muted-foreground">
            {isEnglish ? "Manage users, contributions, and analytics" : "వినియోగదారులు, సహకారాలు మరియు విశ్లేషణలను నిర్వహించండి"}
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isEnglish ? "Total Users" : "మొత్తం వినియోగదారులు"}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isEnglish ? "Total Contributions" : "మొత్తం సహకారాలు"}
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalContributions}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isEnglish ? "Total Likes" : "మొత్తం లైక్‌లు"}
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalLikes}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isEnglish ? "Total Comments" : "మొత్తం వ్యాఖ్యలు"}
              </CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalComments}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">
              {isEnglish ? "Users" : "వినియోగదారులు"}
            </TabsTrigger>
            <TabsTrigger value="contributions">
              {isEnglish ? "Contributions" : "సహకారాలు"}
            </TabsTrigger>
            <TabsTrigger value="analytics">
              {isEnglish ? "Analytics" : "విశ్లేషణలు"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>
                  {isEnglish ? "User Management" : "వినియోగదారుల నిర్వహణ"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{isEnglish ? "S.No" : "క్రమ సంఖ్య"}</TableHead>
                      <TableHead>{isEnglish ? "Email" : "ఇమెయిల్"}</TableHead>
                      <TableHead>{isEnglish ? "Display Name" : "ప్రదర్శన పేరు"}</TableHead>
                      <TableHead>{isEnglish ? "Contributions" : "సహకారాలు"}</TableHead>
                      <TableHead>{isEnglish ? "Joined" : "చేరిన తేదీ"}</TableHead>
                      <TableHead>{isEnglish ? "Actions" : "చర్యలు"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow key={user.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.display_name || 'N/A'}</TableCell>
                        <TableCell>{user.total_contributions}</TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {isEnglish ? "Delete User" : "వినియోగదారుని తొలగించండి"}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {isEnglish 
                                    ? "This action cannot be undone. This will permanently delete the user and all their data."
                                    : "ఈ చర్య రద్దు చేయబడదు. ఇది వినియోగదారుని మరియు వారి మొత్తం డేటాను శాశ్వతంగా తొలగిస్తుంది."
                                  }
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  {isEnglish ? "Cancel" : "రద్దు"}
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteUser(user.id)}
                                  className="bg-destructive text-destructive-foreground"
                                >
                                  {isEnglish ? "Delete" : "తొలగించు"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contributions">
            <Card>
              <CardHeader>
                <CardTitle>
                  {isEnglish ? "Contribution Management" : "సహకార నిర్వహణ"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{isEnglish ? "Title" : "శీర్షిక"}</TableHead>
                      <TableHead>{isEnglish ? "Type" : "రకం"}</TableHead>
                      <TableHead>{isEnglish ? "Author" : "రచయిత"}</TableHead>
                      <TableHead>{isEnglish ? "Likes" : "లైక్‌లు"}</TableHead>
                      <TableHead>{isEnglish ? "Comments" : "వ్యాఖ్యలు"}</TableHead>
                      <TableHead>{isEnglish ? "Created" : "సృష్టించబడిన"}</TableHead>
                      <TableHead>{isEnglish ? "Actions" : "చర్యలు"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contributions.map((contribution) => (
                      <TableRow key={contribution.id}>
                        <TableCell className="font-medium">{contribution.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{contribution.type}</Badge>
                        </TableCell>
                        <TableCell>{contribution.user_email}</TableCell>
                        <TableCell>{contribution.like_count}</TableCell>
                        <TableCell>{contribution.comment_count}</TableCell>
                        <TableCell>{new Date(contribution.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {isEnglish ? "Delete Contribution" : "సహకారాన్ని తొలగించండి"}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {isEnglish 
                                    ? "This action cannot be undone. This will permanently delete the contribution."
                                    : "ఈ చర్య రద్దు చేయబడదు. ఇది సహకారాన్ని శాశ్వతంగా తొలగిస్తుంది."
                                  }
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  {isEnglish ? "Cancel" : "రద్దు"}
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteContribution(contribution.id)}
                                  className="bg-destructive text-destructive-foreground"
                                >
                                  {isEnglish ? "Delete" : "తొలగించు"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>
                  {isEnglish ? "Analytics Overview" : "విశ్లేషణల అవలోకనం"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-semibold mb-2">
                        {isEnglish ? "User Engagement" : "వినియోగదారుల నిశ్చితార్థం"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {isEnglish 
                          ? `Average ${(analytics.totalLikes / Math.max(analytics.totalUsers, 1)).toFixed(1)} likes per user`
                          : `వినియోగదారుకు సగటు ${(analytics.totalLikes / Math.max(analytics.totalUsers, 1)).toFixed(1)} లైక్‌లు`
                        }
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-semibold mb-2">
                        {isEnglish ? "Content Engagement" : "కంటెంట్ నిశ్చితార్థం"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {isEnglish 
                          ? `Average ${(analytics.totalComments / Math.max(analytics.totalContributions, 1)).toFixed(1)} comments per contribution`
                          : `సహకారానికి సగటు ${(analytics.totalComments / Math.max(analytics.totalContributions, 1)).toFixed(1)} వ్యాఖ్యలు`
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      {isEnglish ? "Advanced analytics coming soon..." : "అధునాతన విశ్లేషణలు త్వరలో వస్తాయి..."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 py-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            {isEnglish 
              ? "All rights reserved for TechCrew Team" 
              : "అన్ని హక్కులు టెక్‌క్రూ టీమ్‌కు చెందినవి"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;