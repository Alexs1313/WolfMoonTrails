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
      style={({pressed}) => [
        styles.shadowFrame,
        pressed && styles.shadowFramePressed,
      ]}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        start={{x: 0.15, y: 0}}
        end={{x: 0.85, y: 1}}
        style={styles.gradientSurface}>
        <Text style={styles.actionLabel}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadowFrame: {
    marginTop: spacing.lg,
    borderRadius: introLayout.buttonRadius,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.42,
    shadowRadius: 16,
    elevation: 8,
  },
  shadowFramePressed: {
    opacity: 0.92,
  },
  gradientSurface: {
    height: introLayout.buttonHeight,
    borderRadius: introLayout.buttonRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 16,
    lineHeight: 24,
  },
});
