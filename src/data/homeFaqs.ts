export interface HomepageFAQ {
  question: string;
  answer: string;
}

/**
 * Single source of truth for the homepage FAQ — the visible FAQSection
 * and the FAQPage JSON-LD both read from this array so they can never drift.
 */
export const HOMEPAGE_FAQS: HomepageFAQ[] = [
  {
    question: "What makes Mallacoota a great holiday destination?",
    answer:
      "Mallacoota offers pristine beaches, excellent fishing, kayaking on the inlet, abundant wildlife, and peaceful coastal living in East Gippsland. It's perfect for families, couples, and nature lovers seeking a genuine Australian coastal escape away from crowds.",
  },
  {
    question: "How many holiday homes does Hammond Properties manage in Mallacoota?",
    answer:
      "We manage 14 premium waterfront properties in Mallacoota, ranging from intimate 2-bedroom cottages to spacious 6-bedroom estates. Each property offers unique features like water access, ocean views, or pet-friendly accommodations.",
  },
  {
    question: "Are your Mallacoota rentals pet-friendly?",
    answer:
      "Yes! Many of our properties welcome well-behaved pets. Each property listing clearly indicates pet policies, and we're happy to help you find the perfect pet-friendly accommodation for your family vacation in East Gippsland.",
  },
  {
    question: "What amenities are included in your luxury rentals?",
    answer:
      "All Hammond Properties include premium amenities: fully equipped kitchens, quality linens and towels, WiFi, heating/cooling, and modern appliances. Many feature water views, boat parking, BBQ areas, and private outdoor spaces perfect for coastal living.",
  },
  {
    question: "How far is Mallacoota from Melbourne?",
    answer:
      "Mallacoota is approximately 525km (6-7 hours drive) from Melbourne via the Princes Highway through East Gippsland. The scenic drive takes you through beautiful coastal towns, making it an enjoyable road trip to your luxury holiday rental.",
  },
  {
    question: "What activities are available in Mallacoota?",
    answer:
      "Mallacoota offers fishing (beach, inlet, and offshore), kayaking, bushwalking, wildlife spotting, beach activities, Gabo Island lighthouse tours, and bird watching. Our insider guides provide detailed information about seasonal activities and local favorites.",
  },
  {
    question: "When is the best time to visit Mallacoota?",
    answer:
      "Mallacoota is beautiful year-round! Summer (December-February) is perfect for beach activities and water sports. Autumn offers mild weather and fewer crowds. Winter is ideal for fishing and cozy coastal escapes. Spring brings wildflowers and whale watching opportunities.",
  },
  {
    question: "Do you provide local recommendations and concierge services?",
    answer:
      "Yes! We offer personal concierge services and 32 insider guides covering restaurants, activities, fishing spots, and hidden gems. As Mallacoota locals with 40+ years experience, we share authentic knowledge to make your East Gippsland holiday unforgettable.",
  },
];
