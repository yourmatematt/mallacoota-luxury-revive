import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import BlogCategoryBadge from "@/components/BlogCategoryBadge";
import { getBlogImage } from "@/lib/blogImages";

interface BlogCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  categoryId?: string;
  categoryName?: string;
  author?: string;
  date?: string;
  published_date?: string;
  readTime?: string;
  linkPrefix?: string; // For different blog routes
  seasons?: string;
  activity_levels?: string;
  audiences?: string;
  className?: string;
}

export const BlogCard = ({
  id,
  title,
  slug,
  excerpt,
  categoryId,
  categoryName,
  author = "Amelia Hammond",
  date,
  published_date,
  readTime = "5 min read",
  linkPrefix = "/discover-mallacoota",
  seasons,
  activity_levels,
  audiences,
  className = ""
}: BlogCardProps) => {
  const displayDate = published_date || date;

  return (
    <Card className={`card-luxury hover:scale-[1.02] transition-all duration-300 group ${className}`}>
      <Link to={`${linkPrefix}/${slug}`}>
        <div className="aspect-video overflow-hidden rounded-t-xl">
          <img
            src={getBlogImage(slug)}
            alt={title || 'Blog post'}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              const currentSrc = target.src;

              // Try different extensions
              if (currentSrc.endsWith('.jpg')) {
                target.src = currentSrc.replace('.jpg', '.jpeg');
              } else if (currentSrc.endsWith('.jpeg')) {
                target.src = currentSrc.replace('.jpeg', '.png');
              } else if (currentSrc.endsWith('.png')) {
                target.src = currentSrc.replace('.png', '.webp');
              } else {
                // Final fallback
                target.src = '/placeholder-blog.jpg';
              }
            }}
            loading="lazy"
          />
        </div>
        <CardContent className="p-6">
          {/* Category Badge */}
          {categoryId ? (
            <div className="mb-3">
              <BlogCategoryBadge categoryId={categoryId} />
            </div>
          ) : categoryName ? (
            <div className="mb-3">
              <Badge variant="secondary">{categoryName}</Badge>
            </div>
          ) : null}

          {/* Title */}
          <h3 className="text-xl font-serif font-bold text-primary mb-3 line-clamp-2 group-hover:text-accent-red transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
              {excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-4">
              {displayDate && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(displayDate).toLocaleDateString('en-AU', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>
              )}
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {(seasons || activity_levels || audiences) && (
            <div className="flex flex-wrap gap-2">
              {seasons && (
                <Badge variant="outline" className="text-xs">
                  {seasons}
                </Badge>
              )}
              {activity_levels && (
                <Badge variant="outline" className="text-xs">
                  {activity_levels}
                </Badge>
              )}
              {audiences && (
                <Badge variant="outline" className="text-xs">
                  {audiences}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default BlogCard;