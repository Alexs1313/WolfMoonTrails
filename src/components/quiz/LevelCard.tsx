import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {colors, fonts} from '../../consts';
import type {QuizLevel} from '../../data/quizLevels';
import {QuizStars} from './QuizStars';

type Props = {
  level: QuizLevel;
  isLocked: boolean;
  stars: number;
  bestScore: number;
  onPress: () => void;
};

export function LevelCard({
  level,
  isLocked,
  stars,
  bestScore,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={isLocked}
      style={[styles.panel, isLocked && styles.panelMuted]}>
      <View style={styles.headerRow}>
        <View style={styles.orderBadge}>
          <Text style={styles.orderLabel}>{level.order}</Text>
        </View>
        <View style={styles.copyBlock}>
          <Text style={[styles.heading, isLocked && styles.headingMuted]}>
            {level.title}
          </Text>
          <Text style={styles.meta}>
            {isLocked
              ? 'Complete previous level to unlock'
              : `${level.questions.length} questions`}
          </Text>
        </View>
        {isLocked ? (
          <Text style={styles.statusGlyph}>🔒</Text>
        ) : (
          <Text style={styles.navGlyph}>→</Text>
        )}
      </View>
      {!isLocked && stars > 0 && (
        <View style={styles.footerRow}>
          <QuizStars count={stars} />
          <Text style={styles.scoreLabel}>
            Best: {bestScore}/{level.questions.length}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    padding: 16,
    gap: 12,
  },
  panelMuted: {
    opacity: 0.55,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderLabel: {
    color: colors.primary,
    fontFamily: fonts.montserratBold,
    fontSize: 14,
  },
  copyBlock: {
    flex: 1,
    gap: 2,
  },
  heading: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 15,
  },
  headingMuted: {
    color: colors.textDim,
  },
  meta: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 12,
  },
  statusGlyph: {
    fontSize: 16,
  },
  navGlyph: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: fonts.montserratBold,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  scoreLabel: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 11,
  },
});
