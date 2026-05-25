import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {colors, fonts} from '../../consts';
import type {SafetyNote} from '../../data';

type Props = {
  note: SafetyNote;
  onPress?: () => void;
};

export function SafetyNoteCard({note, onPress}: Props) {
  const content = (
    <>
      <Text style={styles.heading}>{note.title}</Text>
      <Text style={styles.summary}>{note.description}</Text>
    </>
  );

  if (!onPress) {
    return <View style={styles.panel}>{content}</View>;
  }

  return (
    <Pressable style={styles.panel} onPress={onPress}>
      {content}
    </Pressable>
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
  heading: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 15,
    lineHeight: 20,
  },
  summary: {
    color: colors.textSecondary,
    fontFamily: fonts.nunitoRegular,
    fontSize: 13,
    lineHeight: 19.5,
  },
});
