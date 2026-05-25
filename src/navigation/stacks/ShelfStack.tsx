import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes, colors} from '../../consts';
import {PlaceDetailScreen} from '../../screens/places/PlaceDetailScreen';
import {ShelfScreen} from '../../screens/shelf/ShelfScreen';
import type {ShelfStackParamList} from '../types';

const Stack = createStackNavigator<ShelfStackParamList>();

const screenOptions = {
  headerStyle: {backgroundColor: colors.background},
  headerTintColor: colors.text,
  headerTitleStyle: {color: colors.text},
  cardStyle: {backgroundColor: colors.background},
};

export function ShelfStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={Routes.shelf.main}
        component={ShelfScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.shelf.detail}
        component={PlaceDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
