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
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.description}>{note.description}</Text>
    </>
  );

  if (!onPress) {
    return <View style={styles.card}>{content}</View>;
  }

  return (
    <Pressable style={styles.card} onPress={onPress}>
      {content}
    </Pressable>
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
  title: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 15,
    lineHeight: 20,
  },
  description: {
    color: colors.textSecondary,
    fontFamily: fonts.nunitoRegular,
    fontSize: 13,
    lineHeight: 19.5,
  },
});
