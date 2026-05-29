import React, {useCallback} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {useAppDispatch, useAppSelector} from '../Wlddmoodtrilllllsapp/hooks';
import {setIntroCompleted} from '../Wlddmoodtrilllllsapp/Wlddmoodtrilllllsslices/introSlice';
import {uiActions} from '../Wlddmoodtrilllllsapp/Wlddmoodtrilllllsslices/uiSlice';

type RootStackParamList = {
  Loader: undefined;
  Intro: undefined;
  Main: any;
};

const INTRO_STEP_COUNT = 5;

const introSteps = [
  {
    id: 'discover-places',
    title: 'Discover Scenic Places',
    body: 'Explore beautiful natural destinations, peaceful landscapes, and unforgettable outdoor locations.',
    image: require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-step-1.png'),
    actionLabel: 'Continue',
    showSkip: true,
  },
  {
    id: 'find-routes',
    title: 'Find Nature Routes',
    body: 'Browse selected trails, viewpoints, and outdoor areas suitable for travelers and explorers.',
    image: require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-step-2.png'),
    actionLabel: 'Next',
    showSkip: true,
  },
  {
    id: 'explore-outdoors',
    title: 'Explore Outdoors',
    body: 'Prepare for outdoor trips with simple guidance for visiting forests, mountains, and open landscapes.',
    image: require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-step-3.png'),
    actionLabel: 'Next',
    showSkip: false,
  },
  {
    id: 'learn-nature',
    title: 'Learn About Nature',
    body: 'Read helpful information about landscapes, outdoor travel, and natural environments.',
    image: require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-step-4.png'),
    actionLabel: 'Next',
    showSkip: true,
  },
  {
    id: 'save-favorites',
    title: 'Save Favorite Spots',
    body: 'Keep track of places you like, revisit them anytime, and organize future travel ideas.',
    image: require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-step-5.png'),
    actionLabel: 'Get Started',
    showSkip: false,
  },
] as const;

const brandMark = require('../../Wlddmoodtrilllllsassets/Wlddmoodtrilllllsimages/wiild-moodtrailss-logo-wolf.png');

type IntroHeaderProps = {
  showSkip: boolean;
  onSkip?: () => void;
};

function IntroHeader({showSkip, onSkip}: IntroHeaderProps) {
  return (
    <View style={styles.wiildMoodtrailssIntroHeaderHeader}>
      <View style={styles.wiildMoodtrailssIntroHeaderBrand}>
        <Image
          source={brandMark}
          style={styles.wiildMoodtrailssIntroHeaderBrandMark}
          resizeMode="contain"
        />
        <Text style={styles.wiildMoodtrailssIntroHeaderBrandText}>
          WILD MOON
        </Text>
      </View>
      {showSkip ? (
        <Pressable accessibilityRole="button" onPress={onSkip} hitSlop={12}>
          <Text style={styles.wiildMoodtrailssIntroHeaderSkip}>Skip</Text>
        </Pressable>
      ) : (
        <View style={styles.wiildMoodtrailssIntroHeaderSkipPlaceholder} />
      )}
    </View>
  );
}

type IntroPrimaryButtonProps = {
  label: string;
  onPress: () => void;
};

function IntroPrimaryButton({label, onPress}: IntroPrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({pressed}) => [
        styles.wiildMoodtrailssIntroPrimaryButtonShadowFrame,
        pressed && styles.wiildMoodtrailssIntroPrimaryButtonShadowFramePressed,
      ]}>
      <LinearGradient
        colors={['#FF6B1A', '#FF4500']}
        start={{x: 0.15, y: 0}}
        end={{x: 0.85, y: 1}}
        style={styles.wiildMoodtrailssIntroPrimaryButtonGradientSurface}>
        <Text style={styles.wiildMoodtrailssIntroPrimaryButtonActionLabel}>
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

type StepIndicatorProps = {
  activeIndex: number;
  total?: number;
};

function StepIndicator({
  activeIndex,
  total = INTRO_STEP_COUNT,
}: StepIndicatorProps) {
  return (
    <View style={styles.wiildMoodtrailssStepIndicatorMarkerRow}>
      {Array.from({length: total}).map((_, index) => {
        const isCurrent = index === activeIndex;
        return (
          <View
            key={index}
            style={[
              styles.wiildMoodtrailssStepIndicatorStepMarker,
              isCurrent &&
                styles.wiildMoodtrailssStepIndicatorStepMarkerCurrent,
            ]}
          />
        );
      })}
    </View>
  );
}

type WiildMoodtrailssIntroScreenProps = StackScreenProps<
  RootStackParamList,
  'Intro'
>;

export function WiildMoodtrailssIntroScreen({
  navigation,
}: WiildMoodtrailssIntroScreenProps) {
  const dispatch = useAppDispatch();
  const stepIndex = useAppSelector(state => state.ui.intro.stepIndex);
  const step = introSteps[stepIndex];
  const isLastStep = stepIndex === introSteps.length - 1;
  const enter = useSharedValue(1);

  const stepAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: enter.value,
      transform: [{translateY: (1 - enter.value) * 12}],
    };
  });

  const finishIntro = useCallback(async () => {
    await dispatch(setIntroCompleted()).unwrap();
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  }, [dispatch, navigation]);

  const goNext = useCallback(() => {
    if (isLastStep) {
      finishIntro();
      return;
    }
    enter.value = 0;
    dispatch(uiActions.setIntroStepIndex(stepIndex + 1));
    enter.value = withTiming(1, {duration: 240});
  }, [dispatch, finishIntro, isLastStep, stepIndex]);

  return (
    <View style={styles.wiildMoodtrailssIntroScreenScreenLayout}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.wiildMoodtrailssIntroScreenScrollContent}>
        <ImageBackground
          source={step.image}
          style={styles.wiildMoodtrailssIntroScreenBackdrop}
          resizeMode="cover">
          <LinearGradient
            colors={[
              'rgba(7, 12, 26, 0.25)',
              'rgba(7, 12, 26, 0.5)',
              'rgba(7, 12, 26, 0.97)',
            ]}
            locations={[0, 0.35, 0.75]}
            style={styles.wiildMoodtrailssIntroScreenBackdropFade}
          />

          <IntroHeader showSkip={step.showSkip} onSkip={finishIntro} />

          <Animated.View
            style={[
              styles.wiildMoodtrailssIntroScreenCopyColumn,
              stepAnimStyle,
            ]}>
            <Text style={styles.wiildMoodtrailssIntroScreenStepHeading}>
              {step.title}
            </Text>
            <StepIndicator activeIndex={stepIndex} />
            <Text style={styles.wiildMoodtrailssIntroScreenStepCopy}>
              {step.body}
            </Text>
            <IntroPrimaryButton label={step.actionLabel} onPress={goNext} />
          </Animated.View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wiildMoodtrailssIntroHeaderHeader: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  wiildMoodtrailssIntroHeaderBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  wiildMoodtrailssIntroHeaderBrandMark: {
    width: 30,
    height: 30,
  },
  wiildMoodtrailssIntroHeaderBrandText: {
    color: '#FF6B1A',
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
    letterSpacing: 3,
  },
  wiildMoodtrailssIntroHeaderSkip: {
    color: '#3A4560',
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
  },
  wiildMoodtrailssIntroHeaderSkipPlaceholder: {
    width: 32,
  },
  wiildMoodtrailssIntroPrimaryButtonShadowFrame: {
    marginTop: 24,
    borderRadius: 16,
    shadowColor: '#FF6B1A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.42,
    shadowRadius: 16,
    elevation: 8,
  },
  wiildMoodtrailssIntroPrimaryButtonShadowFramePressed: {
    opacity: 0.92,
  },
  wiildMoodtrailssIntroPrimaryButtonGradientSurface: {
    height: 58,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssIntroPrimaryButtonActionLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    lineHeight: 24,
  },
  wiildMoodtrailssStepIndicatorMarkerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  wiildMoodtrailssStepIndicatorStepMarker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  wiildMoodtrailssStepIndicatorStepMarkerCurrent: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B1A',
  },
  wiildMoodtrailssIntroScreenScreenLayout: {
    flex: 1,
  },
  wiildMoodtrailssIntroScreenScrollContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  wiildMoodtrailssIntroScreenBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  wiildMoodtrailssIntroScreenBackdropFade: {
    ...StyleSheet.absoluteFillObject,
  },
  wiildMoodtrailssIntroScreenCopyColumn: {
    paddingHorizontal: 28,
    paddingBottom: 24,
  },
  wiildMoodtrailssIntroScreenStepHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 30,
    lineHeight: 36,
  },
  wiildMoodtrailssIntroScreenStepCopy: {
    marginTop: 16,
    color: '#3A4560',
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    lineHeight: 24.75,
    width: '80%',
  },
});
