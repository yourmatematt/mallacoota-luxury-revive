import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PropertyGrid from "@/components/PropertyGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import DiscoverSection from "@/components/DiscoverSection";
import TestimonialsHorizontalTicker from "@/components/TestimonialsHorizontalTicker";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PropertyGrid />
        <WhyChooseUs />
        <DiscoverSection />
        <TestimonialsHorizontalTicker />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
