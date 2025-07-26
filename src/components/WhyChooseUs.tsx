import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Home, Heart } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: MapPin,
      title: "Local Expertise",
      description: "We live and work in Mallacoola, and believe that makes a real difference. We don't just rent out places - we care about your experience, and we want your holiday to be about memories with family and friends. From booking to check-out, we provide personalized service to ensure your stay is as comfortable as possible.",
      image: "/api/placeholder/400/300"
    },
    {
      icon: Home,
      title: "Premium Properties",
      description: "We only manage properties we would happily let our own family stay at - it's how we recommend a genuinely relaxing and relaxing place to unwind. We know what it's like to travel with kids, pets, and elderly relatives, so all our properties are modern, spacious, well-maintained with outstanding views. Every feature, every fitting, every finish has been thoughtfully selected.",
      image: "/api/placeholder/400/300"
    },
    {
      icon: Heart,
      title: "Genuine Care",
      description: "The little things matter. We don't need five or five thousand reviews saying 'we offer clean, comfortable accommodation with fair prices and personal service.' We know that holidays are about making memories with people you care about. So we look out for our guests - whether it's stocking your favorite wine or tea, or we're like the locals do and give you local recommendations that others might have missed.",
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