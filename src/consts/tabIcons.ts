import type {ImageSourcePropType} from 'react-native';

import type {TabRouteName} from './routes';
import {Routes} from './routes';

export const tabIcons: Record<TabRouteName, ImageSourcePropType> = {
  [Routes.tabs.explore]: require('../../assets/images/tabs/explore.png'),
  [Routes.tabs.map]: require('../../assets/images/tabs/map.png'),
  [Routes.tabs.quiz]: require('../../assets/images/tabs/quiz.png'),
  [Routes.tabs.guide]: require('../../assets/images/tabs/guide.png'),
  [Routes.tabs.saved]: require('../../assets/images/tabs/saved.png'),
};
