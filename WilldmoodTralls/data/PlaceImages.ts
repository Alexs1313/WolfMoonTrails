import type {ImageSourcePropType} from 'react-native';

export const PlaceImages = {
  'lamar-valley': require('../../assets/images/wiild-moodtrailss-lamar-valley.png'),
  'northern-range': require('../../assets/images/wiild-moodtrailss-northern-range.png'),
  'isle-royale-national-park': require('../../assets/images/wiild-moodtrailss-isle-royale-national-park.png'),
  'bavarian-forest-national-park': require('../../assets/images/wiild-moodtrailss-bavarian-forest-national-park.png'),
  'algonquin-provincial-park': require('../../assets/images/wiild-moodtrailss-algonquin-provincial-park.png'),
  'brooks-falls': require('../../assets/images/wiild-moodtrailss-brooks-falls.png'),
  'chinitna-bay': require('../../assets/images/wiild-moodtrailss-chinitna-bay.png'),
  'crescent-lake': require('../../assets/images/wiild-moodtrailss-crescent-lake.png'),
  'grand-teton-national-park': require('../../assets/images/wiild-moodtrailss-grand-teton-national-park.png'),
  'hayden-valley': require('../../assets/images/wiild-moodtrailss-hayden-valley.png'),
  'hayden-valley-forest-giants': require('../../assets/images/wiild-moodtrailss-hayden-valley-forest-giants.png'),
  'elk-island-national-park': require('../../assets/images/wiild-moodtrailss-elk-island-national-park.png'),
  'grand-teton-national-park-forest-giants': require('../../assets/images/wiild-moodtrailss-grand-teton-national-park-forest-giants.png'),
  'jasper-national-park': require('../../assets/images/wiild-moodtrailss-jasper-national-park.png'),
  'moose-area': require('../../assets/images/wiild-moodtrailss-moose-area.png'),
  'hawk-mountain-sanctuary': require('../../assets/images/wiild-moodtrailss-hawk-mountain-sanctuary.png'),
  'hawk-hill': require('../../assets/images/wiild-moodtrailss-hawk-hill.png'),
  'falsterbo-bird-observatory': require('../../assets/images/wiild-moodtrailss-falsterbo-bird-observatory.png'),
  'south-flommen': require('../../assets/images/wiild-moodtrailss-south-flommen.png'),
  'capitol-reef-country': require('../../assets/images/wiild-moodtrailss-capitol-reef-country.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type PlaceImageKey = keyof typeof PlaceImages;
