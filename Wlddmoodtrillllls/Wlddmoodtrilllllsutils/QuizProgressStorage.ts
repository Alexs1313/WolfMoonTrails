import AsyncStorage from '@react-native-async-storage/async-storage';

const WiildMoodtrailssQUIZ_PROGRESS_KEY = '@wolfmoon/quiz_progress';

export type WiildMoodtrailssLevelProgress = {
  completed: boolean;
  bestScore: number;
  stars: number;
};

export type WiildMoodtrailssQuizProgress = Record<string, WiildMoodtrailssLevelProgress>;

export async function WiildMoodtrailssGetQuizProgress(): Promise<WiildMoodtrailssQuizProgress> {
  const raw = await AsyncStorage.getItem(WiildMoodtrailssQUIZ_PROGRESS_KEY);
  if (!raw) {
    return {};
  }
  try {
    return JSON.parse(raw) as WiildMoodtrailssQuizProgress;
  } catch {
    return {};
  }
}

export async function WiildMoodtrailssSaveLevelResult(
  levelId: string,
  correctCount: number,
  total: number,
  stars: number,
): Promise<WiildMoodtrailssQuizProgress> {
  const progress = await WiildMoodtrailssGetQuizProgress();
  const existing = progress[levelId];
  const next: WiildMoodtrailssLevelProgress = {
    completed: true,
    bestScore: Math.max(existing?.bestScore ?? 0, correctCount),
    stars: Math.max(existing?.stars ?? 0, stars),
  };
  const updated = {...progress, [levelId]: next};
  await AsyncStorage.setItem(WiildMoodtrailssQUIZ_PROGRESS_KEY, JSON.stringify(updated));
  return updated;
}

export function WiildMoodtrailssGetCurrentLevelId(
  progress: WiildMoodtrailssQuizProgress,
  levels: {id: string; order: number}[],
): string {
  const firstIncomplete = levels.find(level => !progress[level.id]?.completed);
  return firstIncomplete?.id ?? levels[0]?.id ?? '';
}

export function WiildMoodtrailssIsLevelUnlocked(
  levelOrder: number,
  progress: WiildMoodtrailssQuizProgress,
  levels: {id: string; order: number}[],
): boolean {
  if (levelOrder === 1) {
    return true;
  }
  const previous = levels.find(l => l.order === levelOrder - 1);
  return previous ? Boolean(progress[previous.id]?.completed) : false;
}
