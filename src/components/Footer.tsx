import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12">

        {/* Mobile-first responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Company Info Section */}
          <div className="text-center md:text-left">
            <div className="mb-4">
              <img
                src="/lovable-uploads/f810822d-1f52-487a-a0d9-5a203b6d8570.png"
                alt="Hammond Properties"
                className="h-12 w-auto mx-auto md:mx-0"
              />
            </div>
            <div className="max-w-xs mx-auto md:mx-0">
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Premium holiday rentals in Mallacoota, East Gippsland.
              </p>
              <p className="text-sm font-medium text-primary italic">
                Come as guests. Leave as family.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/properties" className="block text-muted-foreground hover:text-accent-red transition-colors duration-300 text-sm">
                All Properties
              </Link>
              <Link to="/properties?feature=waterfront" className="block text-muted-foreground hover:text-accent-red transition-colors duration-300 text-sm">
                Waterfront
              </Link>
              <Link to="/properties?feature=pet_friendly" className="block text-muted-foreground hover:text-accent-red transition-colors duration-300 text-sm">
                Pet Friendly
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-accent-red transition-colors duration-300 text-sm">
                About
              </Link>
              <Link to="/testimonials" className="block text-muted-foreground hover:text-accent-red transition-colors duration-300 text-sm">
                Testimonials
              </Link>
            </nav>
          </div>

          {/* Popular Guides - Single column on mobile */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-foreground mb-4">Popular Guides</h4>
            <nav className="space-y-2">
              <Link to="/discover-mallacoota/gabo-island" className="block text-muted-foreground hover:text-accent-red transition-colors duration-300 text-sm">
                Gabo Island Tours
              </Link>
              <Link to="/discover-mallacoota/secret-beaches-coastal-walks" className="block text-muted-foreground hover:text-accent-red transition-colors duration-300 text-sm">
                Secret Beaches
              </Link>
              <Link to="/discover-mallacoota/origami-coffee-the-local-institution" className="block text-muted-foreground hover:text-accent-red transition-colors duration-300 text-sm">
                Origami Coffee
              </Link>
              <Link to="/discover-mallacoota/complete-restaurant-guide" className="block text-muted-foreground hover:text-accent-red transition-colors duration-300 text-sm">
                Restaurant Guide
              </Link>
              <Link to="/things-to-do-mallacoota" className="block text-muted-foreground hover:text-accent-red transition-colors duration-300 text-sm">
                Things to Do
              </Link>
            </nav>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:amelia@hammondproperties.com.au"
                className="flex items-center justify-center md:justify-start gap-2 text-sm hover:text-accent-red transition-colors duration-300 text-muted-foreground"
              >
                <Mail size={16} className="text-accent-red flex-shrink-0" />
                <span className="break-all">amelia@hammondproperties.com.au</span>
              </a>
              <a
                href="tel:0401825547"
                className="flex items-center justify-center md:justify-start gap-2 text-sm hover:text-accent-red transition-colors duration-300 text-muted-foreground"
              >
                <Phone size={16} className="text-accent-red flex-shrink-0" />
                0401 825 547
              </a>
              <div className="pt-2">
                <Button
                  asChild
                  variant="accent"
                  size="sm"
                  rounded="full"
                  className="w-full md:w-auto"
                >
                  <Link to="/contact">Contact Amelia</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-xs text-muted-foreground">
              © 2025 Hammond Properties. All rights reserved.
            </p>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">
                Website Designed by{" "}
                <a href="https://yourmateagency.com.au" target="_blank" rel="noopener noreferrer" className="text-ocean-blue font-medium hover:text-ocean-blue/80 transition-colors duration-200">Your Mate Agency</a>
              </p>
              <p className="text-xs text-muted-foreground">
                Email{" "}
                <a
                  href="mailto:matt@yourmateagency.com.au"
                  className="text-ocean-blue hover:text-ocean-blue/80 font-medium underline transition-colors duration-200 break-all"
                >
                  matt@yourmateagency.com.au
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;