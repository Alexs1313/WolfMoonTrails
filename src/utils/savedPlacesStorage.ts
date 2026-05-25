import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_PLACES_KEY = '@wolfmoon/saved_places';

export async function getSavedPlaceIds(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(SAVED_PLACES_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function isPlaceSaved(id: string): Promise<boolean> {
  const ids = await getSavedPlaceIds();
  return ids.includes(id);
}

export async function removePlaceSaved(id: string): Promise<void> {
  const ids = await getSavedPlaceIds();
  const next = ids.filter(item => item !== id);
  await AsyncStorage.setItem(SAVED_PLACES_KEY, JSON.stringify(next));
}

export async function togglePlaceSaved(id: string): Promise<boolean> {
  const ids = await getSavedPlaceIds();
  const next = ids.includes(id)
    ? ids.filter(item => item !== id)
    : [...ids, id];
  await AsyncStorage.setItem(SAVED_PLACES_KEY, JSON.stringify(next));
  return next.includes(id);
}
