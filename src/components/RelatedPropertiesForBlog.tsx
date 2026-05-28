import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProperties } from "@/hooks/useProperties";
import PropertyCard from "@/components/PropertyCard";
import { getRelatedPropertySlugsForBlog } from "@/data/blogPropertyMapping";

interface RelatedPropertiesForBlogProps {
  blogSlug: string;
  /** Override the section heading (defaults to "Stay nearby"). */
  heading?: string;
  /** Override the section subheading. */
  subheading?: string;
}

const RelatedPropertiesForBlog = ({
  blogSlug,
  heading = "Stay Nearby in Mallacoota",
  subheading = "Hand-picked Hammond Properties rentals to pair with this guide.",
}: RelatedPropertiesForBlogProps) => {
  const { data: allProperties, isLoading } = useProperties();

  if (!blogSlug) return null;

  const targetSlugs = getRelatedPropertySlugsForBlog(blogSlug);
  // Preserve mapping order: filter then sort by index in targetSlugs.
  const matched = (allProperties ?? [])
    .filter((p) => targetSlugs.includes(p.slug))
    .sort((a, b) => targetSlugs.indexOf(a.slug) - targetSlugs.indexOf(b.slug))
    .slice(0, 3);

  // If the catalogue hasn't loaded yet OR no matches resolved, render nothing —
  // we don't want a section header floating above an empty grid.
  if (isLoading || matched.length === 0) return null;

  return (
    <section className="py-16 bg-luxury-cream/30 border-t border-border/40">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-primary mb-3">{heading}</h2>
          <p className="text-lg text-muted-foreground">{subheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matched.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/properties">Browse All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RelatedPropertiesForBlog;
