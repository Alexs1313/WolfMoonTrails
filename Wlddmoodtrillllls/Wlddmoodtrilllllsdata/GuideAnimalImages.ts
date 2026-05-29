import type {ImageSourcePropType} from 'react-native';

export const WiildMoodtrailssGuideAnimalImages = {
  wolf: require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-wolf.png'),
  'brown-bear': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-brown-bear.png'),
  moose: require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-moose.png'),
  bison: require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-bison.png'),
  'bald-eagle': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-bald-eagle.png'),
  lynx: require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-lynx.png'),
  elk: require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-elk.png'),
  'red-fox': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-red-fox.png'),
  'mountain-goat': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-mountain-goat.png'),
  'great-horned-owl': require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-great-horned-owl.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type WiildMoodtrailssGuideAnimalImageKey =
  keyof typeof WiildMoodtrailssGuideAnimalImages;
