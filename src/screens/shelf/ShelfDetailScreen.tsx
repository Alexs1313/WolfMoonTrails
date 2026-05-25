import React from 'react';
import {StyleSheet, Text} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';

import {ScreenContainer} from '../../components';
import {Routes, colors, spacing} from '../../consts';
import type {ShelfStackParamList} from '../../navigation/types';

type Props = StackScreenProps<
  ShelfStackParamList,
  typeof Routes.shelf.detail
>;

export function ShelfDetailScreen({route}: Props) {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Pin {route.params.id}</Text>
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
