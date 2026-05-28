import React, {useCallback, useEffect, useMemo} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';

import {useAppDispatch, useAppSelector} from '../app/hooks';
import {uiActions} from '../app/slices/uiSlice';
import {
  getNextLevelId,
  getQuizLevel,
  getStarCount,
  QuizLevels,
  type QuizOption,
  type QuizQuestion,
} from '../data/QuizLevels';
import {
  WiildMoodtrailssGetCurrentLevelId,
  WiildMoodtrailssGetQuizProgress,
  WiildMoodtrailssSaveLevelResult,
} from '../utils/QuizProgressStorage';

type SessionsStackParamList = {
  SessionsMain: undefined;
  SessionsQuiz: {levelId: string};
  SessionsResult: {levelId: string; correctCount: number};
};

const routes = {
  sessions: {
    main: 'SessionsMain',
    quiz: 'SessionsQuiz',
    result: 'SessionsResult',
  },
} as const;

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 28,
  xxl: 32,
} as const;

const PAGE_BOTTOM_PADDING = 80;
const SESSIONS_TOP_PADDING = 30;
const QUIZ_TOP_PADDING = 40;

type QuizStarsProps = {
  count: number;
  max?: number;
};

function QuizStars({count, max = 3}: QuizStarsProps) {
  return (
    <View style={styles.wiildMoodtrailssQuizStarsRatingRow}>
      {Array.from({length: max}).map((_, index) => (
        <Text
          key={index}
          style={[
            styles.wiildMoodtrailssQuizStarsRatingGlyph,
            index < count
              ? styles.wiildMoodtrailssQuizStarsRatingActive
              : styles.wiildMoodtrailssQuizStarsRatingInactive,
          ]}>
          ★
        </Text>
      ))}
    </View>
  );
}

type WiildMoodtrailssSessionsScreenProps = StackScreenProps<
  SessionsStackParamList,
  typeof routes.sessions.main
>;

export function WiildMoodtrailssSessionsScreen({
  navigation,
}: WiildMoodtrailssSessionsScreenProps) {
  const handleStart = useCallback(async () => {
    const progress = await WiildMoodtrailssGetQuizProgress();
    const levelId = WiildMoodtrailssGetCurrentLevelId(progress, QuizLevels);
    if (!levelId) {
      return;
    }
    navigation.navigate(routes.sessions.quiz, {levelId});
  }, [navigation]);

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.wiildMoodtrailssSessionsScreenScreenLayout,
          {
            paddingTop: SESSIONS_TOP_PADDING,
            paddingBottom: PAGE_BOTTOM_PADDING,
          },
        ]}>
        <View style={styles.wiildMoodtrailssSessionsScreenHeaderBlock}>
          <View style={styles.wiildMoodtrailssSessionsScreenHeadingRow}>
            <Text style={styles.wiildMoodtrailssSessionsScreenAccentGlyph}>
              ⚡
            </Text>
            <Text style={styles.wiildMoodtrailssSessionsScreenHeading}>
              Wildlife Quiz
            </Text>
          </View>
          <Text style={styles.wiildMoodtrailssSessionsScreenDescription}>
            Test your wilderness knowledge across multiple levels
          </Text>
        </View>

        <View style={styles.wiildMoodtrailssSessionsScreenIllustrationFrame}>
          <Image
            source={require('../../assets/images/wiild-moodtrailss-wildlife-quiz-hero.png')}
            style={styles.wiildMoodtrailssSessionsScreenIllustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.wiildMoodtrailssSessionsScreenIntroPanel}>
          <Text style={styles.wiildMoodtrailssSessionsScreenIntroHeading}>
            Before You Enter the Wild
          </Text>
          <Text style={styles.wiildMoodtrailssSessionsScreenIntroCopy}>
            Learn how to stay calm, keep distance, and make smart decisions
            around wolves, bears, and other wildlife.
          </Text>
          <Pressable
            style={styles.wiildMoodtrailssSessionsScreenStartButton}
            onPress={handleStart}>
            <Text style={styles.wiildMoodtrailssSessionsScreenStartButtonText}>
              Start Safety Quiz
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

type WiildMoodtrailssQuizPlayScreenProps = StackScreenProps<
  SessionsStackParamList,
  typeof routes.sessions.quiz
>;

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export function WiildMoodtrailssQuizPlayScreen({
  navigation,
  route,
}: WiildMoodtrailssQuizPlayScreenProps) {
  const dispatch = useAppDispatch();
  const level = getQuizLevel(route.params.levelId);
  const questionIndex = useAppSelector(state => state.ui.quiz.questionIndex);
  const correctCount = useAppSelector(state => state.ui.quiz.correctCount);
  const selectedId = useAppSelector(state => state.ui.quiz.selectedOptionId);

  const question: QuizQuestion | undefined = level?.questions[questionIndex];
  const total = level?.questions.length ?? 0;
  const answered = selectedId !== null;

  useEffect(() => {
    dispatch(uiActions.resetQuizSession());
  }, [dispatch, route.params.levelId]);

  const progress = useMemo(() => {
    if (!total) {
      return 0;
    }
    return (questionIndex + (answered ? 1 : 0)) / total;
  }, [answered, questionIndex, total]);

  const handleSelect = useCallback(
    (option: QuizOption) => {
      if (answered || !question) {
        return;
      }
      dispatch(uiActions.setQuizSelectedOptionId(option.id));
    },
    [answered, dispatch, question],
  );

  const handleNext = useCallback(() => {
    if (!level || !answered || !question) {
      return;
    }

    const wasCorrect =
      question.options.find(o => o.id === selectedId)?.correct ?? false;
    const newCorrectCount = correctCount + (wasCorrect ? 1 : 0);

    if (questionIndex >= total - 1) {
      navigation.replace(routes.sessions.result, {
        levelId: level.id,
        correctCount: newCorrectCount,
      });
      return;
    }

    dispatch(uiActions.setQuizCorrectCount(newCorrectCount));
    dispatch(uiActions.setQuizQuestionIndex(questionIndex + 1));
    dispatch(uiActions.setQuizSelectedOptionId(null));
  }, [
    answered,
    correctCount,
    dispatch,
    level,
    navigation,
    question,
    questionIndex,
    selectedId,
    total,
  ]);

  if (!level || !question) {
    return (
      <View style={styles.wiildMoodtrailssQuizPlayScreenNotFoundLayout}>
        <Text style={styles.wiildMoodtrailssQuizPlayScreenNotFoundMessage}>
          Level not found.
        </Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.wiildMoodtrailssQuizPlayScreenNavigateBackLabel}>
            Go back
          </Text>
        </Pressable>
      </View>
    );
  }

  const selectedOption = question.options.find(o => o.id === selectedId);
  const isCorrect = selectedOption?.correct ?? false;

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.wiildMoodtrailssQuizPlayScreenScreenLayout,
          {paddingTop: QUIZ_TOP_PADDING},
        ]}>
        <View style={styles.wiildMoodtrailssQuizPlayScreenTopBar}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.wiildMoodtrailssQuizPlayScreenNavigationControl}>
            <Text style={styles.wiildMoodtrailssQuizPlayScreenNavigationGlyph}>
              ←
            </Text>
          </Pressable>
          <View style={styles.wiildMoodtrailssQuizPlayScreenTopBarCenter}>
            <Text style={styles.wiildMoodtrailssQuizPlayScreenBolt}>⚡</Text>
            <Text style={styles.wiildMoodtrailssQuizPlayScreenScreenHeading}>
              {level.title}
            </Text>
          </View>
          <Text style={styles.wiildMoodtrailssQuizPlayScreenCounter}>
            {questionIndex + 1}/{total}
          </Text>
        </View>

        <View style={styles.wiildMoodtrailssQuizPlayScreenProgressTrack}>
          <View
            style={[
              styles.wiildMoodtrailssQuizPlayScreenProgressFill,
              {width: `${progress * 100}%`},
            ]}
          />
        </View>

        <ScrollView
          style={styles.wiildMoodtrailssQuizPlayScreenScroll}
          contentContainerStyle={[
            styles.wiildMoodtrailssQuizPlayScreenScrollContent,
            {paddingBottom: spacing.lg + 24},
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.wiildMoodtrailssQuizPlayScreenPromptPanel}>
            <View style={styles.wiildMoodtrailssQuizPlayScreenQuestionIcon}>
              <Text style={styles.wiildMoodtrailssQuizPlayScreenQuestionBolt}>
                ⚡
              </Text>
            </View>
            <Text style={styles.wiildMoodtrailssQuizPlayScreenQuestionText}>
              {question.text}
            </Text>
          </View>

          <View style={styles.wiildMoodtrailssQuizPlayScreenOptions}>
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
                    styles.wiildMoodtrailssQuizPlayScreenOption,
                    showCorrect &&
                      styles.wiildMoodtrailssQuizPlayScreenOptionCorrect,
                    showWrong &&
                      styles.wiildMoodtrailssQuizPlayScreenOptionWrong,
                  ]}>
                  <View
                    style={[
                      styles.wiildMoodtrailssQuizPlayScreenOptionBadge,
                      showCorrect &&
                        styles.wiildMoodtrailssQuizPlayScreenOptionBadgeCorrect,
                      showWrong &&
                        styles.wiildMoodtrailssQuizPlayScreenOptionBadgeWrong,
                    ]}>
                    <Text
                      style={[
                        styles.wiildMoodtrailssQuizPlayScreenOptionBadgeText,
                        (showCorrect || showWrong) &&
                          styles.wiildMoodtrailssQuizPlayScreenOptionBadgeTextActive,
                      ]}>
                      {showCorrect ? '✓' : OPTION_LABELS[index]}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.wiildMoodtrailssQuizPlayScreenOptionText,
                      showCorrect &&
                        styles.wiildMoodtrailssQuizPlayScreenOptionTextCorrect,
                      showWrong &&
                        styles.wiildMoodtrailssQuizPlayScreenOptionTextWrong,
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
                styles.wiildMoodtrailssQuizPlayScreenFeedback,
                isCorrect
                  ? styles.wiildMoodtrailssQuizPlayScreenFeedbackCorrect
                  : styles.wiildMoodtrailssQuizPlayScreenFeedbackWrong,
              ]}>
              <Text
                style={[
                  styles.wiildMoodtrailssQuizPlayScreenFeedbackTitle,
                  isCorrect
                    ? styles.wiildMoodtrailssQuizPlayScreenFeedbackTitleCorrect
                    : styles.wiildMoodtrailssQuizPlayScreenFeedbackTitleWrong,
                ]}>
                {isCorrect ? '✓ CORRECT!' : '✕ INCORRECT'}
              </Text>
              <Text style={styles.wiildMoodtrailssQuizPlayScreenFeedbackBody}>
                {question.explanation}
              </Text>
            </View>
          )}

          {answered && (
            <Pressable
              style={styles.wiildMoodtrailssQuizPlayScreenNextButton}
              onPress={handleNext}>
              <Text style={styles.wiildMoodtrailssQuizPlayScreenNextButtonText}>
                {questionIndex >= total - 1
                  ? 'See Results →'
                  : 'Next Question →'}
              </Text>
            </Pressable>
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

type WiildMoodtrailssQuizResultScreenProps = StackScreenProps<
  SessionsStackParamList,
  typeof routes.sessions.result
>;

export function WiildMoodtrailssQuizResultScreen({
  navigation,
  route,
}: WiildMoodtrailssQuizResultScreenProps) {
  const {levelId, correctCount} = route.params;
  const level = getQuizLevel(levelId);
  const total = level?.questions.length ?? 7;
  const stars = getStarCount(correctCount, total);
  const nextLevelId = getNextLevelId(levelId);

  useEffect(() => {
    WiildMoodtrailssSaveLevelResult(levelId, correctCount, total, stars);
  }, [correctCount, levelId, stars, total]);

  const handleRetry = useCallback(() => {
    navigation.replace(routes.sessions.quiz, {levelId});
  }, [levelId, navigation]);

  const handleNext = useCallback(() => {
    if (nextLevelId) {
      navigation.replace(routes.sessions.quiz, {
        levelId: nextLevelId,
      });
      return;
    }
    navigation.navigate(routes.sessions.main);
  }, [navigation, nextLevelId]);

  const handleDone = useCallback(() => {
    navigation.navigate(routes.sessions.main);
  }, [navigation]);

  if (!level) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.wiildMoodtrailssQuizResultScreenScreenLayout,
          {
            paddingTop: QUIZ_TOP_PADDING,
            paddingBottom: PAGE_BOTTOM_PADDING,
          },
        ]}>
        <View style={styles.wiildMoodtrailssQuizResultScreenContentColumn}>
          <View style={styles.wiildMoodtrailssQuizResultScreenBadgeFrame}>
            <Text style={styles.wiildMoodtrailssQuizResultScreenBadgeGlyph}>
              🏆
            </Text>
          </View>
          <Text style={styles.wiildMoodtrailssQuizResultScreenHeading}>
            Level Complete!
          </Text>
          <Text style={styles.wiildMoodtrailssQuizResultScreenLevelLabel}>
            {level.title}
          </Text>
          <QuizStars count={stars} />
          <View style={styles.wiildMoodtrailssQuizResultScreenResultPanel}>
            <Text style={styles.wiildMoodtrailssQuizResultScreenResultValue}>
              {correctCount}/{total}
            </Text>
            <Text style={styles.wiildMoodtrailssQuizResultScreenResultCaption}>
              Questions answered correctly
            </Text>
          </View>
          <View style={styles.wiildMoodtrailssQuizResultScreenActionRow}>
            <Pressable
              style={styles.wiildMoodtrailssQuizResultScreenRetryControl}
              onPress={handleRetry}>
              <Text style={styles.wiildMoodtrailssQuizResultScreenRetryGlyph}>
                ↻
              </Text>
              <Text style={styles.wiildMoodtrailssQuizResultScreenRetryLabel}>
                Retry
              </Text>
            </Pressable>
            <Pressable
              style={styles.wiildMoodtrailssQuizResultScreenContinueControl}
              onPress={nextLevelId ? handleNext : handleDone}>
              <Text
                style={styles.wiildMoodtrailssQuizResultScreenContinueLabel}>
                {nextLevelId ? 'Next Level →' : 'Done'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wiildMoodtrailssQuizStarsRatingRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  wiildMoodtrailssQuizStarsRatingGlyph: {
    fontSize: 28,
  },
  wiildMoodtrailssQuizStarsRatingActive: {
    color: '#EAB308',
  },
  wiildMoodtrailssQuizStarsRatingInactive: {
    color: 'rgba(234, 179, 8, 0.25)',
  },
  wiildMoodtrailssSessionsScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
    paddingHorizontal: spacing.md,
  },
  wiildMoodtrailssSessionsScreenHeaderBlock: {
    gap: 6,
    paddingTop: spacing.sm,
  },
  wiildMoodtrailssSessionsScreenHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wiildMoodtrailssSessionsScreenAccentGlyph: {
    fontSize: 22,
    color: '#FF6B1A',
  },
  wiildMoodtrailssSessionsScreenHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 20,
  },
  wiildMoodtrailssSessionsScreenDescription: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
  },
  wiildMoodtrailssSessionsScreenIllustrationFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  wiildMoodtrailssSessionsScreenIllustration: {
    width: 242,
    height: 320,
  },
  wiildMoodtrailssSessionsScreenIntroPanel: {
    backgroundColor: '#0F1729',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 21,
    gap: 14,
  },
  wiildMoodtrailssSessionsScreenIntroHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    lineHeight: 24,
  },
  wiildMoodtrailssSessionsScreenIntroCopy: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    lineHeight: 19.5,
  },
  wiildMoodtrailssSessionsScreenStartButton: {
    height: 42,
    borderRadius: 13,
    backgroundColor: '#FF6B1A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  wiildMoodtrailssSessionsScreenStartButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  wiildMoodtrailssQuizPlayScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  wiildMoodtrailssQuizPlayScreenTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    gap: 8,
  },
  wiildMoodtrailssQuizPlayScreenNavigationControl: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssQuizPlayScreenNavigationGlyph: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  wiildMoodtrailssQuizPlayScreenTopBarCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  wiildMoodtrailssQuizPlayScreenBolt: {
    color: '#FF6B1A',
    fontSize: 16,
  },
  wiildMoodtrailssQuizPlayScreenScreenHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
  },
  wiildMoodtrailssQuizPlayScreenCounter: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    minWidth: 36,
    textAlign: 'right',
  },
  wiildMoodtrailssQuizPlayScreenProgressTrack: {
    height: 3,
    backgroundColor: '#1A2440',
    marginHorizontal: spacing.md,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  wiildMoodtrailssQuizPlayScreenProgressFill: {
    height: '100%',
    backgroundColor: '#FF6B1A',
    borderRadius: 2,
  },
  wiildMoodtrailssQuizPlayScreenScroll: {
    flex: 1,
  },
  wiildMoodtrailssQuizPlayScreenScrollContent: {
    paddingHorizontal: spacing.md,
    gap: 14,
  },
  wiildMoodtrailssQuizPlayScreenPromptPanel: {
    backgroundColor: '#0F1729',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 18,
    gap: 12,
  },
  wiildMoodtrailssQuizPlayScreenQuestionIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 107, 26, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssQuizPlayScreenQuestionBolt: {
    color: '#FF6B1A',
    fontSize: 16,
  },
  wiildMoodtrailssQuizPlayScreenQuestionText: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
    lineHeight: 24,
  },
  wiildMoodtrailssQuizPlayScreenOptions: {
    gap: 10,
  },
  wiildMoodtrailssQuizPlayScreenOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#0F1729',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 14,
  },
  wiildMoodtrailssQuizPlayScreenOptionCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderColor: 'rgba(34, 197, 94, 0.35)',
  },
  wiildMoodtrailssQuizPlayScreenOptionWrong: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: 'rgba(239, 68, 68, 0.35)',
  },
  wiildMoodtrailssQuizPlayScreenOptionBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#1A2440',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssQuizPlayScreenOptionBadgeCorrect: {
    backgroundColor: '#22C55E',
  },
  wiildMoodtrailssQuizPlayScreenOptionBadgeWrong: {
    backgroundColor: '#EF4444',
  },
  wiildMoodtrailssQuizPlayScreenOptionBadgeText: {
    color: '#8B95B0',
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
  },
  wiildMoodtrailssQuizPlayScreenOptionBadgeTextActive: {
    color: '#FFFFFF',
  },
  wiildMoodtrailssQuizPlayScreenOptionText: {
    flex: 1,
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  wiildMoodtrailssQuizPlayScreenOptionTextCorrect: {
    color: '#22C55E',
  },
  wiildMoodtrailssQuizPlayScreenOptionTextWrong: {
    color: '#EF4444',
  },
  wiildMoodtrailssQuizPlayScreenFeedback: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 8,
  },
  wiildMoodtrailssQuizPlayScreenFeedbackCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderColor: 'rgba(34, 197, 94, 0.35)',
  },
  wiildMoodtrailssQuizPlayScreenFeedbackWrong: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: 'rgba(239, 68, 68, 0.35)',
  },
  wiildMoodtrailssQuizPlayScreenFeedbackTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  wiildMoodtrailssQuizPlayScreenFeedbackTitleCorrect: {
    color: '#22C55E',
  },
  wiildMoodtrailssQuizPlayScreenFeedbackTitleWrong: {
    color: '#EF4444',
  },
  wiildMoodtrailssQuizPlayScreenFeedbackBody: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    lineHeight: 20,
  },
  wiildMoodtrailssQuizPlayScreenNextButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#FF6B1A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  wiildMoodtrailssQuizPlayScreenNextButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
  },
  wiildMoodtrailssQuizPlayScreenNotFoundLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  wiildMoodtrailssQuizPlayScreenNotFoundMessage: {
    color: '#FFFFFF',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
  },
  wiildMoodtrailssQuizPlayScreenNavigateBackLabel: {
    color: '#FF6B1A',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  wiildMoodtrailssQuizResultScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
    paddingHorizontal: spacing.md,
  },
  wiildMoodtrailssQuizResultScreenContentColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  wiildMoodtrailssQuizResultScreenBadgeFrame: {
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
  wiildMoodtrailssQuizResultScreenBadgeGlyph: {
    fontSize: 36,
  },
  wiildMoodtrailssQuizResultScreenHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 26,
  },
  wiildMoodtrailssQuizResultScreenLevelLabel: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    marginTop: -8,
  },
  wiildMoodtrailssQuizResultScreenResultPanel: {
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
  wiildMoodtrailssQuizResultScreenResultValue: {
    color: '#FF6B1A',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 48,
    fontStyle: 'italic',
  },
  wiildMoodtrailssQuizResultScreenResultCaption: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
  },
  wiildMoodtrailssQuizResultScreenActionRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 8,
  },
  wiildMoodtrailssQuizResultScreenRetryControl: {
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
  wiildMoodtrailssQuizResultScreenRetryGlyph: {
    color: '#8B95B0',
    fontSize: 18,
  },
  wiildMoodtrailssQuizResultScreenRetryLabel: {
    color: '#8B95B0',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  wiildMoodtrailssQuizResultScreenContinueControl: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#9333EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssQuizResultScreenContinueLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
});
