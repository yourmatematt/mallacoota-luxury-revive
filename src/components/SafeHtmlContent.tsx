import DOMPurify from 'dompurify';

interface SafeHtmlContentProps {
  htmlContent: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

export const SafeHtmlContent = ({ 
  htmlContent, 
  className = "", 
  tag: Tag = "div" 
}: SafeHtmlContentProps) => {
  const sanitizedContent = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'span'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel'
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|ftp):\/\/|mailto:|tel:|#)/i
  });

  return (
    <Tag 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};