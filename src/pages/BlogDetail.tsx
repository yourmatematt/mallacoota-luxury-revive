import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User, ArrowLeft, Star, Bed, Bath, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBlogPostBySlug } from "@/hooks/useBlogPosts";
import { useCategories } from "@/hooks/useBlogFilters";
import { useRandomProperties } from "@/hooks/useProperties";
import PropertyImageCarousel from "@/components/PropertyImageCarousel";
import propertyInterior1 from "@/assets/property-interior-1.jpg";
import propertyInterior2 from "@/assets/property-interior-2.jpg";
import propertyInterior3 from "@/assets/property-interior-3.jpg";

const BlogDetail = () => {
  const { slug } = useParams();
  const { data: blogPost, isLoading } = useBlogPostBySlug(slug || '');
  const { data: categories } = useCategories();
  const { data: randomProperties } = useRandomProperties(3);

  // Stock images for property cards
  const stockImages = [propertyInterior1, propertyInterior2, propertyInterior3];

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

              {/* CTA Section with Property Cards */}
              <div className="bg-gradient-subtle rounded-2xl p-8 mb-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                    Looking for places to stay in Mallacoota?
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Discover our collection of luxury vacation rentals, perfect for exploring all that Mallacoota has to offer.
                  </p>
                </div>

                {/* Property Cards */}
                {randomProperties && randomProperties.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {randomProperties.map((property, index) => (
                      <Card key={property.property_id} className="card-boutique overflow-hidden group">
                        <div className="relative">
                          <PropertyImageCarousel
                            images={stockImages}
                            propertyId={property.property_id}
                            propertyTitle={property.title || 'Property'}
                          />
                          {property.airbnb_rating && (
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-white/95 text-primary flex items-center gap-1 shadow-lg backdrop-blur-sm">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                {property.airbnb_rating}
                              </Badge>
                            </div>
                          )}
                        </div>
                        
                        <CardContent className="p-4">
                          <h4 className="text-lg font-serif font-semibold mb-2 text-primary leading-tight">
                            {property.title}
                          </h4>
                          
                          <div className="grid grid-cols-3 gap-2 mb-3 py-2 border-t border-b border-border/50">
                            <div className="flex flex-col items-center space-y-1 text-center">
                              <Bed size={14} className="text-primary" />
                              <span className="text-sm font-semibold text-primary">{property.bedrooms}</span>
                            </div>
                            <div className="flex flex-col items-center space-y-1 text-center">
                              <Bath size={14} className="text-primary" />
                              <span className="text-sm font-semibold text-primary">{property.bathrooms}</span>
                            </div>
                            <div className="flex flex-col items-center space-y-1 text-center">
                              <Users size={14} className="text-primary" />
                              <span className="text-sm font-semibold text-primary">{property.guests}</span>
                            </div>
                          </div>
                          
                          <Button asChild className="w-full py-2 text-sm rounded-full">
                            <Link to={`/properties/${property.slug}`}>
                              View Details
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                <div className="text-center">
                  <Link to="/properties">
                    <Button size="lg">
                      View All Properties
                    </Button>
                  </Link>
                </div>
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