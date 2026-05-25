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
    <View style={styles.layout}>
      <View style={styles.headingRow}>
        <Text style={styles.leadingGlyph}>🔖</Text>
        <Text style={styles.heading}>Saved Spots</Text>
      </View>
      <Text style={styles.subtitle}>{getSubtitle(count)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    gap: 4,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  leadingGlyph: {
    fontSize: 22,
    color: colors.primary,
  },
  heading: {
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
