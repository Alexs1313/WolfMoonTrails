import type {NavigatorScreenParams} from '@react-navigation/native';

import {Routes} from '../consts';

export type OverviewStackParamList = {
  [Routes.overview.main]: undefined;
  [Routes.overview.detail]: {id: string};
};

export type RegionsStackParamList = {
  [Routes.regions.main]: {placeId?: string} | undefined;
  [Routes.regions.detail]: {id: string};
};

export type SessionsStackParamList = {
  [Routes.sessions.main]: undefined;
  [Routes.sessions.quiz]: {levelId: string};
  [Routes.sessions.result]: {levelId: string; correctCount: number};
};

export type LibraryStackParamList = {
  [Routes.library.main]: undefined;
  [Routes.library.detail]: {id: string};
};

export type ShelfStackParamList = {
  [Routes.shelf.main]: undefined;
  [Routes.shelf.detail]: {id: string};
};

export type TabParamList = {
  [Routes.tabs.explore]: NavigatorScreenParams<OverviewStackParamList>;
  [Routes.tabs.map]: NavigatorScreenParams<RegionsStackParamList>;
  [Routes.tabs.quiz]: NavigatorScreenParams<SessionsStackParamList>;
  [Routes.tabs.guide]: NavigatorScreenParams<LibraryStackParamList>;
  [Routes.tabs.saved]: NavigatorScreenParams<ShelfStackParamList>;
};

export type RootStackParamList = {
  [Routes.root.loader]: undefined;
  [Routes.root.intro]: undefined;
  [Routes.root.main]: NavigatorScreenParams<TabParamList>;
};
