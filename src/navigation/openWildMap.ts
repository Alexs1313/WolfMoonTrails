import type {NavigationProp, ParamListBase} from '@react-navigation/native';

import {Routes} from '../consts';

type WildMapNavigation = {
  getParent: () => NavigationProp<ParamListBase> | undefined;
};

export function openPlaceOnWildMap(
  navigation: WildMapNavigation,
  placeId: string,
): void {
  navigation.getParent()?.navigate(Routes.tabs.map, {
    screen: Routes.regions.main,
    params: {placeId},
  });
}
