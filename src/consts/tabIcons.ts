import type {ImageSourcePropType} from 'react-native';

import type {TabRouteName} from './routes';
import {Routes} from './routes';

export const tabIcons: Record<TabRouteName, ImageSourcePropType> = {
  [Routes.tabs.overview]: require('../../assets/images/tabs/overview.png'),
  [Routes.tabs.regions]: require('../../assets/images/tabs/regions.png'),
  [Routes.tabs.sessions]: require('../../assets/images/tabs/sessions.png'),
  [Routes.tabs.library]: require('../../assets/images/tabs/library.png'),
  [Routes.tabs.shelf]: require('../../assets/images/tabs/shelf.png'),
};
