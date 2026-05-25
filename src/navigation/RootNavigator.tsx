import React from 'react';
import {
  DarkTheme,
  NavigationContainer,
  type Theme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes, colors} from '../consts';

const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.background,
  },
};
import {IntroScreen} from '../screens/intro/IntroScreen';
import {LoaderScreen} from '../screens/loader/LoaderScreen';
import {TabNavigator} from './TabNavigator';
import type {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName={Routes.root.loader}
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: colors.background},
        }}>
        <Stack.Screen
          name={Routes.root.loader}
          component={LoaderScreen}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name={Routes.root.intro}
          component={IntroScreen}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name={Routes.root.main}
          component={TabNavigator}
          options={{gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
