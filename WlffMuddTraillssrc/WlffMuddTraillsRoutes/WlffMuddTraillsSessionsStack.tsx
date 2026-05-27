import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {WlffMuddTraillsRoutes} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';
import {
  WlffMuddTraillsQuizPlayScreen,
  WlffMuddTraillsQuizResultScreen,
  WlffMuddTraillsSessionsScreen,
} from '../WlffMuddTraillsScreens/WlffMuddTraillsQuizScreen';
import type {WlffMuddTraillsSessionsStackParamList} from './WlffMuddTraillsTypes';

const WlffMuddTraillsStack = createStackNavigator<WlffMuddTraillsSessionsStackParamList>();

const screenOptions = {
  headerStyle: {backgroundColor: '#070C1A'},
  headerTintColor: '#FFFFFF',
  headerTitleStyle: {color: '#FFFFFF'},
  cardStyle: {backgroundColor: '#070C1A'},
};

export function WlffMuddTraillsSessionsStack() {
  return (
    <WlffMuddTraillsStack.Navigator screenOptions={screenOptions}>
      <WlffMuddTraillsStack.Screen
        name={WlffMuddTraillsRoutes.sessions.main}
        component={WlffMuddTraillsSessionsScreen}
        options={{headerShown: false}}
      />
      <WlffMuddTraillsStack.Screen
        name={WlffMuddTraillsRoutes.sessions.quiz}
        component={WlffMuddTraillsQuizPlayScreen}
        options={{headerShown: false}}
      />
      <WlffMuddTraillsStack.Screen
        name={WlffMuddTraillsRoutes.sessions.result}
        component={WlffMuddTraillsQuizResultScreen}
        options={{headerShown: false}}
      />
    </WlffMuddTraillsStack.Navigator>
  );
}
