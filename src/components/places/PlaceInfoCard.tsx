import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors, fonts} from '../../consts';

type Props = {
  leadingSymbol: string;
  accentColor: string;
  heading: string;
  summary: string;
};

export function PlaceInfoCard({
  leadingSymbol,
  accentColor,
  heading,
  summary,
}: Props) {
  return (
    <View style={styles.panel}>
      <View style={styles.headingRow}>
        <Text style={[styles.leadingSymbol, {color: accentColor}]}>
          {leadingSymbol}
        </Text>
        <Text style={[styles.heading, {color: accentColor}]}>{heading}</Text>
      </View>
      <Text style={styles.summary}>{summary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    padding: 16,
    gap: 8,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  leadingSymbol: {
    fontSize: 14,
  },
  heading: {
    fontFamily: fonts.montserratBold,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  summary: {
    color: colors.text,
    fontFamily: fonts.nunitoRegular,
    fontSize: 14,
    lineHeight: 21,
  },
});
