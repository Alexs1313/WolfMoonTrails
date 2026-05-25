import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {colors, fonts, spacing} from '../../consts';

const logoWolf = require('../../../assets/images/logo-wolf.png');

type Props = {
  showSkip: boolean;
  onSkip?: () => void;
};

export function IntroHeader({showSkip, onSkip}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, {paddingTop: insets.top + spacing.sm}]}>
      <View style={styles.brand}>
        <Image source={logoWolf} style={styles.logo} resizeMode="contain" />
        <Text style={styles.brandText}>WILD MOON</Text>
      </View>
      {showSkip ? (
        <Pressable
          accessibilityRole="button"
          onPress={onSkip}
          hitSlop={12}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
      ) : (
        <View style={styles.skipPlaceholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logo: {
    width: 30,
    height: 30,
  },
  brandText: {
    color: colors.primary,
    fontFamily: fonts.montserratBold,
    fontSize: 10,
    letterSpacing: 3,
  },
  skip: {
    color: colors.textMuted,
    fontFamily: fonts.nunitoMedium,
    fontSize: 13,
  },
  skipPlaceholder: {
    width: 32,
  },
});
