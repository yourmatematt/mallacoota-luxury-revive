import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  season: string;
  audience: string;
  activityLevel: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
  tags: string[];
}

const BlogDetail = () => {
  const { slug } = useParams();

  // Mock blog post data - will be replaced with CMS data
  const blogPost: BlogPost = {
    id: "1",
    title: "Best Beach Walks in Mallacoota",
    metaTitle: "Best Beach Walks in Mallacoota - Complete Guide 2024",
    metaDescription: "Discover the most scenic coastal walks in Mallacoota. From gentle strolls to challenging hikes, find your perfect beach adventure with our comprehensive guide.",
    excerpt: "Discover the most scenic coastal walks that showcase Mallacoota's natural beauty. From gentle strolls to challenging hikes, find your perfect beach adventure.",
    content: `
      <p>Mallacoota's coastline offers some of Victoria's most breathtaking beach walks, each revealing unique perspectives of this coastal paradise. Whether you're seeking a gentle morning stroll or an adventurous day hike, our local guide will help you discover the perfect path.</p>

      <h2>1. Betka Beach to Shipwreck Creek (Easy)</h2>
      <p>This gentle 2km walk is perfect for families and those seeking a relaxed coastal experience. The well-maintained path winds along pristine sandy beaches, offering stunning views of Bass Strait. Keep an eye out for dolphins playing in the surf and various seabirds feeding in the shallows.</p>

      <h3>What to Expect:</h3>
      <ul>
        <li>Duration: 45 minutes return</li>
        <li>Difficulty: Easy - suitable for all ages</li>
        <li>Best time: Early morning or late afternoon</li>
        <li>Highlights: Pristine beaches, marine wildlife, peaceful atmosphere</li>
      </ul>

      <h2>2. Gipsy Point Coastal Walk (Moderate)</h2>
      <p>For those wanting more adventure, this 5km coastal walk offers spectacular cliff-top views and hidden beaches. The track includes some steep sections but rewards hikers with panoramic vistas and secluded coves perfect for a picnic lunch.</p>

      <h3>Trail Highlights:</h3>
      <ul>
        <li>Duration: 2-3 hours return</li>
        <li>Difficulty: Moderate - some steep sections</li>
        <li>Best time: Morning start recommended</li>
        <li>Highlights: Cliff-top views, hidden beaches, native wildlife</li>
      </ul>

      <h2>3. Mallacoota Inlet Walk (Easy to Moderate)</h2>
      <p>This versatile walk can be tailored to your fitness level and time constraints. The full circuit is 8km, but you can turn back at any point. The path follows the beautiful inlet waters, where you might spot pelicans, cormorants, and other waterbirds.</p>

      <h3>Walk Options:</h3>
      <ul>
        <li>Short version: 2km return (30 minutes)</li>
        <li>Medium version: 5km return (1.5 hours)</li>
        <li>Full circuit: 8km (2.5-3 hours)</li>
        <li>Highlights: Inlet views, birdwatching opportunities, mangrove forests</li>
      </ul>

      <h2>Essential Walking Tips</h2>
      <p>Before setting out on any of these walks, here are some important considerations:</p>

      <h3>What to Bring:</h3>
      <ul>
        <li>Plenty of water - at least 1L per person</li>
        <li>Sun protection (hat, sunscreen, sunglasses)</li>
        <li>Comfortable walking shoes with good grip</li>
        <li>Light snacks or picnic lunch</li>
        <li>Camera for capturing the stunning scenery</li>
        <li>First aid basics</li>
      </ul>

      <h3>Safety Considerations:</h3>
      <ul>
        <li>Check weather conditions before departing</li>
        <li>Tell someone your planned route and return time</li>
        <li>Be aware of tide times for beach walks</li>
        <li>Stay on marked tracks to protect native vegetation</li>
        <li>Carry a mobile phone (note: some areas have limited coverage)</li>
      </ul>

      <h2>Best Times to Walk</h2>
      <p>While Mallacoota's walks are beautiful year-round, each season offers unique experiences:</p>

      <ul>
        <li><strong>Summer:</strong> Early morning walks avoid the heat and offer the best wildlife viewing</li>
        <li><strong>Autumn:</strong> Comfortable temperatures and fewer crowds make this ideal for longer walks</li>
        <li><strong>Winter:</strong> Dramatic weather and possible whale sightings add excitement to your walk</li>
        <li><strong>Spring:</strong> Wildflowers bloom and migratory birds return, creating a vibrant landscape</li>
      </ul>

      <h2>Photography Tips</h2>
      <p>Mallacoota's dramatic coastline provides endless photography opportunities. For the best shots:</p>

      <ul>
        <li>Golden hour (sunrise/sunset) offers the most dramatic lighting</li>
        <li>Bring a polarizing filter to reduce glare from water and wet rocks</li>
        <li>Look for interesting foreground elements like driftwood or rock formations</li>
        <li>Don't forget to capture the small details - shells, patterns in sand, native plants</li>
      </ul>

      <p>These coastal walks showcase why Mallacoota is one of Australia's premier coastal destinations. Each trail offers its own rewards, from stunning views and wildlife encounters to peaceful moments of connection with nature. Whether you're staying for a weekend or a week, make sure to experience at least one of these magnificent beach walks.</p>
    `,
    image: "/api/placeholder/800/500",
    category: "Activities",
    season: "Summer",
    audience: "Families",
    activityLevel: "Moderate",
    author: "Amelia Hammond",
    date: "2023-12-15",
    readTime: "5 min read",
    slug: "best-beach-walks-mallacoota",
    tags: ["Beach Walks", "Hiking", "Nature", "Family Friendly", "Photography"]
  };

  // Related posts
  const relatedPosts = [
    {
      id: "2",
      title: "Hidden Dining Gems You Must Try",
      excerpt: "Uncover Mallacoota's best-kept culinary secrets.",
      image: "/api/placeholder/400/300",
      slug: "hidden-dining-gems-mallacoota"
    },
    {
      id: "3", 
      title: "Winter Wildlife Watching Guide",
      excerpt: "Experience Mallacoota's incredible wildlife during winter.",
      image: "/api/placeholder/400/300",
      slug: "winter-wildlife-watching-guide"
    },
    {
      id: "4",
      title: "Family Adventure: Rock Pooling at Low Tide",
      excerpt: "Create magical memories exploring rock pools with children.",
      image: "/api/placeholder/400/300",
      slug: "family-rock-pooling-guide"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[50vh] overflow-hidden">
          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl text-white">
                <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {blogPost.category}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {blogPost.audience}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {blogPost.activityLevel}
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                  {blogPost.title}
                </h1>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {blogPost.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(blogPost.date).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {blogPost.readTime}
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
              <div className="prose prose-lg max-w-none mb-12">
                <div 
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />
              </div>

              {/* Tags */}
              {blogPost.tags && blogPost.tags.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-lg font-semibold text-primary mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {blogPost.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

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
        <section className="py-16 bg-accent/10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
                Related Articles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((post) => (
                  <Link key={post.id} to={`/blog/${post.slug}`}>
                    <div className="group">
                      <div className="relative overflow-hidden rounded-xl mb-4">
                        <img
                          src={post.image}
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
      </main>

      <Footer />
      
      {/* SEO Meta Tags would be set in document head */}
      <div className="hidden">
        <meta name="title" content={blogPost.metaTitle} />
        <meta name="description" content={blogPost.metaDescription} />
      </div>
    </div>
  );
};

export default BlogDetail;