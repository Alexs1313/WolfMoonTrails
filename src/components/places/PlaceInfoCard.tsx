import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors, fonts} from '../../consts';

type Props = {
  icon: string;
  iconColor: string;
  title: string;
  body: string;
};

export function PlaceInfoCard({icon, iconColor, title, body}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={[styles.icon, {color: iconColor}]}>{icon}</Text>
        <Text style={[styles.title, {color: iconColor}]}>{title}</Text>
      </View>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    padding: 16,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 14,
  },
  title: {
    fontFamily: fonts.montserratBold,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  body: {
    color: colors.text,
    fontFamily: fonts.nunitoRegular,
    fontSize: 14,
    lineHeight: 21,
  },
});
