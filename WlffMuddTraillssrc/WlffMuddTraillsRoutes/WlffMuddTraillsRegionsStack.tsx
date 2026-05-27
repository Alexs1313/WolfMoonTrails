import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {WlffMuddTraillsRoutes} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';
import {
  WlffMuddTraillsRegionsPlaceDetailScreen,
  WlffMuddTraillsRegionsScreen,
} from '../WlffMuddTraillsScreens/WlffMuddTraillsRegionsScreen';
import type {WlffMuddTraillsRegionsStackParamList} from './WlffMuddTraillsTypes';

const WlffMuddTraillsStack = createStackNavigator<WlffMuddTraillsRegionsStackParamList>();

const screenOptions = {
  headerStyle: {backgroundColor: '#070C1A'},
  headerTintColor: '#FFFFFF',
  headerTitleStyle: {color: '#FFFFFF'},
  cardStyle: {backgroundColor: '#070C1A'},
};

export function WlffMuddTraillsRegionsStack() {
  return (
    <WlffMuddTraillsStack.Navigator screenOptions={screenOptions}>
      <WlffMuddTraillsStack.Screen
        name={WlffMuddTraillsRoutes.regions.main}
        component={WlffMuddTraillsRegionsScreen}
        options={{headerShown: false}}
      />
      <WlffMuddTraillsStack.Screen
        name={WlffMuddTraillsRoutes.regions.detail}
        component={WlffMuddTraillsRegionsPlaceDetailScreen}
        options={{headerShown: false}}
      />
    </WlffMuddTraillsStack.Navigator>
  );
}
