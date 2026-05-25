import React, {useCallback, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  AnimalGuideCard,
  GuideHeader,
  GuideSegmentedControl,
  SafetyNoteCard,
  type GuideTab,
} from '../../components/guide';
import {Routes, colors, fonts, spacing} from '../../consts';
import {guideAnimals, guideSafetyNotes, type GuideAnimal} from '../../data';
import type {LibraryStackParamList} from '../../navigation/types';

type Props = StackScreenProps<
  LibraryStackParamList,
  typeof Routes.library.main
>;

const ANIMAL_HINT =
  'Tap any animal to learn safe distance, behavior tips, and what not to do.';
const SAFETY_HINT = 'Essential reading for every wilderness traveler.';

export function LibraryScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<GuideTab>('animals');

  const openAnimal = useCallback(
    (id: string) => {
      navigation.navigate(Routes.library.detail, {id});
    },
    [navigation],
  );

  const renderAnimalRow = useCallback(
    ({item}: {item: [GuideAnimal, GuideAnimal | null]}) => {
      const [left, right] = item;
      return (
        <View style={styles.gridRow}>
          <AnimalGuideCard animal={left} onPress={() => openAnimal(left.id)} />
          {right ? (
            <AnimalGuideCard
              animal={right}
              onPress={() => openAnimal(right.id)}
            />
          ) : (
            <View style={styles.gridSpacer} />
          )}
        </View>
      );
    },
    [openAnimal],
  );

  const animalRows = React.useMemo(() => {
    const rows: [GuideAnimal, GuideAnimal | null][] = [];
    for (let i = 0; i < guideAnimals.length; i += 2) {
      rows.push([guideAnimals[i], guideAnimals[i + 1] ?? null]);
    }
    return rows;
  }, []);

  return (
    <View style={styles.screenLayout}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingTop: insets.top + 10,
          paddingBottom: Math.max(insets.bottom, spacing.lg) + 80,
        }}>
        <View style={styles.headerBlock}>
          <GuideHeader />
          <GuideSegmentedControl
            activeSection={activeTab}
            onChange={setActiveTab}
          />
          <Text style={styles.hint}>
            {activeTab === 'animals' ? ANIMAL_HINT : SAFETY_HINT}
          </Text>
        </View>

        {activeTab === 'animals' ? (
          <FlatList
            data={animalRows}
            keyExtractor={([left, right]) =>
              right ? `${left.id}-${right.id}` : left.id
            }
            scrollEnabled={false}
            renderItem={renderAnimalRow}
            contentContainerStyle={styles.animalList}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        ) : (
          <View style={styles.safetyList}>
            {guideSafetyNotes.map(note => (
              <SafetyNoteCard key={note.id} note={note} />
            ))}
          </View>
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
  headerBlock: {
    paddingHorizontal: spacing.md,
    gap: 14,
    paddingBottom: 8,
  },
  hint: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
  },
  animalList: {
    paddingHorizontal: spacing.md,
    paddingTop: 4,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  gridSpacer: {
    flex: 1,
  },
  separator: {
    height: 12,
  },
  safetyList: {
    paddingHorizontal: spacing.md,
    gap: 12,
    paddingTop: 4,
  },
});
