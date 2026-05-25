import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors, fonts, spacing} from '../../consts';

type Props = {
  onExplore: () => void;
};

export function SavedEmptyState({onExplore}: Props) {
  return (
    <View style={styles.root}>
      <Image
        source={require('../../../assets/images/empty_saved.png')}
        style={styles.wolf}
        resizeMode="contain"
      />
      <Text style={styles.title}>No Wild Spots Saved Yet</Text>
      <Text style={styles.body}>
        Start exploring to find wilderness destinations worth saving for your
        next adventure.
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={onExplore}
        style={({pressed}) => [styles.buttonWrap, pressed && styles.pressed]}>
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{x: 0.15, y: 0}}
          end={{x: 0.85, y: 1}}
          style={styles.button}>
          <Text style={styles.buttonLabel}>Explore Wild Trails →</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
    gap: 14,
  },
  wolf: {
    width: 90,
    height: 90,
    marginTop: 50,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
  },
  body: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 14,
    lineHeight: 22.4,
    textAlign: 'center',
    maxWidth: 290,
  },
  buttonWrap: {
    marginTop: spacing.sm,
    borderRadius: 14,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    width: '55%',
  },
  pressed: {
    opacity: 0.92,
  },
  button: {
    height: 49,

    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 14,
    lineHeight: 21,
  },
});
