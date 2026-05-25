import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {colors, tabIcons} from '../../consts';
import type {TabRouteName} from '../../consts';

type Props = {
  route: TabRouteName;
  isFocused: boolean;
};

const ICON_SIZE = 24;

export function TabIcon({route, isFocused}: Props) {
  return (
    <View style={styles.iconFrame}>
      <Image
        source={tabIcons[route]}
        style={[
          styles.tabGraphic,
          {
            tintColor: isFocused ? colors.primary : colors.textMuted,
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
