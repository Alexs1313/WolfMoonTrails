import React, {useCallback, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {WlffMuddTraillsRoutes, WlffMuddTraillsIntroLayout, WlffMuddTraillsIntroSteps, WlffMuddTraillsSpacing, WlffMuddTraillsINTRO_STEP_COUNT} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';
import type {WlffMuddTraillsRootStackParamList} from '../WlffMuddTraillsRoutes/WlffMuddTraillsTypes';
import {WlffMuddTraillsSetIntroCompleted} from '../WlffMuddTraillsUtils/WlffMuddTraillsIntroStorage';

const brandMark = require('../../assets/images/logo-wolf.png');

type WlffMuddTraillsIntroHeaderProps = {
  showSkip: boolean;
  onSkip?: () => void;
};

function WlffMuddTraillsIntroHeader({showSkip, onSkip}: WlffMuddTraillsIntroHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wlffMuddTraillsIntroHeaderHeader, {paddingTop: insets.top + WlffMuddTraillsSpacing.sm}]}>
      <View style={styles.wlffMuddTraillsIntroHeaderBrand}>
        <Image source={brandMark} style={styles.wlffMuddTraillsIntroHeaderBrandMark} resizeMode="contain" />
        <Text style={styles.wlffMuddTraillsIntroHeaderBrandText}>WILD MOON</Text>
      </View>
      {showSkip ? (
        <Pressable
          accessibilityRole="button"
          onPress={onSkip}
          hitSlop={12}>
          <Text style={styles.wlffMuddTraillsIntroHeaderSkip}>Skip</Text>
        </Pressable>
      ) : (
        <View style={styles.wlffMuddTraillsIntroHeaderSkipPlaceholder} />
      )}
    </View>
  );
}

type WlffMuddTraillsIntroPrimaryButtonProps = {
  label: string;
  onPress: () => void;
};

function WlffMuddTraillsIntroPrimaryButton({label, onPress}: WlffMuddTraillsIntroPrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({pressed}) => [
        styles.wlffMuddTraillsIntroPrimaryButtonShadowFrame,
        pressed && styles.wlffMuddTraillsIntroPrimaryButtonShadowFramePressed,
      ]}>
      <LinearGradient
        colors={['#FF6B1A', '#FF4500']}
        start={{x: 0.15, y: 0}}
        end={{x: 0.85, y: 1}}
        style={styles.wlffMuddTraillsIntroPrimaryButtonGradientSurface}>
        <Text style={styles.wlffMuddTraillsIntroPrimaryButtonActionLabel}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

type WlffMuddTraillsStepIndicatorProps = {
  activeIndex: number;
  total?: number;
};

function WlffMuddTraillsStepIndicator({activeIndex, total = WlffMuddTraillsINTRO_STEP_COUNT}: WlffMuddTraillsStepIndicatorProps) {
  return (
    <View style={styles.wlffMuddTraillsStepIndicatorMarkerRow}>
      {Array.from({length: total}).map((_, index) => {
        const isCurrent = index === activeIndex;
        return (
          <View
            key={index}
            style={[styles.wlffMuddTraillsStepIndicatorStepMarker, isCurrent && styles.wlffMuddTraillsStepIndicatorStepMarkerCurrent]}
          />
        );
      })}
    </View>
  );
}

type WlffMuddTraillsIntroScreenProps = StackScreenProps<WlffMuddTraillsRootStackParamList, typeof WlffMuddTraillsRoutes.root.intro>;

export function WlffMuddTraillsIntroScreen({navigation}: WlffMuddTraillsIntroScreenProps) {
  const insets = useSafeAreaInsets();
  const [stepIndex, setStepIndex] = useState(0);
  const step = WlffMuddTraillsIntroSteps[stepIndex];
  const isLastStep = stepIndex === WlffMuddTraillsIntroSteps.length - 1;

  const finishIntro = useCallback(async () => {
    await WlffMuddTraillsSetIntroCompleted();
    navigation.reset({
      index: 0,
      routes: [{name: WlffMuddTraillsRoutes.root.main}],
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
    <View style={styles.wlffMuddTraillsIntroScreenScreenLayout}>
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
          style={styles.wlffMuddTraillsIntroScreenBackdrop}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(7, 12, 26, 0.25)', 'rgba(7, 12, 26, 0.5)', 'rgba(7, 12, 26, 0.97)']}
            locations={[0, 0.35, 0.75]}
            style={styles.wlffMuddTraillsIntroScreenBackdropFade}
          />

          <WlffMuddTraillsIntroHeader showSkip={step.showSkip} onSkip={finishIntro} />

          <View
            style={[
              styles.wlffMuddTraillsIntroScreenCopyColumn,
              {paddingBottom: Math.max(insets.bottom, WlffMuddTraillsSpacing.lg)},
            ]}>
            <Text style={styles.wlffMuddTraillsIntroScreenStepHeading}>{step.title}</Text>
            <WlffMuddTraillsStepIndicator activeIndex={stepIndex} />
            <Text style={styles.wlffMuddTraillsIntroScreenStepCopy}>{step.body}</Text>
            <WlffMuddTraillsIntroPrimaryButton label={step.actionLabel} onPress={goNext} />
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wlffMuddTraillsIntroHeaderHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WlffMuddTraillsSpacing.lg,
  },
  wlffMuddTraillsIntroHeaderBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: WlffMuddTraillsSpacing.sm,
  },
  wlffMuddTraillsIntroHeaderBrandMark: {
    width: 30,
    height: 30,
  },
  wlffMuddTraillsIntroHeaderBrandText: {
    color: '#FF6B1A',
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
    letterSpacing: 3,
  },
  wlffMuddTraillsIntroHeaderSkip: {
    color: '#3A4560',
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
  },
  wlffMuddTraillsIntroHeaderSkipPlaceholder: {
    width: 32,
  },
  wlffMuddTraillsIntroPrimaryButtonShadowFrame: {
    marginTop: WlffMuddTraillsSpacing.lg,
    borderRadius: WlffMuddTraillsIntroLayout.buttonRadius,
    shadowColor: '#FF6B1A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.42,
    shadowRadius: 16,
    elevation: 8,
  },
  wlffMuddTraillsIntroPrimaryButtonShadowFramePressed: {
    opacity: 0.92,
  },
  wlffMuddTraillsIntroPrimaryButtonGradientSurface: {
    height: WlffMuddTraillsIntroLayout.buttonHeight,
    borderRadius: WlffMuddTraillsIntroLayout.buttonRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsIntroPrimaryButtonActionLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    lineHeight: 24,
  },
  wlffMuddTraillsStepIndicatorMarkerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: WlffMuddTraillsSpacing.sm,
    marginTop: WlffMuddTraillsSpacing.sm,
  },
  wlffMuddTraillsStepIndicatorStepMarker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  wlffMuddTraillsStepIndicatorStepMarkerCurrent: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B1A',
  },
  wlffMuddTraillsIntroScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  wlffMuddTraillsIntroScreenBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  wlffMuddTraillsIntroScreenBackdropFade: {
    ...StyleSheet.absoluteFillObject,
  },
  wlffMuddTraillsIntroScreenCopyColumn: {
    paddingHorizontal: WlffMuddTraillsIntroLayout.horizontal,
  },
  wlffMuddTraillsIntroScreenStepHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 30,
    lineHeight: 36,
  },
  wlffMuddTraillsIntroScreenStepCopy: {
    marginTop: WlffMuddTraillsSpacing.md,
    color: '#3A4560',
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    lineHeight: 24.75,
    width: '80%',
  }
});
