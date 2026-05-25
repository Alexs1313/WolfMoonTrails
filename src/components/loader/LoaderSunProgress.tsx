import React from 'react';
import {StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';

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

export function LoaderSunProgress() {
  return (
    <View style={styles.progressFrame}>
      <WebView
        source={{html: LOADER_HTML}}
        style={styles.progressSurface}
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

const styles = StyleSheet.create({
  progressFrame: {
    width: PROGRESS_WIDTH,
    height: PROGRESS_HEIGHT,
    overflow: 'hidden',
  },
  progressSurface: {
    width: PROGRESS_WIDTH,
    height: PROGRESS_HEIGHT,
    backgroundColor: 'transparent',
  },
});
