import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, User, Clock, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useCategories, useSeasons, useActivityLevels, useAudiences } from "@/hooks/useBlogFilters";

const Discover = () => {
  const [filters, setFilters] = useState({
    categoryId: '',
    seasonId: '',
    activityLevelId: '',
    audienceId: '',
  });

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
    return <div>Error loading blog posts</div>;
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-20 pb-16 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Mallacoota
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore the hidden gems, local attractions, and unique experiences that make Mallacoota special
            </p>
            
            {/* Filter Controls */}
            <div className="bg-card p-6 rounded-lg border max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <Filter className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Filter Articles</h3>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={filters.categoryId} onValueChange={(value) => setFilters({...filters, categoryId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={filters.seasonId} onValueChange={(value) => setFilters({...filters, seasonId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Seasons</SelectItem>
                    {seasons?.map((season) => (
                      <SelectItem key={season.id} value={season.id}>
                        {season.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={filters.activityLevelId} onValueChange={(value) => setFilters({...filters, activityLevelId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Activity Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Levels</SelectItem>
                    {activityLevels?.map((level) => (
                      <SelectItem key={level.id} value={level.id}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={filters.audienceId} onValueChange={(value) => setFilters({...filters, audienceId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Audiences</SelectItem>
                    {audiences?.map((audience) => (
                      <SelectItem key={audience.id} value={audience.id}>
                        {audience.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video bg-muted animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="h-6 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts?.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.hero_image_url || '/placeholder-blog.jpg'}
                        alt={post.title || 'Blog post'}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-blog.jpg';
                        }}
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">Article</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>5 min read</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>Amelia Hammond</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.published_date ? new Date(post.published_date).toLocaleDateString() : 'Recent'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Discover;