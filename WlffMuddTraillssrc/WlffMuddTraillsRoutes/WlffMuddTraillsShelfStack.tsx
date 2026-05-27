import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {WlffMuddTraillsRoutes} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';
import {WlffMuddTraillsPlaceDetailScreen} from '../WlffMuddTraillsScreens/WlffMuddTraillsPlacesScreen';
import {WlffMuddTraillsShelfScreen} from '../WlffMuddTraillsScreens/WlffMuddTraillsSavedScreen';
import type {WlffMuddTraillsShelfStackParamList} from './WlffMuddTraillsTypes';

const WlffMuddTraillsStack = createStackNavigator<WlffMuddTraillsShelfStackParamList>();

const screenOptions = {
  headerStyle: {backgroundColor: '#070C1A'},
  headerTintColor: '#FFFFFF',
  headerTitleStyle: {color: '#FFFFFF'},
  cardStyle: {backgroundColor: '#070C1A'},
};

export function WlffMuddTraillsShelfStack() {
  return (
    <WlffMuddTraillsStack.Navigator screenOptions={screenOptions}>
      <WlffMuddTraillsStack.Screen
        name={WlffMuddTraillsRoutes.shelf.main}
        component={WlffMuddTraillsShelfScreen}
        options={{headerShown: false}}
      />
      <WlffMuddTraillsStack.Screen
        name={WlffMuddTraillsRoutes.shelf.detail}
        component={WlffMuddTraillsPlaceDetailScreen}
        options={{headerShown: false}}
      />
    </WlffMuddTraillsStack.Navigator>
  );
}
