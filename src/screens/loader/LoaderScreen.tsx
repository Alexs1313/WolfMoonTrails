import React, {useEffect} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';

import {LoaderSunProgress} from '../../components/loader';
import {LOADER_DURATION_MS, Routes, colors, fonts} from '../../consts';
import type {RootStackParamList} from '../../navigation/types';

type Props = StackScreenProps<RootStackParamList, typeof Routes.root.loader>;

const appIcon = require('../../../assets/images/loader_icon.png');

export function LoaderScreen({navigation}: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: Routes.root.intro}],
      });
    }, LOADER_DURATION_MS);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../../assets/images/loader_background.png')}
      style={styles.screenLayout}>
      <View style={styles.contentColumn}>
        <View style={styles.brandBlock}>
          <Image source={appIcon} style={styles.brandIcon} resizeMode="cover" />
          <Text style={styles.accentBrandLine}>WILD MOOD</Text>
          <Text style={styles.productNameLine}>TRAILS</Text>
          <Text style={styles.tagline}>Explore. Discover. Learn.</Text>
        </View>

        <View style={styles.progressBlock}>
          <LoaderSunProgress />
          <Text style={styles.statusMessage}>Loading your wilderness…</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screenLayout: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandBlock: {
    alignItems: 'center',
    gap: 6,
    marginTop: 55,
  },
  brandIcon: {
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
  accentBrandLine: {
    color: colors.primary,
    fontFamily: fonts.montserratBold,
    fontSize: 11,
    letterSpacing: 6,
    textAlign: 'center',
    marginTop: 30,
  },
  productNameLine: {
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
  progressBlock: {
    alignItems: 'center',
    gap: 10,
  },
  statusMessage: {
    color: colors.textMuted,
    fontFamily: fonts.nunitoRegular,
    fontSize: 11,
    lineHeight: 16.5,
  },
});
