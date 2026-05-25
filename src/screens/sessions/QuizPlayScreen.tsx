import React, {useCallback, useMemo, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Routes, colors, fonts, spacing} from '../../consts';
import {
  getQuizLevel,
  type QuizOption,
  type QuizQuestion,
} from '../../data/quizLevels';
import type {SessionsStackParamList} from '../../navigation/types';

type Props = StackScreenProps<
  SessionsStackParamList,
  typeof Routes.sessions.quiz
>;

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export function QuizPlayScreen({navigation, route}: Props) {
  const insets = useSafeAreaInsets();
  const level = getQuizLevel(route.params.levelId);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const question: QuizQuestion | undefined = level?.questions[questionIndex];
  const total = level?.questions.length ?? 0;
  const answered = selectedId !== null;

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
      navigation.replace(Routes.sessions.result, {
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
      <View style={styles.notFoundLayout}>
        <Text style={styles.notFoundMessage}>Level not found.</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.navigateBackLabel}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const selectedOption = question.options.find(o => o.id === selectedId);
  const isCorrect = selectedOption?.correct ?? false;

  return (
    <View style={[styles.screenLayout, {paddingTop: insets.top + 10}]}>
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.navigationControl}>
          <Text style={styles.navigationGlyph}>←</Text>
        </Pressable>
        <View style={styles.topBarCenter}>
          <Text style={styles.bolt}>⚡</Text>
          <Text style={styles.screenHeading}>{level.title}</Text>
        </View>
        <Text style={styles.counter}>
          {questionIndex + 1}/{total}
        </Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, {width: `${progress * 100}%`}]} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: Math.max(insets.bottom, spacing.lg) + 24},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.promptPanel}>
          <View style={styles.questionIcon}>
            <Text style={styles.questionBolt}>⚡</Text>
          </View>
          <Text style={styles.questionText}>{question.text}</Text>
        </View>

        <View style={styles.options}>
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
                  styles.option,
                  showCorrect && styles.optionCorrect,
                  showWrong && styles.optionWrong,
                ]}>
                <View
                  style={[
                    styles.optionBadge,
                    showCorrect && styles.optionBadgeCorrect,
                    showWrong && styles.optionBadgeWrong,
                  ]}>
                  <Text
                    style={[
                      styles.optionBadgeText,
                      (showCorrect || showWrong) &&
                        styles.optionBadgeTextActive,
                    ]}>
                    {showCorrect ? '✓' : OPTION_LABELS[index]}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.optionText,
                    showCorrect && styles.optionTextCorrect,
                    showWrong && styles.optionTextWrong,
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
              styles.feedback,
              isCorrect ? styles.feedbackCorrect : styles.feedbackWrong,
            ]}>
            <Text
              style={[
                styles.feedbackTitle,
                isCorrect
                  ? styles.feedbackTitleCorrect
                  : styles.feedbackTitleWrong,
              ]}>
              {isCorrect ? '✓ CORRECT!' : '✕ INCORRECT'}
            </Text>
            <Text style={styles.feedbackBody}>{question.explanation}</Text>
          </View>
        )}

        {answered && (
          <Pressable style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {questionIndex >= total - 1 ? 'See Results →' : 'Next Question →'}
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenLayout: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    gap: 8,
  },
  navigationControl: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationGlyph: {
    color: colors.text,
    fontSize: 22,
  },
  topBarCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  bolt: {
    color: colors.primary,
    fontSize: 16,
  },
  screenHeading: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 15,
  },
  counter: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 13,
    minWidth: 36,
    textAlign: 'right',
  },
  progressTrack: {
    height: 3,
    backgroundColor: colors.surfaceMuted,
    marginHorizontal: spacing.md,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    gap: 14,
  },
  promptPanel: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    padding: 18,
    gap: 12,
  },
  questionIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 107, 26, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionBolt: {
    color: colors.primary,
    fontSize: 16,
  },
  questionText: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 17,
    lineHeight: 24,
  },
  options: {
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    padding: 14,
  },
  optionCorrect: {
    backgroundColor: colors.successBg,
    borderColor: colors.successBorder,
  },
  optionWrong: {
    backgroundColor: colors.errorBg,
    borderColor: colors.errorBorder,
  },
  optionBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionBadgeCorrect: {
    backgroundColor: colors.success,
  },
  optionBadgeWrong: {
    backgroundColor: colors.error,
  },
  optionBadgeText: {
    color: colors.textDim,
    fontFamily: fonts.montserratBold,
    fontSize: 12,
  },
  optionBadgeTextActive: {
    color: colors.text,
  },
  optionText: {
    flex: 1,
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 14,
    lineHeight: 20,
  },
  optionTextCorrect: {
    color: colors.success,
  },
  optionTextWrong: {
    color: colors.error,
  },
  feedback: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 8,
  },
  feedbackCorrect: {
    backgroundColor: colors.successBg,
    borderColor: colors.successBorder,
  },
  feedbackWrong: {
    backgroundColor: colors.errorBg,
    borderColor: colors.errorBorder,
  },
  feedbackTitle: {
    fontFamily: fonts.montserratBold,
    fontSize: 12,
    letterSpacing: 0.5,
  },
  feedbackTitleCorrect: {
    color: colors.success,
  },
  feedbackTitleWrong: {
    color: colors.error,
  },
  feedbackBody: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 13,
    lineHeight: 20,
  },
  nextButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  nextButtonText: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 15,
  },
  notFoundLayout: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  notFoundMessage: {
    color: colors.text,
    fontFamily: fonts.nunitoRegular,
    fontSize: 16,
  },
  navigateBackLabel: {
    color: colors.primary,
    fontFamily: fonts.montserratBold,
    fontSize: 14,
  },
});
