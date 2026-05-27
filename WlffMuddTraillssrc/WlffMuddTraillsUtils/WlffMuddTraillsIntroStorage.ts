import AsyncStorage from '@react-native-async-storage/async-storage';

const WlffMuddTraillsINTRO_COMPLETED_KEY = '@wolfmoon/intro_completed';

export async function WlffMuddTraillsGetIntroCompleted(): Promise<boolean> {
  const value = await AsyncStorage.getItem(WlffMuddTraillsINTRO_COMPLETED_KEY);
  return value === '1';
}

export async function WlffMuddTraillsSetIntroCompleted(): Promise<void> {
  await AsyncStorage.setItem(WlffMuddTraillsINTRO_COMPLETED_KEY, '1');
}
