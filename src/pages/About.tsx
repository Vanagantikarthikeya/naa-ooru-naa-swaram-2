import { Heart, Users, Globe, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Cultural Preservation",
      description: "Safeguarding our village traditions, languages, and customs for future generations.",
      color: "village-red"
    },
    {
      icon: Users,
      title: "Community Unity",
      description: "Bringing villages together through shared stories and common heritage.",
      color: "village-yellow"
    },
    {
      icon: Globe,
      title: "Global Connection",
      description: "Connecting Telugu villages worldwide while maintaining local identity.",
      color: "village-violet"
    },
    {
      icon: Shield,
      title: "Authentic Stories",
      description: "Ensuring genuine, community-verified content that honors our roots.",
      color: "accent"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary telugu-text">
            మా గురించి
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-muted-foreground">
            About Our Mission
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            "Naa Ooru Naa Sarvam" is more than a platform – it's a movement to preserve, celebrate, and share the rich heritage of Telugu villages across the world.
          </p>
        </div>

        {/* Vision Section */}
        <div className="mb-20">
          <Card className="bg-gradient-to-r from-accent/10 to-village-yellow/10 border-0 shadow-village">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-6">
                <h3 className="text-3xl font-bold text-primary telugu-text">
                  మా దృష్టి
                </h3>
                <h4 className="text-2xl font-semibold text-primary">Our Vision</h4>
                <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  To create a digital tapestry where every Telugu village's unique identity, stories, traditions, and wisdom are preserved and celebrated. We envision a world where village heritage isn't lost but cherished and passed down through generations.
                </p>
                <blockquote className="text-xl italic text-primary/80 border-l-4 border-accent pl-6 telugu-text">
                  "ప్రతి ఊరు ఒక కథ, ప్రతి మనిషి ఒక చరిత్ర"
                </blockquote>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-primary">
            What We Stand For
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-village transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg bg-${value.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <value.icon className={`w-6 h-6 text-${value.color}`} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-3 text-primary">
                        {value.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-primary">
            How We Preserve Heritage
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-accent">1</span>
              </div>
              <h4 className="text-xl font-semibold text-primary">Collect Stories</h4>
              <p className="text-muted-foreground">
                Community members share their village stories, traditions, and memories through text, audio, images, and video.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-village-yellow/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-village-yellow">2</span>
              </div>
              <h4 className="text-xl font-semibold text-primary">Verify & Curate</h4>
              <p className="text-muted-foreground">
                Local communities verify content authenticity, ensuring genuine representation of village heritage.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-village-violet/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-village-violet">3</span>
              </div>
              <h4 className="text-xl font-semibold text-primary">Share & Preserve</h4>
              <p className="text-muted-foreground">
                Stories become part of a permanent digital archive, accessible to current and future generations.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-sunset border-0 text-white">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4 telugu-text">
                మాతో చేరండి
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Join us in this noble mission to preserve our cultural heritage
              </p>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                Every story you share, every tradition you document, and every memory you preserve becomes a gift to future generations. Together, we can ensure that the soul of our villages lives on forever.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;