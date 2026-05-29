import type {NavigationProp, ParamListBase} from '@react-navigation/native';

const routes = {
  tabs: {
    map: 'Map',
  },
  regions: {
    main: 'RegionsMain',
  },
} as const;

type WildMapNavigation = {
  getParent: () => NavigationProp<ParamListBase> | undefined;
};

export function WiildMoodtrailssOpenPlaceOnWildMap(
  navigation: WildMapNavigation,
  placeId: string,
): void {
  navigation.getParent()?.navigate(routes.tabs.map, {
    screen: routes.regions.main,
    params: {placeId},
  });
}
