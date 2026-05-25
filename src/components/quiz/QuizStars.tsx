import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors} from '../../consts';

type Props = {
  count: number;
  max?: number;
};

export function QuizStars({count, max = 3}: Props) {
  return (
    <View style={styles.ratingRow}>
      {Array.from({length: max}).map((_, index) => (
        <Text
          key={index}
          style={[
            styles.ratingGlyph,
            index < count ? styles.ratingActive : styles.ratingInactive,
          ]}>
          ★
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  ratingRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  ratingGlyph: {
    fontSize: 28,
  },
  ratingActive: {
    color: colors.yellow,
  },
  ratingInactive: {
    color: 'rgba(234, 179, 8, 0.25)',
  },
});
