import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {colors, fonts} from '../../consts';
import type {QuizLevel} from '../../data/quizLevels';
import {QuizStars} from './QuizStars';

type Props = {
  level: QuizLevel;
  locked: boolean;
  stars: number;
  bestScore: number;
  onPress: () => void;
};

export function LevelCard({
  level,
  locked,
  stars,
  bestScore,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={locked}
      style={[styles.card, locked && styles.cardLocked]}>
      <View style={styles.header}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelNumber}>{level.order}</Text>
        </View>
        <View style={styles.textBlock}>
          <Text style={[styles.title, locked && styles.titleLocked]}>
            {level.title}
          </Text>
          <Text style={styles.meta}>
            {locked
              ? 'Complete previous level to unlock'
              : `${level.questions.length} questions`}
          </Text>
        </View>
        {locked ? (
          <Text style={styles.lockIcon}>🔒</Text>
        ) : (
          <Text style={styles.arrow}>→</Text>
        )}
      </View>
      {!locked && stars > 0 && (
        <View style={styles.footer}>
          <QuizStars count={stars} />
          <Text style={styles.score}>
            Best: {bestScore}/{level.questions.length}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    padding: 16,
    gap: 12,
  },
  cardLocked: {
    opacity: 0.55,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  levelBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelNumber: {
    color: colors.primary,
    fontFamily: fonts.montserratBold,
    fontSize: 14,
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 15,
  },
  titleLocked: {
    color: colors.textDim,
  },
  meta: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 12,
  },
  lockIcon: {
    fontSize: 16,
  },
  arrow: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: fonts.montserratBold,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  score: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 11,
  },
});
