import type {ImageSourcePropType} from 'react-native';

export const placeImages = {
  'lamar-valley': require('../../assets/images/places/lamar-valley.png'),
  'northern-range': require('../../assets/images/places/northern-range.png'),
  'isle-royale-national-park': require('../../assets/images/places/isle-royale-national-park.png'),
  'bavarian-forest-national-park': require('../../assets/images/places/bavarian-forest-national-park.png'),
  'algonquin-provincial-park': require('../../assets/images/places/algonquin-provincial-park.png'),
  'brooks-falls': require('../../assets/images/places/brooks-falls.png'),
  'chinitna-bay': require('../../assets/images/places/chinitna-bay.png'),
  'crescent-lake': require('../../assets/images/places/crescent-lake.png'),
  'grand-teton-national-park': require('../../assets/images/places/grand-teton-national-park.png'),
  'hayden-valley': require('../../assets/images/places/hayden-valley.png'),
  'hayden-valley-forest-giants': require('../../assets/images/places/hayden-valley-forest-giants.png'),
  'elk-island-national-park': require('../../assets/images/places/elk-island-national-park.png'),
  'grand-teton-national-park-forest-giants': require('../../assets/images/places/grand-teton-national-park-forest-giants.png'),
  'jasper-national-park': require('../../assets/images/places/jasper-national-park.png'),
  'moose-area': require('../../assets/images/places/moose-area.png'),
  'hawk-mountain-sanctuary': require('../../assets/images/places/hawk-mountain-sanctuary.png'),
  'hawk-hill': require('../../assets/images/places/hawk-hill.png'),
  'falsterbo-bird-observatory': require('../../assets/images/places/falsterbo-bird-observatory.png'),
  'south-flommen': require('../../assets/images/places/south-flommen.png'),
  'capitol-reef-country': require('../../assets/images/places/capitol-reef-country.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type PlaceImageKey = keyof typeof placeImages;
