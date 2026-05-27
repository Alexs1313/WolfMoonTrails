import React from 'react';
import {
  DarkTheme,
  NavigationContainer,
  type Theme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {WlffMuddTraillsRoutes} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';

const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#070C1A',
    card: '#070C1A',
  },
};
import {WlffMuddTraillsIntroScreen} from '../WlffMuddTraillsScreens/WlffMuddTraillsIntroScreen';
import {WlffMuddTraillsLoaderScreen} from '../WlffMuddTraillsScreens/WlffMuddTraillsLoaderScreen';
import {WlffMuddTraillsTabNavigator} from './WlffMuddTraillsTabNavigator';
import type {WlffMuddTraillsRootStackParamList} from './WlffMuddTraillsTypes';

const WlffMuddTraillsStack = createStackNavigator<WlffMuddTraillsRootStackParamList>();

export function WlffMuddTraillsRootNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <WlffMuddTraillsStack.Navigator
        initialRouteName={WlffMuddTraillsRoutes.root.loader}
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: '#070C1A'},
        }}>
        <WlffMuddTraillsStack.Screen
          name={WlffMuddTraillsRoutes.root.loader}
          component={WlffMuddTraillsLoaderScreen}
          options={{gestureEnabled: false}}
        />
        <WlffMuddTraillsStack.Screen
          name={WlffMuddTraillsRoutes.root.intro}
          component={WlffMuddTraillsIntroScreen}
          options={{gestureEnabled: false}}
        />
        <WlffMuddTraillsStack.Screen
          name={WlffMuddTraillsRoutes.root.main}
          component={WlffMuddTraillsTabNavigator}
          options={{gestureEnabled: false}}
        />
      </WlffMuddTraillsStack.Navigator>
    </NavigationContainer>
  );
}
