import type {ImageSourcePropType} from 'react-native';

export const WiildMoodtrailssGuideAnimalImages = {
  wolf: require('../../assets/images/wiild-moodtrailss-wolf.png'),
  'brown-bear': require('../../assets/images/wiild-moodtrailss-brown-bear.png'),
  moose: require('../../assets/images/wiild-moodtrailss-moose.png'),
  bison: require('../../assets/images/wiild-moodtrailss-bison.png'),
  'bald-eagle': require('../../assets/images/wiild-moodtrailss-bald-eagle.png'),
  lynx: require('../../assets/images/wiild-moodtrailss-lynx.png'),
  elk: require('../../assets/images/wiild-moodtrailss-elk.png'),
  'red-fox': require('../../assets/images/wiild-moodtrailss-red-fox.png'),
  'mountain-goat': require('../../assets/images/wiild-moodtrailss-mountain-goat.png'),
  'great-horned-owl': require('../../assets/images/wiild-moodtrailss-great-horned-owl.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type WiildMoodtrailssGuideAnimalImageKey =
  keyof typeof WiildMoodtrailssGuideAnimalImages;
