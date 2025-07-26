import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA */}
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Plan Your Stay?
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
            See friendly and Charming! Get Early Guest George! Search Expert Tool and Exclusive Strategic Premium Groups for Local Recommendations!
          </p>
          
          {/* Email Contact */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Mail size={20} className="text-luxury-gold" />
            <a 
              href="mailto:info@loveevo.com"
              className="text-luxury-gold hover:text-white transition-colors duration-300 text-lg"
            >
              info@loveevo.com
            </a>
          </div>
          
          {/* CTA Button */}
          <Button 
            size="lg"
            className="bg-accent-red hover:bg-accent-red/90 text-white px-8 py-4 text-lg rounded-full shadow-strong hover:shadow-medium transition-all duration-300"
          >
            Book Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;