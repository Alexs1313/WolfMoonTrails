import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors, fonts, getCategoryById} from '../../consts';
import type {Place} from '../../data';

type Props = {
  place: Place;
};

export function MapOverlayCard({place}: Props) {
  const category = getCategoryById(place.category);

  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={1}>
        {place.title}
      </Text>
      <Text style={styles.location} numberOfLines={1}>
        {place.location}
      </Text>
      <View style={styles.categoryRow}>
        <View style={[styles.categoryDot, {backgroundColor: category.color}]} />
        <Text style={[styles.categoryLabel, {color: category.color}]}>
          {category.label.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(15, 23, 41, 0.92)',
    borderWidth: 1,
    borderColor: colors.borderFaint,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 2,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 11,
  },
  location: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 9,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 2,
  },
  categoryLabel: {
    fontFamily: fonts.montserratBold,
    fontSize: 8,
    letterSpacing: 0.5,
  },
});
