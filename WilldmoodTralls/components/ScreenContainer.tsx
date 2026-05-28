import React, {type PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 28,
  xxl: 32,
} as const;

type Props = PropsWithChildren<{
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}>;

export function WiildMoodtrailssScreenContainer({children, edges = ['top']}: Props) {
  const paddingTop = edges.includes('top') ? 16 : 0;
  const paddingBottom = edges.includes('bottom') ? 16 : 0;

  return (
    <View
      style={[
        styles.safe,
        {
          paddingTop,
          paddingBottom,
        },
      ]}>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

export {WiildMoodtrailssScreenContainer as ScreenContainer};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
});
