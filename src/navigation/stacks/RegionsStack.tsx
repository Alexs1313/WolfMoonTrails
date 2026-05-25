import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes, colors} from '../../consts';
import {RegionsPlaceDetailScreen} from '../../screens/regions/RegionsPlaceDetailScreen';
import {RegionsScreen} from '../../screens/regions/RegionsScreen';
import type {RegionsStackParamList} from '../types';

const Stack = createStackNavigator<RegionsStackParamList>();

const screenOptions = {
  headerStyle: {backgroundColor: colors.background},
  headerTintColor: colors.text,
  headerTitleStyle: {color: colors.text},
  cardStyle: {backgroundColor: colors.background},
};

export function RegionsStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={Routes.regions.main}
        component={RegionsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.regions.detail}
        component={RegionsPlaceDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
