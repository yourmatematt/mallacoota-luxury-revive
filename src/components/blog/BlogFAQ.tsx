import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SafeHtmlContent } from "@/components/SafeHtmlContent";

interface FAQ {
  question: string;
  answer: string;
}

interface BlogFAQProps {
  faqs: FAQ[];
  title?: string;
}

export const BlogFAQ = ({ faqs, title = "Frequently Asked Questions" }: BlogFAQProps) => {
  // Inject FAQPage structured data for SEO
  useEffect(() => {
    if (!faqs || faqs.length === 0) return;

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer.replace(/<[^>]*>/g, '') // Strip HTML tags for schema
        }
      }))
    };

    let schemaScript = document.querySelector('#blog-faq-structured-data');
    if (schemaScript) {
      schemaScript.textContent = JSON.stringify(faqSchema);
    } else {
      schemaScript = document.createElement('script');
      schemaScript.id = 'blog-faq-structured-data';
      schemaScript.type = 'application/ld+json';
      schemaScript.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(schemaScript);
    }

    return () => {
      const script = document.querySelector('#blog-faq-structured-data');
      if (script) script.remove();
    };
  }, [faqs]);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-16 bg-accent/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 text-center">
            {title}
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg border border-border shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg font-medium text-primary pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-muted-foreground leading-relaxed">
                    <SafeHtmlContent content={faq.answer} tag="div" className="prose prose-sm max-w-none" />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};