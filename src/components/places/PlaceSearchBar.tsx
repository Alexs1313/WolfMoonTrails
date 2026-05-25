import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import {colors, fonts} from '../../consts';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export function PlaceSearchBar({value, onChangeText}: Props) {
  return (
    <View style={styles.wrap}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search destinations…"
        placeholderTextColor="rgba(232, 238, 255, 0.5)"
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    height: 45,
    justifyContent: 'center',
    paddingHorizontal: 17,
  },
  input: {
    color: colors.heading,
    fontFamily: fonts.nunitoRegular,
    fontSize: 14,
    padding: 0,
  },
});
