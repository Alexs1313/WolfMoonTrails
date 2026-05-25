import {Routes, type TabRouteName} from './routes';

export type TabConfig = {
  route: TabRouteName;
  label: string;
};

export const tabItems: TabConfig[] = [
  {route: Routes.tabs.overview, label: 'Explore'},
  {route: Routes.tabs.regions, label: 'Map'},
  {route: Routes.tabs.sessions, label: 'Quiz'},
  {route: Routes.tabs.library, label: 'Guide'},
  {route: Routes.tabs.shelf, label: 'Saved'},
];
