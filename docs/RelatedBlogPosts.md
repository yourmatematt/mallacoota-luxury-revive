# RelatedBlogPosts Component

A React component that automatically displays related blog posts based on shared categories, audiences, and seasons, improving internal linking and user engagement.

## Features

- **Smart Relevance Algorithm**: Uses weighted scoring to find the most relevant posts
- **TypeScript Support**: Fully typed with proper interfaces and error handling
- **Performance Optimized**: Custom hook with memoization and efficient queries
- **Responsive Design**: Mobile-first layout with consistent styling
- **SEO Benefits**: Improves internal linking and time on site

## Scoring Algorithm

The component calculates relevance scores using the following weights:

- **Same Category**: 3 points
- **Shared Audiences**: 2 points each
- **Same Season**: 1 point each

Posts are sorted by relevance score first, then by published date for ties.

## Usage

### Basic Implementation

```tsx
import RelatedBlogPosts from "@/components/RelatedBlogPosts";

// In your blog post component
<RelatedBlogPosts 
  currentPostId={blogPost.id}
  currentPostSlug={blogPost.slug}
/>
```

### Advanced Options

```tsx
<RelatedBlogPosts 
  currentPostId={blogPost.id}
  currentPostSlug={blogPost.slug}
  maxResults={6}  // Show up to 6 related posts (default: 5)
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `currentPostId` | `string` | ✅ | - | ID of the current blog post |
| `currentPostSlug` | `string` | ✅ | - | Slug of the current blog post |
| `maxResults` | `number` | ❌ | `5` | Maximum number of related posts to display |

## Custom Hook

The component uses the `useRelatedBlogPosts` hook which can be used independently:

```tsx
import { useRelatedBlogPosts } from "@/hooks/useRelatedBlogPosts";

const { relatedPosts, isLoading, error } = useRelatedBlogPosts({
  currentPostId: "blog-id",
  maxResults: 5,
  minScore: 1
});
```

## Database Requirements

The component expects the following Supabase tables and relationships:

### Tables
- `Discover Mallacoota Blogs` - Main blog posts table
- `Categories` - Blog categories
- `Audiences` - Target audiences  
- `Seasons` - Seasonal tags
- `blog_audiences` - Junction table for blog-audience relationships
- `blog_seasons` - Junction table for blog-season relationships

### Required Fields
```sql
-- Discover Mallacoota Blogs
id (uuid)
title (text)
slug (text)
excerpt (text)
Categories_id (uuid, foreign key)
published_date (timestamptz)

-- Categories
id (uuid)
name (text)
slug (text)

-- Audiences
id (uuid)
name (text)
slug (text)

-- Seasons
id (uuid)
name (text)
slug (text)
```

## Styling

The component uses existing UI components and follows the site's design system:

- `Card` and `CardContent` for layout
- `Badge` for category display
- Tailwind CSS classes for responsive design
- Hover effects and transitions for interactivity

## Performance Features

- **Memoized Functions**: Excerpt truncation is memoized
- **Efficient Queries**: Single query with joins to minimize database calls
- **Error Boundaries**: Graceful error handling with silent failures
- **Loading States**: Smooth loading experience with skeleton states

## SEO Benefits

- **Internal Linking**: Automatically creates contextual links between related content
- **Increased Time on Site**: Encourages users to read more articles
- **Topic Clusters**: Helps search engines understand content relationships
- **Lower Bounce Rate**: Provides relevant next steps for users

## Error Handling

The component handles errors gracefully:

- **Network Errors**: Silent failure to avoid breaking the page
- **Missing Data**: Falls back to empty state
- **Invalid Props**: TypeScript prevents common mistakes
- **Database Errors**: Logged to console for debugging

## Accessibility

- **Semantic HTML**: Uses proper heading hierarchy
- **Keyboard Navigation**: All links are keyboard accessible
- **Screen Readers**: Descriptive link text and ARIA labels
- **Focus Management**: Clear focus indicators

## Testing

To test the component:

1. Create a blog post with categories, audiences, and seasons
2. Create related posts with overlapping relationships
3. Verify the scoring algorithm works correctly
4. Test edge cases (no related posts, single category, etc.)

## Example Scoring

For a post about "Summer Kayaking" with:
- Category: "Water Sports" 
- Audience: ["Families", "Adventure Seekers"]
- Season: ["Summer"]

A related post "Family Fishing Summer" would score:
- Same category (Water Sports): +3 points
- Shared audience (Families): +2 points  
- Same season (Summer): +1 point
- **Total: 6 points**

## Browser Support

- Modern browsers with ES2018+ support
- React 18+
- TypeScript 4.7+
- Tailwind CSS 3.0+

## Contributing

When modifying the component:

1. Update TypeScript interfaces in `/src/types/blog.ts`
2. Test with various blog post combinations
3. Verify responsive design on mobile devices
4. Check accessibility with screen readers
5. Update documentation for any API changes