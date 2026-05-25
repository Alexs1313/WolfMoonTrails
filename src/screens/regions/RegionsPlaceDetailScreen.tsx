import React from 'react';
import type {StackScreenProps} from '@react-navigation/stack';

import {Routes} from '../../consts';
import type {RegionsStackParamList} from '../../navigation/types';
import {PlaceDetailScreen} from '../places/PlaceDetailScreen';

type Props = StackScreenProps<
  RegionsStackParamList,
  typeof Routes.regions.detail
>;

export function RegionsPlaceDetailScreen(props: Props) {
  return (
    <PlaceDetailScreen
      navigation={props.navigation as never}
      route={props.route as never}
    />
  );
}
