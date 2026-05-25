import type {Place} from './places';

export type MapCoordinate = {
  latitude: number;
  longitude: number;
};

const DEFAULT_REGION = {
  latitude: 48,
  longitude: -20,
  latitudeDelta: 60,
  longitudeDelta: 80,
};

const FIT_PADDING = {top: 48, right: 48, bottom: 96, left: 48};

export function getPlaceCoordinates(place: Place): MapCoordinate {
  return {
    latitude: place.latitude,
    longitude: place.longitude,
  };
}

export function getPlacesCoordinates(items: Place[]): MapCoordinate[] {
  return items.map(getPlaceCoordinates);
}

export function getPlacesRegion(items: Place[]) {
  if (items.length === 0) {
    return DEFAULT_REGION;
  }

  if (items.length === 1) {
    return {
      latitude: items[0].latitude,
      longitude: items[0].longitude,
      latitudeDelta: 12,
      longitudeDelta: 12,
    };
  }

  const lats = items.map(p => p.latitude);
  const lngs = items.map(p => p.longitude);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: Math.max((maxLat - minLat) * 1.35, 8),
    longitudeDelta: Math.max((maxLng - minLng) * 1.35, 12),
  };
}

export const mapFitPadding = FIT_PADDING;
