import type {ImageSourcePropType} from 'react-native';

export const WlffMuddTraillsPlaceImages = {
  'lamar-valley': require('../../assets/images/lamar-valley.png'),
  'northern-range': require('../../assets/images/northern-range.png'),
  'isle-royale-national-park': require('../../assets/images/isle-royale-national-park.png'),
  'bavarian-forest-national-park': require('../../assets/images/bavarian-forest-national-park.png'),
  'algonquin-provincial-park': require('../../assets/images/algonquin-provincial-park.png'),
  'brooks-falls': require('../../assets/images/brooks-falls.png'),
  'chinitna-bay': require('../../assets/images/chinitna-bay.png'),
  'crescent-lake': require('../../assets/images/crescent-lake.png'),
  'grand-teton-national-park': require('../../assets/images/grand-teton-national-park.png'),
  'hayden-valley': require('../../assets/images/hayden-valley.png'),
  'hayden-valley-forest-giants': require('../../assets/images/hayden-valley-forest-giants.png'),
  'elk-island-national-park': require('../../assets/images/elk-island-national-park.png'),
  'grand-teton-national-park-forest-giants': require('../../assets/images/grand-teton-national-park-forest-giants.png'),
  'jasper-national-park': require('../../assets/images/jasper-national-park.png'),
  'moose-area': require('../../assets/images/moose-area.png'),
  'hawk-mountain-sanctuary': require('../../assets/images/hawk-mountain-sanctuary.png'),
  'hawk-hill': require('../../assets/images/hawk-hill.png'),
  'falsterbo-bird-observatory': require('../../assets/images/falsterbo-bird-observatory.png'),
  'south-flommen': require('../../assets/images/south-flommen.png'),
  'capitol-reef-country': require('../../assets/images/capitol-reef-country.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type WlffMuddTraillsPlaceImageKey = keyof typeof WlffMuddTraillsPlaceImages;
