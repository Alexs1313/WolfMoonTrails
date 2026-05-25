import React from 'react';
import {StyleSheet, View} from 'react-native';

import {INTRO_STEP_COUNT, colors, spacing} from '../../consts';

type Props = {
  activeIndex: number;
  total?: number;
};

export function StepIndicator({activeIndex, total = INTRO_STEP_COUNT}: Props) {
  return (
    <View style={styles.markerRow}>
      {Array.from({length: total}).map((_, index) => {
        const isCurrent = index === activeIndex;
        return (
          <View
            key={index}
            style={[styles.stepMarker, isCurrent && styles.stepMarkerCurrent]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  markerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  stepMarker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.dotInactive,
  },
  stepMarkerCurrent: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});
