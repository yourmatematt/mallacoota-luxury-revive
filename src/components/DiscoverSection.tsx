import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useCategories } from "@/hooks/useBlogFilters";
import { getBlogImageUrl } from "@/lib/utils";
import { getBlogImage } from '@/lib/blogImages';
import { BlogImage } from "@/components/BlogImage";
import BlogCategoryBadge from "@/components/BlogCategoryBadge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface FeaturedBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  hero_image_url?: string;
  Categories?: {
    name: string;
    slug: string;
  };
}

const DiscoverSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("");
  const { data: categories } = useCategories();
  
  // Get featured blogs with fallback to regular blog posts
  const { data: featuredBlogs, isLoading: featuredLoading } = useQuery({
    queryKey: ['featured-blogs-homepage'],
    queryFn: async (): Promise<FeaturedBlog[]> => {
      try {
        // Try to get specific featured blogs first
        const featuredSlugs = [
          'gabo-island',
          'kayaking-paradise-in-mallacoota',
          'secret-beaches-coastal-walks',
          'origami-coffee-the-local-institution',
          'whale-watching-winter-wildlife-spectacles',
          'wildflower-paradise-spring-blooms-guide'
        ];
        
        const { data } = await supabase
          .from('Discover Mallacoota Blogs')
          .select(`
            id,
            title,
            slug,
            excerpt,
            hero_image_url,
            Categories (name, slug)
          `)
          .in('slug', featuredSlugs)
          .order('published_date', { ascending: false });
        
        if (data && data.length >= 4) {
          return data.slice(0, 6) as FeaturedBlog[];
        }
        
        // Fallback to most recent blogs if featured ones don't exist
        const { data: fallbackData } = await supabase
          .from('Discover Mallacoota Blogs')
          .select(`
            id,
            title,
            slug,
            excerpt,
            hero_image_url,
            Categories (name, slug)
          `)
          .order('published_date', { ascending: false })
          .limit(6);
          
        return (fallbackData || []) as FeaturedBlog[];
      } catch (error) {
        console.error('Error fetching featured blogs:', error);
        return [];
      }
    },
  });
  
  // Regular filtered blog posts for the filter functionality
  const { data: blogPosts, isLoading: filterLoading } = useBlogPosts({
    categoryId: activeFilter,
  });
  
  // Use featured blogs when no filter is active, otherwise use filtered results
  const displayPosts = activeFilter === "" ? 
    (featuredBlogs || []).slice(0, 6) : 
    (blogPosts || []).slice(0, 6);
  
  const isLoading = activeFilter === "" ? featuredLoading : filterLoading;

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
      rounded="full"
      onClick={() => setActiveFilter(id)}
    >
      {name}
    </Button>
  );

  // Filtering logic handled above

  return (
    <section className="py-20 bg-luxury-cream">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Discover Mallacoota
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Local insights and hidden gems from our 32 insider guides
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/discover-mallacoota/gabo-island"
              className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors text-sm font-medium"
            >
              🏰 Gabo Island Tours
            </Link>
            <Link 
              to="/discover-mallacoota"
              className="inline-flex items-center px-4 py-2 bg-accent-red/10 text-accent-red rounded-full hover:bg-accent-red/20 transition-colors text-sm font-medium"
            >
              🌊 Discover More
            </Link>
          </div>
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
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src.endsWith('.jpg')) {
                          target.src = `/images/blog/${post.slug}.png`;
                        }
                      }}
                      alt={post.title || "Blog post"}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      loading="lazy"
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
              Explore All Local Guides
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;
