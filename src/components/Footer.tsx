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
          {/* Logo with SEO Text */}
          <div className="flex flex-col items-center md:items-start">
            <img 
              src="/lovable-uploads/f810822d-1f52-487a-a0d9-5a203b6d8570.png" 
              alt="Hammond Properties - Premium Vacation Rentals Mallacoota" 
              className="h-12 w-auto mb-4"
            />
            {/* SEO-friendly text */}
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Premium vacation rentals in Mallacoota, East Gippsland. 
                Luxury accommodation with exceptional service and local expertise.
              </p>
              <p className="text-xs text-muted-foreground/80 mt-2">
                Come as guests. Leave as family.
              </p>
            </div>
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

          {/* Contact Info with Better Spacing */}
          <div className="text-center md:text-left space-y-4">
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
            
            {/* Contact Amelia Button with Better Spacing */}
            <div className="pt-4">
              <Link to="/contact">
                <Button 
                  variant="outline" 
                  size="default" 
                  className="border-accent-red text-accent-red hover:bg-accent-red hover:text-white rounded-full px-6 py-2"
                >
                  Contact Amelia
                </Button>
              </Link>
            </div>
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