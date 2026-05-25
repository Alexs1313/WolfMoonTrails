import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors, fonts, introLayout, spacing} from '../../consts';

type Props = {
  label: string;
  onPress: () => void;
};

export function IntroPrimaryButton({label, onPress}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({pressed}) => [styles.wrap, pressed && styles.pressed]}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        start={{x: 0.15, y: 0}}
        end={{x: 0.85, y: 1}}
        style={styles.button}>
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing.lg,
    borderRadius: introLayout.buttonRadius,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.42,
    shadowRadius: 16,
    elevation: 8,
  },
  pressed: {
    opacity: 0.92,
  },
  button: {
    height: introLayout.buttonHeight,
    borderRadius: introLayout.buttonRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 16,
    lineHeight: 24,
  },
});
