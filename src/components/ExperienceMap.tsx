import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Utensils, Waves, Compass, Trees, Users } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { calculateDistance } from '@/lib/calculateDistance';

// Fix Leaflet default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Create custom marker icons for each category
const createCustomIcon = (color: string, featured = false) => {
  const size = featured ? 30 : 25;
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [size, size * 1.6],
    iconAnchor: [size / 2, size * 1.6],
    popupAnchor: [1, -size * 1.2],
    shadowSize: [size * 1.6, size * 1.6]
  });
};

const categoryIcons = {
  dining: (featured = false) => createCustomIcon('red', featured),
  beach: (featured = false) => createCustomIcon('blue', featured),
  adventure: (featured = false) => createCustomIcon('green', featured),
  nature: (featured = false) => createCustomIcon('violet', featured),
  family: (featured = false) => createCustomIcon('orange', featured),
  default: (featured = false) => createCustomIcon('grey', featured),
};

interface Experience {
  id: number | string;
  name: string;
  category?: string;
  type?: string;
  coordinates?: { lat: number; lng: number };
  lat?: number;
  lng?: number;
  description: string;
  extendedDescription?: string;
  distanceFromProperty?: string;
  featured?: boolean;
  blogLink?: string;
  openingHours?: string;
  contact?: string;
  website?: string;
  note?: string;
  link?: string;
}

interface ExperienceMapProps {
  propertyCoordinates?: {
    lat: number;
    lng: number;
  };
  propertyName?: string;
}

const ExperienceMap: React.FC<ExperienceMapProps> = ({
  propertyCoordinates,
  propertyName = "Your Property"
}) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const experiences: Experience[] = [
    // DINING LOCATIONS
    {
      id: 1,
      name: "Origami Coffee",
      category: "dining",
      coordinates: { lat: -37.556263, lng: 149.756987 },
      description: "Award-winning coffee meets Japanese precision",
      extendedDescription: "This lakeside gem combines Melbourne coffee culture with Japanese minimalism. Try their signature pour-over and matcha lattes.",
      distanceFromProperty: "800m from Allan Drive properties",
      featured: true,
      blogLink: "/discover-mallacoota/origami-coffee-the-local-institution",
      openingHours: "7am-3pm daily"
    },
    {
      id: 2,
      name: "Scallywags Mallacoota",
      category: "dining",
      coordinates: { lat: -37.556441, lng: 149.757333 },
      description: "Fresh local seafood, craft cocktails, and waterfront views",
      extendedDescription: "Stepping into Scallywags is like boarding a well-appointed sailing vessel. Weathered timber beams and brass fittings create an elegant nautical atmosphere.",
      distanceFromProperty: "800m from Allan Drive properties",
      featured: true,
      blogLink: "/discover-mallacoota/complete-restaurant-guide",
      openingHours: "Thu-Sun 12pm-10pm (7 days peak season)"
    },
    {
      id: 3,
      name: "Lucy's Noodle House",
      category: "dining",
      coordinates: { lat: -37.557903, lng: 149.757856 },
      description: "Local go-to for comforting Chinese dishes",
      extendedDescription: "Right on Maurice Avenue, Lucy's serves handmade noodles, steaming dumplings, and BBQ pork buns that sell out fast.",
      distanceFromProperty: "800m from Allan Drive properties",
      featured: true,
      blogLink: "/discover-mallacoota/complete-restaurant-guide",
      openingHours: "Tue-Sun 9:30am-3pm, 5:30pm-8pm"
    },
    {
      id: 4,
      name: "Mallacoota Hotel",
      category: "dining",
      coordinates: { lat: -37.557734, lng: 149.757351 },
      description: "Classic pub feed with cold beer and beer garden",
      extendedDescription: "A local staple with decent schnitzels, steaks, and rotating specials that often feature fresh seafood.",
      distanceFromProperty: "1km from Allan Drive properties",
      featured: false,
      openingHours: "7 Days - Midday to Late"
    },
    {
      id: 5,
      name: "Mallacoota Golf Club & Bistro",
      category: "dining",
      coordinates: { lat: -37.572311, lng: 149.756682 },
      description: "Hidden gem with the best sunset views in town",
      distanceFromProperty: "3km from Allan Drive properties",
      featured: false,
      openingHours: "Thu-Sun 5pm-8pm"
    },
    {
      id: 6,
      name: "Mallacoota Bakery",
      category: "dining",
      coordinates: { lat: -37.555663, lng: 149.757201 },
      description: "Iconic bakery fueling surfers and holidaymakers alike",
      distanceFromProperty: "900m from Allan Drive properties",
      featured: false,
      openingHours: "7 Days - 7am-1pm"
    },

    // BEACH LOCATIONS
    {
      id: 7,
      name: "Betka Beach",
      category: "beach",
      coordinates: { lat: -37.585766, lng: 149.738400 },
      description: "Perfect waves for surfing, sheltered areas for families",
      distanceFromProperty: "2.5km drive from Allan Drive",
      featured: true,
      blogLink: "/discover-mallacoota/secret-beaches-coastal-walks"
    },
    {
      id: 8,
      name: "Quarry Beach",
      category: "beach",
      coordinates: { lat: -37.600677, lng: 149.727781 },
      description: "Perfect beach for your furry friend and kids",
      featured: true,
      blogLink: "/discover-mallacoota/secret-beaches-coastal-walks"
    },
    {
      id: 9,
      name: "Secret Beach",
      category: "beach",
      coordinates: { lat: -37.608520, lng: 149.721125 },
      description: "You'll likely have it all to yourself",
      distanceFromProperty: "3.5km drive from Allan Drive",
      featured: true,
      blogLink: "/discover-mallacoota/secret-beaches-coastal-walks"
    },
    {
      id: 10,
      name: "Tip Beach",
      category: "beach",
      coordinates: { lat: -37.575282, lng: 149.755909 },
      description: "Southern beach accessible via Nelson Drive",
      extendedDescription: "A small carpark and well-defined path lead to the sand dune and shoreline past the Golf Club.",
      distanceFromProperty: "2.5km drive from Allan Drive",
      featured: false
    },

    // ADVENTURE ACTIVITIES
    {
      id: 11,
      name: "Gabo Island Tours",
      category: "adventure",
      coordinates: { lat: -37.554442, lng: 149.757181 },
      description: "Historic lighthouse tours with whale watching opportunities",
      distanceFromProperty: "Departs from Main Wharf, 1km from properties",
      featured: true,
      blogLink: "/discover-mallacoota/gabo-island",
      contact: "0438 580 708",
      website: "http://www.mallacootacruises.com",
      note: "Book 48hrs in advance"
    },
    {
      id: 12,
      name: "Bucklands Jetty Boat Hire",
      category: "adventure",
      coordinates: { lat: -37.530624, lng: 149.741270 },
      description: "Hire small craft for a few hours or the whole day",
      featured: false,
      blogLink: "/discover-mallacoota/boating-charter-adventures",
      contact: "0428 580 660",
      note: "Book 48hrs in advance"
    },
    {
      id: 13,
      name: "Mallacoota Fishing Charters",
      category: "adventure",
      coordinates: { lat: -37.571589, lng: 149.764399 },
      description: "Professional fishing charters for all experience levels",
      extendedDescription: "Local guides know the waters inside out and will help you hook snapper, gummies, flathead and more.",
      distanceFromProperty: "Departs from Bastion Point boat ramp",
      featured: true,
      blogLink: "/discover-mallacoota/fishing-charters",
      contact: "0455 190 000",
      website: "https://www.mallacootafishingcharters.au",
      note: "Book 48hrs in advance"
    },

    // NATURE LOCATIONS
    {
      id: 14,
      name: "Genoa Falls",
      category: "nature",
      coordinates: { lat: -37.480085, lng: 149.555061 },
      description: "Scenic waterfalls with basalt shelf formations",
      extendedDescription: "A good rest stop with walking track to multiple small waterfalls. Bring fly repellent in summer.",
      distanceFromProperty: "28km from Mallacoota",
      featured: false
    },
    {
      id: 15,
      name: "Croajingolong National Park",
      category: "nature",
      coordinates: { lat: -37.4833, lng: 149.7500 },
      description: "World Heritage wilderness with coastal walks",
      extendedDescription: "Explore diverse nature from Mount Everard to Wingan Rapids, Lake Elusive, and Heathland Walks.",
      blogLink: "/discover-mallacoota/croajingolong-national-park",
      distanceFromProperty: "Multiple entry points, closest 10km",
      featured: false
    },
    {
      id: 16,
      name: "Genoa Peak",
      category: "nature",
      coordinates: { lat: -37.527095, lng: 149.626310 },
      description: "Scenic walk to panoramic peak views",
      distanceFromProperty: "35km drive from Mallacoota",
      featured: false
    },

    // FAMILY ACTIVITIES
    {
      id: 17,
      name: "Mallacoota Skate Park",
      category: "family",
      coordinates: { lat: -37.559638, lng: 149.757804 },
      description: "Modern concrete skatepark suited for all ages",
      featured: false
    },
    {
      id: 18,
      name: "Mini Golf",
      category: "family",
      coordinates: { lat: -37.556804, lng: 149.756334 },
      description: "18 hole Mini Golf course to challenge the whole family",
      featured: false
    },
    {
      id: 19,
      name: "Mallacoota Lions Club Playground",
      category: "family",
      coordinates: { lat: -37.559114, lng: 149.758024 },
      description: "Playground suitable for all ages",
      featured: false
    }
  ];

  const filteredExperiences = activeCategory === 'all'
    ? experiences
    : experiences.filter(exp => exp.category === activeCategory);

  const categories = [
    { key: 'all', label: 'All Locations', icon: null },
    { key: 'dining', label: 'Dining', icon: Utensils },
    { key: 'beach', label: 'Beaches', icon: Waves },
    { key: 'adventure', label: 'Adventure', icon: Compass },
    { key: 'nature', label: 'Nature', icon: Trees },
    { key: 'family', label: 'Family', icon: Users },
  ];

  return (
    <div className="w-full">
      {/* Category Filter Buttons */}
      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.key}
              variant={activeCategory === category.key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.key)}
              className={`transition-all duration-200 ${
                activeCategory === category.key
                  ? "bg-primary text-white"
                  : "hover:bg-primary/10"
              }`}
            >
              {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
              {category.label}
            </Button>
          );
        })}
      </div>

      <MapContainer
      center={propertyCoordinates ? [propertyCoordinates.lat, propertyCoordinates.lng] : [-37.5607, 149.7593]}
      zoom={12}
      scrollWheelZoom={false}
      className="w-full h-[400px] md:h-[600px] rounded-xl shadow-lg"
      style={{ minHeight: '400px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Property Marker (if coordinates provided) */}
      {propertyCoordinates && (
        <Marker
          position={[propertyCoordinates.lat, propertyCoordinates.lng]}
          icon={new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            iconSize: [35, 56],
            iconAnchor: [17.5, 56],
            popupAnchor: [1, -42],
            shadowSize: [56, 56]
          })}
        >
          <Popup>
            <div className="p-3 min-w-[180px]">
              <h3 className="font-serif font-bold text-lg text-primary leading-tight">
                🏠 {propertyName}
              </h3>
              <p className="text-sm text-gray-700 mt-2">
                Your holiday rental accommodation
              </p>
            </div>
          </Popup>
        </Marker>
      )}

      {filteredExperiences.map((experience) => {
        const lat = experience.coordinates?.lat || experience.lat;
        const lng = experience.coordinates?.lng || experience.lng;

        if (!lat || !lng) return null;

        const categoryKey = experience.category as keyof typeof categoryIcons;
        const icon = categoryIcons[categoryKey] || categoryIcons.default;

        // Calculate distance if property coordinates are provided
        const distanceInfo = propertyCoordinates
          ? calculateDistance(propertyCoordinates.lat, propertyCoordinates.lng, lat, lng)
          : null;

        return (
          <Marker
            key={experience.id}
            position={[lat, lng]}
            icon={icon(experience.featured)}
          >
            <Popup>
              <div className="p-3 min-w-[220px] max-w-[300px]">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-serif font-bold text-xl text-primary leading-tight flex-1">
                    {experience.name}
                  </h3>
                  {experience.featured && (
                    <span className="ml-2 px-2 py-1 bg-accent-red text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-accent-red font-medium mb-3 capitalize">
                  {experience.category || experience.type}
                </p>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  {experience.description}
                </p>

                {/* Distance from property (calculated or fallback) */}
                {(distanceInfo || experience.distanceFromProperty) && (
                  <p className="text-xs text-muted-foreground mb-2">
                    📍 {distanceInfo
                      ? `${distanceInfo.display}${distanceInfo.walkTime ? ` (${distanceInfo.walkTime})` : distanceInfo.driveTime ? ` (${distanceInfo.driveTime})` : ''} from ${propertyName}`
                      : experience.distanceFromProperty
                    }
                  </p>
                )}

                {experience.openingHours && (
                  <p className="text-xs text-muted-foreground mb-2">
                    🕒 {experience.openingHours}
                  </p>
                )}
                {experience.contact && (
                  <p className="text-xs text-muted-foreground mb-2">
                    📞 {experience.contact}
                  </p>
                )}
                {experience.note && (
                  <p className="text-xs text-orange-600 mb-2">
                    ⚠️ {experience.note}
                  </p>
                )}
                {(experience.blogLink || experience.link || experience.website) && (
                  <div className="flex gap-2 flex-wrap">
                    {experience.blogLink && (
                      <Link
                        to={experience.blogLink}
                        className="inline-flex items-center text-xs font-medium text-primary hover:text-accent-red transition-colors duration-200"
                      >
                        Learn More →
                      </Link>
                    )}
                    {experience.link && !experience.blogLink && (
                      <Link
                        to={experience.link}
                        className="inline-flex items-center text-xs font-medium text-primary hover:text-accent-red transition-colors duration-200"
                      >
                        Learn More →
                      </Link>
                    )}
                    {experience.website && (
                      <a
                        href={experience.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        Website ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
    </div>
  );
};

export default ExperienceMap;