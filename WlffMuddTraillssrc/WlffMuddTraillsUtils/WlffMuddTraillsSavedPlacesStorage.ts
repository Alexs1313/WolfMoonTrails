import AsyncStorage from '@react-native-async-storage/async-storage';

const WlffMuddTraillsSAVED_PLACES_KEY = '@wolfmoon/saved_places';

export async function WlffMuddTraillsGetSavedPlaceIds(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(WlffMuddTraillsSAVED_PLACES_KEY);
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

export async function WlffMuddTraillsIsPlaceSaved(id: string): Promise<boolean> {
  const ids = await WlffMuddTraillsGetSavedPlaceIds();
  return ids.includes(id);
}

export async function WlffMuddTraillsRemovePlaceSaved(id: string): Promise<void> {
  const ids = await WlffMuddTraillsGetSavedPlaceIds();
  const next = ids.filter(item => item !== id);
  await AsyncStorage.setItem(WlffMuddTraillsSAVED_PLACES_KEY, JSON.stringify(next));
}

export async function WlffMuddTraillsTogglePlaceSaved(id: string): Promise<boolean> {
  const ids = await WlffMuddTraillsGetSavedPlaceIds();
  const next = ids.includes(id)
    ? ids.filter(item => item !== id)
    : [...ids, id];
  await AsyncStorage.setItem(WlffMuddTraillsSAVED_PLACES_KEY, JSON.stringify(next));
  return next.includes(id);
}
