import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SignatureProperty = {
  slug: string;
  title: string;
  imageFolder: string;
  heroImageUrl: string;
  bedrooms: number;
  bathrooms: number;
  petFriendly: boolean;
  boatParking: boolean;
};

/**
 * Hook to fetch the three signature properties with their images
 */
export const useSignatureProperties = () => {
  return useQuery({
    queryKey: ['signature-properties'],
    queryFn: async (): Promise<SignatureProperty[]> => {
      const signaturePropertySlugs = ['7-allan-drive', 'four-on-stingray-point', 'bella-views'];

      console.log('🔍 Fetching signature properties for slugs:', signaturePropertySlugs);

      try {
        // Try the IN query first
        const { data: properties, error } = await supabase
          .from('properties')
          .select('slug, title, image_folder, bedrooms, bathrooms, pet_friendly, boat_parking')
          .in('slug', signaturePropertySlugs);

        console.log('📊 Supabase query result:', { properties, error });

        if (error) {
          console.error('❌ Error with IN query, trying individual queries:', error);

          // Fallback to individual queries
          const individualQueries = await Promise.allSettled(
            signaturePropertySlugs.map(async (slug) => {
              console.log(`🔍 Fetching individual property: ${slug}`);
              const { data, error } = await supabase
                .from('properties')
                .select('slug, title, image_folder, bedrooms, bathrooms, pet_friendly, boat_parking')
                .eq('slug', slug)
                .single();

              if (error) {
                console.error(`❌ Error fetching ${slug}:`, error);
                return null;
              }

              console.log(`✅ Successfully fetched ${slug}:`, data);
              return data;
            })
          );

          const validProperties = individualQueries
            .filter((result): result is PromiseFulfilledResult<any> =>
              result.status === 'fulfilled' && result.value !== null
            )
            .map(result => result.value);

          console.log('📊 Individual queries result:', validProperties);

          if (validProperties.length === 0) {
            console.warn('⚠️ No properties found, returning fallback data');
            return getFallbackSignatureProperties();
          }

          return transformProperties(validProperties);
        }

        if (!properties || properties.length === 0) {
          console.warn('⚠️ No properties returned from query, using fallback');
          return getFallbackSignatureProperties();
        }

        console.log(`✅ Successfully fetched ${properties.length} properties`);
        return transformProperties(properties);

      } catch (err) {
        console.error('💥 Unexpected error in signature properties query:', err);
        return getFallbackSignatureProperties();
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Transform properties and add image URLs
 */
function transformProperties(properties: any[]): SignatureProperty[] {
  const signaturePropertySlugs = ['7-allan-drive', 'four-on-stingray-point', 'bella-views'];

  const signatureProperties: SignatureProperty[] = properties.map(property => {
    // Construct Supabase storage URL
    const imageFolder = property.image_folder || property.slug;
    let heroImageUrl = '';

    if (imageFolder) {
      const { data: urlData } = supabase.storage
        .from('hammond-properties')
        .getPublicUrl(`${imageFolder}/image_1.jpg`);
      heroImageUrl = urlData?.publicUrl || '';
      console.log(`🖼️ Generated image URL for ${property.slug}: ${heroImageUrl}`);
    }

    return {
      slug: property.slug,
      title: property.title || '',
      imageFolder: imageFolder,
      heroImageUrl,
      bedrooms: property.bedrooms || 0,
      bathrooms: property.bathrooms || 0,
      petFriendly: property.pet_friendly || false,
      boatParking: property.boat_parking || false,
    };
  });

  // Ensure they're in the correct order
  const orderedProperties = signaturePropertySlugs.map(slug =>
    signatureProperties.find(prop => prop.slug === slug)
  ).filter(Boolean) as SignatureProperty[];

  console.log('🎯 Final ordered properties:', orderedProperties.map(p => p.slug));
  return orderedProperties;
}

/**
 * Fallback data if database queries fail
 */
function getFallbackSignatureProperties(): SignatureProperty[] {
  console.log('🆘 Using fallback signature properties data');

  const fallbackProperties = [
    {
      slug: '7-allan-drive',
      title: '7 Allan Drive',
      imageFolder: '7-allan-drive',
      heroImageUrl: '',
      bedrooms: 3,
      bathrooms: 2,
      petFriendly: false,
      boatParking: true,
    },
    {
      slug: 'four-on-stingray-point',
      title: 'Four on Stingray Point',
      imageFolder: 'four-on-stingray-point',
      heroImageUrl: '',
      bedrooms: 3,
      bathrooms: 4,
      petFriendly: true,
      boatParking: true,
    },
    {
      slug: 'bella-views',
      title: 'Bella Views',
      imageFolder: 'bella-views',
      heroImageUrl: '',
      bedrooms: 3,
      bathrooms: 2,
      petFriendly: false,
      boatParking: false,
    }
  ];

  // Add image URLs to fallback data
  return fallbackProperties.map(property => {
    const { data: urlData } = supabase.storage
      .from('hammond-properties')
      .getPublicUrl(`${property.imageFolder}/image_1.jpg`);

    return {
      ...property,
      heroImageUrl: urlData?.publicUrl || ''
    };
  });
}