import {
  Coffee, Fish, Waves, Trees, Binoculars, Anchor, Sailboat,
  Calendar, Scale, Camera, Star, Users, Heart, Sunrise,
  Clock, MapPin, Car, DollarSign, Phone, Info, AlertTriangle,
  Telescope, Compass, Award, Shield, Umbrella, TrendingUp,
  Mountain, Footprints, Snowflake, Sun, TreePine
} from "lucide-react";
import { LucideIcon } from "lucide-react";

// Blog content mapping interfaces
export interface BlogHighlight {
  icon: LucideIcon;
  iconClass: string;
  title: string;
  description: string;
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPracticalInfo {
  icon: LucideIcon;
  iconClass: string;
  title: string;
  items: string[];
}

export interface BlogSidebarSection {
  icon: LucideIcon;
  iconClass: string;
  title: string;
  items: string[];
}

export interface BlogSidebarCTA {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface BlogCustomLayout {
  type: 'standard' | 'gabo-island' | 'cultural-historical';
  sidebarSections?: BlogSidebarSection[];
  sidebarCTA?: BlogSidebarCTA;
  customHighlights?: BlogHighlight[];
  layoutConfig?: {
    showHighlightsGrid?: boolean;
    showPracticalInfo?: boolean;
    customContentLayout?: boolean;
  };
}

export interface BlogMapping {
  highlights: BlogHighlight[];
  faqs: BlogFAQ[];
  practicalInfo: BlogPracticalInfo[];
  heroTitle: string;
  heroSubtitle: string;
  cta: {
    primary: string;
    secondary: string;
  };
  bottomCTA: {
    title: string;
    description: string;
    buttons: {
      primary: string;
      secondary: string;
    };
  };
  customLayout?: BlogCustomLayout;
  relatedReading?: string[]; // Array of blog post slugs
}

// Blog slug to content mapping
export const blogContentMappings: Record<string, BlogMapping> = {
  "origami-coffee-the-local-institution": {
    highlights: [
      {
        icon: Star,
        iconClass: "w-8 h-8 text-amber-500",
        title: "Award-Winning Coffee",
        description: "Locally roasted beans and expertly crafted beverages that have made Origami Coffee a destination for coffee enthusiasts."
      },
      {
        icon: Sunrise,
        iconClass: "w-8 h-8 text-orange-500",
        title: "Morning Ritual",
        description: "Start your day the Mallacoota way with our signature breakfast menu and perfectly brewed coffee in a welcoming atmosphere."
      },
      {
        icon: Users,
        iconClass: "w-8 h-8 text-blue-500",
        title: "Local Institution",
        description: "More than just a cafe - Origami Coffee is where locals gather, visitors feel at home, and the community comes together."
      },
      {
        icon: Waves,
        iconClass: "w-8 h-8 text-teal-500",
        title: "Waterfront Views",
        description: "Enjoy your coffee with stunning views of Mallacoota's pristine waters and natural beauty from our prime location."
      }
    ],
    faqs: [
      {
        question: "What are Origami Coffee's opening hours?",
        answer: "Monday-Friday: 7:00 AM - 3:00 PM, Saturday-Sunday: 7:30 AM - 3:30 PM. Hours may vary during peak season."
      },
      {
        question: "Do they serve food as well as coffee?",
        answer: "Yes! Full breakfast and lunch menu with locally-sourced ingredients, fresh pastries, and seasonal specialties."
      },
      {
        question: "Is Origami Coffee dog-friendly?",
        answer: "Yes, well-behaved dogs are welcome, especially in outdoor seating areas. Popular with dog walkers and families."
      },
      {
        question: "What makes Origami Coffee special?",
        answer: "Beyond excellent coffee, it's the genuine local atmosphere where locals gather and visitors become part of the Mallacoota family."
      }
    ],
    practicalInfo: [
      {
        icon: Clock,
        iconClass: "w-6 h-6 text-primary",
        title: "Opening Hours",
        items: [
          "Monday - Friday: 7:00 AM - 3:00 PM",
          "Saturday - Sunday: 7:30 AM - 3:30 PM",
          "Hours may vary during peak season"
        ]
      },
      {
        icon: MapPin,
        iconClass: "w-6 h-6 text-primary",
        title: "Location",
        items: [
          "Mallacoota Wharf Road",
          "Mallacoota VIC 3892",
          "Waterfront location with parking available"
        ]
      },
      {
        icon: Coffee,
        iconClass: "w-6 h-6 text-primary",
        title: "Specialties",
        items: [
          "Locally roasted coffee beans",
          "Fresh breakfast & lunch menu",
          "Specialty brewing methods",
          "Takeaway & dine-in options"
        ]
      }
    ],
    heroTitle: "Origami Coffee",
    heroSubtitle: "Where exceptional coffee meets community spirit in the heart of Mallacoota. Start your day with award-winning brews and waterfront views.",
    cta: {
      primary: "Visit Us Today",
      secondary: "View Menu"
    },
    bottomCTA: {
      title: "Experience Local Coffee Culture",
      description: "Make Origami Coffee part of your Mallacoota story. Perfect mornings start here, and memories are made over exceptional coffee and genuine hospitality.",
      buttons: {
        primary: "View Town Properties",
        secondary: "Plan Your Coffee Tour"
      }
    },
    relatedReading: [
      "complete-coffee-scene",
      "seasonal-seafood-sustainability"
    ]
  },

  "seasonal-seafood-sustainability": {
    highlights: [
      {
        icon: Fish,
        iconClass: "w-8 h-8 text-blue-500",
        title: "Fresh Local Catch",
        description: "Daily catches from Mallacoota's pristine waters featuring flathead, whiting, salmon trout, and seasonal specialties."
      },
      {
        icon: Calendar,
        iconClass: "w-8 h-8 text-green-500",
        title: "Seasonal Availability",
        description: "Experience different flavors throughout the year as local species come into season and fishing conditions change."
      },
      {
        icon: Anchor,
        iconClass: "w-8 h-8 text-teal-500",
        title: "Sustainable Practices",
        description: "Supporting local fishermen who practice responsible fishing methods that protect Mallacoota's marine ecosystem."
      },
      {
        icon: Award,
        iconClass: "w-8 h-8 text-amber-500",
        title: "Premium Quality",
        description: "From boat to plate in hours, ensuring the freshest possible seafood experience with unmatched flavor and quality."
      }
    ],
    faqs: [
      {
        question: "What seafood is in season in Mallacoota right now?",
        answer: "It depends on the time of year — flathead in autumn, whiting in spring, and salmon during winter are typical. Ask at local eateries or fishing stores."
      },
      {
        question: "Can I catch and cook my own seafood in Mallacoota?",
        answer: "Yes — just follow local fishing rules. You'll find flathead, bream, and more if you know where (and when!) to go."
      },
      {
        question: "Where can I try local seafood in Mallacoota?",
        answer: "Scallywags, Lee's Takeway, and the Golf Club Bistro regularly feature local catch on their menus."
      },
      {
        question: "Is Mallacoota seafood sustainable?",
        answer: "Much of it is — especially if it's caught locally and in season. Avoid imported or frozen options where possible."
      }
    ],
    practicalInfo: [
      {
        icon: MapPin,
        iconClass: "w-6 h-6 text-primary",
        title: "Local Suppliers",
        items: [
          "Mallacoota Wharf - Direct from boats",
          "Local restaurants & cafes",
          "Seasonal pop-up seafood vendors"
        ]
      },
      {
        icon: Clock,
        iconClass: "w-6 h-6 text-primary",
        title: "Best Times",
        items: [
          "Early morning: Fresh catches arrive",
          "Late afternoon: Second daily catch",
          "Weekends: Expanded local offerings"
        ]
      },
      {
        icon: DollarSign,
        iconClass: "w-6 h-6 text-primary",
        title: "Pricing",
        items: [
          "Market prices vary by season",
          "Premium quality, fair prices",
          "Direct-from-boat best value"
        ]
      }
    ],
    heroTitle: "Seasonal Seafood & Sustainability",
    heroSubtitle: "Discover Mallacoota's commitment to fresh, sustainable seafood where local fishermen bring the day's catch straight from pristine waters to your plate.",
    cta: {
      primary: "Find Fresh Seafood",
      secondary: "Seasonal Guide"
    },
    bottomCTA: {
      title: "Taste the Ocean's Bounty",
      description: "Stay in one of our waterfront properties and experience the freshest seafood Mallacoota has to offer, straight from local waters to your holiday table.",
      buttons: {
        primary: "View Waterfront Properties",
        secondary: "Plan Your Culinary Stay"
      }
    },
    relatedReading: [
      "complete-restaurant-guide",
      "peak-fishing-season-guide",
      "inlet-fishing-excellence",
      "cozy-winter-experiences"
    ]
  },

  "complete-coffee-scene": {
    highlights: [
      {
        icon: Coffee,
        iconClass: "w-8 h-8 text-amber-600",
        title: "Artisan Roasters",
        description: "Local coffee roasters creating unique blends and single-origin experiences that capture Mallacoota's coastal character."
      },
      {
        icon: Heart,
        iconClass: "w-8 h-8 text-red-500",
        title: "Community Hubs",
        description: "Coffee shops that serve as gathering places where locals and visitors connect over exceptional brews and shared stories."
      },
      {
        icon: Users,
        iconClass: "w-8 h-8 text-blue-500",
        title: "Local Culture",
        description: "Each cafe reflects Mallacoota's unique personality, from surfer-friendly spots to sophisticated waterfront establishments."
      },
      {
        icon: Sunrise,
        iconClass: "w-8 h-8 text-orange-500",
        title: "Morning Rituals",
        description: "Start your day like a local with the perfect coffee ritual, whether it's beachside takeaway or leisurely cafe dining."
      }
    ],
    faqs: [
      {
        question: "What are the best coffee shops in Mallacoota?",
        answer: "Origami Coffee is the local institution and must-visit spot. Several waterfront cafes also offer excellent coffee with views."
      },
      {
        question: "What time do coffee shops open in Mallacoota?",
        answer: "Most cafes open around 7:00-7:30 AM during peak season, with early opening to serve fishing and walking crowds."
      },
      {
        question: "Do Mallacoota cafes serve food as well as coffee?",
        answer: "Yes! Most cafes offer breakfast and lunch menus featuring local ingredients, fresh pastries, and seasonal specials."
      },
      {
        question: "Are there dog-friendly coffee shops in Mallacoota?",
        answer: "Many cafes welcome well-behaved dogs, especially those with outdoor seating areas."
      }
    ],
    practicalInfo: [
      {
        icon: Star,
        iconClass: "w-6 h-6 text-primary",
        title: "Must-Try Spots",
        items: [
          "Origami Coffee - The local institution",
          "Waterfront cafes - Views with your brew",
          "Hidden gems - Ask locals for recommendations"
        ]
      },
      {
        icon: Clock,
        iconClass: "w-6 h-6 text-primary",
        title: "Peak Times",
        items: [
          "Early morning: 7-9am (locals rush)",
          "Mid-morning: 9-11am (relaxed pace)",
          "Afternoon: 2-4pm (social hours)"
        ]
      },
      {
        icon: DollarSign,
        iconClass: "w-6 h-6 text-primary",
        title: "Coffee Prices",
        items: [
          "Standard coffee: $4-6",
          "Specialty drinks: $5-8",
          "Food + coffee: $12-20"
        ]
      }
    ],
    heroTitle: "Mallacoota's Complete Coffee Scene",
    heroSubtitle: "Discover a thriving coffee culture where artisan roasters, community cafes, and waterfront spots create the perfect backdrop for every coffee moment.",
    cta: {
      primary: "Find Coffee Spots",
      secondary: "Coffee Guide"
    },
    bottomCTA: {
      title: "Perfect Your Coffee Routine",
      description: "Stay close to Mallacoota's best coffee spots and make exceptional brews part of your daily holiday ritual with our centrally located properties.",
      buttons: {
        primary: "View Town Properties",
        secondary: "Plan Your Coffee Tour"
      }
    },
    relatedReading: [
      "origami-coffee-the-local-institution",
      "seasonal-seafood-sustainability",
      "secret-beaches-coastal-walks"
    ]
  },

  "secret-beaches-coastal-walks": {
    highlights: [
      {
        icon: Waves,
        iconClass: "w-8 h-8 text-blue-500",
        title: "Hidden Beaches",
        description: "Discover secluded stretches of pristine sand and crystal-clear waters away from the crowds, perfect for peaceful contemplation."
      },
      {
        icon: Footprints,
        iconClass: "w-8 h-8 text-green-500",
        title: "Coastal Walks",
        description: "Well-maintained trails offering spectacular ocean views, native wildlife encounters, and varying difficulty levels for all abilities."
      },
      {
        icon: Camera,
        iconClass: "w-8 h-8 text-purple-500",
        title: "Photography Spots",
        description: "Breathtaking vantage points and natural formations that create perfect backdrops for capturing Mallacoota's untouched beauty."
      },
      {
        icon: Shield,
        iconClass: "w-8 h-8 text-amber-500",
        title: "Safe Exploration",
        description: "Well-marked trails and accessible beaches with clear safety information, making adventure enjoyable for the whole family."
      }
    ],
    faqs: [
      {
        question: "Are the secret beaches accessible by car?",
        answer: "Most hidden beaches require a short walk from parking areas. Some may require 4WD access."
      },
      {
        question: "How difficult are the coastal walks?",
        answer: "Coastal walks range from easy flat paths suitable for families to more challenging terrain. Most are well-marked."
      },
      {
        question: "Is it safe to swim at the secret beaches?",
        answer: "Always check conditions and swim between flags where lifeguards are present. Many secluded beaches don't have lifeguard services."
      },
      {
        question: "What's the best time to explore hidden beaches?",
        answer: "Early morning and late afternoon offer the best light and quieter conditions. Check tide times for rock pool exploration."
      }
    ],
    practicalInfo: [
      {
        icon: Car,
        iconClass: "w-6 h-6 text-primary",
        title: "Access & Parking",
        items: [
          "Most trails: Roadside parking available",
          "Some beaches: 4WD access recommended",
          "Popular spots: Arrive early for parking"
        ]
      },
      {
        icon: Clock,
        iconClass: "w-6 h-6 text-primary",
        title: "Best Times",
        items: [
          "Early morning: Quiet, good light",
          "Late afternoon: Golden hour photography",
          "Low tide: Rock pool exploration"
        ]
      },
      {
        icon: AlertTriangle,
        iconClass: "w-6 h-6 text-primary",
        title: "Safety Tips",
        items: [
          "Check weather conditions before heading out",
          "Inform someone of your planned route",
          "Carry water and sun protection",
          "Be mindful of tide times"
        ]
      }
    ],
    heroTitle: "Secret Beaches & Coastal Walks",
    heroSubtitle: "Escape to hidden coastal gems where pristine beaches meet scenic walking trails, offering peaceful solitude and breathtaking natural beauty.",
    cta: {
      primary: "Find Hidden Spots",
      secondary: "Trail Guide"
    },
    bottomCTA: {
      title: "Your Coastal Adventure Awaits",
      description: "Stay in properties close to hidden trails and secret beaches, making every day an opportunity to discover something new along Mallacoota's pristine coastline.",
      buttons: {
        primary: "View Coastal Properties",
        secondary: "Plan Your Exploration"
      }
    },
    relatedReading: [
      "cultural-historical-secrets",
      "complete-coffee-scene",
      "origami-coffee-the-local-institution"
    ]
  },

  "cultural-historical-secrets": {
    highlights: [
      {
        icon: Telescope,
        iconClass: "w-8 h-8 text-purple-600",
        title: "Ancient Stories",
        description: "Discover indigenous heritage sites and learn about thousands of years of Aboriginal connection to this sacred coastal landscape."
      },
      {
        icon: Compass,
        iconClass: "w-8 h-8 text-amber-600",
        title: "Maritime History",
        description: "Explore shipwrecks, lighthouse stories, and the dramatic maritime history that shaped Mallacoota's coastal character."
      },
      {
        icon: Mountain,
        iconClass: "w-8 h-8 text-green-600",
        title: "Geological Wonders",
        description: "Walk through ancient rock formations and discover how geological forces created Mallacoota's unique coastal landscape."
      },
      {
        icon: Award,
        iconClass: "w-8 h-8 text-blue-600",
        title: "Hidden Heritage",
        description: "Uncover lesser-known historical sites and cultural landmarks that reveal Mallacoota's rich and diverse past."
      }
    ],
    faqs: [
      {
        question: "What indigenous cultural sites can be visited in Mallacoota?",
        answer: "Several significant Aboriginal sites exist around Mallacoota, including shell middens and traditional camping areas. Always respect cultural protocols and seek local guidance."
      },
      {
        question: "Are there shipwrecks near Mallacoota that can be explored?",
        answer: "Yes, several historical shipwrecks lie off the coast. Some are accessible to experienced divers, while others can be learned about through local maritime museums."
      },
      {
        question: "How old are the rock formations around Mallacoota?",
        answer: "The area features ancient granite and sandstone formations dating back hundreds of millions of years, creating the unique coastal geology visible today."
      },
      {
        question: "Are there guided cultural tours available?",
        answer: 'Check with the local visitor center for seasonal cultural tours that respectfully share indigenous and maritime history of the region.'
      },
      {
        question: "What's the best way to learn about local history?",
        answer: "Visit the Mallacoota Museum, talk with longtime locals, and explore heritage trails that showcase the area's cultural significance."
      },
      {
        question: "Can I visit historical sites independently?",
        answer: "Many sites are accessible, but we recommend guided experiences for cultural sites to ensure respectful and informed exploration."
      }
    ],
    practicalInfo: [
      {
        icon: Info,
        iconClass: "w-6 h-6 text-primary",
        title: "Cultural Protocol",
        items: [
          "Respect all cultural sites and artifacts",
          "Take only photos, leave only footprints",
          "Seek permission before visiting sensitive areas"
        ]
      },
      {
        icon: Clock,
        iconClass: "w-6 h-6 text-primary",
        title: "Best Times",
        items: [
          "Early morning: Peaceful exploration",
          "Guided tours: Check seasonal availability",
          "Low tide: Coastal archaeological sites"
        ]
      },
      {
        icon: Camera,
        iconClass: "w-6 h-6 text-primary",
        title: "Photography",
        items: [
          "Respect cultural site photography restrictions",
          "Golden hour: Best light for rock formations",
          "Document your discoveries responsibly"
        ]
      }
    ],
    heroTitle: "Cultural & Historical Secrets",
    heroSubtitle: "Journey through time to discover Mallacoota's hidden cultural treasures, from ancient indigenous stories to maritime heritage and geological wonders.",
    cta: {
      primary: "Explore Heritage",
      secondary: "Cultural Guide"
    },
    bottomCTA: {
      title: "Connect with Mallacoota's Past",
      description: "Stay in properties that put you close to cultural sites and historical landmarks, making your holiday a journey through time and heritage.",
      buttons: {
        primary: "View Heritage Properties",
        secondary: "Plan Your Cultural Journey"
      }
    },
    customLayout: {
      type: 'cultural-historical',
      sidebarSections: [
        {
          icon: Compass,
          iconClass: "w-5 h-5 text-amber-600",
          title: "Cultural Sites Tour",
          items: [
            "Duration: Half-day or full-day options",
            "Group size: Maximum 12 people",
            "Includes: Indigenous sites, maritime history",
            "Season: Year-round with weather considerations"
          ]
        },
        {
          icon: Clock,
          iconClass: "w-5 h-5 text-green-600",
          title: "Best Times to Visit",
          items: [
            "Early morning (7:00-9:00 AM)",
            "Late afternoon (4:00-6:00 PM)",
            "Avoid midday heat in summer",
            "Check tide times for coastal sites"
          ]
        },
        {
          icon: DollarSign,
          iconClass: "w-5 h-5 text-blue-600",
          title: "Tour Information",
          items: [
            "Guided tours: From $45 per adult",
            "Self-guided trails: Free access",
            "Museum entry: $8 per person",
            "Group discounts available"
          ]
        },
        {
          icon: Info,
          iconClass: "w-5 h-5 text-purple-600",
          title: "What to Bring",
          items: [
            "Comfortable walking shoes",
            "Sun protection and water",
            "Camera (where permitted)",
            "Notebook for discoveries"
          ]
        }
      ],
      sidebarCTA: {
        title: "Book Your Cultural Journey",
        description: "Experience Mallacoota's rich heritage with expert local guides who share the stories behind the sites.",
        buttonText: "Book Heritage Tour",
        buttonLink: "/contact"
      },
      layoutConfig: {
        showHighlightsGrid: true,
        showPracticalInfo: false,
        customContentLayout: true
      }
    },
    relatedReading: [
      "secret-beaches-coastal-walks",
      "seasonal-seafood-sustainability",
      "complete-coffee-scene"
    ]
  }

  // Add more blog mappings as needed
};

// Function to get category-specific icons
export const getCategoryIcon = (categorySlug: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    'dining-local-flavors': Coffee,
    'water-adventures': Waves,
    'natural-wonders': Trees,
    'adventures-activities': Anchor,
    'seasonal-planning': Calendar,
    'wildlife-nature': Binoculars
  };

  return iconMap[categorySlug] || Star;
};

// Function to detect blog type and generate content
export const generateBlogContent = (blogPost: any, category: any): BlogMapping => {
  const slug = blogPost.slug;

  // Return pre-defined mapping if exists
  if (blogContentMappings[slug]) {
    return blogContentMappings[slug];
  }

  // Generate dynamic content based on category
  return generateDynamicContent(blogPost, category);
};

// Generate dynamic content for blogs without pre-defined mappings
function generateDynamicContent(blogPost: any, category: any): BlogMapping {
  const categorySlug = category?.slug || 'default';

  // Default highlights based on category
  const defaultHighlights: BlogHighlight[] = [
    {
      icon: getCategoryIcon(categorySlug),
      iconClass: "w-8 h-8 text-primary",
      title: "Local Experience",
      description: "Discover authentic Mallacoota experiences that connect you with the local community and natural environment."
    },
    {
      icon: MapPin,
      iconClass: "w-8 h-8 text-green-500",
      title: "Prime Location",
      description: "Perfectly positioned to take advantage of Mallacoota's best offerings and natural attractions."
    },
    {
      icon: Star,
      iconClass: "w-8 h-8 text-amber-500",
      title: "Quality Experience",
      description: "Enjoy premium experiences that showcase the very best of what Mallacoota has to offer."
    },
    {
      icon: Users,
      iconClass: "w-8 h-8 text-blue-500",
      title: "For Everyone",
      description: "Suitable for families, couples, and solo travelers seeking authentic coastal experiences."
    }
  ];

  // Default FAQs for all blog posts
  const defaultFAQs: BlogFAQ[] = [
    {
      question: "What's the best time to visit Mallacoota for this experience?",
      answer: "Mallacoota is beautiful year-round, but check seasonal conditions for the best experience. Spring and autumn offer mild weather perfect for most activities."
    },
    {
      question: "How do I get to Mallacoota?",
      answer: "Mallacoota is accessible by car via the Princes Highway. The drive offers scenic coastal views and takes about 5 hours from Melbourne."
    },
    {
      question: "Are there accommodation options nearby?",
      answer: "Yes! Hammond Properties offers premium holiday rentals throughout Mallacoota, from waterfront properties to cozy town accommodations."
    },
    {
      question: "Is this experience suitable for families?",
      answer: "Most Mallacoota experiences welcome families. Check specific requirements and always supervise children near water or on walking trails."
    }
  ];

  // Default related reading - mix of our mapped content
  const defaultRelatedReading = [
    "origami-coffee-the-local-institution",
    "seasonal-seafood-sustainability",
    "secret-beaches-coastal-walks"
  ];

  return {
    highlights: defaultHighlights,
    faqs: defaultFAQs,
    practicalInfo: [
      {
        icon: Info,
        iconClass: "w-6 h-6 text-primary",
        title: "Key Information",
        items: [
          "Check local conditions before visiting",
          "Seasonal variations may apply",
          "Contact local operators for current availability"
        ]
      }
    ],
    heroTitle: blogPost.title,
    heroSubtitle: blogPost.excerpt || "Discover the authentic charm and natural beauty of Mallacoota.",
    cta: {
      primary: "Explore",
      secondary: "Learn More"
    },
    bottomCTA: {
      title: "Experience Mallacoota",
      description: "Stay in our premium properties and make this experience part of your perfect Mallacoota holiday.",
      buttons: {
        primary: "View Properties",
        secondary: "Plan Your Stay"
      }
    },
    relatedReading: defaultRelatedReading
  };
}