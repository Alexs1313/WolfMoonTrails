import React, {type PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = PropsWithChildren<{
  colors?: string[];
}>;

export function GradientBackground({
  children,
  colors = ['rgb(8, 15, 35)', 'rgb(12, 23, 55)', '#1D2B5A'],
}: Props) {
  return (
    <LinearGradient colors={colors} style={styles.root}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1},
});
