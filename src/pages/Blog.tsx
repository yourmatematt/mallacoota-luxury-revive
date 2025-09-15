import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { validatePhone, getPhoneValidationMessage } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  season: string;
  audience: string;
  activityLevel: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
}

const Blog = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSeason, setActiveSeason] = useState("All");
  const [activeAudience, setActiveAudience] = useState("All");
  const [activeActivityLevel, setActiveActivityLevel] = useState("All");

  // Newsletter form state
  const [newsletterData, setNewsletterData] = useState({
    email: "",
    phone: ""
  });
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Mock data - will be replaced with CMS data
  const categories = ["All", "Activities", "Dining", "Nature", "Events", "Local Tips"];
  const seasons = ["All", "Summer", "Autumn", "Winter", "Spring"];
  const audiences = ["All", "Families", "Couples", "Solo Travelers", "Groups"];
  const activityLevels = ["All", "Relaxed", "Moderate", "Active", "Adventure"];

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Best Beach Walks in Mallacoota",
      excerpt: "Discover the most scenic coastal walks that showcase Mallacoota's natural beauty. From gentle strolls to challenging hikes, find your perfect beach adventure.",
      image: "/api/placeholder/600/400",
      category: "Activities",
      season: "Summer",
      audience: "Families",
      activityLevel: "Moderate",
      author: "Amelia Hammond",
      date: "2023-12-15",
      readTime: "5 min read",
      slug: "best-beach-walks-mallacoota"
    },
    {
      id: "2",
      title: "Hidden Dining Gems You Must Try",
      excerpt: "Uncover Mallacoota's best-kept culinary secrets. From local cafes to fine dining, explore the flavors that make this coastal town special.",
      image: "/api/placeholder/600/400",
      category: "Dining",
      season: "All",
      audience: "Couples",
      activityLevel: "Relaxed",
      author: "Amelia Hammond",
      date: "2023-12-10",
      readTime: "7 min read",
      slug: "hidden-dining-gems-mallacoota"
    },
    {
      id: "3",
      title: "Winter Wildlife Watching Guide",
      excerpt: "Experience Mallacoota's incredible wildlife during the quieter winter months. Learn when and where to spot whales, dolphins, and native birds.",
      image: "/api/placeholder/600/400",
      category: "Nature",
      season: "Winter",
      audience: "Solo Travelers",
      activityLevel: "Relaxed",
      author: "Amelia Hammond",
      date: "2023-12-05",
      readTime: "6 min read",
      slug: "winter-wildlife-watching-guide"
    },
    {
      id: "4",
      title: "Family Adventure: Rock Pooling at Low Tide",
      excerpt: "Create magical memories with your children exploring Mallacoota's rock pools. A comprehensive guide to safe and educational tide pooling.",
      image: "/api/placeholder/600/400",
      category: "Activities",
      season: "Spring",
      audience: "Families",
      activityLevel: "Moderate",
      author: "Amelia Hammond", 
      date: "2023-11-28",
      readTime: "4 min read",
      slug: "family-rock-pooling-guide"
    },
    {
      id: "5",
      title: "Sunset Photography Spots",
      excerpt: "Capture Mallacoota's most breathtaking sunsets with our local photographer's guide to the best vantage points and timing tips.",
      image: "/api/placeholder/600/400",
      category: "Local Tips",
      season: "All",
      audience: "Couples",
      activityLevel: "Relaxed",
      author: "Amelia Hammond",
      date: "2023-11-20",
      readTime: "8 min read",
      slug: "sunset-photography-spots"
    },
    {
      id: "6",
      title: "Annual Events Calendar",
      excerpt: "Plan your visit around Mallacoota's vibrant community events. From festivals to markets, discover what makes each season special.",
      image: "/api/placeholder/600/400",
      category: "Events",
      season: "All",
      audience: "Groups",
      activityLevel: "Relaxed",
      author: "Amelia Hammond",
      date: "2023-11-15",
      readTime: "10 min read",
      slug: "annual-events-calendar"
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSeason = activeSeason === "All" || post.season === activeSeason || post.season === "All";
    const matchesAudience = activeAudience === "All" || post.audience === activeAudience;
    const matchesActivityLevel = activeActivityLevel === "All" || post.activityLevel === activeActivityLevel;

    return matchesSearch && matchesCategory && matchesSeason && matchesAudience && matchesActivityLevel;
  });

  const resetFilters = () => {
    setActiveCategory("All");
    setActiveSeason("All");
    setActiveAudience("All");
    setActiveActivityLevel("All");
    setSearchTerm("");
  };

  const handleNewsletterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsletterData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);

    // Validate required fields
    if (!newsletterData.email || !newsletterData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubscribing(false);
      return;
    }

    // Validate phone format
    if (!validatePhone(newsletterData.phone)) {
      toast({
        title: "Error",
        description: getPhoneValidationMessage(),
        variant: "destructive",
      });
      setIsSubscribing(false);
      return;
    }

    try {
      // TODO: Implement newsletter subscription API call
      console.log("Newsletter subscription:", newsletterData);

      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });

      // Reset form
      setNewsletterData({ email: "", phone: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-16 bg-gradient-subtle">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">
                  Discover Mallacoota
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Explore the hidden gems, local attractions, and unique experiences that make Mallacoota special
                </p>
              </div>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-lg py-6"
                />
              </div>
            </div>
          </section>

          {/* Filter Bar */}
          <section className="py-8 bg-card border-b">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={activeCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Season */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Season</h3>
                  <div className="flex flex-wrap gap-2">
                    {seasons.map((season) => (
                      <Button
                        key={season}
                        variant={activeSeason === season ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveSeason(season)}
                      >
                        {season}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Audience */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Audience</h3>
                  <div className="flex flex-wrap gap-2">
                    {audiences.map((audience) => (
                      <Button
                        key={audience}
                        variant={activeAudience === audience ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveAudience(audience)}
                      >
                        {audience}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Activity Level */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Activity Level</h3>
                  <div className="flex flex-wrap gap-2">
                    {activityLevels.map((level) => (
                      <Button
                        key={level}
                        variant={activeActivityLevel === level ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveActivityLevel(level)}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Results Count & Reset */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'} found
                  </p>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post, index) => (
                    <Link key={post.id} to={`/blog/${post.slug}`}>
                      <Card 
                        className="card-luxury h-full group animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="relative overflow-hidden rounded-t-xl">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge variant="secondary" className="bg-background/90 text-foreground">
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="flex-grow">
                            <h3 className="text-xl font-serif font-semibold text-primary mb-3 line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-muted-foreground mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>
                          
                          {/* Meta Information */}
                          <div className="border-t border-border pt-4 space-y-3">
                            <div className="flex items-center text-sm text-muted-foreground space-x-4">
                              <div className="flex items-center">
                                <User className="w-3 h-3 mr-1" />
                                {post.author}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {post.readTime}
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(post.date).toLocaleDateString('en-AU', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </div>
                              
                              <div className="flex space-x-1">
                                <Badge variant="outline" className="text-xs">
                                  {post.audience}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {post.activityLevel}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <Button variant="link" className="p-0 h-auto text-primary font-medium group-hover:underline mt-4 self-start">
                            Read More →
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                    No articles found
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <Button onClick={resetFilters}>
                    Reset All Filters
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="py-16 bg-primary/5">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                  Stay Updated
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Get the latest Mallacoota insights and travel tips delivered to your inbox.
                </p>
                
                <form onSubmit={handleNewsletterSubmit} className="space-y-4 max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={newsletterData.email}
                      onChange={handleNewsletterInputChange}
                      className="flex-1"
                      required
                    />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Your phone number"
                      value={newsletterData.phone}
                      onChange={handleNewsletterInputChange}
                      className="flex-1"
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isSubscribing} className="w-full">
                    {isSubscribing ? "Subscribing..." : "Subscribe"}
                  </Button>
                </form>
                
                <p className="text-sm text-muted-foreground mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Blog;