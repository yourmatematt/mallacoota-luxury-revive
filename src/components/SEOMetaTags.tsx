import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOMetaTagsProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: "summary" | "summary_large_image";
  keywords?: string;
  /** Geo coords formatted as "lat;lng" (e.g. "-37.5642;149.7544"). Pass null to omit. */
  geoPosition?: string | null;
  /** ICAO/ISO region code, e.g. "AU-VIC". Pass null to omit. */
  geoRegion?: string | null;
  geoPlace?: string | null;
  imageAlt?: string;
  /** Pass a single object or array of JSON-LD objects. */
  schema?: object | object[] | null;
  /** robots meta — defaults to "index, follow". Pass e.g. "noindex,follow" for 404s. */
  robots?: string;
}

const BASE_URL = "https://hammondproperties.com.au";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/hammond-properties-og.jpg`;
const DEFAULT_TITLE = "Hammond Properties - Luxury Holiday Rentals Mallacoota";
const DEFAULT_DESCRIPTION = "Discover Mallacoota's finest luxury holiday homes — waterfront rentals, pet-friendly options, premium amenities. Local concierge by Hammond Properties.";

const SEOMetaTags: React.FC<SEOMetaTagsProps> = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  twitterCard = "summary_large_image",
  keywords,
  geoPosition = "-37.5642;149.7544",
  geoRegion = "AU-VIC",
  geoPlace = "Mallacoota",
  imageAlt,
  schema,
  robots = "index, follow",
}) => {
  const location = useLocation();
  const finalTitle = title ?? DEFAULT_TITLE;
  const finalDescription = description ?? DEFAULT_DESCRIPTION;
  const canonicalUrl = canonical ?? `${BASE_URL}${location.pathname}`;

  const schemas = schema
    ? (Array.isArray(schema) ? schema : [schema])
    : [];

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="robots" content={robots} />
      {keywords && <meta name="keywords" content={keywords} />}

      {geoPosition && <meta name="geo.position" content={geoPosition} />}
      {geoRegion && <meta name="geo.region" content={geoRegion} />}
      {geoPlace && <meta name="geo.placename" content={geoPlace} />}

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      <meta property="og:locale" content="en_AU" />
      <meta property="og:site_name" content="Hammond Properties" />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOMetaTags;
