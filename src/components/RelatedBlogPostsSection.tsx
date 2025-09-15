import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { getBlogImage } from "@/lib/utils";

const RelatedBlogPostsSection = () => {
  const { data: blogs = [], isLoading } = useBlogPosts({ limit: 4 });

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/3 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">
            Discover Mallacoota
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get inspired with our local guides and insider tips for your perfect Mallacoota getaway
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.slice(0, 4).map((blog) => (
            <Link
              key={blog.id}
              to={`/discover-mallacoota/${blog.slug}`}
              className="group"
            >
              <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={getBlogImage(blog.slug)}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-blog.jpg';
                    }}
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-bold text-primary mb-3 line-clamp-2 group-hover:text-accent-red transition-colors">
                    {blog.title}
                  </h3>

                  {blog.excerpt && (
                    <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    {blog.published_date && (
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(blog.published_date).toLocaleDateString('en-AU', {
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

                  <div className="mt-auto">
                    <Button
                      variant="link"
                      className="p-0 h-auto text-sm text-primary hover:underline"
                    >
                      Read More →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Articles Button */}
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/discover-mallacoota">
              View All Articles
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RelatedBlogPostsSection;