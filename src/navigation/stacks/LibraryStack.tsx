import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes, colors} from '../../consts';
import {AnimalDetailScreen} from '../../screens/library/AnimalDetailScreen';
import {LibraryScreen} from '../../screens/library/LibraryScreen';
import type {LibraryStackParamList} from '../types';

const Stack = createStackNavigator<LibraryStackParamList>();

const screenOptions = {
  headerStyle: {backgroundColor: colors.background},
  headerTintColor: colors.text,
  headerTitleStyle: {color: colors.text},
  cardStyle: {backgroundColor: colors.background},
};

export function LibraryStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={Routes.library.main}
        component={LibraryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.library.detail}
        component={AnimalDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
