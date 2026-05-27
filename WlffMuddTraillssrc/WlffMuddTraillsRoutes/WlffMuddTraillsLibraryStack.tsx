import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {WlffMuddTraillsRoutes} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';
import {WlffMuddTraillsAnimalDetailScreen, WlffMuddTraillsLibraryScreen} from '../WlffMuddTraillsScreens/WlffMuddTraillsGuideScreen';
import type {WlffMuddTraillsLibraryStackParamList} from './WlffMuddTraillsTypes';

const WlffMuddTraillsStack = createStackNavigator<WlffMuddTraillsLibraryStackParamList>();

const screenOptions = {
  headerStyle: {backgroundColor: '#070C1A'},
  headerTintColor: '#FFFFFF',
  headerTitleStyle: {color: '#FFFFFF'},
  cardStyle: {backgroundColor: '#070C1A'},
};

export function WlffMuddTraillsLibraryStack() {
  return (
    <WlffMuddTraillsStack.Navigator screenOptions={screenOptions}>
      <WlffMuddTraillsStack.Screen
        name={WlffMuddTraillsRoutes.library.main}
        component={WlffMuddTraillsLibraryScreen}
        options={{headerShown: false}}
      />
      <WlffMuddTraillsStack.Screen
        name={WlffMuddTraillsRoutes.library.detail}
        component={WlffMuddTraillsAnimalDetailScreen}
        options={{headerShown: false}}
      />
    </WlffMuddTraillsStack.Navigator>
  );
}
