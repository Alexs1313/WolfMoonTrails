import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {WlffMuddTraillsTabIcons} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';
import type {WlffMuddTraillsTabRouteName} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';

type Props = {
  route: WlffMuddTraillsTabRouteName;
  isFocused: boolean;
};

const ICON_SIZE = 24;

export function WlffMuddTraillsTabIcon({route, isFocused}: Props) {
  return (
    <View style={styles.iconFrame}>
      <Image
        source={WlffMuddTraillsTabIcons[route]}
        style={[
          styles.tabGraphic,
          {
            tintColor: isFocused ? '#FF6B1A' : '#3A4560',
            opacity: isFocused ? 1 : 0.55,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconFrame: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabGraphic: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
});
