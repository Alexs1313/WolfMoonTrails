import type {ImageSourcePropType} from 'react-native';

export const guideAnimalImages = {
  wolf: require('../../assets/images/guide/animals/wolf.png'),
  'brown-bear': require('../../assets/images/guide/animals/brown-bear.png'),
  moose: require('../../assets/images/guide/animals/moose.png'),
  bison: require('../../assets/images/guide/animals/bison.png'),
  'bald-eagle': require('../../assets/images/guide/animals/bald-eagle.png'),
  lynx: require('../../assets/images/guide/animals/lynx.png'),
  elk: require('../../assets/images/guide/animals/elk.png'),
  'red-fox': require('../../assets/images/guide/animals/red-fox.png'),
  'mountain-goat': require('../../assets/images/guide/animals/mountain-goat.png'),
  'great-horned-owl': require('../../assets/images/guide/animals/great-horned-owl.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type GuideAnimalImageKey = keyof typeof guideAnimalImages;
