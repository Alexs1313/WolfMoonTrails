import React, {useCallback} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Routes, colors, fonts, spacing} from '../../consts';
import {quizLevels} from '../../data/quizLevels';
import type {SessionsStackParamList} from '../../navigation/types';
import {getCurrentLevelId, getQuizProgress} from '../../utils/quizProgressStorage';

type Props = StackScreenProps<
  SessionsStackParamList,
  typeof Routes.sessions.main
>;

export function SessionsScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();

  const handleStart = useCallback(async () => {
    const progress = await getQuizProgress();
    const levelId = getCurrentLevelId(progress, quizLevels);
    if (!levelId) {
      return;
    }
    navigation.navigate(Routes.sessions.quiz, {levelId});
  }, [navigation]);

  return (
    <View
      style={[
        styles.screenLayout,
        {
          paddingTop: insets.top,
          paddingBottom: Math.max(insets.bottom, spacing.lg) + 80,
        },
      ]}>
      <View style={styles.headerBlock}>
        <View style={styles.headingRow}>
          <Text style={styles.accentGlyph}>⚡</Text>
          <Text style={styles.heading}>Wildlife Quiz</Text>
        </View>
        <Text style={styles.description}>
          Test your wilderness knowledge across multiple levels
        </Text>
      </View>

      <View style={styles.illustrationFrame}>
        <Image
          source={require('../../../assets/images/quiz/wildlife-quiz-hero.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      <View style={styles.introPanel}>
        <Text style={styles.introHeading}>Before You Enter the Wild</Text>
        <Text style={styles.introCopy}>
          Learn how to stay calm, keep distance, and make smart decisions around
          wolves, bears, and other wildlife.
        </Text>
        <Pressable style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Start Safety Quiz</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenLayout: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
  },
  headerBlock: {
    gap: 6,
    paddingTop: spacing.sm,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  accentGlyph: {
    fontSize: 22,
    color: colors.primary,
  },
  heading: {
    color: colors.heading,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 20,
  },
  description: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 13,
  },
  illustrationFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  illustration: {
    width: 242,
    height: 320,
  },
  introPanel: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    padding: 21,
    gap: 14,
  },
  introHeading: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 16,
    lineHeight: 24,
  },
  introCopy: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 13,
    lineHeight: 19.5,
  },
  startButton: {
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  startButtonText: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 14,
  },
});
