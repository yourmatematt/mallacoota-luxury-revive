import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, Calendar } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useCategories } from "@/hooks/useBlogFilters";
import { getBlogImage } from "@/lib/utils";

// BlogCategoryBadge component to match Discover.tsx
const BlogCategoryBadge = ({ categoryId }: { categoryId?: string }) => {
  const { data: categories } = useCategories();
  const category = categories?.find(cat => cat.id === categoryId);
  
  if (!category) return null;
  
  return (
    <Badge variant="secondary" className="bg-background/90 text-foreground">
      {category.name}
    </Badge>
  );
};

const DiscoverSection = () => {
  const [activeFilter, setActiveFilter] = useState("");
  const { data: categories } = useCategories();
  const { data: blogPosts, isLoading } = useBlogPosts({ 
    categoryId: activeFilter 
  });

  const filters = [
    { id: "", name: "All Articles" },
    ...(categories || []).map(cat => ({ id: cat.id, name: cat.name }))
  ];

  // Display the latest blog posts instead of mock experiences
  const displayPosts = (blogPosts || []).slice(0, 4);

  return (
    <section className="py-20 bg-luxury-cream">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Discover Mallacoota
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Local expertise, premium properties, and genuine care for every guest's experience
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                activeFilter === filter.id 
                  ? "bg-primary text-primary-foreground" 
                  : "border-border hover:border-primary"
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.name}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted animate-pulse"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-muted rounded animate-pulse mb-4 w-2/3"></div>
                  <div className="h-3 bg-muted rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-muted rounded animate-pulse mb-6 w-4/5"></div>
                  <div className="h-8 bg-muted rounded animate-pulse"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {displayPosts.map((post) => (
              <Link key={post.id} to={`/discover-mallacoota/${post.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={getBlogImage(post.slug)}
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
                      <BlogCategoryBadge categoryId={post.Categories_id} />
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

        {/* View All Button */}
        <div className="text-center">
          <Link to="/discover-mallacoota">
            <Button variant="accent" size="lg" rounded="full">
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;