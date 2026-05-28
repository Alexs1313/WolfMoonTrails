import {Share} from 'react-native';

import type {WiildMoodtrailssPlace} from '../data';

export async function WiildMoodtrailssSharePlace(place: WiildMoodtrailssPlace): Promise<void> {
  await Share.share({
    message: `${place.title}\n${place.location}\n\n${place.shortDescription}`,
  });
}
