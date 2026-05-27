import {Share} from 'react-native';

import type {WlffMuddTraillsPlace} from '../WlffMuddTraillsData/WlffMuddTraillsIndex';

export async function WlffMuddTraillsSharePlace(place: WlffMuddTraillsPlace): Promise<void> {
  await Share.share({
    message: `${place.title}\n${place.location}\n\n${place.shortDescription}`,
  });
}
