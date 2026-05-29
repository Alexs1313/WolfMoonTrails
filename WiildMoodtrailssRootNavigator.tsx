import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {WiildMoodtrailssIntroScreen} from './Wlddmoodtrillllls/Wlddmoodtrilllllsscreens/IntroScreen';
import {WiildMoodtrailssLoaderScreen} from './Wlddmoodtrillllls/Wlddmoodtrilllllsscreens/LoaderScreen';
import {WiildMoodtrailssTabNavigator} from './Wlddmoodtrillllls/Wlddmoodtrilllllsroutes/Tabnav';

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
          component={WiildMoodtrailssTabNavigator}
          options={{gestureEnabled: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
