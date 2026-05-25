import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes, colors} from '../../consts';
import {QuizPlayScreen} from '../../screens/sessions/QuizPlayScreen';
import {QuizResultScreen} from '../../screens/sessions/QuizResultScreen';
import {SessionsScreen} from '../../screens/sessions/SessionsScreen';
import type {SessionsStackParamList} from '../types';

const Stack = createStackNavigator<SessionsStackParamList>();

const screenOptions = {
  headerStyle: {backgroundColor: colors.background},
  headerTintColor: colors.text,
  headerTitleStyle: {color: colors.text},
  cardStyle: {backgroundColor: colors.background},
};

export function SessionsStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={Routes.sessions.main}
        component={SessionsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.sessions.quiz}
        component={QuizPlayScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.sessions.result}
        component={QuizResultScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
