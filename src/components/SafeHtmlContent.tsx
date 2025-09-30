import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

interface SafeHtmlContentProps {
  content?: string | null;
  htmlContent?: string | null; // Keep for backward compatibility
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

export const SafeHtmlContent = ({
  content,
  htmlContent,
  className = "",
  tag: Tag = "div"
}: SafeHtmlContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Use content prop first, then htmlContent for backward compatibility
  const rawContent = content || htmlContent;

  // Guard against undefined/null content
  if (!rawContent || typeof rawContent !== 'string') {
    return <Tag className={className}>No content available</Tag>;
  }

  // Process HTML to convert internal links
  const processHtml = (html: string): string => {
    let processedHtml = html;

    // Convert blog links to include the discover-mallacoota prefix
    processedHtml = processedHtml.replace(
      /<a\s+href="(\/(?!properties)[^"]*)"([^>]*)>/gi,
      '<a href="/discover-mallacoota$1"$2 data-internal-link="true">'
    );

    // Convert properties links to the correct route
    processedHtml = processedHtml.replace(
      /<a\s+href="(\/properties[^"]*)"([^>]*)>/gi,
      '<a href="$1"$2 data-internal-link="true">'
    );

    return DOMPurify.sanitize(processedHtml, {
      ADD_ATTR: ['data-internal-link'], // Allow our custom attribute
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre',
        'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'span'
      ],
      ALLOWED_ATTR: [
        'href', 'src', 'alt', 'title', 'class', 'id', 'data-internal-link',
        'target', 'rel'
      ]
    });
  };

  // Handle clicks on internal links
  useEffect(() => {
    const handleInternalLinks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.tagName === 'A') {
        const anchor = target as HTMLAnchorElement;
        const isInternal = anchor.getAttribute('data-internal-link') === 'true';

        if (isInternal) {
          e.preventDefault();
          const href = anchor.getAttribute('href');
          if (href) {
            navigate(href);
          }
        }
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('click', handleInternalLinks);

      return () => {
        contentElement.removeEventListener('click', handleInternalLinks);
      };
    }
  }, [navigate]);

  const processedHtml = processHtml(rawContent);

  return (
    <div
      ref={contentRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
};