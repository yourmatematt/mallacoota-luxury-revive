import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { BlogImage } from '@/components/BlogImage';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  hero_image_url: string;
  category_name: string;
  category_slug: string;
  Categories_id: string;
}

interface RelatedBlog extends BlogPost {
  relevanceScore: number;
  sharedAttributes: string[];
}

interface RelatedBlogPostsProps {
  currentBlogId: string;
  currentCategoryId: string;
  currentAudiences: string[];
  currentSeasons: string[];
}

export const RelatedBlogPosts: React.FC<RelatedBlogPostsProps> = ({
  currentBlogId,
  currentCategoryId,
  currentAudiences = [],
  currentSeasons = []
}) => {
  
  const { data: relatedPosts, isLoading } = useQuery({
    queryKey: ['related-blogs', currentBlogId],
    queryFn: async () => {
      // Fetch all blogs except current one
      const { data: allBlogs, error } = await supabase
        .from('Discover Mallacoota Blogs')
        .select(`
          id,
          title,
          slug,
          excerpt,
          hero_image_url,
          category_name,
          category_slug,
          Categories_id,
          blog_audiences (
            audience_id
          ),
          blog_seasons (
            season_id
          )
        `)
        .neq('id', currentBlogId);
      
      if (error) throw error;
      
      // Calculate relevance scores
      const scoredBlogs = allBlogs.map(blog => {
        let score = 0;
        const sharedAttributes: string[] = [];
        
        // Same category = 3 points
        if (blog.Categories_id === currentCategoryId) {
          score += 3;
          sharedAttributes.push('category');
        }
        
        // Shared audiences = 2 points each
        const blogAudiences = blog.blog_audiences?.map(ba => ba.audience_id) || [];
        const sharedAudienceCount = currentAudiences.filter(aud => 
          blogAudiences.includes(aud)
        ).length;
        score += sharedAudienceCount * 2;
        if (sharedAudienceCount > 0) {
          sharedAttributes.push(`${sharedAudienceCount} audiences`);
        }
        
        // Shared seasons = 1 point each
        const blogSeasons = blog.blog_seasons?.map(bs => bs.season_id) || [];
        const sharedSeasonCount = currentSeasons.filter(season => 
          blogSeasons.includes(season)
        ).length;
        score += sharedSeasonCount;
        if (sharedSeasonCount > 0) {
          sharedAttributes.push(`${sharedSeasonCount} seasons`);
        }
        
        return {
          ...blog,
          relevanceScore: score,
          sharedAttributes
        };
      });
      
      // Sort by relevance and take top 5
      return scoredBlogs
        .filter(blog => blog.relevanceScore > 0)
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 5);
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });

  if (isLoading) {
    return <RelatedBlogsSkeleton />;
  }

  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 border-t">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-2xl font-serif font-bold text-primary mb-2">
          Keep Exploring
        </h2>
        <p className="text-muted-foreground mb-8">
          Related guides you might enjoy
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              to={`/discover-mallacoota/${post.slug}`}
              className="group"
            >
              <Card className="card-luxury overflow-hidden h-full hover:shadow-medium transition-all">
                <div className="aspect-[16/10] overflow-hidden">
                  <BlogImage
                    src={post.hero_image_url}
                    alt={post.title}
                    slug={post.slug}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {post.category_name}
                    </Badge>
                    {post.relevanceScore >= 5 && (
                      <Badge variant="outline" className="text-xs bg-accent-red/10 text-accent-red border-accent-red/20">
                        Highly Related
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-serif font-semibold text-primary mb-2 group-hover:text-accent-red transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Debug info - remove in production */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="text-xs text-muted-foreground/60">
                      Score: {post.relevanceScore} | 
                      Shared: {post.sharedAttributes.join(', ')}
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Additional related posts as text links */}
        {relatedPosts.length > 3 && (
          <div className="mt-8 p-6 bg-luxury-cream rounded-lg">
            <h3 className="text-sm font-semibold text-primary mb-3">
              More Related Guides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {relatedPosts.slice(3, 5).map((post) => (
                <Link
                  key={post.id}
                  to={`/discover-mallacoota/${post.slug}`}
                  className="text-muted-foreground hover:text-accent-red transition-colors flex items-center gap-2"
                >
                  <span className="text-accent-red">→</span>
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Loading skeleton component
const RelatedBlogsSkeleton: React.FC = () => {
  return (
    <section className="py-12 border-t">
      <div className="container mx-auto px-4 lg:px-8">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64 mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-[16/10]" />
              <div className="p-6">
                <Skeleton className="h-4 w-20 mb-3" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Advanced version with content-based matching (optional enhancement)
export const useContentBasedRelatedPosts = (
  currentBlog: BlogPost,
  limit = 5
) => {
  return useQuery({
    queryKey: ['content-related-blogs', currentBlog.id],
    queryFn: async () => {
      // Extract keywords from current blog
      const keywords = extractKeywords(currentBlog);
      
      // Search for blogs with similar content
      const { data: relatedByContent } = await supabase
        .from('Discover Mallacoota Blogs')
        .select('*')
        .neq('id', currentBlog.id)
        .textSearch('content', keywords.join(' | '))
        .limit(limit * 2);
      
      // Combine with category/audience matching
      const { data: relatedByMeta } = await supabase
        .from('Discover Mallacoota Blogs')
        .select('*')
        .neq('id', currentBlog.id)
        .eq('Categories_id', currentBlog.Categories_id)
        .limit(limit);
      
      // Merge and deduplicate
      const combined = [...(relatedByContent || []), ...(relatedByMeta || [])];
      const unique = Array.from(
        new Map(combined.map(item => [item.id, item])).values()
      );
      
      return unique.slice(0, limit);
    }
  });
};

// Helper function to extract keywords
const extractKeywords = (blog: BlogPost): string[] => {
  const titleWords = blog.title.toLowerCase().split(' ')
    .filter(word => word.length > 4);
  const excerptWords = blog.excerpt.toLowerCase().split(' ')
    .filter(word => word.length > 5)
    .slice(0, 10);
  
  // Remove common words
  const stopWords = ['about', 'where', 'there', 'these', 'those', 'which'];
  const keywords = [...titleWords, ...excerptWords]
    .filter(word => !stopWords.includes(word));
  
  return [...new Set(keywords)];
};

export default RelatedBlogPosts;