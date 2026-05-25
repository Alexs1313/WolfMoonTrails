import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {LOADER_DURATION_MS, Routes, colors} from '../consts';
import {IntroScreen} from '../screens/intro/IntroScreen';
import {LoaderScreen} from '../screens/loader/LoaderScreen';
import {getIntroCompleted} from '../utils/introStorage';
import {TabNavigator} from './TabNavigator';
import type {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const [introDone, setIntroDone] = useState<boolean | null>(null);
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    getIntroCompleted().then(setIntroDone);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoaderDone(true), LOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!loaderDone || introDone === null) {
    return <LoaderScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={introDone ? Routes.root.main : Routes.root.intro}
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: colors.background},
        }}>
        <Stack.Screen name={Routes.root.intro} component={IntroScreen} />
        <Stack.Screen name={Routes.root.main} component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
