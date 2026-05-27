import type {NavigationProp, ParamListBase} from '@react-navigation/native';

import {WlffMuddTraillsRoutes} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';

type WlffMuddTraillsWildMapNavigation = {
  getParent: () => NavigationProp<ParamListBase> | undefined;
};

export function WlffMuddTraillsOpenPlaceOnWildMap(
  navigation: WlffMuddTraillsWildMapNavigation,
  placeId: string,
): void {
  navigation.getParent()?.navigate(WlffMuddTraillsRoutes.tabs.map, {
    screen: WlffMuddTraillsRoutes.regions.main,
    params: {placeId},
  });
}
