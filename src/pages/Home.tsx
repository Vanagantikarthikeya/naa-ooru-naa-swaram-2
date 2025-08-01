import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Users, MapPin, Camera, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import villageHero from "@/assets/village-hero.jpg";
import villageTemple from "@/assets/village-temple.jpg";
import villageFestival from "@/assets/village-festival.jpg";
import villageElder from "@/assets/village-elder.jpg";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    { src: villageHero, title: "గ్రామీణ జీవితం", subtitle: "Traditional Village Life" },
    { src: villageTemple, title: "పవిత్ర స్థలాలు", subtitle: "Sacred Places" },
    { src: villageFestival, title: "పండుగలు", subtitle: "Festivals" },
    { src: villageElder, title: "మన పెద్దలు", subtitle: "Our Elders" },
  ];

  const features = [
    {
      icon: Users,
      title: "Community Stories",
      description: "Share and discover stories from your village community",
      color: "village-red"
    },
    {
      icon: MapPin,
      title: "Village Heritage",
      description: "Document and preserve your village's unique heritage",
      color: "village-yellow"
    },
    {
      icon: Camera,
      title: "Visual Memories",
      description: "Capture moments that define your village identity",
      color: "village-violet"
    },
    {
      icon: Mic,
      title: "Oral Traditions",
      description: "Record and share traditional songs and stories",
      color: "accent"
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

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 story-entrance">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 telugu-text">
            నా ఊరు నా సర్వం
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 opacity-90">
            My Village, My Everything
          </h2>
          <p className="text-xl md:text-2xl mb-8 telugu-text opacity-80">
            ప్రతి ఊరు ఒక కథ, ప్రతి మనిషి ఒక చరిత్ర
          </p>
          <p className="text-lg mb-12 opacity-75 max-w-2xl mx-auto">
            Every village has a story, every person has a history. Join us in preserving the essence of our cultural roots.
          </p>
          <NavLink to="/contribute">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg shadow-warm">
              Start Sharing Your Story
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
            Preserve & Share Your Heritage
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform empowers communities to document, share, and celebrate their unique village stories and traditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-village transition-all duration-300 village-float border-0 bg-card/50 backdrop-blur-sm">
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
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-sunset">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6 text-white telugu-text">
            మీ కథను పంచుకోండి
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of villagers who are preserving their heritage for future generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink to="/auth">
              <Button size="lg" variant="secondary" className="font-semibold px-8">
                Join the Community
              </Button>
            </NavLink>
            <NavLink to="/gallery">
              <Button size="lg" variant="outline" className="font-semibold px-8 border-white text-white hover:bg-white hover:text-primary">
                Explore Stories
              </Button>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;