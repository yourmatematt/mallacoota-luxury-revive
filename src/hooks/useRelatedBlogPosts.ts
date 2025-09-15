import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RelatedBlogPost } from "@/types/blog";

interface UseRelatedBlogPostsOptions {
  currentPostId: string;
  maxResults?: number;
  minScore?: number;
}

export const useRelatedBlogPosts = ({
  currentPostId,
  maxResults = 5,
  minScore = 1
}: UseRelatedBlogPostsOptions) => {
  const [relatedPosts, setRelatedPosts] = useState<RelatedBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get current post details with relationships
        const { data: currentPost, error: currentPostError } = await supabase
          .from('Discover Mallacoota Blogs')
          .select(`
            id,
            Categories_id,
            blog_audiences (
              audience_id,
              Audiences (id, name, slug)
            ),
            blog_seasons (
              season_id,
              Seasons (id, name, slug)
            )
          `)
          .eq('id', currentPostId)
          .single();

        if (currentPostError) {
          throw new Error(`Failed to fetch current post: ${currentPostError.message}`);
        }

        // Get all other blog posts with their relationships
        const { data: allPosts, error: allPostsError } = await supabase
          .from('Discover Mallacoota Blogs')
          .select(`
            id,
            title,
            slug,
            excerpt,
            Categories_id,
            Categories (name, slug),
            blog_audiences (
              audience_id,
              Audiences (id, name, slug)
            ),
            blog_seasons (
              season_id,
              Seasons (id, name, slug)
            )
          `)
          .neq('id', currentPostId)
          .not('published_date', 'is', null)
          .order('published_date', { ascending: false });

        if (allPostsError) {
          throw new Error(`Failed to fetch blog posts: ${allPostsError.message}`);
        }

        if (!allPosts || allPosts.length === 0) {
          setRelatedPosts([]);
          return;
        }

        // Extract current post relationships
        const currentCategory = currentPost.Categories_id;
        const currentAudiences = currentPost.blog_audiences?.map(
          (ba: any) => ba.audience_id
        ) || [];
        const currentSeasons = currentPost.blog_seasons?.map(
          (bs: any) => bs.season_id
        ) || [];

        // Calculate relevance scores for each post
        const scoredPosts: RelatedBlogPost[] = allPosts
          .map((post: any) => {
            let score = 0;

            // Same category (3 points)
            if (post.Categories_id === currentCategory) {
              score += 3;
            }

            // Shared audiences (2 points each)
            const postAudiences = post.blog_audiences?.map(
              (ba: any) => ba.audience_id
            ) || [];
            const sharedAudiences = postAudiences.filter((audienceId: string) =>
              currentAudiences.includes(audienceId)
            );
            score += sharedAudiences.length * 2;

            // Same seasons (1 point each)
            const postSeasons = post.blog_seasons?.map(
              (bs: any) => bs.season_id
            ) || [];
            const sharedSeasons = postSeasons.filter((seasonId: string) =>
              currentSeasons.includes(seasonId)
            );
            score += sharedSeasons.length;

            return {
              id: post.id,
              title: post.title,
              slug: post.slug,
              excerpt: post.excerpt || '',
              Categories_id: post.Categories_id,
              published_date: post.published_date || new Date().toISOString(),
              category: post.Categories,
              relevanceScore: score,
            };
          })
          .filter(post => post.relevanceScore >= minScore) // Only include posts with minimum relevance
          .sort((a, b) => {
            // Primary sort: relevance score (descending)
            if (b.relevanceScore !== a.relevanceScore) {
              return b.relevanceScore - a.relevanceScore;
            }
            // Secondary sort: published date (most recent first)
            return new Date(b.published_date).getTime() - new Date(a.published_date).getTime();
          })
          .slice(0, maxResults);

        setRelatedPosts(scoredPosts);
      } catch (err) {
        console.error('Error fetching related posts:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching related posts');
      } finally {
        setIsLoading(false);
      }
    };

    if (currentPostId) {
      fetchRelatedPosts();
    }
  }, [currentPostId, maxResults, minScore]);

  return {
    relatedPosts,
    isLoading,
    error,
  };
};