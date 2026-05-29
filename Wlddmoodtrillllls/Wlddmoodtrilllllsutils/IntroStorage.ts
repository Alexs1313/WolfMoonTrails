import AsyncStorage from '@react-native-async-storage/async-storage';

const WiildMoodtrailssINTRO_COMPLETED_KEY = '@wolfmoon/intro_completed';

export async function WiildMoodtrailssGetIntroCompleted(): Promise<boolean> {
  const value = await AsyncStorage.getItem(WiildMoodtrailssINTRO_COMPLETED_KEY);
  return value === '1';
}

export async function WiildMoodtrailssSetIntroCompleted(): Promise<void> {
  await AsyncStorage.setItem(WiildMoodtrailssINTRO_COMPLETED_KEY, '1');
}
