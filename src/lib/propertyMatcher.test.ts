// Quick test of the property matching algorithm
import { getPropertiesForBlog } from './propertyMatcher';
import { propertyMetadata } from '@/data/properties';

// Test coffee scene blog - should prioritize town-center properties
const coffeeProperties = getPropertiesForBlog('complete-coffee-scene', propertyMetadata);
console.log('Coffee Scene Properties:', coffeeProperties.map(p => ({
  title: p.title,
  distance: p.distanceFromTown,
  tags: p.locationTags
})));

// Test pet-friendly blog - should prioritize pet-friendly properties
const petProperties = getPropertiesForBlog('pet-friendly-mallacoota', propertyMetadata);
console.log('Pet-Friendly Properties:', petProperties.map(p => ({
  title: p.title,
  petFeatures: p.featureTags.filter(tag => tag.includes('pet') || tag === 'family'),
  distance: p.distanceFromTown
})));

// Test waterfront blog - should prioritize waterfront properties
const waterfrontProperties = getPropertiesForBlog('luxury-waterfront-mallacoota', propertyMetadata);
console.log('Waterfront Properties:', waterfrontProperties.map(p => ({
  title: p.title,
  locationTags: p.locationTags,
  featureTags: p.featureTags.filter(tag => tag.includes('water') || tag.includes('luxury'))
})));

// Test remote/secluded preferences
const secludedProperties = getPropertiesForBlog('peaceful-retreat', propertyMetadata);
console.log('Secluded Properties:', secludedProperties.map(p => ({
  title: p.title,
  distance: p.distanceFromTown,
  locationTags: p.locationTags
})));

export {}; // Make this a module