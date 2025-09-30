import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  title = "Frequently Asked Questions"
}) => {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-luxury-cream/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              {title}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions and make the most of your Mallacoota experience.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-primary/10">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-primary/10"
                  >
                    <AccordionTrigger className="text-left hover:text-primary transition-colors">
                      <span className="font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;