import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';

import {LoaderSunProgress} from '../../components/loader';
import {colors, fonts} from '../../consts';

const appIcon = require('../../../assets/images/loader/app-icon.png');

export function LoaderScreen() {
  return (
    <ImageBackground
      source={require('../../../assets/images/loader_background.png')}
      style={styles.root}>
      <View style={[styles.content]}>
        <View style={styles.brandBlock}>
          <Image source={appIcon} style={styles.icon} resizeMode="cover" />
          <Text style={styles.wolfMoon}>WOLF MOON</Text>
          <Text style={styles.trails}>TRAILS</Text>
          <Text style={styles.tagline}>Explore. Discover. Survive.</Text>
        </View>

        <View style={styles.loaderBlock}>
          <LoaderSunProgress />
          <Text style={styles.loadingText}>Loading your wilderness…</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moonGlow: {
    position: 'absolute',
    top: '28%',
    alignSelf: 'center',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 215, 56, 0.12)',
  },
  moonGlowInner: {
    position: 'absolute',
    top: '32%',
    alignSelf: 'center',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 170, 0, 0.18)',
  },
  brandBlock: {
    alignItems: 'center',
    gap: 6,
    marginTop: 55,
  },
  icon: {
    width: 116,
    height: 116,
    borderRadius: 20,
    marginBottom: 18,
    shadowColor: '#080E1C',
    shadowOffset: {width: -2, height: 10},
    shadowOpacity: 0.9,
    shadowRadius: 19,
    elevation: 12,
  },
  wolfMoon: {
    color: colors.primary,
    fontFamily: fonts.montserratBold,
    fontSize: 11,
    letterSpacing: 6,
    textAlign: 'center',
    marginTop: 30,
  },
  trails: {
    color: colors.heading,
    fontFamily: fonts.montserratBlack,
    fontSize: 40,
    letterSpacing: 3,
    lineHeight: 40,
    textAlign: 'center',
  },
  tagline: {
    marginTop: 4,
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 13,
    letterSpacing: 1,
    textAlign: 'center',
  },
  loaderBlock: {
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    color: colors.textMuted,
    fontFamily: fonts.nunitoRegular,
    fontSize: 11,
    lineHeight: 16.5,
  },
  bottomFade: {
    ...StyleSheet.absoluteFillObject,
  },
  mountains: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 180,
  },
  mountainBack: {
    position: 'absolute',
    left: -40,
    right: -40,
    bottom: 0,
    height: 120,
    backgroundColor: '#0A1020',
    transform: [{skewX: '-12deg'}],
    borderTopLeftRadius: 40,
    borderTopRightRadius: 60,
  },
  mountainFront: {
    position: 'absolute',
    left: -20,
    right: -20,
    bottom: 0,
    height: 90,
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 32,
  },
});
