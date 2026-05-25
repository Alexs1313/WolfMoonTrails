import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors, fonts, spacing} from '../../consts';

type Props = {
  onExplore: () => void;
};

export function SavedEmptyState({onExplore}: Props) {
  return (
    <View style={styles.layout}>
      <Image
        source={require('../../../assets/images/empty_saved.png')}
        style={styles.illustration}
        resizeMode="contain"
      />
      <Text style={styles.heading}>No Wild Spots Saved Yet</Text>
      <Text style={styles.message}>
        Start exploring to find wilderness destinations worth saving for your
        next adventure.
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={onExplore}
        style={({pressed}) => [
          styles.ctaFrame,
          pressed && styles.ctaFramePressed,
        ]}>
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{x: 0.15, y: 0}}
          end={{x: 0.85, y: 1}}
          style={styles.cta}>
          <Text style={styles.ctaLabel}>Explore Wild Trails →</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
    gap: 14,
  },
  illustration: {
    width: 90,
    height: 90,
    marginTop: 50,
  },
  heading: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
  },
  message: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 14,
    lineHeight: 22.4,
    textAlign: 'center',
    maxWidth: 290,
  },
  ctaFrame: {
    marginTop: spacing.sm,
    borderRadius: 14,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    width: '55%',
  },
  ctaFramePressed: {
    opacity: 0.92,
  },
  cta: {
    height: 49,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLabel: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 14,
    lineHeight: 21,
  },
});
