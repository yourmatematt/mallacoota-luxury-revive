import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Star, Waves, TreePine, Users, ChefHat, Snowflake } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import BlogCard from "@/components/BlogCard";
import ExperienceMap from "@/components/ExperienceMap";

interface SeasonalHighlight {
  month: string;
  title: string;
  description: string;
  category: string;
}

interface ExperiencePin {
  id: string;
  name: string;
  type: string;
  coordinates: [number, number];
  description: string;
  link?: string;
}

const ThingsToDoMallacoota = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("waterfront");

  // Fetch all blog posts for filtering
  const { data: allBlogs, isLoading: blogLoading } = useBlogPosts({});

  useEffect(() => {
    setIsLoaded(true);

    // Preload hero image for faster loading
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = '/images/things-to-do-mallacoota-hero.jpeg';
    document.head.appendChild(link);

    // SEO Meta Tags
    const title = "Things to Do in Mallacoota 2025 | Curated Experiences Guide | Hammond Properties";
    document.title = title;
    
    const description = "Discover Mallacoota's hidden gems through our insider's guide. Waterfront adventures, natural wonders, family experiences & exclusive local insights from luxury accommodation experts.";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://hammondproperties.com.au/things-to-do-mallacoota');
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', 'https://hammondproperties.com.au/things-to-do-mallacoota');
      document.head.appendChild(canonicalLink);
    }

    // Open Graph tags
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
    updateOrCreateOGMeta('og:url', 'https://hammondproperties.com.au/things-to-do-mallacoota');
    updateOrCreateOGMeta('og:image', 'https://hammondproperties.com.au/images/mallacoota-experiences-og.jpg');

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // Filter blogs by experience categories
  const getFilteredBlogs = (category: string, limit: number) => {
    if (!allBlogs) return [];
    
    // This would ideally use category filtering, but for demo purposes we'll simulate
    const filtered = allBlogs.filter(blog => {
      switch (category) {
        case 'waterfront':
          return blog.title?.toLowerCase().includes('beach') || 
                 blog.title?.toLowerCase().includes('water') ||
                 blog.title?.toLowerCase().includes('kayak') ||
                 blog.title?.toLowerCase().includes('fishing');
        case 'natural':
          return blog.title?.toLowerCase().includes('wildlife') ||
                 blog.title?.toLowerCase().includes('park') ||
                 blog.title?.toLowerCase().includes('nature') ||
                 blog.title?.toLowerCase().includes('walk');
        case 'family':
          return blog.title?.toLowerCase().includes('family') ||
                 blog.title?.toLowerCase().includes('kids') ||
                 blog.title?.toLowerCase().includes('children');
        case 'culinary':
          return blog.title?.toLowerCase().includes('restaurant') ||
                 blog.title?.toLowerCase().includes('coffee') ||
                 blog.title?.toLowerCase().includes('food') ||
                 blog.title?.toLowerCase().includes('dining');
        case 'seasonal':
          return blog.title?.toLowerCase().includes('season') ||
                 blog.title?.toLowerCase().includes('summer') ||
                 blog.title?.toLowerCase().includes('winter') ||
                 blog.title?.toLowerCase().includes('time to visit');
        default:
          return false;
      }
    });
    
    return filtered.slice(0, limit);
  };

  const seasonalHighlights: SeasonalHighlight[] = [
    {
      month: "Dec - Feb",
      title: "Little Penguin Season",
      description: "Witness Australia's smallest penguins at Gabo Island",
      category: "Wildlife"
    },
    {
      month: "Jan - Mar",
      title: "Peak Beach Season",
      description: "Perfect weather for swimming and water sports",
      category: "Waterfront"
    },
    {
      month: "Apr - May",
      title: "Autumn Hiking",
      description: "Cooler temperatures for exploring national parks",
      category: "Nature"
    },
    {
      month: "Jun - Aug",
      title: "Cozy Season",
      description: "Fireplaces, local cuisine, and peaceful walks",
      category: "Relaxation"
    },
    {
      month: "Sep - Nov",
      title: "Wildflower Blooms",
      description: "Spring brings colorful displays across the region",
      category: "Nature"
    },
    {
      month: "Year Round",
      title: "Fishing Paradise",
      description: "World-class fishing opportunities every season",
      category: "Adventure"
    }
  ];

  const experiencePins: ExperiencePin[] = [
    {
      id: "gabo-island",
      name: "Gabo Island Lighthouse",
      type: "Historic Site",
      coordinates: [-37.5644, 149.9111],
      description: "Historic 1862 lighthouse with penguin colony",
      link: "/discover-mallacoota/gabo-island"
    },
    {
      id: "betka-beach",
      name: "Betka Beach",
      type: "Beach",
      coordinates: [-37.5583, 149.7442],
      description: "Pristine beach perfect for swimming and walking",
      link: "/discover-mallacoota"
    },
    {
      id: "croajingolong",
      name: "Croajingolong National Park",
      type: "National Park",
      coordinates: [-37.5000, 149.8000],
      description: "Wilderness area with diverse wildlife and trails",
      link: "/discover-mallacoota"
    },
    {
      id: "mallacoota-inlet",
      name: "Mallacoota Inlet",
      type: "Waterway",
      coordinates: [-37.5648, 149.7558],
      description: "Perfect for kayaking and fishing",
      link: "/discover-mallacoota"
    },
    {
      id: "bastion-point",
      name: "Bastion Point",
      type: "Scenic Lookout",
      coordinates: [-37.5790, 149.7760],
      description: "Dramatic coastal headland with panoramic ocean views",
      link: "/discover-mallacoota"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Things to Do in Mallacoota 2025 | Curated Experiences Guide | Hammond Properties"
        description="Discover Mallacoota's hidden gems through our insider's guide. Waterfront adventures, natural wonders, family experiences & exclusive local insights from luxury accommodation experts."
      />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-[400px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden">
          <img
            src="/images/things-to-do-mallacoota-hero.jpeg"
            alt="Things to do in Mallacoota"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
              isLoaded ? 'scale-100' : 'scale-105'
            }`}
            loading="eager"
            decoding="async"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder-hero.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl text-white">
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 transition-all duration-800 delay-200 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  Curated Mallacoota Experiences
                </h1>
                
                <p className={`text-xl md:text-2xl font-light mb-4 transition-all duration-800 delay-400 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  Your Insider's Guide
                </p>
                
                <p className={`text-lg mb-8 max-w-2xl transition-all duration-800 delay-500 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  Discover hidden gems through our deep local knowledge. From secret beaches to exclusive dining, 
                  experience Mallacoota like never before.
                </p>
                
                <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-800 delay-600 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <Button 
                    asChild 
                    variant="accent" 
                    size="lg" 
                    className="px-8 py-4 text-lg"
                  >
                    <Link to="#experiences">
                      Explore Experiences
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg" 
                    className="px-8 py-4 text-lg bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-lg active:bg-white/90 active:text-gray-900 active:scale-95 transition-all duration-200"
                  >
                    <Link to="/properties">
                      Luxury Accommodation
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Categories */}
        <section id="experiences" className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Curated by Category
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose your adventure from our expertly curated collection of Mallacoota's finest experiences.
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-12">
                <TabsTrigger value="waterfront" className="flex items-center gap-2">
                  <Waves className="w-4 h-4" />
                  <span className="hidden sm:inline">Waterfront</span>
                </TabsTrigger>
                <TabsTrigger value="natural" className="flex items-center gap-2">
                  <TreePine className="w-4 h-4" />
                  <span className="hidden sm:inline">Natural</span>
                </TabsTrigger>
                <TabsTrigger value="family" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Family</span>
                </TabsTrigger>
                <TabsTrigger value="culinary" className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4" />
                  <span className="hidden sm:inline">Culinary</span>
                </TabsTrigger>
                <TabsTrigger value="seasonal" className="flex items-center gap-2">
                  <Snowflake className="w-4 h-4" />
                  <span className="hidden sm:inline">Seasonal</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="waterfront" className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">Waterfront Adventures</h3>
                  <p className="text-muted-foreground">Dive into Mallacoota's pristine waters and coastal wonders</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredBlogs('waterfront', 5).map((blog) => (
                    <BlogCard
                      key={blog.id}
                      id={blog.id}
                      title={blog.title}
                      slug={blog.slug}
                      excerpt={blog.excerpt}
                      categoryId={blog.Categories_id}
                      published_date={blog.published_date}
                      seasons={blog.seasons}
                      activity_levels={blog.activity_levels}
                      audiences={blog.audiences}
                      linkPrefix="/discover-mallacoota"
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="natural" className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">Natural Wonders</h3>
                  <p className="text-muted-foreground">Explore pristine wilderness and incredible wildlife</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredBlogs('natural', 6).map((blog) => (
                    <BlogCard
                      key={blog.id}
                      id={blog.id}
                      title={blog.title}
                      slug={blog.slug}
                      excerpt={blog.excerpt}
                      categoryId={blog.Categories_id}
                      published_date={blog.published_date}
                      seasons={blog.seasons}
                      activity_levels={blog.activity_levels}
                      audiences={blog.audiences}
                      linkPrefix="/discover-mallacoota"
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="family" className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">Family Experiences</h3>
                  <p className="text-muted-foreground">Adventures perfect for creating lasting family memories</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredBlogs('family', 7).map((blog) => (
                    <BlogCard
                      key={blog.id}
                      id={blog.id}
                      title={blog.title}
                      slug={blog.slug}
                      excerpt={blog.excerpt}
                      categoryId={blog.Categories_id}
                      published_date={blog.published_date}
                      seasons={blog.seasons}
                      activity_levels={blog.activity_levels}
                      audiences={blog.audiences}
                      linkPrefix="/discover-mallacoota"
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="culinary" className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">Culinary Journey</h3>
                  <p className="text-muted-foreground">Savor the flavors of Mallacoota's finest dining</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredBlogs('culinary', 5).map((blog) => (
                    <BlogCard
                      key={blog.id}
                      id={blog.id}
                      title={blog.title}
                      slug={blog.slug}
                      excerpt={blog.excerpt}
                      categoryId={blog.Categories_id}
                      published_date={blog.published_date}
                      seasons={blog.seasons}
                      activity_levels={blog.activity_levels}
                      audiences={blog.audiences}
                      linkPrefix="/discover-mallacoota"
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="seasonal" className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">Seasonal Discoveries</h3>
                  <p className="text-muted-foreground">Experience Mallacoota's year-round beauty</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredBlogs('seasonal', 9).map((blog) => (
                    <BlogCard
                      key={blog.id}
                      id={blog.id}
                      title={blog.title}
                      slug={blog.slug}
                      excerpt={blog.excerpt}
                      categoryId={blog.Categories_id}
                      published_date={blog.published_date}
                      seasons={blog.seasons}
                      activity_levels={blog.activity_levels}
                      audiences={blog.audiences}
                      linkPrefix="/discover-mallacoota"
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Interactive Experience Map */}
        <section className="py-20 bg-warm-neutral/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Premium Experience Map
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover exclusive locations and hidden gems with our curated experience pins.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-soft">
              <ExperienceMap />

              <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Link
                  to="/discover-mallacoota/complete-restaurant-guide"
                  className="flex items-center gap-3 p-4 bg-luxury-cream rounded-lg hover:bg-luxury-cream/80 transition-colors duration-200 hover:shadow-md"
                >
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div>
                    <p className="font-semibold text-primary text-sm">Dining</p>
                    <p className="text-xs text-muted-foreground">Restaurants & Cafes</p>
                  </div>
                </Link>

                <Link
                  to="/discover-mallacoota/secret-beaches-coastal-walks"
                  className="flex items-center gap-3 p-4 bg-luxury-cream rounded-lg hover:bg-luxury-cream/80 transition-colors duration-200 hover:shadow-md"
                >
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <div>
                    <p className="font-semibold text-primary text-sm">Beaches</p>
                    <p className="text-xs text-muted-foreground">Coastal Destinations</p>
                  </div>
                </Link>

                <Link
                  to="/discover-mallacoota/gabo-island"
                  className="flex items-center gap-3 p-4 bg-luxury-cream rounded-lg hover:bg-luxury-cream/80 transition-colors duration-200 hover:shadow-md"
                >
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <div>
                    <p className="font-semibold text-primary text-sm">Adventure</p>
                    <p className="text-xs text-muted-foreground">Tours & Activities</p>
                  </div>
                </Link>

                <Link
                  to="/discover-mallacoota/croajingolong-national-park"
                  className="flex items-center gap-3 p-4 bg-luxury-cream rounded-lg hover:bg-luxury-cream/80 transition-colors duration-200 hover:shadow-md"
                >
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  <div>
                    <p className="font-semibold text-primary text-sm">Nature</p>
                    <p className="text-xs text-muted-foreground">Parks & Walks</p>
                  </div>
                </Link>

                <Link
                  to="/discover-mallacoota"
                  className="flex items-center gap-3 p-4 bg-luxury-cream rounded-lg hover:bg-luxury-cream/80 transition-colors duration-200 hover:shadow-md"
                >
                  <div className="w-3 h-3 bg-orange-500 rounded-full" />
                  <div>
                    <p className="font-semibold text-primary text-sm">Family</p>
                    <p className="text-xs text-muted-foreground">Kid-Friendly Fun</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Season's Finest Calendar */}
        <section className="py-20 bg-luxury-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Season's Finest
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Plan your perfect Mallacoota experience with our seasonal highlights calendar.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seasonalHighlights.map((highlight, index) => (
                <Card key={index} className="card-luxury">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="w-6 h-6 text-accent-red" />
                      <div>
                        <p className="font-semibold text-primary">{highlight.month}</p>
                        <Badge variant="secondary" className="text-xs">
                          {highlight.category}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-primary mb-3">
                      {highlight.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Stay in Luxury While You Explore
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Experience Mallacoota's finest from the comfort of our premium holiday rentals. 
                Local expertise included.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  variant="accent" 
                  size="lg" 
                  className="px-12 py-6 text-lg"
                >
                  <Link to="/properties">
                    Book Luxury Stay
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="px-12 py-6 text-lg bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-lg active:bg-white/90 active:text-gray-900 active:scale-95 transition-all duration-200"
                >
                  <Link to="/contact">
                    Plan My Experience
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section for Activities - Featured Snippet Optimization */}
        <FAQSection
          title="Mallacoota Activities - Your Questions Answered"
          faqs={[
            {
              question: "What are the best water activities in Mallacoota?",
              answer: "Mallacoota's inlet and coastline offer exceptional kayaking, fishing, swimming, and boating. The calm inlet waters are perfect for beginners, while experienced kayakers can explore hidden coves. Fishing is world-class year-round, with options for beach, inlet, and offshore fishing in East Gippsland."
            },
            {
              question: "Where are the best fishing spots in Mallacoota?",
              answer: "Top fishing spots include Mallacoota Inlet for flathead and bream, Main Wharf for mullet and salmon, Betka Beach for beach fishing, and offshore for kingfish and tuna. Our insider guides provide detailed seasonal fishing information and local expert tips for the best East Gippsland catches."
            },
            {
              question: "Can I go whale watching in Mallacoota?",
              answer: "Yes! Whale watching season runs from May to November in Mallacoota. Humpback and Southern Right whales migrate along the East Gippsland coast. The best viewing spots are Bastion Point, Betka Beach, and various coastal lookouts. Peak season is September-October."
            },
            {
              question: "What bushwalking trails are available in Mallacoota?",
              answer: "Mallacoota offers diverse bushwalking experiences: Bastion Point walking track (coastal views), Genoa Peak (mountain summit), Croajingolong National Park trails, and Betka Beach coastal walks. Trails range from easy 30-minute strolls to challenging full-day hikes through pristine East Gippsland wilderness."
            },
            {
              question: "Is Mallacoota good for families with children?",
              answer: "Absolutely! Mallacoota is exceptionally family-friendly with calm inlet waters perfect for young swimmers, safe beaches, abundant wildlife spotting, playgrounds, and gentle bushwalks. Our holiday rentals offer family-focused amenities, and the town has a relaxed, welcoming atmosphere ideal for coastal family vacations."
            },
            {
              question: "What wildlife can I see in Mallacoota?",
              answer: "Mallacoota's diverse ecosystems host kangaroos, wallabies, echidnas, wombats, over 300 bird species including sea eagles and lyrebirds, seals, dolphins, and seasonal whales. Croajingolong National Park is a UNESCO Biosphere Reserve with rare and endemic species in pristine East Gippsland habitats."
            },
            {
              question: "Are there restaurants and cafes in Mallacoota?",
              answer: "Yes! Mallacoota has excellent dining options including Origami Coffee (breakfast and lunch), Scallywags Restaurant (fresh seafood), Lucy's (local favorites), Mallacoota Hotel, and takeaway options. Our concierge provides detailed restaurant recommendations, seasonal menus, and local insider tips for the best East Gippsland dining."
            },
            {
              question: "What should I do on a rainy day in Mallacoota?",
              answer: "Rainy day activities include visiting the Mallacoota & District Historical Society Museum, enjoying cozy cafe culture, indoor games at your luxury rental, scenic drives through rainforest, visiting local art galleries, and planning future adventures with our 32 insider guides covering all Mallacoota experiences."
            },
            {
              question: "Can I visit Gabo Island from Mallacoota?",
              answer: "Yes! Gabo Island lighthouse tours operate seasonally (typically September-April) from Mallacoota. This historic offshore island features a working lighthouse, seal colonies, seabird rookeries, and spectacular East Gippsland coastal views. Tours must be booked in advance and are weather-dependent."
            }
          ]}
        />
      </main>

      <Footer />
    </div>
  );
};

export default ThingsToDoMallacoota;