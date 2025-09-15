// Haversine formula to calculate distance between two coordinates
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): { km: number, display: string, walkTime?: string, driveTime?: string } {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;

  // Calculate times
  const walkTime = distance < 2 ? `${Math.round(distance * 12)} min walk` : undefined;
  const driveTime = distance >= 1 ? `${Math.round(distance * 2)} min drive` : undefined;

  // Format display
  let display = '';
  if (distance < 0.5) {
    display = `${Math.round(distance * 1000)}m`;
  } else if (distance < 1) {
    display = `${Math.round(distance * 1000)}m`;
  } else {
    display = `${distance.toFixed(1)}km`;
  }

  return { km: distance, display, walkTime, driveTime };
}