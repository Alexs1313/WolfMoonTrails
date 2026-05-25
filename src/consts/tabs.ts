import {Routes, type TabRouteName} from './routes';

export type TabConfig = {
  route: TabRouteName;
  label: string;
};

export const tabItems: TabConfig[] = [
  {route: Routes.tabs.explore, label: 'Explore'},
  {route: Routes.tabs.map, label: 'Map'},
  {route: Routes.tabs.quiz, label: 'Quiz'},
  {route: Routes.tabs.guide, label: 'Guide'},
  {route: Routes.tabs.saved, label: 'Saved'},
];
