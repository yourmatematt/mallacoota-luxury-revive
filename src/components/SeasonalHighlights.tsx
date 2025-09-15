import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Thermometer, Sun, Leaf, Snowflake } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getBlogImageUrl } from "@/lib/utils";

interface SeasonalBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  hero_image_url?: string;
  published_date: string;
}

// Seasonal Highlights Component
const SeasonalHighlights: React.FC = () => {
  // Determine current season based on Australian seasons
  const getCurrentSeason = (): { season: string; displayName: string; icon: React.ReactNode; color: string; bgColor: string } => {
    const month = new Date().getMonth(); // 0-11
    if (month >= 2 && month <= 4) {
      return {
        season: 'autumn',
        displayName: 'Autumn',
        icon: <Leaf className="h-5 w-5" />,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50'
      };
    }
    if (month >= 5 && month <= 7) {
      return {
        season: 'winter',
        displayName: 'Winter',
        icon: <Snowflake className="h-5 w-5" />,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      };
    }
    if (month >= 8 && month <= 10) {
      return {
        season: 'spring',
        displayName: 'Spring',
        icon: <Sun className="h-5 w-5" />,
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      };
    }
    return {
      season: 'summer',
      displayName: 'Summer',
      icon: <Thermometer className="h-5 w-5" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    };
  };
  
  const currentSeason = getCurrentSeason();
  
  // Get seasonal blog posts
  const { data: seasonalBlogs, isLoading } = useQuery({
    queryKey: ['seasonal-blogs', currentSeason.season],
    queryFn: async (): Promise<SeasonalBlog[]> => {
      try {
        // First get all blogs and filter client-side for better reliability
        const { data, error } = await supabase
          .from('Discover Mallacoota Blogs')
          .select(`
            id,
            title,
            slug,
            excerpt,
            hero_image_url,
            published_date,
            seasons
          `)
          .order('published_date', { ascending: false });

        if (error) throw error;

        // Client-side filtering based on season
        const seasonKeywords = {
          summer: ['summer', 'beach', 'swimming', 'christmas', 'holiday', 'sun'],
          autumn: ['autumn', 'fall', 'harvest', 'wine', 'hiking', 'mild'],
          winter: ['winter', 'whale', 'cozy', 'fireplace', 'wildlife', 'cold'],
          spring: ['spring', 'wildflower', 'bloom', 'fresh', 'new', 'growth']
        };

        const keywords = seasonKeywords[currentSeason.season as keyof typeof seasonKeywords] || [];
        
        const filtered = (data || []).filter(blog => {
          const blogSeasons = (blog.seasons || '').toLowerCase();
          const titleText = (blog.title || '').toLowerCase();
          const excerptText = (blog.excerpt || '').toLowerCase();
          const combinedText = `${blogSeasons} ${titleText} ${excerptText}`;
          
          return keywords.some(keyword => combinedText.includes(keyword));
        });

        return filtered.slice(0, 3) as SeasonalBlog[];
      } catch (error) {
        console.error('Error fetching seasonal blogs:', error);
        return [];
      }
    },
  });

  // Get featured seasonal activities (hardcoded for reliability)
  const getSeasonalActivities = () => {
    const activities = {
      summer: [
        { title: "Beach Swimming & Sunbathing", description: "Perfect warm days for the beach" },
        { title: "Kayaking & Water Sports", description: "Ideal conditions on calm waters" },
        { title: "Family Holiday Fun", description: "School holidays bring festive energy" }
      ],
      autumn: [
        { title: "Perfect Hiking Weather", description: "Cool mornings, warm afternoons" },
        { title: "Wildlife Photography", description: "Animals more active in mild weather" },
        { title: "Cozy Indoor Escapes", description: "Fireplaces and comfortable evenings" }
      ],
      winter: [
        { title: "Whale Watching Season", description: "Spectacular migration sightings" },
        { title: "Storm Watching", description: "Dramatic weather from warm indoors" },
        { title: "Indoor Luxury", description: "Perfect spa and relaxation time" }
      ],
      spring: [
        { title: "Wildflower Blooms", description: "National park bursts with color" },
        { title: "Perfect Walking Weather", description: "Cool mornings, pleasant days" },
        { title: "Bird Watching", description: "Migratory species return" }
      ]
    };

    return activities[currentSeason.season as keyof typeof activities] || [];
  };

  const seasonalActivities = getSeasonalActivities();

  if (isLoading) {
    return (
      <section className={`py-12 ${currentSeason.bgColor} border-b`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${currentSeason.color} bg-white`}>
              {currentSeason.icon}
            </div>
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-white rounded-lg animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-12 ${currentSeason.bgColor} border-b`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${currentSeason.color} bg-white shadow-sm`}>
              {currentSeason.icon}
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-primary">
                Perfect for {currentSeason.displayName}
              </h3>
              <p className="text-muted-foreground">
                Seasonal experiences happening right now
              </p>
            </div>
          </div>
          <Link 
            to={`/discover-mallacoota?q=${currentSeason.season}`}
            className={`${currentSeason.color} hover:underline text-sm font-medium flex items-center gap-1 w-fit`}
          >
            View all {currentSeason.displayName} activities
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        
        {/* Two-column layout: Activities + Featured Blogs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Seasonal Activities */}
          <div className="lg:col-span-1">
            <h4 className="font-semibold text-primary mb-4 text-lg">
              What's Great This Season
            </h4>
            <div className="space-y-3">
              {seasonalActivities.map((activity, index) => (
                <div 
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h5 className="font-semibold text-primary mb-1">
                    {activity.title}
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/discover-mallacoota">
                  <Calendar className="mr-2 h-4 w-4" />
                  Plan Your Visit
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right: Featured Seasonal Blog Posts */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-primary mb-4 text-lg">
              {currentSeason.displayName} Guides & Tips
            </h4>
            
            {seasonalBlogs && seasonalBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {seasonalBlogs.slice(0, 2).map((blog) => (
                  <Link 
                    key={blog.id}
                    to={`/discover-mallacoota/${blog.slug}`}
                    className="group block"
                  >
                    <Card className="h-full bg-white hover:shadow-md transition-all duration-300">
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img 
                          src={blog.hero_image_url || '/placeholder-blog.jpg'}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-blog.jpg';
                          }}
                        />
                      </div>
                      <CardContent className="p-4">
                        <Badge variant="secondary" className={`mb-3 ${currentSeason.color} bg-white border`}>
                          {currentSeason.displayName} Guide
                        </Badge>
                        <h5 className="font-semibold text-primary mb-2 group-hover:text-accent-red transition-colors line-clamp-2">
                          {blog.title}
                        </h5>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(blog.published_date).toLocaleDateString('en-AU', { 
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                
                {/* Third blog post as a compact card */}
                {seasonalBlogs[2] && (
                  <div className="md:col-span-2">
                    <Link 
                      to={`/discover-mallacoota/${seasonalBlogs[2].slug}`}
                      className="group block"
                    >
                      <Card className="bg-white hover:shadow-md transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0 w-24 h-16 overflow-hidden rounded-lg">
                              <img 
                                src={seasonalBlogs[2].hero_image_url || '/placeholder-blog.jpg'}
                                alt={seasonalBlogs[2].title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-primary group-hover:text-accent-red transition-colors line-clamp-1 mb-1">
                                {seasonalBlogs[2].title}
                              </h5>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {seasonalBlogs[2].excerpt}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 bg-white rounded-lg text-center">
                <p className="text-muted-foreground mb-4">
                  More {currentSeason.displayName.toLowerCase()} guides coming soon!
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/discover-mallacoota">
                    Browse All Guides
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalHighlights;