// Example implementation of how to use RelatedBlogPosts component
// This would typically be in your BlogDetail.tsx or similar page component

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import RelatedBlogPosts from "@/components/RelatedBlogPosts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  // Fetch the current blog post
  const { data: blogPost, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Discover Mallacoota Blogs')
        .select(`
          id,
          title,
          slug,
          content,
          excerpt,
          hero_image_url,
          meta_title,
          meta_description,
          published_date,
          Categories_id,
          Categories (name, slug)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Article Not Found</h1>
          <p className="text-muted-foreground">The article you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={blogPost.meta_title || blogPost.title}
        description={blogPost.meta_description || blogPost.excerpt}
      />
      
      <Header />
      
      <main>
        {/* Blog post content would go here */}
        <article className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                {blogPost.title}
              </h1>
              
              {blogPost.excerpt && (
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {blogPost.excerpt}
                </p>
              )}
              
              {blogPost.hero_image_url && (
                <img 
                  src={blogPost.hero_image_url}
                  alt={blogPost.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
                  loading="lazy"
                />
              )}
              
              {blogPost.content && (
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />
              )}
            </div>
          </div>
        </article>
        
        {/* Related Blog Posts Component */}
        <RelatedBlogPosts 
          currentPostId={blogPost.id}
          currentPostSlug={blogPost.slug}
          maxResults={6}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogDetail;