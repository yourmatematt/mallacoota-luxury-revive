import type { TopicLandingConfig } from "./_types";

const family: TopicLandingConfig = {
  canonicalPath: "/mallacoota-family-holidays",
  metaTitle: "Family Holidays Mallacoota | Kid-Friendly Accommodation & Activities",
  metaDescription:
    "Family-friendly holiday rentals in Mallacoota with safe beaches, playgrounds, wildlife, and activities. Perfect coastal family vacations in East Gippsland.",
  ogImage: "https://hammondproperties.com.au/images/mallacoota-family-hero.jpg",
  breadcrumbName: "Family Holidays",

  heroImage: "/images/mallacoota-family-hero.jpg",
  heroBadgeIcon: "Heart",
  heroBadgeText: "Perfect Family Destination",
  heroHeading: "Family Holidays in Mallacoota",
  heroSubtitle:
    "Kid-friendly accommodation with safe beaches, calm inlet waters, and endless activities. Create unforgettable family memories on the East Gippsland coast.",
  heroPrimaryCtaText: "View Family Properties",
  heroPrimaryCtaTo: "/properties",
  heroSecondaryCtaText: "Plan Family Holiday",
  heroSecondaryCtaTo: "/contact",

  introHeading: "The Perfect Coastal Family Getaway",
  introParagraphs: [
    "Mallacoota is a family paradise where children can safely explore, play, and discover the wonders of nature. The calm, protected waters of the inlet provide the perfect environment for swimming, paddling, and water play, while pristine beaches offer endless opportunities for sandcastle building, rock pooling, and coastal adventures. This peaceful East Gippsland town delivers everything families need for a memorable seaside holiday.",
    "Our family-friendly holiday rentals feature spacious layouts, fully equipped kitchens, outdoor entertainment areas, and comfortable living spaces designed for families. Many properties offer fenced yards for younger children, games rooms for rainy days, and proximity to playgrounds, beaches, and family attractions. Parents can relax knowing children can play safely while enjoying the natural beauty of coastal Victoria.",
    "From feeding friendly kangaroos to spotting dolphins in the inlet, collecting shells on uncrowded beaches to exploring rock pools teeming with marine life, Mallacoota creates magical childhood memories. The town's welcoming community, safe environment, and abundance of kid-friendly activities make it the ideal destination for multi-generational holidays, school holiday adventures, and quality family time away from everyday routines.",
  ],

  featuresHeading: "Why Families Love Mallacoota",
  features: [
    {
      icon: "Users",
      title: "Safe Beaches & Calm Waters",
      description:
        "Protected inlet beaches with gentle waves perfect for young swimmers. Lifeguard-patrolled beaches during summer and shallow areas ideal for paddling and play.",
    },
    {
      icon: "Heart",
      title: "Wildlife & Nature Discovery",
      description:
        "Kangaroos, friendly parrots, dolphins, seals, and diverse birdlife. Children love feeding wildlife, exploring rock pools, and discovering coastal ecosystems.",
    },
    {
      icon: "TreePine",
      title: "Playgrounds & Activities",
      description:
        "Multiple playgrounds, walking trails, kayaking for families, mini golf, and nature-based activities. Endless entertainment for all ages year-round.",
    },
  ],

  propertiesHeading: "Family-Friendly Properties",
  propertiesSubtitle: "Spacious accommodation perfect for family holidays in Mallacoota",
  filterProperty: (p) => p.bedrooms >= 3 || p.guests >= 6,
  propertyBadgeIcon: "Users",
  propertyBadgeText: "Family-Friendly",
  emptyPropertiesFallbackText:
    "We have larger family rentals available — view all properties below.",

  spotsHeading: "Family Activities & Attractions",
  spotsCards: [
    {
      icon: "MapPin",
      heading: "Beach & Water Activities",
      items: [
        { title: "Bastion Point:", text: "Safe swimming beach with calm waters and playground" },
        { title: "Inlet Beaches:", text: "Shallow, protected areas perfect for young children" },
        { title: "Kayaking & Paddling:", text: "Family kayak tours and calm inlet exploration" },
        { title: "Rock Pooling:", text: "Discover marine life in tidal pools at low tide" },
        { title: "Sandcastle Building:", text: "Pristine beaches with perfect building sand" },
      ],
    },
    {
      icon: "Star",
      heading: "Nature & Adventure",
      items: [
        { title: "Wildlife Spotting:", text: "Kangaroos, dolphins, seals, and native birds" },
        { title: "Walking Trails:", text: "Easy family-friendly bushwalks and coastal paths" },
        { title: "Playgrounds:", text: "Multiple modern playgrounds throughout town" },
        { title: "Bike Riding:", text: "Safe cycling paths and quiet streets for families" },
        { title: "Fishing for Kids:", text: "Learn to fish in safe inlet waters with easy access" },
      ],
    },
  ],

  faqTitle: "Family Holiday FAQs",
  faqs: [
    {
      question: "Is Mallacoota safe for young children?",
      answer:
        "Yes! Mallacoota is exceptionally safe for families with young children. The inlet's calm, protected waters provide gentle swimming conditions, beaches are uncrowded, and the community is welcoming. Many inlet beaches have shallow areas perfect for toddlers, and Bastion Point Beach is patrolled during summer holidays.",
    },
    {
      question: "What are the best beaches for families with kids?",
      answer:
        "Bastion Point is ideal with its calm waters, playground, and facilities. Inlet beaches like Secret Beach offer shallow, protected swimming perfect for young children. Betka Beach provides gentle surf and rock pools for exploring. All beaches are easily accessible and family-friendly throughout East Gippsland.",
    },
    {
      question: "Are there playgrounds and activities for children?",
      answer:
        "Yes! Mallacoota features several excellent playgrounds including the waterfront playground near Bastion Point. Activities include mini golf, kayaking, wildlife spotting, nature walks, beach play, and seasonal events. The Mallacoota Inlet Discovery Centre offers educational programs for children during school holidays.",
    },
    {
      question: "Can we see wildlife with children in Mallacoota?",
      answer:
        "Absolutely! Children love encountering Mallacoota's abundant wildlife. Kangaroos graze near accommodation, friendly rainbow lorikeets visit for feeding, dolphins are frequently spotted in the inlet, and seals often appear near beaches. Rock pools reveal starfish, crabs, and small fish. Wildlife encounters create magical family memories.",
    },
    {
      question: "Do your properties have family-friendly amenities?",
      answer:
        "Yes! Our family properties feature fully equipped kitchens, multiple bathrooms, spacious living areas, outdoor spaces, and entertainment options. Many include games, books, and toys. Some properties offer fenced yards, highchairs, and portacots. We can recommend properties matching your family's specific needs and ages.",
    },
    {
      question: "What should we bring for a family holiday in Mallacoota?",
      answer:
        "Pack beach essentials including sunscreen, hats, swimmers, and sand toys. Bring bikes if possible for exploring quiet streets. Our properties provide cooking facilities, so you can self-cater. Don't forget cameras for wildlife photos! We provide a comprehensive family packing list with your booking confirmation for East Gippsland holidays.",
    },
  ],

  ctaImage: "/images/mallacoota-inlet-sunset.jpg",
  ctaHeading: "Create Family Memories in Mallacoota",
  ctaDescription:
    "Book your family-friendly accommodation today. Safe beaches, endless activities, unforgettable coastal experiences.",
};

export default family;
