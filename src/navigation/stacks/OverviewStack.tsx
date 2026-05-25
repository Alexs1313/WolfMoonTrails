import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes, colors} from '../../consts';
import {PlaceDetailScreen} from '../../screens/places/PlaceDetailScreen';
import {PlacesScreen} from '../../screens/places/PlacesScreen';
import type {OverviewStackParamList} from '../types';

const Stack = createStackNavigator<OverviewStackParamList>();

const screenOptions = {
  headerStyle: {backgroundColor: colors.background},
  headerTintColor: colors.text,
  headerTitleStyle: {color: colors.text},
  cardStyle: {backgroundColor: colors.background},
};

export function OverviewStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={Routes.overview.main}
        component={PlacesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.overview.detail}
        component={PlaceDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
