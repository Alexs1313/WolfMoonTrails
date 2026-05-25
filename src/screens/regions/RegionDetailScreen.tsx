import React from 'react';
import {StyleSheet, Text} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';

import {ScreenContainer} from '../../components';
import {Routes, colors, spacing} from '../../consts';
import type {RegionsStackParamList} from '../../navigation/types';

type Props = StackScreenProps<
  RegionsStackParamList,
  typeof Routes.regions.detail
>;

export function RegionDetailScreen({route}: Props) {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Region {route.params.id}</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: colors.text,
    marginTop: spacing.md,
  },
});
