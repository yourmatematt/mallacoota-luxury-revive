import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useCategories } from "@/hooks/useBlogFilters";
import { getBlogImage } from "@/lib/utils";

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
              <Card key={i} className="card-luxury overflow-hidden">
                <div className="relative h-64 bg-muted animate-pulse"></div>
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
                <Card className="card-luxury overflow-hidden group cursor-pointer">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={getBlogImage(post.slug)}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-blog.jpg';
                      }}
                    />
                    <Badge className="absolute top-4 right-4 bg-luxury-gold text-primary">
                      NEW
                    </Badge>
                    <div className="absolute top-4 left-4 bg-background/90 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-primary">
                        {post.published_date ? new Date(post.published_date).toLocaleDateString('en-AU', {
                          month: 'short',
                          day: 'numeric'
                        }) : 'Recent'}
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-serif font-semibold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                        {post.title}
                      </h3>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <Button variant="link" className="p-0 h-auto text-primary font-medium group-hover:underline">
  Read More →
</Button>
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