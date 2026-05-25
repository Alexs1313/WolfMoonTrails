import AsyncStorage from '@react-native-async-storage/async-storage';

const INTRO_COMPLETED_KEY = '@wolfmoon/intro_completed';

export async function getIntroCompleted(): Promise<boolean> {
  const value = await AsyncStorage.getItem(INTRO_COMPLETED_KEY);
  return value === '1';
}

export async function setIntroCompleted(): Promise<void> {
  await AsyncStorage.setItem(INTRO_COMPLETED_KEY, '1');
}
