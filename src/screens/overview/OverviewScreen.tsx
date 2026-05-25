import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';

import {ScreenContainer} from '../../components';
import {Routes, colors, spacing} from '../../consts';
import type {OverviewStackParamList} from '../../navigation/types';

type Props = StackScreenProps<
  OverviewStackParamList,
  typeof Routes.overview.main
>;

export function OverviewScreen({navigation}: Props) {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Overview</Text>
      <Pressable
        style={styles.link}
        onPress={() =>
          navigation.navigate(Routes.overview.detail, {id: 'sample-1'})
        }>
        <Text style={styles.linkText}>Open item</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.lg,
  },
  link: {
    marginTop: spacing.md,
  },
  linkText: {
    color: colors.primary,
    fontSize: 16,
  },
});
