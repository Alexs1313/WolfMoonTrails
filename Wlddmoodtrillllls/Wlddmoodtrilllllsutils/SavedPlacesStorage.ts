import AsyncStorage from '@react-native-async-storage/async-storage';

const WiildMoodtrailssSAVED_PLACES_KEY = '@wolfmoon/saved_places';

export async function WiildMoodtrailssGetSavedPlaceIds(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(WiildMoodtrailssSAVED_PLACES_KEY);
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

export async function WiildMoodtrailssIsPlaceSaved(id: string): Promise<boolean> {
  const ids = await WiildMoodtrailssGetSavedPlaceIds();
  return ids.includes(id);
}

export async function WiildMoodtrailssRemovePlaceSaved(id: string): Promise<void> {
  const ids = await WiildMoodtrailssGetSavedPlaceIds();
  const next = ids.filter(item => item !== id);
  await AsyncStorage.setItem(WiildMoodtrailssSAVED_PLACES_KEY, JSON.stringify(next));
}

export async function WiildMoodtrailssTogglePlaceSaved(id: string): Promise<boolean> {
  const ids = await WiildMoodtrailssGetSavedPlaceIds();
  const next = ids.includes(id)
    ? ids.filter(item => item !== id)
    : [...ids, id];
  await AsyncStorage.setItem(WiildMoodtrailssSAVED_PLACES_KEY, JSON.stringify(next));
  return next.includes(id);
}
