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
        styles.root,
        {
          paddingTop: insets.top,
          paddingBottom: Math.max(insets.bottom, spacing.lg) + 80,
        },
      ]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.bolt}>⚡</Text>
          <Text style={styles.title}>Wildlife Quiz</Text>
        </View>
        <Text style={styles.subtitle}>
          Test your wilderness knowledge across multiple levels
        </Text>
      </View>

      <View style={styles.heroWrap}>
        <Image
          source={require('../../../assets/images/quiz/wildlife-quiz-hero.png')}
          style={styles.hero}
          resizeMode="contain"
        />
      </View>

      <View style={styles.introCard}>
        <Text style={styles.cardTitle}>Before You Enter the Wild</Text>
        <Text style={styles.cardBody}>
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
  root: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
  },
  header: {
    gap: 6,
    paddingTop: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bolt: {
    fontSize: 22,
    color: colors.primary,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 20,
  },
  subtitle: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 13,
  },
  heroWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  hero: {
    width: 242,
    height: 320,
  },
  introCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    padding: 21,
    gap: 14,
  },
  cardTitle: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 16,
    lineHeight: 24,
  },
  cardBody: {
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
