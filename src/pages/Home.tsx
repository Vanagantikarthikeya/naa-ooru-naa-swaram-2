import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Users, MapPin, Camera, Mic, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import villageHero from "@/assets/village-hero.jpg";
import villageTemple from "@/assets/village-temple.jpg";
import villageFestival from "@/assets/village-festival.jpg";
import villageElder from "@/assets/village-elder.jpg";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isEnglish, toggleLanguage } = useLanguage();

  const carouselImages = [
    { 
      src: villageHero, 
      title: isEnglish ? "Traditional Village Life" : "గ్రామీణ జీవితం", 
      subtitle: isEnglish ? "Village Heritage" : "గ్రామ వారసత్వం" 
    },
    { 
      src: villageTemple, 
      title: isEnglish ? "Sacred Places" : "పవిత్ర స్థలాలు", 
      subtitle: isEnglish ? "Holy Temples" : "పవిత్ర దేవాలయాలు" 
    },
    { 
      src: villageFestival, 
      title: isEnglish ? "Festivals" : "పండుగలు", 
      subtitle: isEnglish ? "Cultural Celebrations" : "సాంస్కృతిక ఉత్సవాలు" 
    },
    { 
      src: villageElder, 
      title: isEnglish ? "Our Elders" : "మన పెద్దలు", 
      subtitle: isEnglish ? "Wisdom Keepers" : "జ్ఞాన వేత్తలు" 
    },
  ];

  const features = [
    {
      icon: Users,
      title: isEnglish ? "Community Stories" : "సమాజ కథలు",
      description: isEnglish ? "Share and discover stories from your village community" : "మీ గ్రామ సమాజం నుండి కథలను పంచుకోండి మరియు కనుగొనండి",
      color: "village-red",
      link: "/gallery"
    },
    {
      icon: MapPin,
      title: isEnglish ? "Village Heritage" : "గ్రామ వారసత్వం",
      description: isEnglish ? "Document and preserve your village's unique heritage" : "మీ గ్రామం యొక్క ప్రత్యేక వారసత్వాన్ని నమోదు చేసి భద్రపరచండి",
      color: "village-yellow",
      link: "/about"
    },
    {
      icon: Camera,
      title: isEnglish ? "Visual Memories" : "దృశ్య జ్ఞాపకాలు",
      description: isEnglish ? "Capture moments that define your village identity" : "మీ గ్రామ గుర్తింపును నిర్వచించే క్షణాలను భద్రపరచండి",
      color: "village-violet",
      link: "/gallery"
    },
    {
      icon: Mic,
      title: isEnglish ? "Oral Traditions" : "మౌఖిక సంప్రదాయాలు",
      description: isEnglish ? "Record and share traditional songs and stories" : "సాంప్రదాయిక పాటలు మరియు కథలను రికార్డ్ చేసి పంచుకోండి",
      color: "accent",
      link: "/contribute"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Language Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLanguage}
          className="absolute top-4 right-4 z-20 text-white hover:bg-white/20 border border-white/30"
        >
          <Languages className="w-4 h-4 mr-2" />
          {isEnglish ? "తెలుగు" : "English"}
        </Button>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 story-entrance">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 telugu-text">
            {isEnglish ? "My Village, My Everything" : "నా ఊరు నా శర్వం"}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 opacity-90">
            {isEnglish ? "Preserving Cultural Heritage" : "సాంస్కృతిక వారసత్వాన్ని భద్రపరచడం"}
          </h2>
          <p className="text-xl md:text-2xl mb-8 telugu-text opacity-80">
            {isEnglish ? "Every village has a story, every person has a history" : "ప్రతి ఊరు ఒక కథ, ప్రతి మనిషి ఒక చరిత్ర"}
          </p>
          <p className="text-lg mb-12 opacity-75 max-w-2xl mx-auto">
            {isEnglish ? "Join us in preserving the essence of our cultural roots and sharing the stories that define us." : "మన సాంస్కృతిక మూలాల సారాంశాన్ని భద్రపరచడంలో మరియు మనల్ని నిర్వచించే కథలను పంచుకోవడంలో మాతో చేరండి."}
          </p>
          <NavLink to="/contribute">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg shadow-warm">
              {isEnglish ? "Start Sharing Your Story" : "మీ కథను పంచుకోవడం ప్రారంభించండి"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </NavLink>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-primary">
            {isEnglish ? "Preserve & Share Your Heritage" : "మీ వారసత్వాన్ని భద్రపరచండి మరియు పంచుకోండి"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {isEnglish ? "Our platform empowers communities to document, share, and celebrate their unique village stories and traditions." : "మా వేదిక సమాజాలను వారి ప్రత్యేక గ్రామ కథలు మరియు సంప్రదాయాలను నమోదు చేయడానికి, పంచుకోవడానికి మరియు జరుపుకోవడానికి శక్తినిస్తుంది."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <NavLink key={index} to={feature.link}>
              <Card className="group hover:shadow-village transition-all duration-300 village-float border-0 bg-card/50 backdrop-blur-sm cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${feature.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-8 h-8 text-${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-sunset">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6 text-white telugu-text">
            {isEnglish ? "Share Your Story" : "మీ కథను పంచుకోండి"}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {isEnglish ? "Join thousands of villagers who are preserving their heritage for future generations." : "భవిష్యత్ తరాలకు తమ వారసత్వాన్ని భద్రపరుస్తున్న వేలాది గ్రామస్థులతో చేరండి."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink to="/auth">
              <Button size="lg" variant="secondary" className="font-semibold px-8">
                {isEnglish ? "Join the Community" : "సమాజంలో చేరండి"}
              </Button>
            </NavLink>
            <NavLink to="/gallery">
              <Button size="lg" variant="outline" className="font-semibold px-8 border-white text-white hover:bg-white hover:text-primary">
                {isEnglish ? "Explore Stories" : "కథలను అన్వేషించండి"}
              </Button>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;