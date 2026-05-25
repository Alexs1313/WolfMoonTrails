import React, {useCallback, useEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {QuizStars} from '../../components/quiz';
import {Routes, colors, fonts, spacing} from '../../consts';
import {
  getNextLevelId,
  getQuizLevel,
  getStarCount,
} from '../../data/quizLevels';
import type {SessionsStackParamList} from '../../navigation/types';
import {saveLevelResult} from '../../utils/quizProgressStorage';

type Props = StackScreenProps<
  SessionsStackParamList,
  typeof Routes.sessions.result
>;

export function QuizResultScreen({navigation, route}: Props) {
  const insets = useSafeAreaInsets();
  const {levelId, correctCount} = route.params;
  const level = getQuizLevel(levelId);
  const total = level?.questions.length ?? 7;
  const stars = getStarCount(correctCount, total);
  const nextLevelId = getNextLevelId(levelId);

  useEffect(() => {
    saveLevelResult(levelId, correctCount, total, stars);
  }, [correctCount, levelId, stars, total]);

  const handleRetry = useCallback(() => {
    navigation.replace(Routes.sessions.quiz, {levelId});
  }, [levelId, navigation]);

  const handleNext = useCallback(() => {
    if (nextLevelId) {
      navigation.replace(Routes.sessions.quiz, {levelId: nextLevelId});
      return;
    }
    navigation.navigate(Routes.sessions.main);
  }, [navigation, nextLevelId]);

  const handleDone = useCallback(() => {
    navigation.navigate(Routes.sessions.main);
  }, [navigation]);

  if (!level) {
    return null;
  }

  return (
    <View
      style={[
        styles.root,
        {
          paddingTop: insets.top + spacing.lg,
          paddingBottom: Math.max(insets.bottom, spacing.lg) + 80,
        },
      ]}>
      <View style={styles.content}>
        <View style={styles.trophyWrap}>
          <Text style={styles.trophy}>🏆</Text>
        </View>
        <Text style={styles.title}>Level Complete!</Text>
        <Text style={styles.levelName}>{level.title}</Text>
        <QuizStars count={stars} />
        <View style={styles.scoreCard}>
          <Text style={styles.score}>
            {correctCount}/{total}
          </Text>
          <Text style={styles.scoreLabel}>Questions answered correctly</Text>
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryIcon}>↻</Text>
            <Text style={styles.retryLabel}>Retry</Text>
          </Pressable>
          <Pressable
            style={styles.nextButton}
            onPress={nextLevelId ? handleNext : handleDone}>
            <Text style={styles.nextLabel}>
              {nextLevelId ? 'Next Level →' : 'Done'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  trophyWrap: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#FFD7001F',
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.yellow,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 0},
  },
  trophy: {
    fontSize: 36,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 26,
  },
  levelName: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 15,
    marginTop: -8,
  },
  scoreCard: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  score: {
    color: colors.primary,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 48,
    fontStyle: 'italic',
  },
  scoreLabel: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 8,
  },
  retryButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  retryIcon: {
    color: colors.textDim,
    fontSize: 18,
  },
  retryLabel: {
    color: colors.textDim,
    fontFamily: fonts.montserratSemiBold,
    fontSize: 14,
  },
  nextButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextLabel: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 14,
  },
});
