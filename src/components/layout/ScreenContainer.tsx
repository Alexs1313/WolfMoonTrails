import React, {type PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors, spacing} from '../../consts';

type Props = PropsWithChildren<{
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}>;

export function ScreenContainer({children, edges = ['top']}: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
});
