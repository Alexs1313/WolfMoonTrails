import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';

const mapPinDefault = require('../../../assets/images/map/tabler_map-pin-filled.png');
const mapPinSelected = require('../../../assets/images/map/map_pin.png');

type Props = {
  selected: boolean;
  onPress: () => void;
};

const PIN_WIDTH = 28;
const PIN_HEIGHT = 36;

export const mapPinSize = {width: PIN_WIDTH, height: PIN_HEIGHT};

export function MapPinMarker({selected, onPress}: Props) {
  return (
    <Pressable onPress={onPress} hitSlop={10} style={styles.wrap}>
      <Image
        source={selected ? mapPinSelected : mapPinDefault}
        style={styles.icon}
        resizeMode="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: PIN_WIDTH,
    height: PIN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    width: PIN_WIDTH,
    height: PIN_HEIGHT,
  },
});
