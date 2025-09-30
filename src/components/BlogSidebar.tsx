import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlogSidebarSection, BlogSidebarCTA } from '@/lib/blogContentMapper';

interface BlogSidebarProps {
  sections: BlogSidebarSection[];
  cta?: BlogSidebarCTA;
  className?: string;
}

export const BlogSidebar = ({
  sections,
  cta,
  className = ""
}: BlogSidebarProps) => {
  return (
    <div className={`space-y-8 ${className}`}>
      {sections.map((section, index) => {
        const IconComponent = section.icon;
        return (
          <Card key={index} className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0">
                  <IconComponent className={section.iconClass} />
                </div>
                <h3 className="text-lg font-serif font-bold text-primary">
                  {section.title}
                </h3>
              </div>

              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <p key={itemIndex} className="text-sm text-muted-foreground leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {cta && (
        <Card className="bg-gradient-to-br from-primary to-primary/90 text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-serif font-bold mb-4">
              {cta.title}
            </h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              {cta.description}
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 w-full"
            >
              <Link to={cta.buttonLink}>
                {cta.buttonText}
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};