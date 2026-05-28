import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import type {ImageSourcePropType} from 'react-native';

type TabRouteName =
  | 'Explore'
  | 'Map'
  | 'Quiz'
  | 'Guide'
  | 'Saved';

const icons: Record<TabRouteName, ImageSourcePropType> = {
  Explore: require('../../assets/images/wiild-moodtrailss-explore.png'),
  Map: require('../../assets/images/wiild-moodtrailss-map.png'),
  Quiz: require('../../assets/images/wiild-moodtrailss-quiz.png'),
  Guide: require('../../assets/images/wiild-moodtrailss-guide.png'),
  Saved: require('../../assets/images/wiild-moodtrailss-saved.png'),
};

type Props = {
  route: TabRouteName;
  isFocused: boolean;
};

const ICON_SIZE = 24;

export function WiildMoodtrailssTabIcon({route, isFocused}: Props) {
  return (
    <View style={styles.iconFrame}>
      <Image
        source={icons[route]}
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

export {WiildMoodtrailssTabIcon as TabIcon};

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
