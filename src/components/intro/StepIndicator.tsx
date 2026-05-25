import React from 'react';
import {StyleSheet, View} from 'react-native';

import {INTRO_STEP_COUNT, colors, spacing} from '../../consts';

type Props = {
  activeIndex: number;
  total?: number;
};

export function StepIndicator({activeIndex, total = INTRO_STEP_COUNT}: Props) {
  return (
    <View style={styles.row}>
      {Array.from({length: total}).map((_, index) => {
        const active = index === activeIndex;
        return (
          <View
            key={index}
            style={[styles.dot, active && styles.dotActive]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.dotInactive,
  },
  dotActive: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});
