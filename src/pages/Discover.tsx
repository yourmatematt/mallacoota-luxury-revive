import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Filter, ArrowUp, Search, X, Home } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useBlogPosts, BlogPost } from "@/hooks/useBlogPosts";
import { 
  useCategories, 
  useAudiences, 
  useSeasons, 
  useActivityLevels, 
  useFilterCounts 
} from "@/hooks/useBlogFilters";
import BlogCategoryBadge from "@/components/BlogCategoryBadge";
import { getBlogImageUrl } from "@/lib/utils";
import { getBlogImage } from '@/lib/blogImages';
import { BlogImage } from "@/components/BlogImage";
import PageTransition from "@/components/PageTransition";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// TypeScript interfaces for filtering
interface BlogFilters {
  search: string;
  categories: string[];
  audiences: string[];
  seasons: string[];
  sort: string;
}

interface FilterCount {
  id: string;
  name: string;
  slug: string;
  count: number;
}

interface FilterCounts {
  categories: FilterCount[];
  audiences: FilterCount[];
  seasons: FilterCount[];
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Blog Search Component with debouncing
interface BlogSearchProps {
  onSearch: (term: string) => void;
  initialValue?: string;
}

const BlogSearch: React.FC<BlogSearchProps> = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  
  // Debounce search for performance
  const debouncedSearch = useMemo(
    () => debounce(onSearch, 300),
    [onSearch]
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };
  
  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <Input
        type="text"
        placeholder="Search guides... (e.g., 'fishing', 'coffee', 'beaches')"
        value={searchTerm}
        onChange={handleInputChange}
        className="pl-10 pr-12 py-6 text-lg bg-white/95 backdrop-blur-sm border-white/20 focus:bg-white text-foreground placeholder:text-muted-foreground transition-all duration-300"
        aria-label="Search blog posts"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
      {searchTerm && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-100"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

// Multi-Select Filter Component
interface BlogFiltersComponentProps {
  filters: BlogFilters;
  filterCounts: FilterCounts;
  onFiltersChange: (filters: BlogFilters) => void;
}

const BlogFiltersComponent: React.FC<BlogFiltersComponentProps> = ({ 
  filters, 
  filterCounts, 
  onFiltersChange 
}) => {
  const toggleFilter = (type: keyof Omit<BlogFilters, 'search' | 'sort'>, value: string) => {
    const currentFilters = filters[type] as string[];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(item => item !== value)
      : [...currentFilters, value];
    
    onFiltersChange({
      ...filters,
      [type]: newFilters
    });
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Categories */}
      {filterCounts.categories.length > 0 && (
        <div className="space-y-3">
          <span className="text-sm font-semibold text-primary block">Categories:</span>
          <div className="flex flex-wrap gap-2">
            {filterCounts.categories.map((cat) => (
              <Button
                key={cat.id}
                variant={filters.categories.includes(cat.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter('categories', cat.id)}
                className="rounded-full transition-all duration-200 hover:scale-105"
                aria-pressed={filters.categories.includes(cat.id)}
              >
                {cat.name} ({cat.count})
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {/* Audiences */}
      {filterCounts.audiences.length > 0 && (
        <div className="space-y-3">
          <span className="text-sm font-semibold text-primary block">Perfect for:</span>
          <div className="flex flex-wrap gap-2">
            {filterCounts.audiences.map((aud) => (
              <Button
                key={aud.id}
                variant={filters.audiences.includes(aud.id) ? "accent" : "outline"}
                size="sm"
                onClick={() => toggleFilter('audiences', aud.id)}
                className="rounded-full transition-all duration-200 hover:scale-105"
                aria-pressed={filters.audiences.includes(aud.id)}
              >
                {aud.name} ({aud.count})
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {/* Seasons */}
      {filterCounts.seasons.length > 0 && (
        <div className="space-y-3">
          <span className="text-sm font-semibold text-primary block">Best time:</span>
          <div className="flex flex-wrap gap-2">
            {filterCounts.seasons.map((season) => (
              <Button
                key={season.id}
                variant={filters.seasons.includes(season.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter('seasons', season.id)}
                className="rounded-full transition-all duration-200 hover:scale-105"
                aria-pressed={filters.seasons.includes(season.id)}
              >
                {season.name} ({season.count})
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Active Filters Display Component
interface ActiveFiltersProps {
  filters: BlogFilters;
  filterCounts: FilterCounts;
  onClear: () => void;
  onRemove: (type: string, value: string | null) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ 
  filters, 
  filterCounts, 
  onClear, 
  onRemove 
}) => {
  const hasFilters = filters.search || 
    filters.categories.length > 0 || 
    filters.audiences.length > 0 || 
    filters.seasons.length > 0;
    
  if (!hasFilters) return null;
  
  const getFilterName = (type: string, id: string) => {
    const collections = {
      categories: filterCounts.categories,
      audiences: filterCounts.audiences,
      seasons: filterCounts.seasons
    };
    
    const collection = collections[type as keyof typeof collections];
    return collection?.find(item => item.id === id)?.name || id;
  };
  
  return (
    <div className="bg-luxury-cream p-4 rounded-lg mb-6 border border-primary/10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-primary">Active filters:</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClear}
          className="text-accent-red hover:text-accent-red/80 hover:bg-accent-red/10"
        >
          Clear all
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.search && (
          <Badge variant="secondary" className="px-3 py-1 bg-primary text-white">
            Search: "{filters.search}"
            <X 
              className="ml-2 h-3 w-3 cursor-pointer hover:bg-white/20 rounded" 
              onClick={() => onRemove('search', null)}
            />
          </Badge>
        )}
        {filters.categories.map((categoryId) => (
          <Badge key={categoryId} variant="secondary" className="px-3 py-1 bg-blue-500 text-white">
            {getFilterName('categories', categoryId)}
            <X 
              className="ml-2 h-3 w-3 cursor-pointer hover:bg-white/20 rounded" 
              onClick={() => onRemove('categories', categoryId)}
            />
          </Badge>
        ))}
        {filters.audiences.map((audienceId) => (
          <Badge key={audienceId} variant="secondary" className="px-3 py-1 bg-accent-red text-white">
            {getFilterName('audiences', audienceId)}
            <X 
              className="ml-2 h-3 w-3 cursor-pointer hover:bg-white/20 rounded" 
              onClick={() => onRemove('audiences', audienceId)}
            />
          </Badge>
        ))}
        {filters.seasons.map((seasonId) => (
          <Badge key={seasonId} variant="secondary" className="px-3 py-1 bg-green-500 text-white">
            {getFilterName('seasons', seasonId)}
            <X 
              className="ml-2 h-3 w-3 cursor-pointer hover:bg-white/20 rounded" 
              onClick={() => onRemove('seasons', seasonId)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
};

// Sort Options Component
interface SortOptionsProps {
  value: string;
  onChange: (value: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-primary">Sort by:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[200px] bg-white/95 backdrop-blur-sm">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Most Recent</SelectItem>
          <SelectItem value="seasonal">Current Season First</SelectItem>
          <SelectItem value="alphabetical">A-Z Title</SelectItem>
          <SelectItem value="category">By Category</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};


// Blog Grid Skeleton for loading states
const BlogGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="card-luxury animate-pulse">
          <div className="aspect-video bg-gray-200 rounded-t-xl"></div>
          <CardContent className="p-6">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Custom hook for filtered blogs with advanced search
const useFilteredBlogs = (filters: BlogFilters) => {
  return useQuery({
    queryKey: ['filtered-blogs', filters],
    queryFn: async (): Promise<BlogPost[]> => {
      let query = supabase
        .from('Discover Mallacoota Blogs')
        .select('*');
      
      // Text search across title and excerpt
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`);
      }
      
      // Category filter
      if (filters.categories.length > 0) {
        query = query.in('Categories_id', filters.categories);
      }
      
      // Sorting
      switch (filters.sort) {
        case 'recent':
          query = query.order('published_date', { ascending: false });
          break;
        case 'alphabetical':
          query = query.order('title');
          break;
        case 'category':
          query = query.order('Categories_id');
          break;
        default:
          query = query.order('published_date', { ascending: false });
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      let blogs = data || [];
      
      // Client-side filtering for audiences and seasons
      if (filters.audiences.length > 0) {
        blogs = blogs.filter(blog => {
          const blogAudiences = (blog.audiences || '').toLowerCase();
          return filters.audiences.some(audienceId => 
            blogAudiences.includes(audienceId.toLowerCase())
          );
        });
      }
      
      if (filters.seasons.length > 0) {
        blogs = blogs.filter(blog => {
          const blogSeasons = (blog.seasons || '').toLowerCase();
          return filters.seasons.some(seasonId => 
            blogSeasons.includes(seasonId.toLowerCase())
          );
        });
      }
      
      return blogs as BlogPost[];
    },
  });
};

// Custom hook to get filter counts
const useFilterCountsCustom = (): { data: FilterCounts | undefined, isLoading: boolean } => {
  const { data: categories } = useCategories();
  const { data: audiences } = useAudiences();
  const { data: seasons } = useSeasons();
  const { data: allBlogs } = useBlogPosts({});
  
  return useMemo(() => {
    if (!categories || !audiences || !seasons || !allBlogs) {
      return { data: undefined, isLoading: true };
    }
    
    // Count occurrences
    const categoryCounts = categories.map(cat => ({
      ...cat,
      count: allBlogs.filter(blog => blog.Categories_id === cat.id).length
    })).filter(cat => cat.count > 0);
    
    const audienceCounts = audiences.map(aud => ({
      ...aud,
      count: allBlogs.filter(blog => 
        (blog.audiences || '').toLowerCase().includes(aud.name.toLowerCase())
      ).length
    })).filter(aud => aud.count > 0);
    
    const seasonCounts = seasons.map(season => ({
      ...season,
      count: allBlogs.filter(blog => 
        (blog.seasons || '').toLowerCase().includes(season.name.toLowerCase())
      ).length
    })).filter(season => season.count > 0);
    
    return {
      data: {
        categories: categoryCounts,
        audiences: audienceCounts,
        seasons: seasonCounts
      },
      isLoading: false
    };
  }, [categories, audiences, seasons, allBlogs]);
};

// CTA Section Component
const CTASection = () => {
  return (
    <section className="section-cta py-20">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Plan Your Stay?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
            Discover your perfect Mallacoota retreat. Browse our collection of premium holiday rentals.
          </p>
          <Button asChild variant="accent" size="default" rounded="full">
            <Link to="/properties">
              <Home className="mr-2 h-5 w-5" />
              Explore Our Collection
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const Discover = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Parse filters from URL with defaults
  const defaultFilters: BlogFilters = {
    search: '',
    categories: [],
    audiences: [],
    seasons: [],
    sort: 'recent'
  };
  
  const filters: BlogFilters = {
    search: searchParams.get('q') || '',
    categories: searchParams.getAll('category'),
    audiences: searchParams.getAll('audience'), 
    seasons: searchParams.getAll('season'),
    sort: searchParams.get('sort') || 'recent'
  };
  
  // Fetch filtered blogs and filter counts
  const { data: blogs, isLoading: blogsLoading } = useFilteredBlogs(filters);
  const { data: filterCounts, isLoading: countsLoading } = useFilterCountsCustom();

  // Update URL when filters change
  const updateFilters = useCallback((newFilters: BlogFilters) => {
    const params = new URLSearchParams();
    
    if (newFilters.search) params.set('q', newFilters.search);
    if (newFilters.sort !== 'recent') params.set('sort', newFilters.sort);
    
    newFilters.categories.forEach(c => params.append('category', c));
    newFilters.audiences.forEach(a => params.append('audience', a));
    newFilters.seasons.forEach(s => params.append('season', s));
    
    setSearchParams(params);
  }, [setSearchParams]);
  
  // Individual filter handlers
  const handleSearch = useCallback((term: string) => {
    updateFilters({ ...filters, search: term });
  }, [filters, updateFilters]);
  
  const handleFiltersChange = useCallback((newFilters: BlogFilters) => {
    updateFilters(newFilters);
  }, [updateFilters]);
  
  const handleSortChange = useCallback((sort: string) => {
    updateFilters({ ...filters, sort });
  }, [filters, updateFilters]);
  
  const clearAllFilters = useCallback(() => {
    updateFilters(defaultFilters);
  }, [updateFilters, defaultFilters]);
  
  const removeFilter = useCallback((type: string, value: string | null) => {
    if (type === 'search') {
      updateFilters({ ...filters, search: '' });
    } else {
      const currentFilters = filters[type as keyof Omit<BlogFilters, 'search' | 'sort'>] as string[];
      const newFilters = value ? currentFilters.filter(item => item !== value) : [];
      updateFilters({ ...filters, [type]: newFilters });
    }
  }, [filters, updateFilters]);

  // SEO Meta Tags for Discover Mallacoota page
  useEffect(() => {
    // Set page title
    const title = "Mallacoota Travel Guide 2025 | Beaches, Restaurants & Activities";
    document.title = title;
    
    // Set meta description
    const description = "Your complete guide to exploring Mallacoota. Discover the best beaches, restaurants, activities, and hidden gems in Australia's coastal paradise. Local insider tips and recommendations.";
    
    // Update existing meta tags or create new ones
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }

    // Open Graph meta tags for social sharing
    const updateOrCreateOGMeta = (property: string, content: string) => {
      let ogMeta = document.querySelector(`meta[property="${property}"]`);
      if (ogMeta) {
        ogMeta.setAttribute('content', content);
      } else {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', property);
        ogMeta.setAttribute('content', content);
        document.head.appendChild(ogMeta);
      }
    };

    updateOrCreateOGMeta('og:title', title);
    updateOrCreateOGMeta('og:description', description);
    updateOrCreateOGMeta('og:url', 'https://hammondproperties.com.au/discover-mallacoota');
    updateOrCreateOGMeta('og:image', 'https://hammondproperties.com.au/images/discover-mallacoota-hero-background.jpg');
    updateOrCreateOGMeta('og:type', 'website');

    // Twitter Card meta tags
    const updateOrCreateTwitterMeta = (name: string, content: string) => {
      let twitterMeta = document.querySelector(`meta[name="${name}"]`);
      if (twitterMeta) {
        twitterMeta.setAttribute('content', content);
      } else {
        twitterMeta = document.createElement('meta');
        twitterMeta.setAttribute('name', name);
        twitterMeta.setAttribute('content', content);
        document.head.appendChild(twitterMeta);
      }
    };

    updateOrCreateTwitterMeta('twitter:card', 'summary_large_image');
    updateOrCreateTwitterMeta('twitter:title', title);
    updateOrCreateTwitterMeta('twitter:description', description);
    updateOrCreateTwitterMeta('twitter:image', 'https://hammondproperties.com.au/images/discover-mallacoota-hero-background.jpg');

    // Cleanup function
    return () => {
      // Reset title
      document.title = 'Hammond Properties - Luxury Holiday Rentals';
      
      // Reset meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Experience Mallacoota\'s luxury holiday rentals with Hammond Properties. Come as guests. Leave as family.');
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Loading and error states
  const isLoading = blogsLoading || countsLoading;

  // Helper functions for display
  const hasActiveFilters = filters.search || 
    filters.categories.length > 0 || 
    filters.audiences.length > 0 || 
    filters.seasons.length > 0;

  // Function to scroll to results section
  const scrollToResults = () => {
    const resultsSection = document.getElementById('articles-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Function to scroll back to filters
  const scrollToFilters = () => {
    const filtersSection = document.querySelector('.bg-white\\/10.backdrop-blur-sm');
    if (filtersSection) {
      filtersSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // Get the count of articles for display
  const articleCount = blogs?.length || 0;
  const articleText = articleCount === 1 ? 'guide' : 'guides';

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
        {/* Hero Section with Animations - Mobile Optimized */}
<section className="relative min-h-[60vh] sm:min-h-[70vh] lg:h-[calc(100vh-5rem)] overflow-hidden">
  {/* Background Image with scale effect */}
  <div 
    className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out ${
      isLoaded ? 'scale-100' : 'scale-105'
    }`}
    style={{ backgroundImage: 'url("/images/discover-mallacoota-hero-background.jpg")' }}
  >
    {/* Overlay for better text readability */}
    <div className="absolute inset-0 bg-black/40"></div>
  </div>
  
  {/* Content with staggered animations */}
  <div className="relative z-10 h-full flex items-center justify-center py-16 sm:py-20">
    <div className="text-center text-white px-6 md:px-4 max-w-4xl mx-auto">
      {/* Main Title */}
      <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-3 sm:mb-4 lg:mb-6 transition-all duration-800 delay-200 leading-tight ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        Discover Mallacoota
      </h1>
      
      {/* Subtitle */}
      <p className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-4 sm:mb-6 lg:mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-800 delay-400 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        {blogs?.length || 0} insider guides to help you explore like a local
      </p>
      
      {/* Search and Filter Controls */}
      <div className={`max-w-6xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 transition-all duration-800 delay-800 ${
        isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
      }`}>
        <div className="space-y-6">
          <div className="text-center">
            <label className="text-xs sm:text-sm font-medium text-white mb-6 block leading-relaxed">
              From pristine beaches to hidden bushwalking trails, discover the best activities, attractions, and experiences Mallacoota has to offer
            </label>
            
            {/* Search Bar */}
            <BlogSearch 
              onSearch={handleSearch} 
              initialValue={filters.search}
            />
          </div>
          
          {/* Results Button */}
          <div className="text-center">
            <Button 
              onClick={scrollToResults}
              className="bg-accent-red hover:bg-accent-red/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading 
                ? "Loading guides..." 
                : `View ${articleCount} ${articleText}`
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

          {/* Filters Section */}
          <section className="py-8 bg-gradient-to-b from-luxury-cream/50 to-transparent border-b">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-6">
                <h2 className="text-lg font-semibold text-primary">
                  Filter Guides
                </h2>
                <SortOptions 
                  value={filters.sort} 
                  onChange={handleSortChange}
                />
              </div>
              
              {filterCounts && (
                <BlogFiltersComponent 
                  filters={filters}
                  filterCounts={filterCounts}
                  onFiltersChange={handleFiltersChange}
                />
              )}
              
              {filterCounts && (
                <ActiveFilters 
                  filters={filters}
                  filterCounts={filterCounts}
                  onClear={clearAllFilters}
                  onRemove={removeFilter}
                />
              )}
            </div>
          </section>

          {/* Blog Posts Section */}
          <section id="articles-section" className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-primary mb-2">
                    {hasActiveFilters ? 'Filtered Results' : 'All Guides'}
                  </h2>
                  <p className="text-muted-foreground">
                    {isLoading ? 'Loading...' : `${articleCount} ${articleText} found`}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={scrollToFilters}
                  className="hidden sm:flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Back to Filters
                </Button>
              </div>

              {/* Loading State */}
              {isLoading && <BlogGridSkeleton />}

              {/* Blog Posts Grid */}
              {!isLoading && blogs && blogs.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogs.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      id={blog.id}
                      title={blog.title}
                      slug={blog.slug}
                      excerpt={blog.excerpt}
                      categoryId={blog.Categories_id}
                      published_date={blog.published_date}
                      seasons={blog.seasons}
                      activity_levels={blog.activity_levels}
                      audiences={blog.audiences}
                      card_image={blog.card_image}
                    />
                  ))}
                </div>
              )}

              {/* No Results */}
              {!isLoading && (!blogs || blogs.length === 0) && (
                <div className="text-center py-16">
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-serif font-bold text-primary mb-6">
                      No Guides Match Your Search
                    </h3>
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                      We couldn't find guides matching your current search, but Mallacoota has so much more to explore!
                    </p>

                    <div className="bg-luxury-cream p-8 rounded-2xl mb-12 text-left">
                      <h4 className="text-xl font-serif font-semibold text-primary mb-6 text-center">
                        Discover Mallacoota's Hidden Treasures
                      </h4>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h5 className="font-semibold text-primary mb-3">🏖️ Pristine Beaches & Coastal Adventures</h5>
                          <p className="text-muted-foreground mb-4">
                            Explore kilometres of unspoiled coastline from Betka Beach to Quarry Beach. Perfect for swimming, surfing, beachcombing, and sunset photography. Each beach offers unique character and experiences.
                          </p>

                          <h5 className="font-semibold text-primary mb-3">🎣 World-Class Fishing</h5>
                          <p className="text-muted-foreground mb-4">
                            Cast a line in some of Australia's best fishing waters. From beach fishing to deep-sea excursions, Mallacoota offers incredible opportunities for anglers of all levels.
                          </p>

                          <h5 className="font-semibold text-primary mb-3">🥾 Bushwalking & Nature Trails</h5>
                          <p className="text-muted-foreground mb-4">
                            Discover native wildlife and stunning scenery on well-maintained trails. From easy lakeside strolls to challenging coastal hikes, there's a path for every fitness level.
                          </p>
                        </div>

                        <div>
                          <h5 className="font-semibold text-primary mb-3">🍽️ Local Dining & Cafes</h5>
                          <p className="text-muted-foreground mb-4">
                            Savour fresh seafood, local produce, and artisan coffee. Our restaurant guides help you discover everything from casual beachside eats to fine dining experiences.
                          </p>

                          <h5 className="font-semibold text-primary mb-3">🏰 Gabo Island Lighthouse Tours</h5>
                          <p className="text-muted-foreground mb-4">
                            Experience Australia's second-tallest lighthouse on this historic island. Tour the museum, enjoy panoramic views, and learn about maritime history.
                          </p>

                          <h5 className="font-semibold text-primary mb-3">🦘 Wildlife Watching</h5>
                          <p className="text-muted-foreground mb-4">
                            Spot kangaroos, echidnas, diverse bird species, and marine life. Mallacoota's pristine environment offers exceptional wildlife viewing opportunities year-round.
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 p-6 bg-white rounded-xl border border-primary/10">
                        <h5 className="font-semibold text-primary mb-3 text-center">Local Insider Tips</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="font-medium text-primary">Best Photography Spots</p>
                            <p className="text-sm text-muted-foreground">Sunrise at Bastion Point, sunset at Betka Beach</p>
                          </div>
                          <div>
                            <p className="font-medium text-primary">Hidden Swimming Holes</p>
                            <p className="text-sm text-muted-foreground">Secret freshwater pools and secluded coves</p>
                          </div>
                          <div>
                            <p className="font-medium text-primary">Seasonal Highlights</p>
                            <p className="text-sm text-muted-foreground">Whale watching, wildflower blooms, fishing seasons</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button onClick={clearAllFilters} size="lg" variant="accent">
                        Browse All Guides
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <Link to="/properties">
                          Book Your Stay
                        </Link>
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground mt-6">
                      New to Mallacoota? Start with our popular guides for first-time visitors, or contact our local experts for personalized recommendations.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* CTA Section - Added after blog posts */}
          <CTASection />
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Discover;