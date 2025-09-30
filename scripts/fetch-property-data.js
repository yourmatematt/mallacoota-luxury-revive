import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://iqdmesndmfphlevakgqe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZG1lc25kbWZwaGxldmFrZ3FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NzkwNTksImV4cCI6MjA2OTE1NTA1OX0.T_P1jKxpXp0RPZeJJN4vzJEwDPdqM9WvIQTELbz2Ato";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Properties to fetch data for
const targetProperties = [
  'south-gateway',
  'high-tide-studio',
  'high-tide-apartment',
  'blue-bird',
  'blue-waters',
  'four-on-stingray-point',
  '27-mirrabooka-rd',
  'lacys-place',
  'gabo-views',
  'vista-views',
  'pheeney-place'
];

async function fetchPropertyData() {
  try {
    console.log('Fetching property data from Supabase...\n');

    // Fetch all properties first
    const { data: allProperties, error: propertiesError } = await supabase
      .from('Properties')
      .select('*')
      .order('title');

    if (propertiesError) {
      console.error('Error fetching properties:', propertiesError);
      return;
    }

    console.log(`Found ${allProperties.length} total properties in database\n`);

    // Filter for target properties
    const targetPropertiesData = allProperties.filter(property =>
      targetProperties.includes(property.slug)
    );

    console.log(`Found ${targetPropertiesData.length} target properties:\n`);

    // Display property information
    for (const property of targetPropertiesData) {
      console.log('=' .repeat(60));
      console.log(`PROPERTY: ${property.title}`);
      console.log('=' .repeat(60));
      console.log(`Slug: ${property.slug}`);
      console.log(`Property ID: ${property.property_id}`);
      console.log(`Bedrooms: ${property.bedrooms || 'Not specified'}`);
      console.log(`Bathrooms: ${property.bathrooms || 'Not specified'}`);
      console.log(`Max Guests: ${property.guests || 'Not specified'}`);
      console.log(`Pet Friendly: ${property.pet_friendly ? 'Yes' : 'No'}`);
      console.log(`Boat Parking: ${property.boat_parking ? 'Yes' : 'No'}`);
      console.log(`Subtitle: ${property.subtitle || 'None'}`);
      console.log(`Excerpt: ${property.excerpt || 'None'}`);
      console.log(`Description: ${property.description ? (property.description.length > 100 ? property.description.substring(0, 100) + '...' : property.description) : 'None'}`);
      console.log(`Airbnb Rating: ${property.airbnb_rating || 'Not specified'}`);
      console.log(`Image Folder: ${property.image_folder || 'Not specified'}`);
      console.log();

      // Fetch amenities for this property
      const { data: amenities, error: amenitiesError } = await supabase
        .rpc('get_property_amenities', { p_property_id: property.property_id });

      if (!amenitiesError && amenities && amenities.length > 0) {
        console.log('AMENITIES:');
        amenities.forEach(amenity => {
          console.log(`- ${amenity.amenity_name} (${amenity.category_name})`);
        });
        console.log();
      }

      // Fetch reviews for this property
      const { data: reviews, error: reviewsError } = await supabase
        .from('Airbnb Reviews')
        .select('*')
        .eq('property_id', property.property_id)
        .limit(3);

      if (!reviewsError && reviews && reviews.length > 0) {
        console.log('RECENT REVIEWS:');
        reviews.forEach(review => {
          console.log(`- Rating: ${review.rating}`);
          console.log(`  Reviewer: ${review.reviewer}`);
          console.log(`  Review: ${review.review ? (review.review.length > 100 ? review.review.substring(0, 100) + '...' : review.review) : 'No text'}`);
          console.log(`  Date: ${review.review_date}`);
          console.log();
        });
      }
    }

    // Check for missing properties
    const foundSlugs = targetPropertiesData.map(p => p.slug);
    const missingSlugs = targetProperties.filter(slug => !foundSlugs.includes(slug));

    if (missingSlugs.length > 0) {
      console.log('\n' + '=' .repeat(60));
      console.log('MISSING PROPERTIES (not found in database):');
      console.log('=' .repeat(60));
      missingSlugs.forEach(slug => console.log(`- ${slug}`));
    }

    // Show all property slugs for reference
    console.log('\n' + '=' .repeat(60));
    console.log('ALL PROPERTY SLUGS IN DATABASE:');
    console.log('=' .repeat(60));
    allProperties.forEach(property => {
      console.log(`- ${property.slug} (${property.title})`);
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

fetchPropertyData();