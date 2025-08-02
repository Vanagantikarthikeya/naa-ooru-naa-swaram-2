import { Mail, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
const Footer = () => {
  return <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full gradient-village"></div>
              <h3 className="text-lg font-bold telugu-text">నా ఊరు నా సర్వం</h3>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Preserving village identities, local voices, and native wisdom for future generations.
            </p>
            <p className="text-primary-foreground/80 text-sm telugu-text">
              ప్రతి ఊరు ఒక కథ, ప్రతి మనిషి ఒక చరిత్ర
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>vanagantikarthik@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4" />
                <span>+91 9059422950</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Connect</h4>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
                Facebook
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
                Twitter
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
                Instagram
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/70 flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-village-red fill-current" />
            <span>for our villages</span>
          </p>
          <p className="text-xs text-primary-foreground/60 mt-1">
            © 2024 Naa Ooru Naa Sarvam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;