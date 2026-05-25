import type {ImageSourcePropType} from 'react-native';

export type IntroStep = {
  id: string;
  title: string;
  body: string;
  image: ImageSourcePropType;
  actionLabel: string;
  showSkip: boolean;
};

export const INTRO_STEP_COUNT = 5;

export const introSteps: IntroStep[] = [
  {
    id: 'step-1',
    title: 'Discover Wild Nature',
    body: 'Explore scenic wilderness places that welcome travelers and reveal unforgettable wildlife moments.',
    image: require('../../assets/images/onboarding/step-1.png'),
    actionLabel: 'Continue',
    showSkip: true,
  },
  {
    id: 'step-2',
    title: 'Find Wild Trails',
    body: 'Browse carefully selected destinations, natural routes, and wildlife-friendly landscapes open to visitors.',
    image: require('../../assets/images/onboarding/step-2.png'),
    actionLabel: 'Next',
    showSkip: true,
  },
  {
    id: 'step-3',
    title: 'Stay Smart Outdoors',
    body: 'Understand how to behave around wolves, bears, and other wild animals before starting your journey.',
    image: require('../../assets/images/onboarding/step-3.png'),
    actionLabel: 'Next',
    showSkip: false,
  },
  {
    id: 'step-4',
    title: 'Know the Wild Better',
    body: 'Learn about animal behavior, safe distances, and useful travel tips for remote natural places.',
    image: require('../../assets/images/onboarding/step-4.png'),
    actionLabel: 'Next',
    showSkip: true,
  },
  {
    id: 'step-5',
    title: 'Build Your Wild List',
    body: 'Save your favorite spots, return to them anytime, and plan your next wilderness adventure.',
    image: require('../../assets/images/onboarding/step-5.png'),
    actionLabel: 'Get Started',
    showSkip: false,
  },
];
