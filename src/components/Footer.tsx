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
          {/* Logo with tagline */}
          <div className="flex flex-col items-center md:items-start">
            <img 
              src="/lovable-uploads/f810822d-1f52-487a-a0d9-5a203b6d8570.png" 
              alt="Hammond Properties" 
              className="h-12 w-auto mb-4"
            />
            <div className="text-center md:text-left max-w-xs">
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Premium vacation rentals in Mallacoota, East Gippsland. Luxury accommodation with exceptional service and local expertise.
              </p>
              <p className="text-sm font-medium text-primary italic">
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
            
            <Button asChild variant="accent" size="default" rounded="full">
              <Link to="/contact">
                Contact Amelia
              </Link>
            </Button>
          </div>

          {/* Attribution */}
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              Website Designed by{" "}
              <span className="text-ocean-blue font-medium">
                Your Mate Agency
              </span>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Hammond Properties. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;