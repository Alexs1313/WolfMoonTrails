import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {WlffMuddTraillsRoutes, WlffMuddTraillsSpacing} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';
import {
  WlffMuddTraillsGetNextLevelId,
  WlffMuddTraillsGetQuizLevel,
  WlffMuddTraillsGetStarCount,
  WlffMuddTraillsQuizLevels,
  type WlffMuddTraillsQuizOption,
  type WlffMuddTraillsQuizQuestion,
} from '../WlffMuddTraillsData/WlffMuddTraillsQuizLevels';
import type {WlffMuddTraillsSessionsStackParamList} from '../WlffMuddTraillsRoutes/WlffMuddTraillsTypes';
import {WlffMuddTraillsGetCurrentLevelId, WlffMuddTraillsGetQuizProgress, WlffMuddTraillsSaveLevelResult} from '../WlffMuddTraillsUtils/WlffMuddTraillsQuizProgressStorage';

type WlffMuddTraillsQuizStarsProps = {
  count: number;
  max?: number;
};

function WlffMuddTraillsQuizStars({count, max = 3}: WlffMuddTraillsQuizStarsProps) {
  return (
    <View style={styles.wlffMuddTraillsQuizStarsRatingRow}>
      {Array.from({length: max}).map((_, index) => (
        <Text
          key={index}
          style={[
            styles.wlffMuddTraillsQuizStarsRatingGlyph,
            index < count ? styles.wlffMuddTraillsQuizStarsRatingActive : styles.wlffMuddTraillsQuizStarsRatingInactive,
          ]}>
          ★
        </Text>
      ))}
    </View>
  );
}

type WlffMuddTraillsSessionsScreenProps = StackScreenProps<
  WlffMuddTraillsSessionsStackParamList,
  typeof WlffMuddTraillsRoutes.sessions.main
>;

export function WlffMuddTraillsSessionsScreen({navigation}: WlffMuddTraillsSessionsScreenProps) {
  const insets = useSafeAreaInsets();

  const handleStart = useCallback(async () => {
    const progress = await WlffMuddTraillsGetQuizProgress();
    const levelId = WlffMuddTraillsGetCurrentLevelId(progress, WlffMuddTraillsQuizLevels);
    if (!levelId) {
      return;
    }
    navigation.navigate(WlffMuddTraillsRoutes.sessions.quiz, {levelId});
  }, [navigation]);

  return (
    <View
      style={[
        styles.wlffMuddTraillsSessionsScreenScreenLayout,
        {
          paddingTop: insets.top,
          paddingBottom: Math.max(insets.bottom, WlffMuddTraillsSpacing.lg) + 80,
        },
      ]}>
      <View style={styles.wlffMuddTraillsSessionsScreenHeaderBlock}>
        <View style={styles.wlffMuddTraillsSessionsScreenHeadingRow}>
          <Text style={styles.wlffMuddTraillsSessionsScreenAccentGlyph}>⚡</Text>
          <Text style={styles.wlffMuddTraillsSessionsScreenHeading}>Wildlife Quiz</Text>
        </View>
        <Text style={styles.wlffMuddTraillsSessionsScreenDescription}>
          Test your wilderness knowledge across multiple levels
        </Text>
      </View>

      <View style={styles.wlffMuddTraillsSessionsScreenIllustrationFrame}>
        <Image
          source={require('../../assets/images/wildlife-quiz-hero.png')}
          style={styles.wlffMuddTraillsSessionsScreenIllustration}
          resizeMode="contain"
        />
      </View>

      <View style={styles.wlffMuddTraillsSessionsScreenIntroPanel}>
        <Text style={styles.wlffMuddTraillsSessionsScreenIntroHeading}>Before You Enter the Wild</Text>
        <Text style={styles.wlffMuddTraillsSessionsScreenIntroCopy}>
          Learn how to stay calm, keep distance, and make smart decisions around
          wolves, bears, and other wildlife.
        </Text>
        <Pressable style={styles.wlffMuddTraillsSessionsScreenStartButton} onPress={handleStart}>
          <Text style={styles.wlffMuddTraillsSessionsScreenStartButtonText}>Start Safety Quiz</Text>
        </Pressable>
      </View>
    </View>
  );
}

type WlffMuddTraillsQuizPlayScreenProps = StackScreenProps<
  WlffMuddTraillsSessionsStackParamList,
  typeof WlffMuddTraillsRoutes.sessions.quiz
>;

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export function WlffMuddTraillsQuizPlayScreen({navigation, route}: WlffMuddTraillsQuizPlayScreenProps) {
  const insets = useSafeAreaInsets();
  const level = WlffMuddTraillsGetQuizLevel(route.params.levelId);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const question: WlffMuddTraillsQuizQuestion | undefined = level?.questions[questionIndex];
  const total = level?.questions.length ?? 0;
  const answered = selectedId !== null;

  const progress = useMemo(() => {
    if (!total) {
      return 0;
    }
    return (questionIndex + (answered ? 1 : 0)) / total;
  }, [answered, questionIndex, total]);

  const handleSelect = useCallback(
    (option: WlffMuddTraillsQuizOption) => {
      if (answered || !question) {
        return;
      }
      setSelectedId(option.id);
    },
    [answered, question],
  );

  const handleNext = useCallback(() => {
    if (!level || !answered || !question) {
      return;
    }

    const wasCorrect =
      question.options.find(o => o.id === selectedId)?.correct ?? false;
    const newCorrectCount = correctCount + (wasCorrect ? 1 : 0);

    if (questionIndex >= total - 1) {
      navigation.replace(WlffMuddTraillsRoutes.sessions.result, {
        levelId: level.id,
        correctCount: newCorrectCount,
      });
      return;
    }

    setCorrectCount(newCorrectCount);
    setQuestionIndex(prev => prev + 1);
    setSelectedId(null);
  }, [
    answered,
    correctCount,
    level,
    navigation,
    question,
    questionIndex,
    selectedId,
    total,
  ]);

  if (!level || !question) {
    return (
      <View style={styles.wlffMuddTraillsQuizPlayScreenNotFoundLayout}>
        <Text style={styles.wlffMuddTraillsQuizPlayScreenNotFoundMessage}>Level not found.</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.wlffMuddTraillsQuizPlayScreenNavigateBackLabel}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const selectedOption = question.options.find(o => o.id === selectedId);
  const isCorrect = selectedOption?.correct ?? false;

  return (
    <View style={[styles.wlffMuddTraillsQuizPlayScreenScreenLayout, {paddingTop: insets.top + 10}]}>
      <View style={styles.wlffMuddTraillsQuizPlayScreenTopBar}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.wlffMuddTraillsQuizPlayScreenNavigationControl}>
          <Text style={styles.wlffMuddTraillsQuizPlayScreenNavigationGlyph}>←</Text>
        </Pressable>
        <View style={styles.wlffMuddTraillsQuizPlayScreenTopBarCenter}>
          <Text style={styles.wlffMuddTraillsQuizPlayScreenBolt}>⚡</Text>
          <Text style={styles.wlffMuddTraillsQuizPlayScreenScreenHeading}>{level.title}</Text>
        </View>
        <Text style={styles.wlffMuddTraillsQuizPlayScreenCounter}>
          {questionIndex + 1}/{total}
        </Text>
      </View>

      <View style={styles.wlffMuddTraillsQuizPlayScreenProgressTrack}>
        <View style={[styles.wlffMuddTraillsQuizPlayScreenProgressFill, {width: `${progress * 100}%`}]} />
      </View>

      <ScrollView
        style={styles.wlffMuddTraillsQuizPlayScreenScroll}
        contentContainerStyle={[
          styles.wlffMuddTraillsQuizPlayScreenScrollContent,
          {paddingBottom: Math.max(insets.bottom, WlffMuddTraillsSpacing.lg) + 24},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.wlffMuddTraillsQuizPlayScreenPromptPanel}>
          <View style={styles.wlffMuddTraillsQuizPlayScreenQuestionIcon}>
            <Text style={styles.wlffMuddTraillsQuizPlayScreenQuestionBolt}>⚡</Text>
          </View>
          <Text style={styles.wlffMuddTraillsQuizPlayScreenQuestionText}>{question.text}</Text>
        </View>

        <View style={styles.wlffMuddTraillsQuizPlayScreenOptions}>
          {question.options.map((option, index) => {
            const isSelected = selectedId === option.id;
            const showCorrect = answered && option.correct;
            const showWrong = answered && isSelected && !option.correct;

            return (
              <Pressable
                key={option.id}
                onPress={() => handleSelect(option)}
                disabled={answered}
                style={[
                  styles.wlffMuddTraillsQuizPlayScreenOption,
                  showCorrect && styles.wlffMuddTraillsQuizPlayScreenOptionCorrect,
                  showWrong && styles.wlffMuddTraillsQuizPlayScreenOptionWrong,
                ]}>
                <View
                  style={[
                    styles.wlffMuddTraillsQuizPlayScreenOptionBadge,
                    showCorrect && styles.wlffMuddTraillsQuizPlayScreenOptionBadgeCorrect,
                    showWrong && styles.wlffMuddTraillsQuizPlayScreenOptionBadgeWrong,
                  ]}>
                  <Text
                    style={[
                      styles.wlffMuddTraillsQuizPlayScreenOptionBadgeText,
                      (showCorrect || showWrong) &&
                        styles.wlffMuddTraillsQuizPlayScreenOptionBadgeTextActive,
                    ]}>
                    {showCorrect ? '✓' : OPTION_LABELS[index]}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.wlffMuddTraillsQuizPlayScreenOptionText,
                    showCorrect && styles.wlffMuddTraillsQuizPlayScreenOptionTextCorrect,
                    showWrong && styles.wlffMuddTraillsQuizPlayScreenOptionTextWrong,
                  ]}>
                  {option.text}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {answered && (
          <View
            style={[
              styles.wlffMuddTraillsQuizPlayScreenFeedback,
              isCorrect ? styles.wlffMuddTraillsQuizPlayScreenFeedbackCorrect : styles.wlffMuddTraillsQuizPlayScreenFeedbackWrong,
            ]}>
            <Text
              style={[
                styles.wlffMuddTraillsQuizPlayScreenFeedbackTitle,
                isCorrect
                  ? styles.wlffMuddTraillsQuizPlayScreenFeedbackTitleCorrect
                  : styles.wlffMuddTraillsQuizPlayScreenFeedbackTitleWrong,
              ]}>
              {isCorrect ? '✓ CORRECT!' : '✕ INCORRECT'}
            </Text>
            <Text style={styles.wlffMuddTraillsQuizPlayScreenFeedbackBody}>{question.explanation}</Text>
          </View>
        )}

        {answered && (
          <Pressable style={styles.wlffMuddTraillsQuizPlayScreenNextButton} onPress={handleNext}>
            <Text style={styles.wlffMuddTraillsQuizPlayScreenNextButtonText}>
              {questionIndex >= total - 1 ? 'See Results →' : 'Next Question →'}
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

type WlffMuddTraillsQuizResultScreenProps = StackScreenProps<
  WlffMuddTraillsSessionsStackParamList,
  typeof WlffMuddTraillsRoutes.sessions.result
>;

export function WlffMuddTraillsQuizResultScreen({navigation, route}: WlffMuddTraillsQuizResultScreenProps) {
  const insets = useSafeAreaInsets();
  const {levelId, correctCount} = route.params;
  const level = WlffMuddTraillsGetQuizLevel(levelId);
  const total = level?.questions.length ?? 7;
  const stars = WlffMuddTraillsGetStarCount(correctCount, total);
  const nextLevelId = WlffMuddTraillsGetNextLevelId(levelId);

  useEffect(() => {
    WlffMuddTraillsSaveLevelResult(levelId, correctCount, total, stars);
  }, [correctCount, levelId, stars, total]);

  const handleRetry = useCallback(() => {
    navigation.replace(WlffMuddTraillsRoutes.sessions.quiz, {levelId});
  }, [levelId, navigation]);

  const handleNext = useCallback(() => {
    if (nextLevelId) {
      navigation.replace(WlffMuddTraillsRoutes.sessions.quiz, {levelId: nextLevelId});
      return;
    }
    navigation.navigate(WlffMuddTraillsRoutes.sessions.main);
  }, [navigation, nextLevelId]);

  const handleDone = useCallback(() => {
    navigation.navigate(WlffMuddTraillsRoutes.sessions.main);
  }, [navigation]);

  if (!level) {
    return null;
  }

  return (
    <View
      style={[
        styles.wlffMuddTraillsQuizResultScreenScreenLayout,
        {
          paddingTop: insets.top + WlffMuddTraillsSpacing.lg,
          paddingBottom: Math.max(insets.bottom, WlffMuddTraillsSpacing.lg) + 80,
        },
      ]}>
      <View style={styles.wlffMuddTraillsQuizResultScreenContentColumn}>
        <View style={styles.wlffMuddTraillsQuizResultScreenBadgeFrame}>
          <Text style={styles.wlffMuddTraillsQuizResultScreenBadgeGlyph}>🏆</Text>
        </View>
        <Text style={styles.wlffMuddTraillsQuizResultScreenHeading}>Level Complete!</Text>
        <Text style={styles.wlffMuddTraillsQuizResultScreenLevelLabel}>{level.title}</Text>
        <WlffMuddTraillsQuizStars count={stars} />
        <View style={styles.wlffMuddTraillsQuizResultScreenResultPanel}>
          <Text style={styles.wlffMuddTraillsQuizResultScreenResultValue}>
            {correctCount}/{total}
          </Text>
          <Text style={styles.wlffMuddTraillsQuizResultScreenResultCaption}>Questions answered correctly</Text>
        </View>
        <View style={styles.wlffMuddTraillsQuizResultScreenActionRow}>
          <Pressable style={styles.wlffMuddTraillsQuizResultScreenRetryControl} onPress={handleRetry}>
            <Text style={styles.wlffMuddTraillsQuizResultScreenRetryGlyph}>↻</Text>
            <Text style={styles.wlffMuddTraillsQuizResultScreenRetryLabel}>Retry</Text>
          </Pressable>
          <Pressable
            style={styles.wlffMuddTraillsQuizResultScreenContinueControl}
            onPress={nextLevelId ? handleNext : handleDone}>
            <Text style={styles.wlffMuddTraillsQuizResultScreenContinueLabel}>
              {nextLevelId ? 'Next Level →' : 'Done'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wlffMuddTraillsQuizStarsRatingRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  wlffMuddTraillsQuizStarsRatingGlyph: {
    fontSize: 28,
  },
  wlffMuddTraillsQuizStarsRatingActive: {
    color: '#EAB308',
  },
  wlffMuddTraillsQuizStarsRatingInactive: {
    color: 'rgba(234, 179, 8, 0.25)',
  },
  wlffMuddTraillsSessionsScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
    paddingHorizontal: WlffMuddTraillsSpacing.md,
  },
  wlffMuddTraillsSessionsScreenHeaderBlock: {
    gap: 6,
    paddingTop: WlffMuddTraillsSpacing.sm,
  },
  wlffMuddTraillsSessionsScreenHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wlffMuddTraillsSessionsScreenAccentGlyph: {
    fontSize: 22,
    color: '#FF6B1A',
  },
  wlffMuddTraillsSessionsScreenHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 20,
  },
  wlffMuddTraillsSessionsScreenDescription: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
  },
  wlffMuddTraillsSessionsScreenIllustrationFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  wlffMuddTraillsSessionsScreenIllustration: {
    width: 242,
    height: 320,
  },
  wlffMuddTraillsSessionsScreenIntroPanel: {
    backgroundColor: '#0F1729',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 21,
    gap: 14,
  },
  wlffMuddTraillsSessionsScreenIntroHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    lineHeight: 24,
  },
  wlffMuddTraillsSessionsScreenIntroCopy: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    lineHeight: 19.5,
  },
  wlffMuddTraillsSessionsScreenStartButton: {
    height: 42,
    borderRadius: 13,
    backgroundColor: '#FF6B1A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  wlffMuddTraillsSessionsScreenStartButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  wlffMuddTraillsQuizPlayScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  wlffMuddTraillsQuizPlayScreenTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WlffMuddTraillsSpacing.md,
    paddingBottom: WlffMuddTraillsSpacing.sm,
    gap: 8,
  },
  wlffMuddTraillsQuizPlayScreenNavigationControl: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsQuizPlayScreenNavigationGlyph: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  wlffMuddTraillsQuizPlayScreenTopBarCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  wlffMuddTraillsQuizPlayScreenBolt: {
    color: '#FF6B1A',
    fontSize: 16,
  },
  wlffMuddTraillsQuizPlayScreenScreenHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
  },
  wlffMuddTraillsQuizPlayScreenCounter: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    minWidth: 36,
    textAlign: 'right',
  },
  wlffMuddTraillsQuizPlayScreenProgressTrack: {
    height: 3,
    backgroundColor: '#1A2440',
    marginHorizontal: WlffMuddTraillsSpacing.md,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: WlffMuddTraillsSpacing.md,
  },
  wlffMuddTraillsQuizPlayScreenProgressFill: {
    height: '100%',
    backgroundColor: '#FF6B1A',
    borderRadius: 2,
  },
  wlffMuddTraillsQuizPlayScreenScroll: {
    flex: 1,
  },
  wlffMuddTraillsQuizPlayScreenScrollContent: {
    paddingHorizontal: WlffMuddTraillsSpacing.md,
    gap: 14,
  },
  wlffMuddTraillsQuizPlayScreenPromptPanel: {
    backgroundColor: '#0F1729',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 18,
    gap: 12,
  },
  wlffMuddTraillsQuizPlayScreenQuestionIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 107, 26, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsQuizPlayScreenQuestionBolt: {
    color: '#FF6B1A',
    fontSize: 16,
  },
  wlffMuddTraillsQuizPlayScreenQuestionText: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
    lineHeight: 24,
  },
  wlffMuddTraillsQuizPlayScreenOptions: {
    gap: 10,
  },
  wlffMuddTraillsQuizPlayScreenOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#0F1729',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 14,
  },
  wlffMuddTraillsQuizPlayScreenOptionCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderColor: 'rgba(34, 197, 94, 0.35)',
  },
  wlffMuddTraillsQuizPlayScreenOptionWrong: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: 'rgba(239, 68, 68, 0.35)',
  },
  wlffMuddTraillsQuizPlayScreenOptionBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#1A2440',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsQuizPlayScreenOptionBadgeCorrect: {
    backgroundColor: '#22C55E',
  },
  wlffMuddTraillsQuizPlayScreenOptionBadgeWrong: {
    backgroundColor: '#EF4444',
  },
  wlffMuddTraillsQuizPlayScreenOptionBadgeText: {
    color: '#8B95B0',
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
  },
  wlffMuddTraillsQuizPlayScreenOptionBadgeTextActive: {
    color: '#FFFFFF',
  },
  wlffMuddTraillsQuizPlayScreenOptionText: {
    flex: 1,
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  wlffMuddTraillsQuizPlayScreenOptionTextCorrect: {
    color: '#22C55E',
  },
  wlffMuddTraillsQuizPlayScreenOptionTextWrong: {
    color: '#EF4444',
  },
  wlffMuddTraillsQuizPlayScreenFeedback: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 8,
  },
  wlffMuddTraillsQuizPlayScreenFeedbackCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderColor: 'rgba(34, 197, 94, 0.35)',
  },
  wlffMuddTraillsQuizPlayScreenFeedbackWrong: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: 'rgba(239, 68, 68, 0.35)',
  },
  wlffMuddTraillsQuizPlayScreenFeedbackTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  wlffMuddTraillsQuizPlayScreenFeedbackTitleCorrect: {
    color: '#22C55E',
  },
  wlffMuddTraillsQuizPlayScreenFeedbackTitleWrong: {
    color: '#EF4444',
  },
  wlffMuddTraillsQuizPlayScreenFeedbackBody: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    lineHeight: 20,
  },
  wlffMuddTraillsQuizPlayScreenNextButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#FF6B1A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  wlffMuddTraillsQuizPlayScreenNextButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
  },
  wlffMuddTraillsQuizPlayScreenNotFoundLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  wlffMuddTraillsQuizPlayScreenNotFoundMessage: {
    color: '#FFFFFF',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
  },
  wlffMuddTraillsQuizPlayScreenNavigateBackLabel: {
    color: '#FF6B1A',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  wlffMuddTraillsQuizResultScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
    paddingHorizontal: WlffMuddTraillsSpacing.md,
  },
  wlffMuddTraillsQuizResultScreenContentColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  wlffMuddTraillsQuizResultScreenBadgeFrame: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#FFD7001F',
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EAB308',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 0},
  },
  wlffMuddTraillsQuizResultScreenBadgeGlyph: {
    fontSize: 36,
  },
  wlffMuddTraillsQuizResultScreenHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 26,
  },
  wlffMuddTraillsQuizResultScreenLevelLabel: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    marginTop: -8,
  },
  wlffMuddTraillsQuizResultScreenResultPanel: {
    width: '100%',
    backgroundColor: '#0F1729',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  wlffMuddTraillsQuizResultScreenResultValue: {
    color: '#FF6B1A',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 48,
    fontStyle: 'italic',
  },
  wlffMuddTraillsQuizResultScreenResultCaption: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
  },
  wlffMuddTraillsQuizResultScreenActionRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 8,
  },
  wlffMuddTraillsQuizResultScreenRetryControl: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#1A2440',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  wlffMuddTraillsQuizResultScreenRetryGlyph: {
    color: '#8B95B0',
    fontSize: 18,
  },
  wlffMuddTraillsQuizResultScreenRetryLabel: {
    color: '#8B95B0',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  wlffMuddTraillsQuizResultScreenContinueControl: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#9333EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsQuizResultScreenContinueLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  }
});
