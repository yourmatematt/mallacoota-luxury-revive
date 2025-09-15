import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Home, Phone, Mail, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import SEOHead from "@/components/SEOHead";
import { useRandomProperties } from "@/hooks/useProperties";

const NotFound = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: popularProperties, isLoading } = useRandomProperties(3);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirect to properties page with search
      window.location.href = `/properties?search=${encodeURIComponent(searchTerm.trim())}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Page Not Found | Hammond Properties Mallacoota"
        description="The page you're looking for doesn't exist. Find luxury holiday rentals in Mallacoota or contact us for assistance."
      />
      
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Error Message */}
            <div className="mb-12">
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-primary mb-4">404</h1>
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-primary mb-4">
                Property Not Found
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Sorry, the page you're looking for doesn't exist. Perhaps you're searching for one of our beautiful Mallacoota holiday rentals?
              </p>
            </div>

            {/* Search Section */}
            <Card className="mb-12 bg-white shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-serif font-semibold text-primary mb-4">
                  Search Our Properties
                </h3>
                <form onSubmit={handleSearch} className="flex gap-4 max-w-md mx-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search by property name, location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button type="submit" variant="accent">
                    Search
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Popular Properties */}
            <div className="mb-12">
              <h3 className="text-2xl font-serif font-bold text-primary mb-8">
                Popular Holiday Rentals
              </h3>
              {isLoading ? (
                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {popularProperties?.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-primary mb-4">
                    Popular Pages
                  </h4>
                  <div className="space-y-3 text-left">
                    <Link 
                      to="/properties" 
                      className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      All Holiday Rentals
                    </Link>
                    <Link 
                      to="/discover-mallacoota" 
                      className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Discover Mallacoota
                    </Link>
                    <Link
                      to="/discover-mallacoota/gabo-island"
                      className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Gabo Island Tours
                    </Link>
                    <Link 
                      to="/about" 
                      className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      About Hammond Properties
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-primary mb-4">
                    Need Help?
                  </h4>
                  <div className="space-y-4 text-left">
                    <div className="flex items-start">
                      <Phone className="w-4 h-4 mr-3 mt-1 text-primary" />
                      <div>
                        <p className="font-medium text-primary">Call Us</p>
                        <p className="text-sm text-muted-foreground">(03) 5158 0350</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="w-4 h-4 mr-3 mt-1 text-primary" />
                      <div>
                        <p className="font-medium text-primary">Email Us</p>
                        <p className="text-sm text-muted-foreground">stay@hammondproperties.com.au</p>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-full mt-4">
                      <Link to="/contact">
                        Contact Us
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Back to Home CTA */}
            <div className="text-center">
              <Button asChild variant="accent" size="lg" className="px-8">
                <Link to="/">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Homepage
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
