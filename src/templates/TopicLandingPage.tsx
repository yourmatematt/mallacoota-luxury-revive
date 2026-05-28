import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Anchor,
  Calendar,
  Compass,
  Fish,
  Heart,
  MapPin,
  PawPrint,
  Snowflake,
  Sparkles,
  Star,
  Sun,
  TreePine,
  Users,
  Waves,
  Wind,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOMetaTags from "@/components/SEOMetaTags";
import FAQSection from "@/components/FAQSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSignatureProperties } from "@/hooks/useSignatureProperties";
import { getPropertyFallbackImage } from "@/lib/imageUtils";
import type { TopicIconName, TopicLandingConfig } from "@/data/topicLandingPages/_types";

const ICON_MAP: Record<TopicIconName, LucideIcon> = {
  Fish,
  Anchor,
  Waves,
  Wind,
  Sun,
  Snowflake,
  Users,
  Compass,
  Star,
  MapPin,
  Calendar,
  TreePine,
  Heart,
  PawPrint,
  Sparkles,
};

const Icon = ({ name, className }: { name: TopicIconName; className?: string }) => {
  const Cmp = ICON_MAP[name];
  return <Cmp className={className} aria-hidden="true" />;
};

interface TopicLandingPageProps {
  config: TopicLandingConfig;
}

const TopicLandingPage = ({ config }: TopicLandingPageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: allProperties, isLoading: propertiesLoading } = useSignatureProperties();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredProperties = (allProperties ?? []).filter(config.filterProperty);
  const propertiesToShow = filteredProperties.slice(0, 3);

  const canonicalUrl = `https://hammondproperties.com.au${config.canonicalPath}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#collectionpage`,
        "name": config.breadcrumbName,
        "description": config.metaDescription,
        "url": canonicalUrl,
        "inLanguage": "en-AU",
        "isPartOf": { "@id": "https://hammondproperties.com.au/#website" },
        "about": { "@id": "https://hammondproperties.com.au/#lodgingbusiness" },
      },
      {
        "@type": "LodgingBusiness",
        "@id": "https://hammondproperties.com.au/#lodgingbusiness",
        "name": "Hammond Properties",
        "url": "https://hammondproperties.com.au",
        "telephone": "+61 401 825 547",
        "email": "amelia@hammondproperties.com.au",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mallacoota",
          "addressRegion": "Victoria",
          "addressCountry": "AU",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-37.5642",
          "longitude": "149.7544",
        },
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#properties`,
        "name": config.propertiesHeading,
        "numberOfItems": propertiesToShow.length,
        "itemListElement": propertiesToShow.map((p, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": p.title,
          "url": `https://hammondproperties.com.au/properties/${p.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hammondproperties.com.au/" },
          { "@type": "ListItem", "position": 2, "name": config.breadcrumbName, "item": canonicalUrl },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOMetaTags
        title={config.metaTitle}
        description={config.metaDescription}
        canonical={canonicalUrl}
        ogImage={config.ogImage}
        imageAlt={`${config.heroHeading} — Hammond Properties Mallacoota`}
        schema={schema}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <div
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
              isLoaded ? "scale-100" : "scale-105"
            }`}
            style={{ backgroundImage: `url("${config.heroImage}")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-5xl mx-auto">
              <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 text-base px-4 py-2">
                <Icon name={config.heroBadgeIcon} className="w-4 h-4 mr-2 inline" />
                {config.heroBadgeText}
              </Badge>
              <h1
                className={`text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 transition-all duration-800 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {config.heroHeading}
              </h1>
              <p
                className={`text-xl md:text-2xl mb-8 leading-relaxed transition-all duration-800 delay-200 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {config.heroSubtitle}
              </p>
              <div
                className={`flex flex-wrap gap-4 justify-center transition-all duration-800 delay-400 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link to={config.heroPrimaryCtaTo}>{config.heroPrimaryCtaText}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-gray-900"
                >
                  <Link to={config.heroSecondaryCtaTo}>{config.heroSecondaryCtaText}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 text-center">
                {config.introHeading}
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                {config.introParagraphs.map((p, i) => (
                  <p key={i} className={i === 0 ? "text-xl mb-6" : "mb-6 last:mb-0"}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gradient-to-b from-luxury-cream/30 to-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-12 text-center">
              {config.featuresHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {config.features.map((feature, index) => (
                <Card key={index} className="card-luxury text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <Icon name={feature.icon} className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                {config.propertiesHeading}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {config.propertiesSubtitle}
              </p>
            </div>

            {propertiesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-gray-200"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-20 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : propertiesToShow.length === 0 ? (
              <p className="text-center text-muted-foreground">{config.emptyPropertiesFallbackText}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {propertiesToShow.map((property) => (
                  <Card key={property.slug} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={property.heroImageUrl || getPropertyFallbackImage(property.imageFolder)}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = getPropertyFallbackImage(property.imageFolder);
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-serif font-bold">{property.title}</h3>
                        <Badge className="mt-2 bg-white/20 backdrop-blur-sm border-white/30">
                          <Icon name={config.propertyBadgeIcon} className="w-3 h-3 mr-1" />
                          {config.propertyBadgeText}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4 line-clamp-2">{property.excerpt}</p>
                      <div className="flex gap-2 mb-4 flex-wrap">
                        <Badge variant="outline">{property.bedrooms} Bedrooms</Badge>
                        <Badge variant="outline">Sleeps {property.guests}</Badge>
                      </div>
                      <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                        <Link to={`/properties/${property.slug}`}>View Property</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link to="/properties">View All Properties</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Spots / seasons */}
        {config.spotsCards.length > 0 && (
          <section className="py-20 bg-gradient-to-b from-luxury-cream/30 to-white">
            <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-12 text-center">
                {config.spotsHeading}
              </h2>
              <div className={`grid grid-cols-1 ${config.spotsCards.length > 1 ? "md:grid-cols-2" : ""} gap-8`}>
                {config.spotsCards.map((card, i) => (
                  <Card key={i} className="card-luxury">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4 mb-4">
                        {card.icon && (
                          <Icon name={card.icon} className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        )}
                        <div className="w-full">
                          <h3 className="text-2xl font-semibold text-primary mb-4">{card.heading}</h3>
                          <ul className="space-y-3 text-muted-foreground">
                            {card.items.map((item, j) => (
                              <li key={j}>
                                {item.title && <strong>{item.title} </strong>}
                                {item.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        <FAQSection title={config.faqTitle} faqs={config.faqs} />

        {/* CTA */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${config.ctaImage}")` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              {config.ctaHeading}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{config.ctaDescription}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link to="/properties">Browse Properties</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-primary"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TopicLandingPage;
