import React, {useCallback, useState} from 'react';
import {
  FlatList,
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  WlffMuddTraillsRoutes,
  WlffMuddTraillsSpacing,
} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';
import {
  WlffMuddTraillsGetGuideAnimal,
  WlffMuddTraillsGuideAnimalImages,
  WlffMuddTraillsGuideAnimals,
  WlffMuddTraillsGuideSafetyNotes,
  type WlffMuddTraillsGuideAnimal,
  type WlffMuddTraillsSafetyNote,
} from '../WlffMuddTraillsData/WlffMuddTraillsIndex';
import type {WlffMuddTraillsLibraryStackParamList} from '../WlffMuddTraillsRoutes/WlffMuddTraillsTypes';

function WlffMuddTraillsGuideHeader() {
  return (
    <View style={styles.wlffMuddTraillsGuideHeaderHeaderRow}>
      <Image
        source={require('../../assets/images/guide.png')}
        style={styles.wlffMuddTraillsGuideHeaderLeadingGraphic}
        resizeMode="contain"
      />
      <Text style={styles.wlffMuddTraillsGuideHeaderHeading}>Field Guide</Text>
    </View>
  );
}

type WlffMuddTraillsGuideTab = 'animals' | 'safety';

type WlffMuddTraillsGuideSegmentedControlProps = {
  activeSection: WlffMuddTraillsGuideTab;
  onChange: (tab: WlffMuddTraillsGuideTab) => void;
};

const sections: {id: WlffMuddTraillsGuideTab; label: string}[] = [
  {id: 'animals', label: 'Animal Guide'},
  {id: 'safety', label: 'Wild Safety'},
];

function WlffMuddTraillsGuideSegmentedControl({
  activeSection,
  onChange,
}: WlffMuddTraillsGuideSegmentedControlProps) {
  return (
    <View style={styles.wlffMuddTraillsGuideSegmentedControlSegmentFrame}>
      {sections.map(section => {
        const isSelected = section.id === activeSection;
        return (
          <Pressable
            key={section.id}
            onPress={() => onChange(section.id)}
            style={[
              styles.wlffMuddTraillsGuideSegmentedControlSegment,
              isSelected &&
                styles.wlffMuddTraillsGuideSegmentedControlSegmentSelected,
            ]}>
            <Text
              style={[
                styles.wlffMuddTraillsGuideSegmentedControlSegmentLabel,
                isSelected &&
                  styles.wlffMuddTraillsGuideSegmentedControlSegmentLabelSelected,
              ]}>
              {section.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

type WlffMuddTraillsFormatSafeDistanceProps = {
  animal: WlffMuddTraillsGuideAnimal;
  onPress: () => void;
};

function WlffMuddTraillsFormatSafeDistance(meters: number): string {
  return `${meters} meters minimum`;
}

function WlffMuddTraillsAnimalGuideCard({
  animal,
  onPress,
}: WlffMuddTraillsFormatSafeDistanceProps) {
  return (
    <Pressable
      style={styles.wlffMuddTraillsAnimalGuideCardPanel}
      onPress={onPress}>
      <View style={styles.wlffMuddTraillsAnimalGuideCardMediaFrame}>
        <ImageBackground
          source={WlffMuddTraillsGuideAnimalImages[animal.id]}
          style={styles.wlffMuddTraillsAnimalGuideCardMedia}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(7, 12, 26, 0.75)']}
            locations={[0.5, 1]}
            style={styles.wlffMuddTraillsAnimalGuideCardMediaFade}
          />
        </ImageBackground>
      </View>
      <View style={styles.wlffMuddTraillsAnimalGuideCardContent}>
        <Text
          style={styles.wlffMuddTraillsAnimalGuideCardHeading}
          numberOfLines={1}>
          {animal.name}
        </Text>
        <View style={styles.wlffMuddTraillsAnimalGuideCardDistanceRow}>
          <Text style={styles.wlffMuddTraillsAnimalGuideCardProximityIcon}>
            🛡
          </Text>
          <Text style={styles.wlffMuddTraillsAnimalGuideCardDistanceText}>
            {WlffMuddTraillsFormatSafeDistance(animal.safeDistanceMeters)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

type WlffMuddTraillsSafetyNoteCardProps = {
  note: WlffMuddTraillsSafetyNote;
  onPress?: () => void;
};

function WlffMuddTraillsSafetyNoteCard({
  note,
  onPress,
}: WlffMuddTraillsSafetyNoteCardProps) {
  const caardContent = (
    <>
      <Text style={styles.wlffMuddTraillsSafetyNoteCardHeading}>
        {note.title}
      </Text>
      <Text style={styles.wlffMuddTraillsSafetyNoteCardSummary}>
        {note.description}
      </Text>
    </>
  );

  if (!onPress) {
    return (
      <View style={styles.wlffMuddTraillsSafetyNoteCardPanel}>{content}</View>
    );
  }

  return (
    <Pressable
      style={styles.wlffMuddTraillsSafetyNoteCardPanel}
      onPress={onPress}>
      {caardContent}
    </Pressable>
  );
}

type WlffMuddTraillsLibraryScreenProps = StackScreenProps<
  WlffMuddTraillsLibraryStackParamList,
  typeof WlffMuddTraillsRoutes.library.main
>;

const ANIMAL_HINT =
  'Tap any animal to learn safe distance, behavior tips, and what not to do.';
const SAFETY_HINT = 'Essential reading for every wilderness traveler.';

export function WlffMuddTraillsLibraryScreen({
  navigation,
}: WlffMuddTraillsLibraryScreenProps) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] =
    useState<WlffMuddTraillsGuideTab>('animals');

  const openAnimal = useCallback(
    (id: string) => {
      navigation.navigate(WlffMuddTraillsRoutes.library.detail, {id});
    },
    [navigation],
  );

  const renderAnimalRow = useCallback(
    ({
      item,
    }: {
      item: [WlffMuddTraillsGuideAnimal, WlffMuddTraillsGuideAnimal | null];
    }) => {
      const [left, right] = item;
      return (
        <View style={styles.wlffMuddTraillsLibraryScreenGridRow}>
          <WlffMuddTraillsAnimalGuideCard
            animal={left}
            onPress={() => openAnimal(left.id)}
          />
          {right ? (
            <WlffMuddTraillsAnimalGuideCard
              animal={right}
              onPress={() => openAnimal(right.id)}
            />
          ) : (
            <View style={styles.wlffMuddTraillsLibraryScreenGridSpacer} />
          )}
        </View>
      );
    },
    [openAnimal],
  );

  const animalRows = React.useMemo(() => {
    const rows: [
      WlffMuddTraillsGuideAnimal,
      WlffMuddTraillsGuideAnimal | null,
    ][] = [];
    for (let i = 0; i < WlffMuddTraillsGuideAnimals.length; i += 2) {
      rows.push([
        WlffMuddTraillsGuideAnimals[i],
        WlffMuddTraillsGuideAnimals[i + 1] ?? null,
      ]);
    }
    return rows;
  }, []);

  return (
    <View style={styles.wlffMuddTraillsLibraryScreenScreenLayout}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingTop: insets.top + 10,
          paddingBottom:
            Math.max(insets.bottom, WlffMuddTraillsSpacing.lg) + 80,
        }}>
        <View style={styles.wlffMuddTraillsLibraryScreenHeaderBlock}>
          <WlffMuddTraillsGuideHeader />
          <WlffMuddTraillsGuideSegmentedControl
            activeSection={activeTab}
            onChange={setActiveTab}
          />
          <Text style={styles.wlffMuddTraillsLibraryScreenHint}>
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
            contentContainerStyle={
              styles.wlffMuddTraillsLibraryScreenAnimalList
            }
            ItemSeparatorComponent={() => (
              <View style={styles.wlffMuddTraillsLibraryScreenSeparator} />
            )}
          />
        ) : (
          <View style={styles.wlffMuddTraillsLibraryScreenSafetyList}>
            {WlffMuddTraillsGuideSafetyNotes.map(note => (
              <WlffMuddTraillsSafetyNoteCard key={note.id} note={note} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

type WlffMuddTraillsGuidanceListProps = StackScreenProps<
  WlffMuddTraillsLibraryStackParamList,
  typeof WlffMuddTraillsRoutes.library.detail
>;

function WlffMuddTraillsGuidanceList({
  heading,
  headingColor,
  items,
  marker,
  markerColor,
}: {
  heading: string;
  headingColor: string;
  items: string[];
  marker: string;
  markerColor: string;
}) {
  return (
    <View style={styles.wlffMuddTraillsAnimalDetailScreenGuidanceSection}>
      <Text
        style={[
          styles.wlffMuddTraillsAnimalDetailScreenGuidanceHeading,
          {color: headingColor},
        ]}>
        {heading}
      </Text>
      <View style={styles.wlffMuddTraillsAnimalDetailScreenGuidanceItems}>
        {items.map(item => (
          <View
            key={item}
            style={styles.wlffMuddTraillsAnimalDetailScreenGuidanceRow}>
            <Text
              style={[
                styles.wlffMuddTraillsAnimalDetailScreenGuidanceMarker,
                {color: markerColor},
              ]}>
              {marker}
            </Text>
            <Text style={styles.wlffMuddTraillsAnimalDetailScreenGuidanceCopy}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export function WlffMuddTraillsAnimalDetailScreen({
  navigation,
  route,
}: WlffMuddTraillsGuidanceListProps) {
  const insets = useSafeAreaInsets();
  const animal = WlffMuddTraillsGetGuideAnimal(route.params.id);

  if (!animal) {
    return (
      <View style={styles.wlffMuddTraillsAnimalDetailScreenNotFoundLayout}>
        <Text style={styles.wlffMuddTraillsAnimalDetailScreenNotFoundMessage}>
          Animal not found.
        </Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text
            style={styles.wlffMuddTraillsAnimalDetailScreenNavigateBackLabel}>
            Go back
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.wlffMuddTraillsAnimalDetailScreenScreenLayout}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingBottom:
            Math.max(insets.bottom, WlffMuddTraillsSpacing.lg) + 80,
        }}>
        <View style={styles.wlffMuddTraillsAnimalDetailScreenBannerFrame}>
          <ImageBackground
            source={WlffMuddTraillsGuideAnimalImages[animal.id]}
            style={styles.wlffMuddTraillsAnimalDetailScreenBannerMedia}
            resizeMode="cover">
            <LinearGradient
              colors={['rgba(0,0,0,0.15)', 'rgba(7,12,26,0.95)']}
              style={styles.wlffMuddTraillsAnimalDetailScreenBannerFade}
            />
            <View
              style={[
                styles.wlffMuddTraillsAnimalDetailScreenNavigationBar,
                {paddingTop: insets.top + 8},
              ]}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={
                  styles.wlffMuddTraillsAnimalDetailScreenNavigationControl
                }>
                <Text
                  style={
                    styles.wlffMuddTraillsAnimalDetailScreenNavigationGlyph
                  }>
                  ←
                </Text>
              </Pressable>
            </View>
            <View style={styles.wlffMuddTraillsAnimalDetailScreenBannerCaption}>
              <Text
                style={styles.wlffMuddTraillsAnimalDetailScreenBannerHeading}>
                {animal.name}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.wlffMuddTraillsAnimalDetailScreenMainContent}>
          <View style={styles.wlffMuddTraillsAnimalDetailScreenDistanceNotice}>
            <Text style={styles.wlffMuddTraillsAnimalDetailScreenDistanceGlyph}>
              🛡
            </Text>
            <Text style={styles.wlffMuddTraillsAnimalDetailScreenDistanceCopy}>
              Safe distance:{' '}
              {WlffMuddTraillsFormatSafeDistance(animal.safeDistanceMeters)}
            </Text>
          </View>

          <Text style={styles.wlffMuddTraillsAnimalDetailScreenOverviewCopy}>
            {animal.description}
          </Text>

          <View style={styles.wlffMuddTraillsAnimalDetailScreenHabitatPanel}>
            <Text
              style={styles.wlffMuddTraillsAnimalDetailScreenHabitatHeading}>
              🗺 HABITAT
            </Text>
            <Text style={styles.wlffMuddTraillsAnimalDetailScreenHabitatCopy}>
              {animal.habitat}
            </Text>
          </View>

          <WlffMuddTraillsGuidanceList
            heading="BEHAVIOR TIPS"
            headingColor={'#E8EEFF'}
            items={animal.behaviorTips}
            marker="✓"
            markerColor={'#22C55E'}
          />

          <WlffMuddTraillsGuidanceList
            heading="WHAT NOT TO DO"
            headingColor={'#FF6B6B'}
            items={animal.whatNotToDo}
            marker="✕"
            markerColor={'#EF4444'}
          />

          <View style={styles.wlffMuddTraillsAnimalDetailScreenInsightPanel}>
            <Text
              style={styles.wlffMuddTraillsAnimalDetailScreenInsightHeading}>
              ⚡ FIELD NOTE
            </Text>
            <Text style={styles.wlffMuddTraillsAnimalDetailScreenInsightCopy}>
              {animal.insightNote}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wlffMuddTraillsGuideHeaderHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wlffMuddTraillsGuideHeaderLeadingGraphic: {
    width: 22,
    height: 22,
    tintColor: '#9333EA',
  },
  wlffMuddTraillsGuideHeaderHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 22,
  },
  wlffMuddTraillsGuideSegmentedControlSegmentFrame: {
    flexDirection: 'row',
    backgroundColor: '#0F1729',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 4,
    gap: 4,
  },
  wlffMuddTraillsGuideSegmentedControlSegment: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsGuideSegmentedControlSegmentSelected: {
    backgroundColor: '#1A2440',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  wlffMuddTraillsGuideSegmentedControlSegmentLabel: {
    color: '#8B95B0',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
  },
  wlffMuddTraillsGuideSegmentedControlSegmentLabelSelected: {
    color: '#FFFFFF',
  },
  wlffMuddTraillsAnimalGuideCardPanel: {
    flex: 1,
    backgroundColor: '#0F1729',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    overflow: 'hidden',
  },
  wlffMuddTraillsAnimalGuideCardMediaFrame: {
    height: 120,
  },
  wlffMuddTraillsAnimalGuideCardMedia: {
    flex: 1,
  },
  wlffMuddTraillsAnimalGuideCardMediaFade: {
    ...StyleSheet.absoluteFillObject,
  },
  wlffMuddTraillsAnimalGuideCardContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 4,
  },
  wlffMuddTraillsAnimalGuideCardHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
  },
  wlffMuddTraillsAnimalGuideCardDistanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  wlffMuddTraillsAnimalGuideCardProximityIcon: {
    fontSize: 10,
  },
  wlffMuddTraillsAnimalGuideCardDistanceText: {
    flex: 1,
    color: '#A78BFA',
    fontFamily: 'Nunito-Regular',
    fontSize: 10,
    lineHeight: 14,
  },

  wlffMuddTraillsSafetyNoteCardPanel: {
    backgroundColor: '#0F1729',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 16,
    gap: 8,
  },
  wlffMuddTraillsSafetyNoteCardHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    lineHeight: 20,
  },
  wlffMuddTraillsSafetyNoteCardSummary: {
    color: '#6B7A96',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    lineHeight: 19.5,
  },
  wlffMuddTraillsLibraryScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  wlffMuddTraillsLibraryScreenHeaderBlock: {
    paddingHorizontal: WlffMuddTraillsSpacing.md,
    gap: 14,
    paddingBottom: 8,
  },
  wlffMuddTraillsLibraryScreenHint: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    paddingHorizontal: WlffMuddTraillsSpacing.sm,
  },
  wlffMuddTraillsLibraryScreenAnimalList: {
    paddingHorizontal: WlffMuddTraillsSpacing.md,
    paddingTop: 4,
  },
  wlffMuddTraillsLibraryScreenGridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  wlffMuddTraillsLibraryScreenGridSpacer: {
    flex: 1,
  },
  wlffMuddTraillsLibraryScreenSeparator: {
    height: 12,
  },
  wlffMuddTraillsLibraryScreenSafetyList: {
    paddingHorizontal: WlffMuddTraillsSpacing.md,
    gap: 12,
    paddingTop: 4,
  },
  wlffMuddTraillsAnimalDetailScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  wlffMuddTraillsAnimalDetailScreenNotFoundLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
    alignItems: 'center',
    justifyContent: 'center',
    gap: WlffMuddTraillsSpacing.md,
  },
  wlffMuddTraillsAnimalDetailScreenNotFoundMessage: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
  },
  wlffMuddTraillsAnimalDetailScreenNavigateBackLabel: {
    color: '#FF6B1A',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
  },
  wlffMuddTraillsAnimalDetailScreenBannerFrame: {
    height: 280,
  },
  wlffMuddTraillsAnimalDetailScreenBannerMedia: {
    flex: 1,
    justifyContent: 'space-between',
  },
  wlffMuddTraillsAnimalDetailScreenBannerFade: {
    ...StyleSheet.absoluteFillObject,
  },
  wlffMuddTraillsAnimalDetailScreenNavigationBar: {
    paddingHorizontal: WlffMuddTraillsSpacing.md,
    zIndex: 1,
  },
  wlffMuddTraillsAnimalDetailScreenNavigationControl: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(7, 12, 26, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsAnimalDetailScreenNavigationGlyph: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  wlffMuddTraillsAnimalDetailScreenBannerCaption: {
    paddingHorizontal: WlffMuddTraillsSpacing.md,
    paddingBottom: WlffMuddTraillsSpacing.lg,
    zIndex: 1,
  },
  wlffMuddTraillsAnimalDetailScreenBannerHeading: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 28,
  },
  wlffMuddTraillsAnimalDetailScreenMainContent: {
    paddingHorizontal: WlffMuddTraillsSpacing.md,
    paddingTop: WlffMuddTraillsSpacing.md,
    gap: WlffMuddTraillsSpacing.lg,
  },
  wlffMuddTraillsAnimalDetailScreenDistanceNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(147, 51, 234, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(147, 51, 234, 0.35)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  wlffMuddTraillsAnimalDetailScreenDistanceGlyph: {
    fontSize: 16,
  },
  wlffMuddTraillsAnimalDetailScreenDistanceCopy: {
    flex: 1,
    color: '#C084FC',
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
    lineHeight: 18,
  },
  wlffMuddTraillsAnimalDetailScreenOverviewCopy: {
    color: '#6B7A96',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 21,
  },
  wlffMuddTraillsAnimalDetailScreenHabitatPanel: {
    backgroundColor: '#0F1729',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 14,
    gap: 8,
  },
  wlffMuddTraillsAnimalDetailScreenHabitatHeading: {
    color: '#8B95B0',
    fontFamily: 'Montserrat-Bold',
    fontSize: 11,
    letterSpacing: 0.8,
  },
  wlffMuddTraillsAnimalDetailScreenHabitatCopy: {
    color: '#E8EEFF',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  wlffMuddTraillsAnimalDetailScreenGuidanceSection: {
    gap: 12,
  },
  wlffMuddTraillsAnimalDetailScreenGuidanceHeading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    letterSpacing: 0.8,
  },
  wlffMuddTraillsAnimalDetailScreenGuidanceItems: {
    gap: 10,
  },
  wlffMuddTraillsAnimalDetailScreenGuidanceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  wlffMuddTraillsAnimalDetailScreenGuidanceMarker: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    lineHeight: 20,
    width: 16,
  },
  wlffMuddTraillsAnimalDetailScreenGuidanceCopy: {
    flex: 1,
    color: '#6B7A96',
    fontFamily: 'Nunito-Regular',
    fontSize: 13.5,
    lineHeight: 20,
  },
  wlffMuddTraillsAnimalDetailScreenInsightPanel: {
    backgroundColor: 'rgba(234, 179, 8, 0.08)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.45)',
    padding: 14,
    gap: 8,
  },
  wlffMuddTraillsAnimalDetailScreenInsightHeading: {
    color: '#EAB308',
    fontFamily: 'Montserrat-Bold',
    fontSize: 11,
    letterSpacing: 0.8,
  },
  wlffMuddTraillsAnimalDetailScreenInsightCopy: {
    color: '#E8EEFF',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
});
