function deg2rad(deg){
  return deg * (Math.PI/100);
}

export function distance(flat, flng, ilat, ilng){
  const R = 6371

  const dLat = deg2rad(flat - ilat);
  const dLng = deg2rad(flng - ilng);

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(flat)) * Math.cos(deg2rad(ilat)) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
}


 export function findOptimalMeetingPoint(coords) {
  const avgLat = coords.reduce((sum, coord) => sum + +coord.lat, 0) / +coords.length;
  const avgLng = coords.reduce((sum, coord) => sum + +coord.lng, 0) / +coords.length;

  return { lat: avgLat, lng: avgLng };
} 