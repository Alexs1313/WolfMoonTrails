import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {WiildMoodtrailssIntroScreen} from './WilldmoodTralls/screens/IntroScreen';
import {WiildMoodtrailssLoaderScreen} from './WilldmoodTralls/screens/LoaderScreen';
import {WiildMoodtrailssTabNavigator} from './WilldmoodTralls/routes/Tabnav';
import {GradientBackground} from './WilldmoodTralls/components/GradientBackground';

type RootStackParamList = {
  Loader: undefined;
  Intro: undefined;
  Main: undefined;
};

const routes = {
  root: {
    loader: 'Loader',
    intro: 'Intro',
    main: 'Main',
  },
} as const;

const RootStack = createStackNavigator<RootStackParamList>();

function MainWithGradient() {
  return (
    <GradientBackground>
      <WiildMoodtrailssTabNavigator />
    </GradientBackground>
  );
}

export function WiildMoodtrailssRootNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={routes.root.loader}
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: '#070C1A'},
        }}>
        <RootStack.Screen
          name={routes.root.loader}
          component={WiildMoodtrailssLoaderScreen}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name={routes.root.intro}
          component={WiildMoodtrailssIntroScreen}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name={routes.root.main}
          component={MainWithGradient}
          options={{
            gestureEnabled: false,
            cardStyle: {backgroundColor: 'transparent'},
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
