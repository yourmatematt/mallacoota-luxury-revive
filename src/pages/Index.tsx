import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PropertyGrid from "@/components/PropertyGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import DiscoverSection from "@/components/DiscoverSection";
import TestimonialsHorizontalTicker from "@/components/TestimonialsHorizontalTicker";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  // Set homepage SEO meta tags
  useEffect(() => {
    // Homepage title
    const title = "Hammond Properties - Luxury Vacation Rentals Mallacoota";
    document.title = title;
    
    // Homepage meta description
    const description = "Experience Mallacoota's luxury vacation rentals with Hammond Properties. 14 premium properties, stunning lake and ocean views. Come as guests. Leave as family.";
    
    // Update existing meta tags or create new ones
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }

    // Open Graph meta tags for social sharing
    const updateOrCreateOGMeta = (property: string, content: string) => {
      let ogMeta = document.querySelector(`meta[property="${property}"]`);
      if (ogMeta) {
        ogMeta.setAttribute('content', content);
      } else {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', property);
        ogMeta.setAttribute('content', content);
        document.head.appendChild(ogMeta);
      }
    };

    updateOrCreateOGMeta('og:title', title);
    updateOrCreateOGMeta('og:description', description);
    updateOrCreateOGMeta('og:url', 'https://hammondproperties.com.au/');
    updateOrCreateOGMeta('og:image', 'https://hammondproperties.com.au/images/hammond-properties-og.jpg');
    updateOrCreateOGMeta('og:type', 'website');
    updateOrCreateOGMeta('og:site_name', 'Hammond Properties');

    // Twitter Card meta tags
    const updateOrCreateTwitterMeta = (name: string, content: string) => {
      let twitterMeta = document.querySelector(`meta[name="${name}"]`);
      if (twitterMeta) {
        twitterMeta.setAttribute('content', content);
      } else {
        twitterMeta = document.createElement('meta');
        twitterMeta.setAttribute('name', name);
        twitterMeta.setAttribute('content', content);
        document.head.appendChild(twitterMeta);
      }
    };

    updateOrCreateTwitterMeta('twitter:card', 'summary_large_image');
    updateOrCreateTwitterMeta('twitter:title', title);
    updateOrCreateTwitterMeta('twitter:description', description);
    updateOrCreateTwitterMeta('twitter:image', 'https://hammondproperties.com.au/images/hammond-properties-og.jpg');

    // Structured data for Organization
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": "Hammond Properties",
      "alternateName": "Hammond Properties Mallacoota",
      "description": description,
      "url": "https://hammondproperties.com.au",
      "logo": "https://hammondproperties.com.au/images/hammond-properties-logo.jpg",
      "image": "https://hammondproperties.com.au/images/hammond-properties-og.jpg",
      "telephone": "+61401825547", 
      "email": "amelia@hammondproperties.com.au",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mallacoota",
        "addressRegion": "Victoria",
        "addressCountry": "AU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-37.5667",
        "longitude": "149.7333"
      },
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "-37.5667",
          "longitude": "149.7333"
        },
        "geoRadius": "10000"
      },
      "priceRange": "$$$",
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Pet Friendly Options"
        },
        {
          "@type": "LocationFeatureSpecification", 
          "name": "Lake Views"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Ocean Views"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Boat Parking"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "WiFi"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/hammondproperties", // Add real social links
        "https://www.instagram.com/hammondproperties"
      ]
    };

    // Add structured data script
    let structuredDataScript = document.querySelector('#homepage-structured-data');
    if (structuredDataScript) {
      structuredDataScript.textContent = JSON.stringify(structuredData);
    } else {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'homepage-structured-data';
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(structuredDataScript);
    }

    // Additional meta tags for homepage
    const updateOrCreateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    updateOrCreateMeta('keywords', 'Mallacoota accommodation, luxury vacation rentals, holiday houses Victoria, lake view accommodation, pet friendly Mallacoota, Hammond Properties');
    updateOrCreateMeta('author', 'Hammond Properties');
    updateOrCreateMeta('robots', 'index, follow');
    updateOrCreateMeta('viewport', 'width=device-width, initial-scale=1.0');

    // Cleanup function
    return () => {
      // Remove homepage structured data when component unmounts
      const structuredDataScript = document.querySelector('#homepage-structured-data');
      if (structuredDataScript) {
        structuredDataScript.remove();
      }
    };
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <PropertyGrid />
          <DiscoverSection />
          <WhyChooseUs />
          <TestimonialsHorizontalTicker />
          <CTASection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;