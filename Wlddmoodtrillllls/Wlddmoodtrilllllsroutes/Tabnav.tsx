import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {AppTabBar} from '../Wlddmoodtrilllllscomponents';
import {
  WiildMoodtrailssAnimalDetailScreen,
  WiildMoodtrailssLibraryScreen,
} from '../Wlddmoodtrilllllsscreens/GuideScreen';
import {
  WiildMoodtrailssPlaceDetailScreen,
  WiildMoodtrailssPlacesScreen,
} from '../Wlddmoodtrilllllsscreens/PlacesScreen';
import {
  WiildMoodtrailssRegionsPlaceDetailScreen,
  WiildMoodtrailssRegionsScreen,
} from '../Wlddmoodtrilllllsscreens/RegionsScreen';
import {WiildMoodtrailssShelfScreen} from '../Wlddmoodtrilllllsscreens/SavedScreen';
import {
  WiildMoodtrailssQuizPlayScreen,
  WiildMoodtrailssQuizResultScreen,
  WiildMoodtrailssSessionsScreen,
} from '../Wlddmoodtrilllllsscreens/QuizScreen';

type WiildMoodtrailssOverviewStackParamList = {
  OverviewMain: undefined;
  OverviewDetail: {id: string};
};

type WiildMoodtrailssRegionsStackParamList = {
  RegionsMain: {placeId?: string} | undefined;
  RegionsDetail: {id: string};
};

type WiildMoodtrailssSessionsStackParamList = {
  SessionsMain: undefined;
  SessionsQuiz: {levelId: string};
  SessionsResult: {levelId: string; correctCount: number};
};

type WiildMoodtrailssLibraryStackParamList = {
  LibraryMain: undefined;
  LibraryDetail: {id: string};
};

type WiildMoodtrailssShelfStackParamList = {
  ShelfMain: undefined;
  ShelfDetail: {id: string};
};

type WiildMoodtrailssTabParamList = {
  Explore: any;
  Map: any;
  Quiz: any;
  Guide: any;
  Saved: any;
};

const routes = {
  tabs: {
    explore: 'Explore',
    map: 'Map',
    quiz: 'Quiz',
    guide: 'Guide',
    saved: 'Saved',
  },
  overview: {
    main: 'OverviewMain',
    detail: 'OverviewDetail',
  },
  regions: {
    main: 'RegionsMain',
    detail: 'RegionsDetail',
  },
  sessions: {
    main: 'SessionsMain',
    quiz: 'SessionsQuiz',
    result: 'SessionsResult',
  },
  library: {
    main: 'LibraryMain',
    detail: 'LibraryDetail',
  },
  shelf: {
    main: 'ShelfMain',
    detail: 'ShelfDetail',
  },
} as const;

const tabItems: {
  route: (typeof routes.tabs)[keyof typeof routes.tabs];
  label: string;
}[] = [
  {route: routes.tabs.explore, label: 'Explore'},
  {route: routes.tabs.map, label: 'Map'},
  {route: routes.tabs.quiz, label: 'Quiz'},
  {route: routes.tabs.guide, label: 'Guide'},
  {route: routes.tabs.saved, label: 'Saved'},
];

const stackScreenOptions = {
  headerStyle: {backgroundColor: '#070C1A'},
  headerTintColor: '#FFFFFF',
  headerTitleStyle: {color: '#FFFFFF'},
  cardStyle: {backgroundColor: '#070C1A'},
};

const OverviewStack =
  createStackNavigator<WiildMoodtrailssOverviewStackParamList>();
function OverviewStackNavigator() {
  return (
    <OverviewStack.Navigator screenOptions={stackScreenOptions}>
      <OverviewStack.Screen
        name={routes.overview.main}
        component={WiildMoodtrailssPlacesScreen}
        options={{headerShown: false}}
      />
      <OverviewStack.Screen
        name={routes.overview.detail}
        component={WiildMoodtrailssPlaceDetailScreen}
        options={{headerShown: false}}
      />
    </OverviewStack.Navigator>
  );
}

const RegionsStack =
  createStackNavigator<WiildMoodtrailssRegionsStackParamList>();
function RegionsStackNavigator() {
  return (
    <RegionsStack.Navigator screenOptions={stackScreenOptions}>
      <RegionsStack.Screen
        name={routes.regions.main}
        component={WiildMoodtrailssRegionsScreen}
        options={{headerShown: false}}
      />
      <RegionsStack.Screen
        name={routes.regions.detail}
        component={WiildMoodtrailssRegionsPlaceDetailScreen}
        options={{headerShown: false}}
      />
    </RegionsStack.Navigator>
  );
}

const SessionsStack =
  createStackNavigator<WiildMoodtrailssSessionsStackParamList>();
function SessionsStackNavigator() {
  return (
    <SessionsStack.Navigator screenOptions={stackScreenOptions}>
      <SessionsStack.Screen
        name={routes.sessions.main}
        component={WiildMoodtrailssSessionsScreen}
        options={{headerShown: false}}
      />
      <SessionsStack.Screen
        name={routes.sessions.quiz}
        component={WiildMoodtrailssQuizPlayScreen}
        options={{headerShown: false}}
      />
      <SessionsStack.Screen
        name={routes.sessions.result}
        component={WiildMoodtrailssQuizResultScreen}
        options={{headerShown: false}}
      />
    </SessionsStack.Navigator>
  );
}

const LibraryStack =
  createStackNavigator<WiildMoodtrailssLibraryStackParamList>();
function LibraryStackNavigator() {
  return (
    <LibraryStack.Navigator screenOptions={stackScreenOptions}>
      <LibraryStack.Screen
        name={routes.library.main}
        component={WiildMoodtrailssLibraryScreen}
        options={{headerShown: false}}
      />
      <LibraryStack.Screen
        name={routes.library.detail}
        component={WiildMoodtrailssAnimalDetailScreen}
        options={{headerShown: false}}
      />
    </LibraryStack.Navigator>
  );
}

const ShelfStack = createStackNavigator<WiildMoodtrailssShelfStackParamList>();
function ShelfStackNavigator() {
  return (
    <ShelfStack.Navigator screenOptions={stackScreenOptions}>
      <ShelfStack.Screen
        name={routes.shelf.main}
        component={WiildMoodtrailssShelfScreen}
        options={{headerShown: false}}
      />
      <ShelfStack.Screen
        name={routes.shelf.detail}
        component={WiildMoodtrailssPlaceDetailScreen}
        options={{headerShown: false}}
      />
    </ShelfStack.Navigator>
  );
}

const Tab = createBottomTabNavigator<WiildMoodtrailssTabParamList>();
const tabStacks = {
  [routes.tabs.explore]: OverviewStackNavigator,
  [routes.tabs.map]: RegionsStackNavigator,
  [routes.tabs.quiz]: SessionsStackNavigator,
  [routes.tabs.guide]: LibraryStackNavigator,
  [routes.tabs.saved]: ShelfStackNavigator,
} as const;

function renderTabBar(props: any) {
  return <AppTabBar {...props} />;
}

export function WiildMoodtrailssTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{headerShown: false}}>
      {tabItems.map(({route, label}) => {
        const StackComponent = tabStacks[route];
        return (
          <Tab.Screen
            key={route}
            name={route}
            component={StackComponent}
            options={{tabBarLabel: label}}
          />
        );
      })}
    </Tab.Navigator>
  );
}
