import { useState } from "react";
import { Upload, Image, Mic, Video, FileText, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

const Contribute = () => {
  const [isTeluguMode, setIsTeluguMode] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    "Temples & Sacred Places",
    "Festivals & Celebrations", 
    "Local People & Stories",
    "Traditional Crafts",
    "Food & Recipes",
    "Folk Songs & Music",
    "Historical Events",
    "Village Landmarks"
  ];

  const teluguCategories = [
    "దేవాలయాలు మరియు పవిత్ర స్థలాలు",
    "పండుగలు మరియు వేడుకలు",
    "స్థానిక వ్యక్తులు మరియు కథలు",
    "సాంప్రదాయ కళలు",
    "ఆహారం మరియు వంటకాలు",
    "జానపద పాటలు మరియు సంగీతం",
    "చారిత్రక సంఘటనలు",
    "గ్రామ ప్రాముఖ్య స్థలాలు"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setIsUploading(false);
    setUploadProgress(0);
  };

  const contentTypes = [
    {
      id: "text",
      label: isTeluguMode ? "వచనం" : "Text",
      icon: FileText,
      description: isTeluguMode ? "కథలు, చరిత్ర, వివరణలు" : "Stories, history, descriptions"
    },
    {
      id: "audio", 
      label: isTeluguMode ? "ఆడియో" : "Audio",
      icon: Mic,
      description: isTeluguMode ? "పాటలు, ఇంటర్వ్యూలు, కథలు" : "Songs, interviews, stories"
    },
    {
      id: "image",
      label: isTeluguMode ? "చిత్రం" : "Image", 
      icon: Image,
      description: isTeluguMode ? "ఫోటోలు, కళలు, పురాతన వస్తువులు" : "Photos, art, artifacts"
    },
    {
      id: "video",
      label: isTeluguMode ? "వీడియో" : "Video",
      icon: Video, 
      description: isTeluguMode ? "సాంప్రదాయ కార్యక్రమాలు, వేడుకలు" : "Traditional events, ceremonies"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary telugu-text">
            {isTeluguMode ? "మీ కథను పంచుకోండి" : "Share Your Story"}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {isTeluguMode 
              ? "మీ గ్రామ వారసత్వాన్ని భవిష్యత్ తరాలకు అందించండి"
              : "Help preserve your village heritage for future generations"
            }
          </p>
          
          {/* Language Toggle */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <span className={!isTeluguMode ? "font-semibold" : ""}>English</span>
            <Switch 
              checked={isTeluguMode} 
              onCheckedChange={setIsTeluguMode}
              className="data-[state=checked]:bg-accent"
            />
            <span className={isTeluguMode ? "font-semibold telugu-text" : ""}>తెలుగు</span>
          </div>
        </div>

        <Card className="shadow-village">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>{isTeluguMode ? "కంట్రిబ్యూషన్ ఫారం" : "Contribution Form"}</span>
            </CardTitle>
            <CardDescription>
              {isTeluguMode 
                ? "మీ గ్రామ కథలను, సంప్రదాయాలను, మరియు జ్ఞాపకాలను పంచుకోండి"
                : "Share your village stories, traditions, and memories with the community"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="text" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                {contentTypes.map((type) => (
                  <TabsTrigger key={type.id} value={type.id} className="flex flex-col p-3 h-auto">
                    <type.icon className="w-5 h-5 mb-1" />
                    <span className="text-xs">{type.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {contentTypes.map((type) => (
                <TabsContent key={type.id} value={type.id}>
                  <Card className="border-dashed border-2 border-accent/30">
                    <CardHeader className="text-center">
                      <type.icon className="w-12 h-12 mx-auto text-accent mb-2" />
                      <CardTitle>{type.label} Content</CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">
                              {isTeluguMode ? "శీర్షిక" : "Title"} *
                            </Label>
                            <Input
                              id="title"
                              placeholder={isTeluguMode ? "మీ కథకు శీర్షిక ఇవ్వండి" : "Give your story a title"}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location" className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{isTeluguMode ? "స్థలం" : "Location"}</span>
                            </Label>
                            <Input
                              id="location"
                              placeholder={isTeluguMode ? "గ్రామం, జిల్లా" : "Village, District"}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category" className="flex items-center space-x-1">
                            <Tag className="w-4 h-4" />
                            <span>{isTeluguMode ? "వర్గం" : "Category"}</span>
                          </Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder={isTeluguMode ? "వర్గం ఎంచుకోండి" : "Select a category"} />
                            </SelectTrigger>
                            <SelectContent className="pointer-events-auto">
                              {(isTeluguMode ? teluguCategories : categories).map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Content Description */}
                        <div className="space-y-2">
                          <Label htmlFor="description">
                            {isTeluguMode ? "వివరణ" : "Description"} *
                          </Label>
                          <Textarea
                            id="description"
                            rows={6}
                            placeholder={isTeluguMode 
                              ? "మీ కథ, అనుభవం లేదా జ్ఞాపకాన్ని వివరంగా రాయండి..."
                              : "Share your story, experience, or memory in detail..."
                            }
                            required
                          />
                        </div>

                        {/* File Upload */}
                        <div className="space-y-2">
                          <Label htmlFor="file">
                            {isTeluguMode ? "ఫైల్ అప్‌లోడ్" : "Upload File"}
                            {type.id !== "text" && " *"}
                          </Label>
                          <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-accent transition-colors">
                            <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground mb-2">
                              {isTeluguMode 
                                ? `మీ ${type.label} ఫైల్‌ను ఇక్కడ డ్రాగ్ చేయండి లేదా బ్రౌజ్ చేయండి`
                                : `Drag and drop your ${type.label.toLowerCase()} file here or browse`
                              }
                            </p>
                            <Button variant="outline" type="button">
                              {isTeluguMode ? "ఫైల్ ఎంచుకోండి" : "Choose File"}
                            </Button>
                          </div>
                        </div>

                        {/* Upload Progress */}
                        {isUploading && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{isTeluguMode ? "అప్‌లోడ్ అవుతుంది..." : "Uploading..."}</span>
                              <span>{uploadProgress}%</span>
                            </div>
                            <Progress value={uploadProgress} className="h-2" />
                          </div>
                        )}

                        {/* Submit Button */}
                        <Button 
                          type="submit" 
                          className="w-full bg-accent hover:bg-accent/90 shadow-warm"
                          disabled={isUploading}
                        >
                          {isUploading 
                            ? (isTeluguMode ? "అప్‌లోడ్ అవుతుంది..." : "Uploading...")
                            : (isTeluguMode ? "పంచుకోండి" : "Share Your Story")
                          }
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card className="mt-8 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg">
              {isTeluguMode ? "మార్గదర్శకాలు" : "Submission Guidelines"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {isTeluguMode ? "అసలైన మరియు నిజమైన కంటెంట్ మాత్రమే పంచుకోండి" : "Share only authentic and genuine content"}</li>
              <li>• {isTeluguMode ? "ఇతరుల గోప్యతను గౌరవించండి" : "Respect others' privacy and consent"}</li>
              <li>• {isTeluguMode ? "స్పష్టమైన మరియు వివరణాత్మక వర్ణనలు ఇవ్వండి" : "Provide clear and descriptive content"}</li>
              <li>• {isTeluguMode ? "మంచి నాణ్యత గల ఫైళ్లను అప్‌లోడ్ చేయండి" : "Upload high-quality files when possible"}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contribute;