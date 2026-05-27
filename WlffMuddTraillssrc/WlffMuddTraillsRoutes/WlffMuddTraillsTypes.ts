import type {NavigatorScreenParams} from '@react-navigation/native';

import {WlffMuddTraillsRoutes} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';

export type WlffMuddTraillsOverviewStackParamList = {
  [WlffMuddTraillsRoutes.overview.main]: undefined;
  [WlffMuddTraillsRoutes.overview.detail]: {id: string};
};

export type WlffMuddTraillsRegionsStackParamList = {
  [WlffMuddTraillsRoutes.regions.main]: {placeId?: string} | undefined;
  [WlffMuddTraillsRoutes.regions.detail]: {id: string};
};

export type WlffMuddTraillsSessionsStackParamList = {
  [WlffMuddTraillsRoutes.sessions.main]: undefined;
  [WlffMuddTraillsRoutes.sessions.quiz]: {levelId: string};
  [WlffMuddTraillsRoutes.sessions.result]: {levelId: string; correctCount: number};
};

export type WlffMuddTraillsLibraryStackParamList = {
  [WlffMuddTraillsRoutes.library.main]: undefined;
  [WlffMuddTraillsRoutes.library.detail]: {id: string};
};

export type WlffMuddTraillsShelfStackParamList = {
  [WlffMuddTraillsRoutes.shelf.main]: undefined;
  [WlffMuddTraillsRoutes.shelf.detail]: {id: string};
};

export type WlffMuddTraillsTabParamList = {
  [WlffMuddTraillsRoutes.tabs.explore]: NavigatorScreenParams<WlffMuddTraillsOverviewStackParamList>;
  [WlffMuddTraillsRoutes.tabs.map]: NavigatorScreenParams<WlffMuddTraillsRegionsStackParamList>;
  [WlffMuddTraillsRoutes.tabs.quiz]: NavigatorScreenParams<WlffMuddTraillsSessionsStackParamList>;
  [WlffMuddTraillsRoutes.tabs.guide]: NavigatorScreenParams<WlffMuddTraillsLibraryStackParamList>;
  [WlffMuddTraillsRoutes.tabs.saved]: NavigatorScreenParams<WlffMuddTraillsShelfStackParamList>;
};

export type WlffMuddTraillsRootStackParamList = {
  [WlffMuddTraillsRoutes.root.loader]: undefined;
  [WlffMuddTraillsRoutes.root.intro]: undefined;
  [WlffMuddTraillsRoutes.root.main]: NavigatorScreenParams<WlffMuddTraillsTabParamList>;
};
