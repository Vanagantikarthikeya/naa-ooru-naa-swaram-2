import { useState } from "react";
import { Search, Filter, MapPin, Calendar, User, Heart, MessageCircle, Share2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import villageHero from "@/assets/village-hero.jpg";
import villageTemple from "@/assets/village-temple.jpg";
import villageFestival from "@/assets/village-festival.jpg";
import villageElder from "@/assets/village-elder.jpg";

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const { isEnglish } = useLanguage();

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "temples", label: "Temples" },
    { value: "people", label: "People" },
    { value: "culture", label: "Culture" },
    { value: "stories", label: "Stories" },
    { value: "festivals", label: "Festivals" },
    { value: "food", label: "Food" },
    { value: "crafts", label: "Crafts" }
  ];

  const districts = [
    { value: "all", label: "All Districts" },
    { value: "anantapur", label: "Anantapur" },
    { value: "chittoor", label: "Chittoor" },
    { value: "guntur", label: "Guntur" },
    { value: "krishna", label: "Krishna" },
    { value: "visakhapatnam", label: "Visakhapatnam" }
  ];

  // Mock data for gallery items
  const galleryItems = [
    {
      id: 1,
      title: "అమ్మవారి దేవాలయం",
      englishTitle: "Village Temple Heritage",
      description: "Our centuries-old temple that has been the heart of our village for generations.",
      image: villageTemple,
      category: "temples",
      district: "guntur",
      author: "రామకృష్ణ రెడ్డి",
      date: "2024-01-15",
      likes: 42,
      comments: 12,
      type: "image"
    },
    {
      id: 2,
      title: "బతుకమ్మ పండుగ వేడుకలు",
      englishTitle: "Bathukamma Festival Celebrations",
      description: "The vibrant celebration of Bathukamma with traditional songs and dances.",
      image: villageFestival,
      category: "festivals",
      district: "visakhapatnam",
      author: "లక్ష్మీ దేవి",
      date: "2024-01-10",
      likes: 78,
      comments: 23,
      type: "video"
    },
    {
      id: 3,
      title: "అవ్వ కథలు",
      englishTitle: "Grandmother's Stories",
      description: "Traditional folk tales passed down through generations in our family.",
      image: villageElder,
      category: "stories",
      district: "krishna",
      author: "సురేష్ చౌదరి",
      date: "2024-01-08",
      likes: 56,
      comments: 18,
      type: "audio"
    },
    {
      id: 4,
      title: "గ్రామ జీవనం",
      englishTitle: "Village Life",
      description: "Daily life and traditions that make our village unique.",
      image: villageHero,
      category: "culture",
      district: "anantapur",
      author: "వేణుగోపాల్",
      date: "2024-01-05",
      likes: 91,
      comments: 34,
      type: "image"
    }
  ];

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.englishTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesDistrict = selectedDistrict === "all" || item.district === selectedDistrict;
    
    return matchesSearch && matchesCategory && matchesDistrict;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return "🎥";
      case "audio": return "🎵";
      default: return "📸";
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary telugu-text">
            {isEnglish ? "Village Stories Gallery" : "గ్రామ కథల గ్యాలరీ"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {isEnglish ? "Explore and discover stories from Telugu villages across the world" : "ప్రపంచవ్యాప్తంగా ఉన్న తెలుగు గ్రామాల నుండి కథలను అన్వేషించండి మరియు కనుగొనండి"}
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-village">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Search & Filter</span>
            </CardTitle>
            <CardDescription>
              Find specific stories, places, or content that interests you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search stories, places, people..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="pointer-events-auto">
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">District</label>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="pointer-events-auto">
                    {districts.map((district) => (
                      <SelectItem key={district.value} value={district.value}>
                        {district.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredItems.length} of {galleryItems.length} stories
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-village transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-black/50 text-white border-0">
                    {getTypeIcon(item.type)} {item.type}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-accent text-accent-foreground">
                    {categories.find(c => c.value === item.category)?.label}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-primary telugu-text mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      {item.englishTitle}
                    </p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span className="telugu-text">{item.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{districts.find(d => d.value === item.district)?.label}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <button className="flex items-center space-x-1 hover:text-village-red transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="flex items-center space-x-1 hover:text-accent transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            {isEnglish ? "Load More Stories" : "మరిన్ని కథలను లోడ్ చేయండి"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;