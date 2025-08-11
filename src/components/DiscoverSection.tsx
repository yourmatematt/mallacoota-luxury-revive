import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useCategories } from "@/hooks/useBlogFilters";
import { getBlogImage } from "@/lib/utils";
import BlogCategoryBadge from "@/components/BlogCategoryBadge";

const DiscoverSection = () => {
  const [activeFilter, setActiveFilter] = useState("");
  const { data: categories } = useCategories();
  const { data: blogPosts, isLoading } = useBlogPosts({
    categoryId: activeFilter,
  });

  const filters = [
    { id: "", name: "All Articles" },
    ...(categories || []).map((cat) => ({ id: cat.id, name: cat.name })),
  ];

  // --- enforce 2 rows: 5 on top, 4 on bottom ---
  const pills = (filters || []).slice(0, 9);
  const firstRow = pills.slice(0, 5);
  const secondRow = pills.slice(5, 9);

  const Pill = ({ id, name }: { id: string; name: string }) => (
    <Button
      key={id}
      variant={activeFilter === id ? "default" : "outline"}
      size="sm"
      className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
        activeFilter === id
          ? "bg-primary text-primary-foreground"
          : "border-border hover:border-primary"
      }`}
      onClick={() => setActiveFilter(id)}
    >
      {name}
    </Button>
  );

  // match Discover page (first 6 looks nicer in 3 columns)
  const displayPosts = (blogPosts || []).slice(0, 6);

  return (
    <section className="py-20 bg-luxury-cream">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Discover Mallacoota
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your local’s guide to the best of Mallacoota — from hidden trails
            and fresh seafood to seasonal adventures and family‑friendly fun.
          </p>
        </div>

        {/* Filter Tags — two rows (5 + 4) */}
        <div className="mb-12 space-y-3">
          <div className="flex flex-wrap justify-center gap-3">
            {firstRow.map((f) => (
              <Pill key={f.id} id={f.id} name={f.name} />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {secondRow.map((f) => (
              <Pill key={f.id} id={f.id} name={f.name} />
            ))}
          </div>
        </div>

        {/* Blog Cards — identical style to Discover page */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="card-luxury animate-pulse">
                <div className="aspect-video bg-muted rounded-t-xl" />
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4 mb-4" />
                  <div className="h-3 bg-muted rounded mb-2" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayPosts.map((post) => (
              <Card
                key={post.id}
                className="card-luxury hover:scale-[1.02] transition-all duration-300"
              >
                <Link to={`/discover-mallacoota/${post.slug}`}>
                  <div className="aspect-video overflow-hidden rounded-t-xl">
                    <img
                      src={getBlogImage(post.slug)}
                      alt={post.title || "Blog post"}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const t = e.target as HTMLImageElement;
                        t.src = "/placeholder-blog.jpg";
                      }}
                    />
                  </div>

                  <CardContent className="p-6">
                    {/* Category pill */}
                    {post.Categories_id && (
                      <div className="mb-3">
                        <BlogCategoryBadge categoryId={post.Categories_id} />
                      </div>
                    )}

                    {/* Title (serif, same as Discover) */}
                    <h3 className="text-xl font-serif font-bold text-primary mb-3 line-clamp-2 hover:text-accent-red transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        {post.published_date && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>
                              {new Date(post.published_date).toLocaleDateString(
                                "en-AU",
                                { year: "numeric", month: "short", day: "numeric" }
                              )}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>5 min read</span>
                        </div>
                      </div>
                    </div>

                    {/* Optional tags if present in row */}
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

        {/* View All */}
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
