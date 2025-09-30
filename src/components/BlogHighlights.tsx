import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BlogHighlight } from '@/lib/blogContentMapper';

interface BlogHighlightsProps {
  highlights: BlogHighlight[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const BlogHighlights = ({
  highlights,
  title = "Experience Highlights",
  subtitle = "Discover what makes this experience special and why it's a must-do part of your Mallacoota adventure.",
  className = ""
}: BlogHighlightsProps) => {
  return (
    <section className={`py-20 bg-gradient-to-b from-luxury-cream/30 to-white ${className}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className={highlight.iconClass} />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-4 text-primary">
                    {highlight.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};