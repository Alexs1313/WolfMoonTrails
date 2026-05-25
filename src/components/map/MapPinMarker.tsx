import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';

const markerAssetResting = require('../../../assets/images/map/tabler_map-pin-filled.png');
const markerAssetFocused = require('../../../assets/images/map/map_pin.png');

type Props = {
  isFocused: boolean;
  onPress: () => void;
};

const MARKER_WIDTH = 28;
const MARKER_HEIGHT = 36;

export const markerDimensions = {width: MARKER_WIDTH, height: MARKER_HEIGHT};

export function MapPinMarker({isFocused, onPress}: Props) {
  return (
    <Pressable onPress={onPress} hitSlop={10} style={styles.markerFrame}>
      <Image
        source={isFocused ? markerAssetFocused : markerAssetResting}
        style={styles.markerGraphic}
        resizeMode="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  markerFrame: {
    width: MARKER_WIDTH,
    height: MARKER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  markerGraphic: {
    width: MARKER_WIDTH,
    height: MARKER_HEIGHT,
  },
});
