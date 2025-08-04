import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Home, Heart } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: MapPin,
      title: "Local Expertise",
      description: "We live and work in Mallacoota. That means we know the area, the people, and what makes a holiday special. From booking to check-out, we make sure your stay is smooth and memorable.",
      image: "/api/placeholder/400/300"
    },
    {
      icon: Home,
      title: "Premium Properties",
      description: "We only list homes we’d happily stay in ourselves. Modern, spacious, family-friendly, and thoughtfully styled — every stay is designed for comfort and relaxation.",
      image: "/api/placeholder/400/300"
    },
    {
      icon: Heart,
      title: "Genuine Care",
      description: "We care about the little things. Whether it's local tips, your favourite tea, or just a friendly chat, we go the extra mile to make you feel at home.",
      image: "/api/placeholder/400/300"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Why Choose Hammond Properties
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;