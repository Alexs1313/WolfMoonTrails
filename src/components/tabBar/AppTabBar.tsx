import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {colors, tabBarLayout, tabItems} from '../../consts';
import type {TabRouteName} from '../../consts';
import {TabIcon} from './TabIcon';

export function AppTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, {paddingBottom: Math.max(insets.bottom, 8)}]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const {options} = descriptors[route.key];
        const tab = tabItems.find(item => item.route === route.name);
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
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={focused ? {selected: true} : {}}
            onPress={onPress}
            style={styles.item}>
            <TabIcon route={route.name as TabRouteName} focused={focused} />
            <Text style={[styles.label, focused && styles.labelActive]}>
              {String(label).toUpperCase()}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    marginTop: tabBarLayout.iconLabelGap,
    fontSize: 9,
    fontWeight: '600',
    fontFamily: 'Montserrat-Medium',
    color: colors.textMuted,
  },
  labelActive: {
    color: colors.primary,
  },
});
