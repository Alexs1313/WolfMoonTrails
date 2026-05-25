import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors, fonts} from '../../consts';

type Props = {
  count: number;
};

function getSubtitle(count: number): string {
  if (count === 0) {
    return 'Your saved wilderness awaits';
  }
  if (count === 1) {
    return '1 wild place saved';
  }
  return `${count} wild places saved`;
}

export function SavedSpotsHeader({count}: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.titleRow}>
        <Text style={styles.icon}>🔖</Text>
        <Text style={styles.title}>Saved Spots</Text>
      </View>
      <Text style={styles.subtitle}>{getSubtitle(count)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    fontSize: 22,
    color: colors.primary,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 20,
    lineHeight: 30,
  },
  subtitle: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 13,
    lineHeight: 19.5,
  },
});
