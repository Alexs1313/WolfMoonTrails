import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {WiildMoodtrailssTabIcon} from './TabIcon';

type TabRouteName =
  | 'Explore'
  | 'Map'
  | 'Quiz'
  | 'Guide'
  | 'Saved';

const tabItems: {
  route: TabRouteName;
  label: string;
}[] = [
  {route: 'Explore', label: 'Explore'},
  {route: 'Map', label: 'Map'},
  {route: 'Quiz', label: 'Quiz'},
  {route: 'Guide', label: 'Guide'},
  {route: 'Saved', label: 'Saved'},
];

const layout = {
  iconLabelGap: 6,
  paddingBottom: 12,
} as const;

export function WiildMoodtrailssAppTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={[styles.tabBar, {paddingBottom: layout.paddingBottom}]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
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
            <AnimatedTabIcon
              route={route.name as TabRouteName}
              isFocused={isFocused}
            />
            <Text
              style={[
                styles.tabLabel,
                isFocused && styles.tabLabelActive,
              ]}>
              {String(label).toUpperCase()}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export {WiildMoodtrailssAppTabBar as AppTabBar};

function AnimatedTabIcon({
  route,
  isFocused,
}: {
  route: TabRouteName;
  isFocused: boolean;
}) {
  const scale = useSharedValue(isFocused ? 1.06 : 1);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1.08 : 1, {
      damping: 14,
      stiffness: 220,
      mass: 0.6,
    });
  }, [isFocused, scale]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View style={iconStyle}>
      <WiildMoodtrailssTabIcon route={route} isFocused={isFocused} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#070C1A',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#1E2D4A',
    paddingTop: 15,
    paddingBottom: 12,
    height: 90,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabLabel: {
    marginTop: layout.iconLabelGap,
    fontSize: 9,
    fontWeight: '600',
    fontFamily: 'Montserrat-Medium',
    color: '#3A4560',
  },
  tabLabelActive: {
    color: '#FF6B1A',
  },
});
