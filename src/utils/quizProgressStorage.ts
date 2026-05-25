import AsyncStorage from '@react-native-async-storage/async-storage';

const QUIZ_PROGRESS_KEY = '@wolfmoon/quiz_progress';

export type LevelProgress = {
  completed: boolean;
  bestScore: number;
  stars: number;
};

export type QuizProgress = Record<string, LevelProgress>;

export async function getQuizProgress(): Promise<QuizProgress> {
  const raw = await AsyncStorage.getItem(QUIZ_PROGRESS_KEY);
  if (!raw) {
    return {};
  }
  try {
    return JSON.parse(raw) as QuizProgress;
  } catch {
    return {};
  }
}

export async function saveLevelResult(
  levelId: string,
  correctCount: number,
  total: number,
  stars: number,
): Promise<QuizProgress> {
  const progress = await getQuizProgress();
  const existing = progress[levelId];
  const next: LevelProgress = {
    completed: true,
    bestScore: Math.max(existing?.bestScore ?? 0, correctCount),
    stars: Math.max(existing?.stars ?? 0, stars),
  };
  const updated = {...progress, [levelId]: next};
  await AsyncStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(updated));
  return updated;
}

export function getCurrentLevelId(
  progress: QuizProgress,
  levels: {id: string; order: number}[],
): string {
  const firstIncomplete = levels.find(level => !progress[level.id]?.completed);
  return firstIncomplete?.id ?? levels[0]?.id ?? '';
}

export function isLevelUnlocked(
  levelOrder: number,
  progress: QuizProgress,
  levels: {id: string; order: number}[],
): boolean {
  if (levelOrder === 1) {
    return true;
  }
  const previous = levels.find(l => l.order === levelOrder - 1);
  return previous ? Boolean(progress[previous.id]?.completed) : false;
}
