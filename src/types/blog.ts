// Blog post related TypeScript interfaces

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  hero_image_url?: string;
  meta_title?: string;
  meta_description?: string;
  published_date: string;
  Categories_id: string;
  category?: BlogCategory;
  audiences?: BlogAudience[];
  seasons?: BlogSeason[];
  activity_levels?: BlogActivityLevel[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogAudience {
  id: string;
  name: string;
  slug: string;
}

export interface BlogSeason {
  id: string;
  name: string;
  slug: string;
}

export interface BlogActivityLevel {
  id: string;
  name: string;
  slug: string;
}

export interface RelatedBlogPost extends BlogPost {
  relevanceScore: number;
}

export interface BlogFilters {
  categoryId?: string;
  audienceIds?: string[];
  seasonIds?: string[];
  activityLevelIds?: string[];
  searchTerm?: string;
}