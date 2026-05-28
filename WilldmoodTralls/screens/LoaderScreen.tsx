import React, {useEffect} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      overflow: hidden;
    }

    .loader-wrapper {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .dots-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    }

    .dot {
      height: 20px;
      width: 20px;
      margin-right: 10px;
      border-radius: 10px;
      background-color: #b3d4fc;
      animation: pulse 1.5s infinite ease-in-out;
    }

    .dot:last-child {
      margin-right: 0;
    }

    .dot:nth-child(1) {
      animation-delay: -0.3s;
    }

    .dot:nth-child(2) {
      animation-delay: -0.1s;
    }

    .dot:nth-child(3) {
      animation-delay: 0.1s;
    }

    @keyframes pulse {
      0% {
        transform: scale(0.8);
        background-color: #b3d4fc;
        box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
      }

      50% {
        transform: scale(1.2);
        background-color: #6793fb;
        box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
      }

      100% {
        transform: scale(0.8);
        background-color: #b3d4fc;
        box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
      }
    }
  </style>
</head>
<body>
  <div class="loader-wrapper">
    <section class="dots-container">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </section>
  </div>
</body>
</html>`;

const PROGRESS_WIDTH = 80;
const PROGRESS_HEIGHT = 90;

function LoaderSunProgress() {
  return (
    <View style={styles.wiildMoodtrailssLoaderSunProgressProgressFrame}>
      <WebView
        source={{html: LOADER_HTML}}
        style={styles.wiildMoodtrailssLoaderSunProgressProgressSurface}
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
            source={
              Platform.OS === 'ios'
                ? appIcon
                : require('../../assets/images/andr_iconloader.png')
            }
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
  wiildMoodtrailssLoaderSunProgressProgressSurface: {
    width: 180,
    height: 80,
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
