import AsyncStorage from '@react-native-async-storage/async-storage';

const WlffMuddTraillsQUIZ_PROGRESS_KEY = '@wolfmoon/quiz_progress';

export type WlffMuddTraillsLevelProgress = {
  completed: boolean;
  bestScore: number;
  stars: number;
};

export type WlffMuddTraillsQuizProgress = Record<string, WlffMuddTraillsLevelProgress>;

export async function WlffMuddTraillsGetQuizProgress(): Promise<WlffMuddTraillsQuizProgress> {
  const raw = await AsyncStorage.getItem(WlffMuddTraillsQUIZ_PROGRESS_KEY);
  if (!raw) {
    return {};
  }
  try {
    return JSON.parse(raw) as WlffMuddTraillsQuizProgress;
  } catch {
    return {};
  }
}

export async function WlffMuddTraillsSaveLevelResult(
  levelId: string,
  correctCount: number,
  total: number,
  stars: number,
): Promise<WlffMuddTraillsQuizProgress> {
  const progress = await WlffMuddTraillsGetQuizProgress();
  const existing = progress[levelId];
  const next: WlffMuddTraillsLevelProgress = {
    completed: true,
    bestScore: Math.max(existing?.bestScore ?? 0, correctCount),
    stars: Math.max(existing?.stars ?? 0, stars),
  };
  const updated = {...progress, [levelId]: next};
  await AsyncStorage.setItem(WlffMuddTraillsQUIZ_PROGRESS_KEY, JSON.stringify(updated));
  return updated;
}

export function WlffMuddTraillsGetCurrentLevelId(
  progress: WlffMuddTraillsQuizProgress,
  levels: {id: string; order: number}[],
): string {
  const firstIncomplete = levels.find(level => !progress[level.id]?.completed);
  return firstIncomplete?.id ?? levels[0]?.id ?? '';
}

export function WlffMuddTraillsIsLevelUnlocked(
  levelOrder: number,
  progress: WlffMuddTraillsQuizProgress,
  levels: {id: string; order: number}[],
): boolean {
  if (levelOrder === 1) {
    return true;
  }
  const previous = levels.find(l => l.order === levelOrder - 1);
  return previous ? Boolean(progress[previous.id]?.completed) : false;
}
