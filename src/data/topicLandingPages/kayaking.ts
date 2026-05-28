import type { TopicLandingConfig } from "./_types";

const kayaking: TopicLandingConfig = {
  canonicalPath: "/mallacoota-kayaking-holidays",
  metaTitle: "Kayaking Holidays Mallacoota | Waterfront Accommodation & Water Access",
  metaDescription:
    "Premium waterfront accommodation for kayaking holidays in Mallacoota. Direct water access, kayak storage, explore pristine East Gippsland waterways and hidden coves.",
  ogImage: "https://hammondproperties.com.au/images/mallacoota-kayaking-hero.jpg",
  breadcrumbName: "Kayaking Holidays",

  heroImage: "/images/mallacoota-kayaking-hero.jpg",
  heroBadgeIcon: "Waves",
  heroBadgeText: "Pristine Waterways Await",
  heroHeading: "Kayaking Holidays in Mallacoota",
  heroSubtitle:
    "Waterfront accommodation with direct water access and kayak storage. Explore East Gippsland's pristine inlet and discover hidden coastal coves.",
  heroPrimaryCtaText: "View Waterfront Properties",
  heroPrimaryCtaTo: "/properties?feature=waterfront",
  heroSecondaryCtaText: "Plan Kayaking Trip",
  heroSecondaryCtaTo: "/contact",

  introHeading: "Discover Mallacoota by Kayak",
  introParagraphs: [
    "Mallacoota's vast inlet system and sheltered waterways create a kayaking paradise in East Gippsland. Paddle through calm waters, explore hidden coves, encounter dolphins and seals, and discover pristine beaches accessible only by water. Whether you're a beginner seeking gentle inlet paddles or an experienced kayaker ready for coastal adventures, Mallacoota offers unforgettable paddling experiences.",
    "Our waterfront holiday rentals provide the perfect base for kayaking holidays. Many properties offer direct water access, allowing you to launch from your accommodation and begin exploring immediately. Store your kayak securely, rinse equipment with fresh water, and return to luxury comfort after each paddling adventure.",
    "Mallacoota Inlet spans over 1,000 hectares of protected waterways, featuring diverse ecosystems from mangrove forests to tidal marshes. Paddle past dramatic rock formations, spot rare seabirds, navigate peaceful channels, and experience the magic of sunrise kayaking on mirror-calm waters. The inlet's sheltered nature makes it ideal for all skill levels, while coastal options challenge experienced paddlers.",
  ],

  featuresHeading: "Perfect for Kayaking Adventures",
  features: [
    {
      icon: "Waves",
      title: "Direct Water Access",
      description:
        "Launch directly from waterfront properties. No trailers, no ramps—just step into your kayak and start exploring Mallacoota's pristine waterways.",
    },
    {
      icon: "Compass",
      title: "Kayak Storage & Facilities",
      description:
        "Secure kayak storage, equipment rinsing stations, and outdoor drying areas. Everything you need to care for your gear between adventures.",
    },
    {
      icon: "Sun",
      title: "Sheltered & Safe Waters",
      description:
        "Mallacoota Inlet's protected waters offer safe paddling for all skill levels. Perfect for beginners, families, and experienced kayakers seeking relaxation.",
    },
  ],

  propertiesHeading: "Waterfront Kayaking Properties",
  propertiesSubtitle: "Premium accommodation with water access for kayaking adventures",
  filterProperty: (p) => p.waterViews || /water|view/i.test(p.title),
  propertyBadgeIcon: "Waves",
  propertyBadgeText: "Water Access",
  emptyPropertiesFallbackText:
    "All our waterfront properties are kayak-friendly — browse the full collection below.",

  spotsHeading: "Popular Kayaking Routes",
  spotsCards: [
    {
      heading: "Inlet Exploration Routes",
      items: [
        { title: "Narrows Circuit:", text: "2-hour paddle through scenic narrows with wildlife viewing" },
        { title: "Mangrove Channels:", text: "Wind through unique mangrove ecosystems and tidal flats" },
        { title: "Top Lake Adventure:", text: "Full-day paddle to pristine upper inlet areas" },
        { title: "Sunset Paddle:", text: "Evening routes with spectacular colors over calm waters" },
      ],
    },
    {
      heading: "Coastal & Advanced Routes",
      items: [
        { title: "Betka Beach Launch:", text: "Coastal paddling with beach landings and surf play" },
        { title: "Rocky Point:", text: "Explore dramatic rock formations and sea caves" },
        { title: "Gabo Island:", text: "Advanced expedition to offshore lighthouse island" },
        { title: "Secret Coves:", text: "Hidden beaches accessible only by kayak in East Gippsland" },
      ],
    },
  ],

  faqTitle: "Kayaking Holiday FAQs",
  faqs: [
    {
      question: "Can I store my kayak at the property?",
      answer:
        "Yes! Many of our waterfront properties offer secure kayak storage areas, covered spaces, and equipment rinsing facilities. We can recommend properties with the best kayaking amenities based on your needs.",
    },
    {
      question: "Is Mallacoota Inlet suitable for beginner kayakers?",
      answer:
        "Absolutely! Mallacoota Inlet's sheltered, calm waters are perfect for beginners and families. The protected inlet offers safe paddling conditions with minimal currents, ideal for learning kayaking skills while enjoying beautiful East Gippsland scenery.",
    },
    {
      question: "Do I need to bring my own kayak?",
      answer:
        "You can bring your own kayak or rent from local operators in Mallacoota. Several rental businesses offer single and double kayaks, stand-up paddleboards, and safety equipment. Our concierge can arrange rentals and provide local contact information.",
    },
    {
      question: "What's the best time of year for kayaking in Mallacoota?",
      answer:
        "Kayaking in Mallacoota is excellent year-round. Summer offers warm weather and calm conditions. Autumn provides stunning colors and comfortable temperatures. Winter features clear days and quieter waters. Spring brings wildflowers and active wildlife. Each season offers unique paddling experiences.",
    },
    {
      question: "Can I see dolphins and seals while kayaking?",
      answer:
        "Yes! Mallacoota's waters are home to resident bottlenose dolphins, Australian fur seals, and seasonal visitors like whales. Wildlife encounters are common, especially in early morning paddles. Always maintain respectful distances and follow wildlife viewing guidelines for East Gippsland marine life.",
    },
    {
      question: "Are there guided kayak tours available?",
      answer:
        "Yes, professional kayak tour operators offer guided experiences including inlet explorations, sunrise paddles, wildlife tours, and multi-day adventures. Our concierge can recommend reputable operators and help arrange guided tours to enhance your Mallacoota kayaking holiday.",
    },
    {
      question: "Is kayaking safe for children in Mallacoota?",
      answer:
        "Yes! The inlet's calm, protected waters make it very family-friendly for kayaking with children. We recommend double kayaks for younger kids, life jackets (always required), and starting with short paddles near shore. Many families enjoy successful kayaking adventures in Mallacoota's safe waters.",
    },
    {
      question: "What should I bring for a kayaking holiday?",
      answer:
        "Essential items include sunscreen, hat, water, dry bag for belongings, change of clothes, and reef-safe sun protection. Life jackets are mandatory. Our properties provide equipment rinsing facilities. We provide a comprehensive kayaking packing list with your accommodation confirmation.",
    },
  ],

  ctaImage: "/images/mallacoota-kayaking-sunset.jpg",
  ctaHeading: "Book Your Kayaking Adventure",
  ctaDescription:
    "Waterfront luxury meets paddling paradise. Experience Mallacoota's pristine waters from premium accommodation.",
};

export default kayaking;
