import React, {useCallback, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  IntroHeader,
  IntroPrimaryButton,
  StepIndicator,
} from '../../components/intro';
import {
  Routes,
  colors,
  fonts,
  introLayout,
  introSteps,
  spacing,
} from '../../consts';
import type {RootStackParamList} from '../../navigation/types';
import {setIntroCompleted} from '../../utils/introStorage';

type Props = StackScreenProps<RootStackParamList, typeof Routes.root.intro>;

export function IntroScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const [stepIndex, setStepIndex] = useState(0);
  const step = introSteps[stepIndex];
  const isLastStep = stepIndex === introSteps.length - 1;

  const finishIntro = useCallback(async () => {
    await setIntroCompleted();
    navigation.reset({
      index: 0,
      routes: [{name: Routes.root.main}],
    });
  }, [navigation]);

  const goNext = useCallback(() => {
    if (isLastStep) {
      finishIntro();
      return;
    }
    setStepIndex(prev => prev + 1);
  }, [finishIntro, isLastStep]);

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <ImageBackground
          source={step.image}
          style={styles.background}
          resizeMode="cover">
          <LinearGradient
            colors={[colors.overlayStart, colors.overlayMid, colors.overlayEnd]}
            locations={[0, 0.35, 0.75]}
            style={styles.gradient}
          />

          <IntroHeader showSkip={step.showSkip} onSkip={finishIntro} />

          <View
            style={[
              styles.content,
              {paddingBottom: Math.max(insets.bottom, spacing.lg)},
            ]}>
            <Text style={styles.title}>{step.title}</Text>
            <StepIndicator activeIndex={stepIndex} />
            <Text style={styles.body}>{step.body}</Text>
            <IntroPrimaryButton label={step.actionLabel} onPress={goNext} />
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    paddingHorizontal: introLayout.horizontal,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 30,
    lineHeight: 36,
  },
  body: {
    marginTop: spacing.md,
    color: colors.textMuted,
    fontFamily: fonts.nunitoRegular,
    fontSize: 15,
    lineHeight: 24.75,
    width: '80%',
  },
});
