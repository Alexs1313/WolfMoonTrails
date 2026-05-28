import React, {useEffect} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import WebView from 'react-native-webview';

import {useAppDispatch, useAppSelector} from '../app/hooks';
import {loadIntroCompleted} from '../app/slices/introSlice';

type WiildMoodtrailssRootStackParamList = {
  Loader: undefined;
  Intro: undefined;
  Main: any;
};

const LOADER_DURATION_MS = 5000;

const LOADER_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
  />
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    html,
    body {
      width: 100%;
      height: 100%;
      background: transparent;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .loader {
      width: 80px;
      height: 40px;
      border-radius: 100px 100px 0 0;
      position: relative;
      overflow: hidden;
    }
    .loader:before {
      content: "";
      position: absolute;
      inset: 0 0 -100%;
      background:
        radial-gradient(farthest-side, #ffd738 80%, #0000) left 70% top 20% / 15px 15px,
        radial-gradient(farthest-side, #020308 92%, #0000) left 65% bottom 19% / 12px 12px,
        radial-gradient(farthest-side, #ecfefe 92%, #0000) left 70% bottom 20% / 15px 15px,
        linear-gradient(#9eddfe 50%, #020308 0);
      background-repeat: no-repeat;
      animation: l5 2s infinite;
    }
    @keyframes l5 {
      0%,
      20% {
        transform: rotate(0);
      }
      40%,
      60% {
        transform: rotate(0.5turn);
      }
      80%,
      100% {
        transform: rotate(1turn);
      }
    }
  </style>
</head>
<body>
  <div class="loader"></div>
</body>
</html>`;

const PROGRESS_WIDTH = 80;
const PROGRESS_HEIGHT = 90;

function LoaderSunProgress() {
  return (
    <View
      style={
        styles.wiildMoodtrailssLoaderSunProgressProgressFrame
      }>
      <WebView
        source={{html: LOADER_HTML}}
        style={
          styles.wiildMoodtrailssLoaderSunProgressProgressSurface
        }
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        nestedScrollEnabled={false}
        pointerEvents="none"
        originWhitelist={['*']}
        javaScriptEnabled={false}
        transparent
      />
    </View>
  );
}

type WiildMoodtrailssLoaderScreenProps = StackScreenProps<
  WiildMoodtrailssRootStackParamList,
  'Loader'
>;

const appIcon = require('../../assets/images/wiild-moodtrailss-loader_icon.png');

export function WiildMoodtrailssLoaderScreen({
  navigation,
}: WiildMoodtrailssLoaderScreenProps) {
  const dispatch = useAppDispatch();
  const introStatus = useAppSelector(state => state.intro.status);

  useEffect(() => {
    if (introStatus === 'idle') {
      dispatch(loadIntroCompleted());
    }
  }, [dispatch, introStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Intro'}],
      });
    }, LOADER_DURATION_MS);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../assets/images/wiild-moodtrailss-loader_background.png')}
      style={styles.wiildMoodtrailssLoaderScreenScreenLayout}>
      <View style={styles.wiildMoodtrailssLoaderScreenContentColumn}>
        <View style={styles.wiildMoodtrailssLoaderScreenBrandBlock}>
          <Image
            source={appIcon}
            style={styles.wiildMoodtrailssLoaderScreenBrandIcon}
            resizeMode="cover"
          />
        </View>

        <View style={styles.wiildMoodtrailssLoaderScreenProgressBlock}>
          <LoaderSunProgress />
          <Text style={styles.wiildMoodtrailssLoaderScreenStatusMessage}>
            Loading your wilderness…
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wiildMoodtrailssLoaderSunProgressProgressFrame: {
    width: PROGRESS_WIDTH,
    height: PROGRESS_HEIGHT,
    overflow: 'hidden',
  },
  wiildMoodtrailssLoaderSunProgressProgressSurface: {
    width: PROGRESS_WIDTH,
    height: PROGRESS_HEIGHT,
    backgroundColor: 'transparent',
  },
  wiildMoodtrailssLoaderScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  wiildMoodtrailssLoaderScreenContentColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssLoaderScreenBrandBlock: {
    alignItems: 'center',
    gap: 6,
    marginTop: 55,
  },
  wiildMoodtrailssLoaderScreenBrandIcon: {
    width: 116,
    height: 116,
    borderRadius: 20,
    bottom: 128,
    shadowColor: '#080E1C',
    shadowOffset: {width: -2, height: 10},
    shadowOpacity: 0.9,
    shadowRadius: 19,
    elevation: 12,
  },
  wiildMoodtrailssLoaderScreenAccentBrandLine: {
    color: '#FF6B1A',
    fontFamily: 'Montserrat-Bold',
    fontSize: 11,
    letterSpacing: 6,
    textAlign: 'center',
    marginTop: 30,
  },
  wiildMoodtrailssLoaderScreenProductNameLine: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Black',
    fontSize: 40,
    letterSpacing: 3,
    lineHeight: 40,
    textAlign: 'center',
  },
  wiildMoodtrailssLoaderScreenTagline: {
    marginTop: 4,
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    letterSpacing: 1,
    textAlign: 'center',
  },
  wiildMoodtrailssLoaderScreenProgressBlock: {
    alignItems: 'center',
    gap: 10,
    position: 'absolute',
    bottom: 50,
  },
  wiildMoodtrailssLoaderScreenStatusMessage: {
    color: '#ffffff',
    fontFamily: 'Nunito-Regular',
    fontSize: 11,
    lineHeight: 16.5,
  },
});
