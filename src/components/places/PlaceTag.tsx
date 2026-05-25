import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors, fonts} from '../../consts';

type Props = {
  label: string;
};

export function PlaceTag({label}: Props) {
  return (
    <View style={styles.tag}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: colors.chipBg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  label: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 10,
  },
});
