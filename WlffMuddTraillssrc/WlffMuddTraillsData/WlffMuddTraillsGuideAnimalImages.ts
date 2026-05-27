import type {ImageSourcePropType} from 'react-native';

export const WlffMuddTraillsGuideAnimalImages = {
  wolf: require('../../assets/images/wolf.png'),
  'brown-bear': require('../../assets/images/brown-bear.png'),
  moose: require('../../assets/images/moose.png'),
  bison: require('../../assets/images/bison.png'),
  'bald-eagle': require('../../assets/images/bald-eagle.png'),
  lynx: require('../../assets/images/lynx.png'),
  elk: require('../../assets/images/elk.png'),
  'red-fox': require('../../assets/images/red-fox.png'),
  'mountain-goat': require('../../assets/images/mountain-goat.png'),
  'great-horned-owl': require('../../assets/images/great-horned-owl.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type WlffMuddTraillsGuideAnimalImageKey = keyof typeof WlffMuddTraillsGuideAnimalImages;
