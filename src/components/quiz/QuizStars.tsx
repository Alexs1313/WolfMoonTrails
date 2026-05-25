import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors} from '../../consts';

type Props = {
  count: number;
  max?: number;
};

export function QuizStars({count, max = 3}: Props) {
  return (
    <View style={styles.row}>
      {Array.from({length: max}).map((_, index) => (
        <Text
          key={index}
          style={[styles.star, index < count ? styles.filled : styles.empty]}>
          ★
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  star: {
    fontSize: 28,
  },
  filled: {
    color: colors.yellow,
  },
  empty: {
    color: 'rgba(234, 179, 8, 0.25)',
  },
});
