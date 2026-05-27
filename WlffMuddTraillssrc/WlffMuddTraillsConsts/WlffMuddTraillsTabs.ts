import {WlffMuddTraillsRoutes, type WlffMuddTraillsTabRouteName} from './WlffMuddTraillsRoutes';

export type WlffMuddTraillsTabConfig = {
  route: WlffMuddTraillsTabRouteName;
  label: string;
};

export const WlffMuddTraillsTabItems: WlffMuddTraillsTabConfig[] = [
  {route: WlffMuddTraillsRoutes.tabs.explore, label: 'Explore'},
  {route: WlffMuddTraillsRoutes.tabs.map, label: 'Map'},
  {route: WlffMuddTraillsRoutes.tabs.quiz, label: 'Quiz'},
  {route: WlffMuddTraillsRoutes.tabs.guide, label: 'Guide'},
  {route: WlffMuddTraillsRoutes.tabs.saved, label: 'Saved'},
];
