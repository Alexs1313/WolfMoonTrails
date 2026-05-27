import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {WlffMuddTraillsTabBarLayout, WlffMuddTraillsTabItems} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';
import type {WlffMuddTraillsTabRouteName} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';
import {WlffMuddTraillsTabIcon} from './WlffMuddTraillsTabIcon';

export function WlffMuddTraillsAppTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBar, {paddingBottom: Math.max(insets.bottom, 8)}]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const {options} = descriptors[route.key];
        const tab = WlffMuddTraillsTabItems.find(item => item.route === route.name);
        const label =
          (options.tabBarLabel as string) ??
          options.title ??
          tab?.label ??
          route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            onPress={onPress}
            style={styles.tabItem}>
            <WlffMuddTraillsTabIcon route={route.name as WlffMuddTraillsTabRouteName} isFocused={isFocused} />
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
              {String(label).toUpperCase()}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#070C1A',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#1E2D4A',
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabLabel: {
    marginTop: WlffMuddTraillsTabBarLayout.iconLabelGap,
    fontSize: 9,
    fontWeight: '600',
    fontFamily: 'Montserrat-Medium',
    color: '#3A4560',
  },
  tabLabelActive: {
    color: '#FF6B1A',
  },
});
