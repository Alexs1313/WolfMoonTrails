import type {ImageSourcePropType} from 'react-native';

import type {WlffMuddTraillsTabRouteName} from './WlffMuddTraillsRoutes';
import {WlffMuddTraillsRoutes} from './WlffMuddTraillsRoutes';

export const WlffMuddTraillsTabIcons: Record<WlffMuddTraillsTabRouteName, ImageSourcePropType> = {
  [WlffMuddTraillsRoutes.tabs.explore]: require('../../assets/images/explore.png'),
  [WlffMuddTraillsRoutes.tabs.map]: require('../../assets/images/map.png'),
  [WlffMuddTraillsRoutes.tabs.quiz]: require('../../assets/images/quiz.png'),
  [WlffMuddTraillsRoutes.tabs.guide]: require('../../assets/images/guide.png'),
  [WlffMuddTraillsRoutes.tabs.saved]: require('../../assets/images/saved.png'),
};
