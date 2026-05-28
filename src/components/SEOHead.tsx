import SEOMetaTags from "./SEOMetaTags";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  imageAlt?: string;
  schema?: object | object[] | null;
}

/**
 * Thin compatibility wrapper around SEOMetaTags.
 *
 * Old API kept so existing call sites (`<SEOHead title="…" description="…" />`)
 * still work; new code should reach for `<SEOMetaTags>` directly to access
 * geo / keywords / schema props.
 */
const SEOHead: React.FC<SEOHeadProps> = (props) => <SEOMetaTags {...props} />;

export default SEOHead;
