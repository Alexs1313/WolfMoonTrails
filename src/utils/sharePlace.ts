import {Share} from 'react-native';

import type {Place} from '../data';

export async function sharePlace(place: Place): Promise<void> {
  await Share.share({
    message: `${place.title}\n${place.location}\n\n${place.shortDescription}`,
  });
}
