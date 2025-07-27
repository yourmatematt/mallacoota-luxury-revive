import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBlogPostBySlug } from "@/hooks/useBlogPosts";
import { useCategories } from "@/hooks/useBlogFilters";

const BlogDetail = () => {
  const { slug } = useParams();
  const { data: blogPost, isLoading } = useBlogPostBySlug(slug || '');
  const { data: categories } = useCategories();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">Loading blog post...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Button asChild>
            <Link to="/discover-mallacoota">Back to Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const category = categories?.find(cat => cat.id === blogPost.Categories_id);

  // Related posts - for now empty, can be implemented later
  const relatedPosts: any[] = [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[50vh] overflow-hidden">
          <img
            src={blogPost.hero_image_url || '/placeholder-blog.jpg'}
            alt={blogPost.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-blog.jpg';
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl text-white">
                <Link to="/discover-mallacoota" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>
                
                <div className="flex items-center space-x-2 mb-4">
                  {category && (
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {category.name}
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                  {blogPost.title}
                </h1>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Amelia Hammond
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {blogPost.published_date ? new Date(blogPost.published_date).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric'
                    }) : 'Recently'}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    5 min read
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Article Body */}
              <div className="content-html">
                <div dangerouslySetInnerHTML={{ __html: blogPost.content || blogPost.excerpt || '' }} />
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-subtle rounded-2xl p-8 text-center mb-12">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                  Looking for places to stay in Mallacoota?
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Discover our collection of luxury vacation rentals, perfect for exploring all that Mallacoota has to offer.
                </p>
                <Link to="/properties">
                  <Button size="lg">
                    View Our Properties
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-accent/10">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
                  Related Articles
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((post: any) => (
                    <Link key={post.id} to={`/discover-mallacoota/${post.slug}`}>
                      <div className="group">
                        <div className="relative overflow-hidden rounded-xl mb-4">
                          <img
                            src={post.hero_image_url || '/placeholder-blog.jpg'}
                            alt={post.title}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <h3 className="text-xl font-serif font-semibold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {post.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      
      {/* SEO Meta Tags would be set in document head */}
      {blogPost.meta_title && (
        <div className="hidden">
          <meta name="title" content={blogPost.meta_title} />
          <meta name="description" content={blogPost.meta_description || blogPost.excerpt || ''} />
        </div>
      )}
    </div>
  );
};

export default BlogDetail;