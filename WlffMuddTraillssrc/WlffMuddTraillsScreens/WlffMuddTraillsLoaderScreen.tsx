import React, {useEffect} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import WebView from 'react-native-webview';

import {WlffMuddTraillsLOADER_DURATION_MS, WlffMuddTraillsRoutes} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';
import type {WlffMuddTraillsRootStackParamList} from '../WlffMuddTraillsRoutes/WlffMuddTraillsTypes';

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

function WlffMuddTraillsLoaderSunProgress() {
  return (
    <View style={styles.wlffMuddTraillsLoaderSunProgressProgressFrame}>
      <WebView
        source={{html: LOADER_HTML}}
        style={styles.wlffMuddTraillsLoaderSunProgressProgressSurface}
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

type WlffMuddTraillsLoaderScreenProps = StackScreenProps<
  WlffMuddTraillsRootStackParamList,
  typeof WlffMuddTraillsRoutes.root.loader
>;

const appIcon = require('../../assets/images/loader_icon.png');

export function WlffMuddTraillsLoaderScreen({
  navigation,
}: WlffMuddTraillsLoaderScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: WlffMuddTraillsRoutes.root.intro}],
      });
    }, WlffMuddTraillsLOADER_DURATION_MS);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../assets/images/loader_background.png')}
      style={styles.wlffMuddTraillsLoaderScreenScreenLayout}>
      <View style={styles.wlffMuddTraillsLoaderScreenContentColumn}>
        <View style={styles.wlffMuddTraillsLoaderScreenBrandBlock}>
          <Image
            source={appIcon}
            style={styles.wlffMuddTraillsLoaderScreenBrandIcon}
            resizeMode="cover"
          />
        </View>

        <View style={styles.wlffMuddTraillsLoaderScreenProgressBlock}>
          <WlffMuddTraillsLoaderSunProgress />
          <Text style={styles.wlffMuddTraillsLoaderScreenStatusMessage}>
            Loading your wilderness…
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wlffMuddTraillsLoaderSunProgressProgressFrame: {
    width: PROGRESS_WIDTH,
    height: PROGRESS_HEIGHT,
    overflow: 'hidden',
  },
  wlffMuddTraillsLoaderSunProgressProgressSurface: {
    width: PROGRESS_WIDTH,
    height: PROGRESS_HEIGHT,
    backgroundColor: 'transparent',
  },
  wlffMuddTraillsLoaderScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  wlffMuddTraillsLoaderScreenContentColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsLoaderScreenBrandBlock: {
    alignItems: 'center',
    gap: 6,
    marginTop: 55,
  },
  wlffMuddTraillsLoaderScreenBrandIcon: {
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
  wlffMuddTraillsLoaderScreenAccentBrandLine: {
    color: '#FF6B1A',
    fontFamily: 'Montserrat-Bold',
    fontSize: 11,
    letterSpacing: 6,
    textAlign: 'center',
    marginTop: 30,
  },
  wlffMuddTraillsLoaderScreenProductNameLine: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Black',
    fontSize: 40,
    letterSpacing: 3,
    lineHeight: 40,
    textAlign: 'center',
  },
  wlffMuddTraillsLoaderScreenTagline: {
    marginTop: 4,
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    letterSpacing: 1,
    textAlign: 'center',
  },
  wlffMuddTraillsLoaderScreenProgressBlock: {
    alignItems: 'center',
    gap: 10,
    position: 'absolute',
    bottom: 50,
  },
  wlffMuddTraillsLoaderScreenStatusMessage: {
    color: '#ffffff',
    fontFamily: 'Nunito-Regular',
    fontSize: 11,
    lineHeight: 16.5,
  },
});
