import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {WlffMuddTraillsAppTabBar} from '../WlffMuddTraillsComponents/WlffMuddTraillsIndex';
import {WlffMuddTraillsRoutes, WlffMuddTraillsTabItems} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';
import {WlffMuddTraillsLibraryStack} from './WlffMuddTraillsLibraryStack';
import {WlffMuddTraillsOverviewStack} from './WlffMuddTraillsOverviewStack';
import {WlffMuddTraillsRegionsStack} from './WlffMuddTraillsRegionsStack';
import {WlffMuddTraillsSessionsStack} from './WlffMuddTraillsSessionsStack';
import {WlffMuddTraillsShelfStack} from './WlffMuddTraillsShelfStack';
import type {WlffMuddTraillsTabParamList} from './WlffMuddTraillsTypes';

const WlffMuddTraillsTab = createBottomTabNavigator<WlffMuddTraillsTabParamList>();

const tabStacks = {
  [WlffMuddTraillsRoutes.tabs.explore]: WlffMuddTraillsOverviewStack,
  [WlffMuddTraillsRoutes.tabs.map]: WlffMuddTraillsRegionsStack,
  [WlffMuddTraillsRoutes.tabs.quiz]: WlffMuddTraillsSessionsStack,
  [WlffMuddTraillsRoutes.tabs.guide]: WlffMuddTraillsLibraryStack,
  [WlffMuddTraillsRoutes.tabs.saved]: WlffMuddTraillsShelfStack,
} as const;

export function WlffMuddTraillsTabNavigator() {
  return (
    <WlffMuddTraillsTab.Navigator
      tabBar={props => <WlffMuddTraillsAppTabBar {...props} />}
      screenOptions={{headerShown: false}}>
      {WlffMuddTraillsTabItems.map(({route, label}) => {
        const StackComponent = tabStacks[route];
        return (
          <WlffMuddTraillsTab.Screen
            key={route}
            name={route}
            component={StackComponent}
            options={{tabBarLabel: label}}
          />
        );
      })}
    </WlffMuddTraillsTab.Navigator>
  );
}
