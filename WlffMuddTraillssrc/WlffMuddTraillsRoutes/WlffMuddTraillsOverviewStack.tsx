import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {WlffMuddTraillsRoutes} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';
import {WlffMuddTraillsPlaceDetailScreen, WlffMuddTraillsPlacesScreen} from '../WlffMuddTraillsScreens/WlffMuddTraillsPlacesScreen';
import type {WlffMuddTraillsOverviewStackParamList} from './WlffMuddTraillsTypes';

const WlffMuddTraillsStack = createStackNavigator<WlffMuddTraillsOverviewStackParamList>();

const screenOptions = {
  headerStyle: {backgroundColor: '#070C1A'},
  headerTintColor: '#FFFFFF',
  headerTitleStyle: {color: '#FFFFFF'},
  cardStyle: {backgroundColor: '#070C1A'},
};

export function WlffMuddTraillsOverviewStack() {
  return (
    <WlffMuddTraillsStack.Navigator screenOptions={screenOptions}>
      <WlffMuddTraillsStack.Screen
        name={WlffMuddTraillsRoutes.overview.main}
        component={WlffMuddTraillsPlacesScreen}
        options={{headerShown: false}}
      />
      <WlffMuddTraillsStack.Screen
        name={WlffMuddTraillsRoutes.overview.detail}
        component={WlffMuddTraillsPlaceDetailScreen}
        options={{headerShown: false}}
      />
    </WlffMuddTraillsStack.Navigator>
  );
}
