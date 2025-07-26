import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex flex-col leading-tight mb-4">
              <span className="logo-hammond text-3xl">Hammond</span>
              <span className="logo-properties text-base">PROPERTIES</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Mail size={18} className="text-accent-red" />
              <a 
                href="mailto:amelia@hammondproperties.com.au"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                amelia@hammondproperties.com.au
              </a>
            </div>
            
            <Button 
              variant="outline" 
              className="rounded-full border-accent-red text-accent-red hover:bg-accent-red hover:text-white"
            >
              Book a Call
            </Button>
          </div>

          {/* Attribution */}
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              Website Designed by{" "}
              <span className="text-ocean-blue font-medium">
                Lakes Web Design
              </span>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Hammond Properties. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;