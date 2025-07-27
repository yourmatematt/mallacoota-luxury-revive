import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "Discover Mallacoota", href: "/discover-mallacoota" },
    { name: "About", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <img 
              src="/lovable-uploads/f810822d-1f52-487a-a0d9-5a203b6d8570.png" 
              alt="Hammond Properties" 
              className="h-12 w-auto mb-4"
            />
          </div>

          {/* Navigation */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-muted-foreground hover:text-accent-red transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left space-y-3">
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Mail size={16} className="text-accent-red" />
              <a 
                href="mailto:amelia@hammondproperties.com.au"
                className="text-muted-foreground hover:text-accent-red transition-colors duration-300 text-sm"
              >
                amelia@hammondproperties.com.au
              </a>
            </div>
            
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Phone size={16} className="text-accent-red" />
              <a 
                href="tel:0401825547"
                className="text-muted-foreground hover:text-accent-red transition-colors duration-300 text-sm"
              >
                0401 825 547
              </a>
            </div>
            
            <Button 
              variant="outline" 
              className="rounded-full border-accent-red text-accent-red hover:bg-accent-red hover:text-white mt-4"
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