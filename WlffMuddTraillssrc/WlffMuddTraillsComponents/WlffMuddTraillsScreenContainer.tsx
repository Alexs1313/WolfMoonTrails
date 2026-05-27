import React, {type PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {WlffMuddTraillsSpacing} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';

type Props = PropsWithChildren<{
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}>;

export function WlffMuddTraillsScreenContainer({children, edges = ['top']}: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  content: {
    flex: 1,
    paddingHorizontal: WlffMuddTraillsSpacing.md,
  },
});
