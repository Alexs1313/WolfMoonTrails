import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {AppTabBar} from '../components';
import {Routes, tabItems} from '../consts';
import {
  LibraryStack,
  OverviewStack,
  RegionsStack,
  SessionsStack,
  ShelfStack,
} from './stacks';
import type {TabParamList} from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const tabStacks = {
  [Routes.tabs.explore]: OverviewStack,
  [Routes.tabs.map]: RegionsStack,
  [Routes.tabs.quiz]: SessionsStack,
  [Routes.tabs.guide]: LibraryStack,
  [Routes.tabs.saved]: ShelfStack,
} as const;

export function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <AppTabBar {...props} />}
      screenOptions={{headerShown: false}}>
      {tabItems.map(({route, label}) => {
        const StackComponent = tabStacks[route];
        return (
          <Tab.Screen
            key={route}
            name={route}
            component={StackComponent}
            options={{tabBarLabel: label}}
          />
        );
      })}
    </Tab.Navigator>
  );
}
