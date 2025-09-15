import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Home, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
  const features = [
    {
  icon: MapPin,
  title: "Locals Who Know",
  description: "We live and breathe Mallacoota. We know the hidden spots, the local legends, and the best way to make your holiday truly yours. From booking to check-out, we'll make sure your stay is effortless and memorable.",
  link: { text: "Discover Mallacoota", href: "/discover-mallacoota" },
  image: "/api/placeholder/400/300"
},
{
  icon: Home,
  title: "Stays You'll Love",
  description: "Every home in our collection is one we'd happily stay in ourselves — spacious, stylish, and set up for real comfort. Whether it's a weekend getaway or a long coastal break, you'll feel right at home.",
  link: { text: "Browse Properties", href: "/properties" },
  image: "/api/placeholder/400/300"
},
{
  icon: Heart,
  title: "Care That Feels Like Home",
  description: "It's the little things that make a trip special. A local tip for the perfect fishing spot, a favourite tea waiting in the kitchen, or just a friendly chat — we go the extra mile to make you feel welcome.",
  link: { text: "About Our Team", href: "/about" },
  image: "/api/placeholder/400/300"
}

  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Why Stay with Hammond Properties
          </h2>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              {/* Icon */}
              <div className="mb-8 flex justify-center">
                <div className="w-20 h-20 bg-accent-red rounded-full flex items-center justify-center shadow-medium">
                  <feature.icon size={32} className="text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-semibold text-primary">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                
                {feature.link && (
                  <Link 
                    to={feature.link.href}
                    className="inline-flex items-center text-primary hover:text-accent-red transition-colors font-medium"
                  >
                    {feature.link.text} →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;