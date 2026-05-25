import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {colors, tabIcons} from '../../consts';
import type {TabRouteName} from '../../consts';

type Props = {
  route: TabRouteName;
  focused: boolean;
};

const ICON_SIZE = 24;

export function TabIcon({route, focused}: Props) {
  return (
    <View style={styles.wrap}>
      <Image
        source={tabIcons[route]}
        style={[
          styles.icon,
          {
            tintColor: focused ? colors.primary : colors.textMuted,
            opacity: focused ? 1 : 0.55,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
});
