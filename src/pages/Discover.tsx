import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, User, Clock, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useCategories, useSeasons, useActivityLevels, useAudiences } from "@/hooks/useBlogFilters";
import BlogCategoryBadge from "@/components/BlogCategoryBadge";
import { getBlogImage } from "@/lib/utils";
import PageTransition from "@/components/PageTransition";

// CTA Section Component
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
            Discover your perfect Mallacoota retreat. Browse our collection of premium vacation rentals.
          </p>
          
          {/* CTA Button */}
          <Button asChild variant="accent" size="default" rounded="full">
            <Link to="/properties">
              View All Properties
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const Discover = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filters, setFilters] = useState({
    categoryId: '',
    seasonId: '',
    activityLevelId: '',
    audienceId: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const { data: blogPosts, isLoading, error } = useBlogPosts(filters);
  const { data: categories } = useCategories();
  const { data: seasons } = useSeasons();
  const { data: activityLevels } = useActivityLevels();
  const { data: audiences } = useAudiences();

  const clearFilters = () => {
    setFilters({
      categoryId: '',
      seasonId: '',
      activityLevelId: '',
      audienceId: '',
    });
  };

  if (error) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-20">
            <div className="container mx-auto px-4 py-16 text-center">
              <h1 className="text-2xl font-bold mb-4">Error loading blog posts</h1>
              <p className="text-muted-foreground">Please try again later.</p>
            </div>
          </main>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section with Animations */}
        <section className="relative h-[calc(100vh-5rem)] overflow-hidden">
            {/* Background Image with scale effect */}
            <div 
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out ${
                isLoaded ? 'scale-100' : 'scale-105'
              }`}
              style={{ backgroundImage: 'url("/images/discover-mallacoota-hero-background.jpg")' }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            
            {/* Content with staggered animations */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center text-white px-6 md:px-4 max-w-4xl mx-auto">
                {/* Main Title */}
                <h1 className={`text-4xl md:text-6xl font-serif font-bold mb-6 transition-all duration-800 delay-200 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  Discover Mallacoota
                </h1>
                
                {/* Subtitle */}
                <p className={`text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-800 delay-400 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  Your complete guide to exploring Australia's hidden coastal gem
                </p>
                
                {/* Description */}
                <div className={`text-lg font-light mb-12 transition-all duration-800 delay-600 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  From pristine beaches to hidden bushwalking trails, discover the best activities, attractions, and experiences Mallacoota has to offer
                </div>
                
                {/* Filter Controls with Animation */}
                <div className={`max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 transition-all duration-800 delay-800 ${
                  isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                }`}>
                  <div className="flex flex-col space-y-6">
                    <div>
                      <label className="text-sm font-medium text-white mb-4 flex items-center">
                        <Filter className="w-4 h-4 mr-2" />
                        Find Your Perfect Experience
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Category Filter */}
                        <Select value={filters.categoryId || "all"} onValueChange={(value) => setFilters({...filters, categoryId: value === "all" ? "" : value})}>
                          <SelectTrigger className="bg-white/20 border-white/30 text-white">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories?.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {/* Season Filter */}
                        <Select value={filters.seasonId || "all"} onValueChange={(value) => setFilters({...filters, seasonId: value === "all" ? "" : value})}>
                          <SelectTrigger className="bg-white/20 border-white/30 text-white">
                            <SelectValue placeholder="Season" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Seasons</SelectItem>
                            {seasons?.map((season) => (
                              <SelectItem key={season.id} value={season.id}>
                                {season.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {/* Activity Level Filter */}
                        <Select value={filters.activityLevelId || "all"} onValueChange={(value) => setFilters({...filters, activityLevelId: value === "all" ? "" : value})}>
                          <SelectTrigger className="bg-white/20 border-white/30 text-white">
                            <SelectValue placeholder="Activity Level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            {activityLevels?.map((level) => (
                              <SelectItem key={level.id} value={level.id}>
                                {level.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {/* Audience Filter */}
                        <Select value={filters.audienceId || "all"} onValueChange={(value) => setFilters({...filters, audienceId: value === "all" ? "" : value})}>
                          <SelectTrigger className="bg-white/20 border-white/30 text-white">
                            <SelectValue placeholder="For Who" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Everyone</SelectItem>
                            {audiences?.map((audience) => (
                              <SelectItem key={audience.id} value={audience.id}>
                                {audience.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Clear Filters Button */}
                    {(filters.categoryId || filters.seasonId || filters.activityLevelId || filters.audienceId) && (
                      <div className="text-center">
                        <Button 
                          onClick={clearFilters}
                          variant="outline"
                          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                        >
                          Clear All Filters
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Blog Posts Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 lg:px-8">
              {/* Results Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                  {isLoading ? "Loading experiences..." : `${blogPosts?.length || 0} Experience${blogPosts?.length === 1 ? '' : 's'} Found`}
                </h2>
                <p className="text-lg text-muted-foreground">
                  Curated guides and insider tips for your Mallacoota adventure
                </p>
              </div>
              {/* Loading State */}
              {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, index) => (
                    <Card key={index} className="card-luxury animate-pulse">
                      <div className="aspect-video bg-muted rounded-t-xl"></div>
                      <CardContent className="p-6">
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                        <div className="h-3 bg-muted rounded mb-2"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Blog Posts Grid */}
              {!isLoading && blogPosts && blogPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.map((post) => (
                    <Card key={post.id} className="card-luxury hover:scale-[1.02] transition-all duration-300">
                      <Link to={`/discover-mallacoota/${post.slug}`}>
                        <div className="aspect-video overflow-hidden rounded-t-xl">
                          <img
                            src={getBlogImage(post.slug)}
                            alt={post.title || 'Blog post'}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder-blog.jpg';
                            }}
                          />
                        </div>
                        <CardContent className="p-6">
                          {/* Category Badge */}
                          {post.Categories_id && (
                            <div className="mb-3">
                              <BlogCategoryBadge categoryId={post.Categories_id} />
                            </div>
                          )}

                          {/* Title */}
                          <h3 className="text-xl font-serif font-bold text-primary mb-3 line-clamp-2 hover:text-accent-red transition-colors">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>

                          {/* Meta Information */}
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              {post.published_date && (
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  <span>{new Date(post.published_date).toLocaleDateString('en-AU', { 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}</span>
                                </div>
                              )}
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>5 min read</span>
                              </div>
                            </div>
                          </div>

                          {/* Tags */}
                          {(post.seasons || post.activity_levels || post.audiences) && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {post.seasons && (
                                <Badge variant="outline" className="text-xs">
                                  {post.seasons}
                                </Badge>
                              )}
                              {post.activity_levels && (
                                <Badge variant="outline" className="text-xs">
                                  {post.activity_levels}
                                </Badge>
                              )}
                              {post.audiences && (
                                <Badge variant="outline" className="text-xs">
                                  {post.audiences}
                                </Badge>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              )}

              {/* No Results */}
              {!isLoading && blogPosts?.length === 0 && (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <h3 className="text-xl font-semibold text-primary mb-4">
                      No experiences found
                    </h3>
                    <p className="text-muted-foreground mb-8">
                      Try adjusting your filters to discover more Mallacoota experiences.
                    </p>
                    <Button onClick={clearFilters} size="lg">
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* CTA Section - Added after blog posts */}
          <CTASection />
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Discover;