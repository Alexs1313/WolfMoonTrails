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
        styles.screenLayout,
        {
          paddingTop: insets.top + spacing.lg,
          paddingBottom: Math.max(insets.bottom, spacing.lg) + 80,
        },
      ]}>
      <View style={styles.contentColumn}>
        <View style={styles.badgeFrame}>
          <Text style={styles.badgeGlyph}>🏆</Text>
        </View>
        <Text style={styles.heading}>Level Complete!</Text>
        <Text style={styles.levelLabel}>{level.title}</Text>
        <QuizStars count={stars} />
        <View style={styles.resultPanel}>
          <Text style={styles.resultValue}>
            {correctCount}/{total}
          </Text>
          <Text style={styles.resultCaption}>Questions answered correctly</Text>
        </View>
        <View style={styles.actionRow}>
          <Pressable style={styles.retryControl} onPress={handleRetry}>
            <Text style={styles.retryGlyph}>↻</Text>
            <Text style={styles.retryLabel}>Retry</Text>
          </Pressable>
          <Pressable
            style={styles.continueControl}
            onPress={nextLevelId ? handleNext : handleDone}>
            <Text style={styles.continueLabel}>
              {nextLevelId ? 'Next Level →' : 'Done'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenLayout: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
  },
  contentColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  badgeFrame: {
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
  badgeGlyph: {
    fontSize: 36,
  },
  heading: {
    color: colors.heading,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 26,
  },
  levelLabel: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 15,
    marginTop: -8,
  },
  resultPanel: {
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
  resultValue: {
    color: colors.primary,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 48,
    fontStyle: 'italic',
  },
  resultCaption: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 13,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 8,
  },
  retryControl: {
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
  retryGlyph: {
    color: colors.textDim,
    fontSize: 18,
  },
  retryLabel: {
    color: colors.textDim,
    fontFamily: fonts.montserratSemiBold,
    fontSize: 14,
  },
  continueControl: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueLabel: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 14,
  },
});
