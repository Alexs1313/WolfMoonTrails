import type {ImageSourcePropType} from 'react-native';

export const PlaceImages = {
  'lamar-valley': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-lamar-valley.png'),
  'northern-range': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-northern-range.png'),
  'isle-royale-national-park': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-isle-royale-national-park.png'),
  'bavarian-forest-national-park': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-bavarian-forest-national-park.png'),
  'algonquin-provincial-park': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-algonquin-provincial-park.png'),
  'brooks-falls': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-brooks-falls.png'),
  'chinitna-bay': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-chinitna-bay.png'),
  'crescent-lake': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-crescent-lake.png'),
  'grand-teton-national-park': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-grand-teton-national-park.png'),
  'hayden-valley': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-hayden-valley.png'),
  'hayden-valley-forest-giants': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-hayden-valley-forest-giants.png'),
  'elk-island-national-park': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-elk-island-national-park.png'),
  'grand-teton-national-park-forest-giants': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-grand-teton-national-park-forest-giants.png'),
  'jasper-national-park': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-jasper-national-park.png'),
  'moose-area': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-moose-area.png'),
  'hawk-mountain-sanctuary': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-hawk-mountain-sanctuary.png'),
  'hawk-hill': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-hawk-hill.png'),
  'falsterbo-bird-observatory': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-falsterbo-bird-observatory.png'),
  'south-flommen': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-south-flommen.png'),
  'capitol-reef-country': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-capitol-reef-country.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type PlaceImageKey = keyof typeof PlaceImages;
