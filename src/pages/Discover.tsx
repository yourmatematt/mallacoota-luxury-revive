import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";

const Discover = () => {
  const articles = [
    {
      slug: "mallacoota-hidden-gems",
      title: "Hidden Gems of Mallacoota",
      excerpt: "Discover the secret spots only locals know about in this coastal paradise.",
      author: "Amelia Hammond",
      date: "2024-01-15",
      readTime: "5 min read",
      image: "/src/assets/property-1.jpg",
      category: "Local Guide"
    },
    {
      slug: "best-fishing-spots",
      title: "Best Fishing Spots Around Mallacoota",
      excerpt: "From lake fishing to ocean adventures, find the perfect spot for your next catch.",
      author: "Amelia Hammond", 
      date: "2024-01-10",
      readTime: "7 min read",
      image: "/src/assets/property-2.jpg",
      category: "Activities"
    },
    {
      slug: "family-activities-guide",
      title: "Family Activities in Mallacoota",
      excerpt: "Keep the whole family entertained with these fantastic local activities.",
      author: "Amelia Hammond",
      date: "2024-01-05",
      readTime: "6 min read", 
      image: "/src/assets/property-3.jpg",
      category: "Family"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Discover Mallacoota
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Your guide to the best experiences, hidden gems, and local insights in this stunning coastal destination.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.slug} className="card-luxury group cursor-pointer">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock size={14} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl mb-2 group-hover:text-accent-red transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <User size={14} />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} />
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Discover;