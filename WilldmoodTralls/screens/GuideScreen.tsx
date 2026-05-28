import React, {useCallback, useState} from 'react';
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

import {
  WiildMoodtrailssGetGuideAnimal,
  WiildMoodtrailssGuideAnimalImages,
  WiildMoodtrailssGuideAnimals,
  WiildMoodtrailssGuideSafetyNotes,
  type WiildMoodtrailssGuideAnimal,
  type WiildMoodtrailssSafetyNote,
} from '../data';

const WiildMoodtrailssRoutes = {
  library: {
    main: 'LibraryMain',
    detail: 'LibraryDetail',
  },
} as const;

type WiildMoodtrailssLibraryStackParamList = {
  LibraryMain: undefined;
  LibraryDetail: {id: string};
};

const WiildMoodtrailssSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 28,
  xxl: 32,
} as const;

const PAGE_BOTTOM_PADDING = 80;
const LIBRARY_TOP_PADDING = 45;
const DETAIL_NAV_TOP_PADDING = 24;

function WiildMoodtrailssLibrarySeparator() {
  return <View style={styles.wiildMoodtrailssLibraryScreenSeparator} />;
}

function WiildMoodtrailssGuideHeader() {
  return (
    <View style={styles.wiildMoodtrailssGuideHeaderHeaderRow}>
      <Image
        source={require('../../assets/images/wiild-moodtrailss-guide.png')}
        style={styles.wiildMoodtrailssGuideHeaderLeadingGraphic}
        resizeMode="contain"
      />
      <Text style={styles.wiildMoodtrailssGuideHeaderHeading}>Field Guide</Text>
    </View>
  );
}

type WiildMoodtrailssGuideTab = 'animals' | 'safety';

type WiildMoodtrailssGuideSegmentedControlProps = {
  activeSection: WiildMoodtrailssGuideTab;
  onChange: (tab: WiildMoodtrailssGuideTab) => void;
};

const sections: {id: WiildMoodtrailssGuideTab; label: string}[] = [
  {id: 'animals', label: 'Animal Guide'},
  {id: 'safety', label: 'Wild Safety'},
];

function WiildMoodtrailssGuideSegmentedControl({
  activeSection,
  onChange,
}: WiildMoodtrailssGuideSegmentedControlProps) {
  return (
    <View style={styles.wiildMoodtrailssGuideSegmentedControlSegmentFrame}>
      {sections.map(section => {
        const isSelected = section.id === activeSection;
        return (
          <Pressable
            key={section.id}
            onPress={() => onChange(section.id)}
            style={[
              styles.wiildMoodtrailssGuideSegmentedControlSegment,
              isSelected &&
                styles.wiildMoodtrailssGuideSegmentedControlSegmentSelected,
            ]}>
            <Text
              style={[
                styles.wiildMoodtrailssGuideSegmentedControlSegmentLabel,
                isSelected &&
                  styles.wiildMoodtrailssGuideSegmentedControlSegmentLabelSelected,
              ]}>
              {section.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

type WiildMoodtrailssFormatSafeDistanceProps = {
  animal: WiildMoodtrailssGuideAnimal;
  onPress: () => void;
};

function WiildMoodtrailssFormatSafeDistance(meters: number): string {
  return `${meters} meters minimum`;
}

function WiildMoodtrailssAnimalGuideCard({
  animal,
  onPress,
}: WiildMoodtrailssFormatSafeDistanceProps) {
  return (
    <Pressable
      style={styles.wiildMoodtrailssAnimalGuideCardPanel}
      onPress={onPress}>
      <View style={styles.wiildMoodtrailssAnimalGuideCardMediaFrame}>
        <ImageBackground
          source={WiildMoodtrailssGuideAnimalImages[animal.id]}
          style={styles.wiildMoodtrailssAnimalGuideCardMedia}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(7, 12, 26, 0.75)']}
            locations={[0.5, 1]}
            style={styles.wiildMoodtrailssAnimalGuideCardMediaFade}
          />
        </ImageBackground>
      </View>
      <View style={styles.wiildMoodtrailssAnimalGuideCardContent}>
        <Text
          style={styles.wiildMoodtrailssAnimalGuideCardHeading}
          numberOfLines={1}>
          {animal.name}
        </Text>
        <View style={styles.wiildMoodtrailssAnimalGuideCardDistanceRow}>
          <Text style={styles.wiildMoodtrailssAnimalGuideCardProximityIcon}>
            🛡
          </Text>
          <Text style={styles.wiildMoodtrailssAnimalGuideCardDistanceText}>
            {WiildMoodtrailssFormatSafeDistance(animal.safeDistanceMeters)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

type WiildMoodtrailssSafetyNoteCardProps = {
  note: WiildMoodtrailssSafetyNote;
  onPress?: () => void;
};

function WiildMoodtrailssSafetyNoteCard({
  note,
  onPress,
}: WiildMoodtrailssSafetyNoteCardProps) {
  const caardContent = (
    <>
      <Text style={styles.wiildMoodtrailssSafetyNoteCardHeading}>
        {note.title}
      </Text>
      <Text style={styles.wiildMoodtrailssSafetyNoteCardSummary}>
        {note.description}
      </Text>
    </>
  );

  if (!onPress) {
    return (
      <View style={styles.wiildMoodtrailssSafetyNoteCardPanel}>
        {caardContent}
      </View>
    );
  }

  return (
    <Pressable
      style={styles.wiildMoodtrailssSafetyNoteCardPanel}
      onPress={onPress}>
      {caardContent}
    </Pressable>
  );
}

type WiildMoodtrailssLibraryScreenProps = StackScreenProps<
  WiildMoodtrailssLibraryStackParamList,
  typeof WiildMoodtrailssRoutes.library.main
>;

const ANIMAL_HINT =
  'Tap any animal to learn safe distance, behavior tips, and what not to do.';
const SAFETY_HINT = 'Essential reading for every wilderness traveler.';

export function WiildMoodtrailssLibraryScreen({
  navigation,
}: WiildMoodtrailssLibraryScreenProps) {
  const [activeTab, setActiveTab] =
    useState<WiildMoodtrailssGuideTab>('animals');

  const openAnimal = useCallback(
    (id: string) => {
      navigation.navigate(WiildMoodtrailssRoutes.library.detail, {id});
    },
    [navigation],
  );

  const renderAnimalRow = useCallback(
    ({
      item,
    }: {
      item: [WiildMoodtrailssGuideAnimal, WiildMoodtrailssGuideAnimal | null];
    }) => {
      const [left, right] = item;
      return (
        <View style={styles.wiildMoodtrailssLibraryScreenGridRow}>
          <WiildMoodtrailssAnimalGuideCard
            animal={left}
            onPress={() => openAnimal(left.id)}
          />
          {right ? (
            <WiildMoodtrailssAnimalGuideCard
              animal={right}
              onPress={() => openAnimal(right.id)}
            />
          ) : (
            <View style={styles.wiildMoodtrailssLibraryScreenGridSpacer} />
          )}
        </View>
      );
    },
    [openAnimal],
  );

  const animalRows = React.useMemo(() => {
    const rows: [
      WiildMoodtrailssGuideAnimal,
      WiildMoodtrailssGuideAnimal | null,
    ][] = [];
    for (let i = 0; i < WiildMoodtrailssGuideAnimals.length; i += 2) {
      rows.push([
        WiildMoodtrailssGuideAnimals[i],
        WiildMoodtrailssGuideAnimals[i + 1] ?? null,
      ]);
    }
    return rows;
  }, []);

  return (
    <View style={styles.wiildMoodtrailssLibraryScreenScreenLayout}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingTop: LIBRARY_TOP_PADDING,
          paddingBottom: PAGE_BOTTOM_PADDING,
        }}>
        <View style={styles.wiildMoodtrailssLibraryScreenHeaderBlock}>
          <WiildMoodtrailssGuideHeader />
          <WiildMoodtrailssGuideSegmentedControl
            activeSection={activeTab}
            onChange={setActiveTab}
          />
          <Text style={styles.wiildMoodtrailssLibraryScreenHint}>
            {activeTab === 'animals' ? ANIMAL_HINT : SAFETY_HINT}
          </Text>
        </View>

        {activeTab === 'animals' ? (
          <View style={styles.wiildMoodtrailssLibraryScreenAnimalList}>
            {animalRows.map((row, index) => {
              const key = row[1] ? `${row[0].id}-${row[1].id}` : row[0].id;
              return (
                <React.Fragment key={key}>
                  {renderAnimalRow({item: row})}
                  {index < animalRows.length - 1 ? (
                    <WiildMoodtrailssLibrarySeparator />
                  ) : null}
                </React.Fragment>
              );
            })}
          </View>
        ) : (
          <View style={styles.wiildMoodtrailssLibraryScreenSafetyList}>
            {WiildMoodtrailssGuideSafetyNotes.map(note => (
              <WiildMoodtrailssSafetyNoteCard key={note.id} note={note} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

type WiildMoodtrailssGuidanceListProps = StackScreenProps<
  WiildMoodtrailssLibraryStackParamList,
  typeof WiildMoodtrailssRoutes.library.detail
>;

function WiildMoodtrailssGuidanceList({
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
    <View style={styles.wiildMoodtrailssAnimalDetailScreenGuidanceSection}>
      <Text
        style={[
          styles.wiildMoodtrailssAnimalDetailScreenGuidanceHeading,
          {color: headingColor},
        ]}>
        {heading}
      </Text>
      <View style={styles.wiildMoodtrailssAnimalDetailScreenGuidanceItems}>
        {items.map(item => (
          <View
            key={item}
            style={styles.wiildMoodtrailssAnimalDetailScreenGuidanceRow}>
            <Text
              style={[
                styles.wiildMoodtrailssAnimalDetailScreenGuidanceMarker,
                {color: markerColor},
              ]}>
              {marker}
            </Text>
            <Text style={styles.wiildMoodtrailssAnimalDetailScreenGuidanceCopy}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export function WiildMoodtrailssAnimalDetailScreen({
  navigation,
  route,
}: WiildMoodtrailssGuidanceListProps) {
  const animal = WiildMoodtrailssGetGuideAnimal(route.params.id);

  if (!animal) {
    return (
      <View style={styles.wiildMoodtrailssAnimalDetailScreenNotFoundLayout}>
        <Text style={styles.wiildMoodtrailssAnimalDetailScreenNotFoundMessage}>
          Animal not found.
        </Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text
            style={styles.wiildMoodtrailssAnimalDetailScreenNavigateBackLabel}>
            Go back
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.wiildMoodtrailssAnimalDetailScreenScreenLayout}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingBottom: PAGE_BOTTOM_PADDING,
        }}>
        <View style={styles.wiildMoodtrailssAnimalDetailScreenBannerFrame}>
          <ImageBackground
            source={WiildMoodtrailssGuideAnimalImages[animal.id]}
            style={styles.wiildMoodtrailssAnimalDetailScreenBannerMedia}
            resizeMode="cover">
            <LinearGradient
              colors={['rgba(0,0,0,0.15)', 'rgba(7,12,26,0.95)']}
              style={styles.wiildMoodtrailssAnimalDetailScreenBannerFade}
            />
            <View
              style={[
                styles.wiildMoodtrailssAnimalDetailScreenNavigationBar,
                {paddingTop: DETAIL_NAV_TOP_PADDING},
              ]}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={
                  styles.wiildMoodtrailssAnimalDetailScreenNavigationControl
                }>
                <Text
                  style={
                    styles.wiildMoodtrailssAnimalDetailScreenNavigationGlyph
                  }>
                  ←
                </Text>
              </Pressable>
            </View>
            <View style={styles.wiildMoodtrailssAnimalDetailScreenBannerCaption}>
              <Text
                style={styles.wiildMoodtrailssAnimalDetailScreenBannerHeading}>
                {animal.name}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.wiildMoodtrailssAnimalDetailScreenMainContent}>
          <View style={styles.wiildMoodtrailssAnimalDetailScreenDistanceNotice}>
            <Text style={styles.wiildMoodtrailssAnimalDetailScreenDistanceGlyph}>
              🛡
            </Text>
            <Text style={styles.wiildMoodtrailssAnimalDetailScreenDistanceCopy}>
              Safe distance:{' '}
              {WiildMoodtrailssFormatSafeDistance(animal.safeDistanceMeters)}
            </Text>
          </View>

          <Text style={styles.wiildMoodtrailssAnimalDetailScreenOverviewCopy}>
            {animal.description}
          </Text>

          <View style={styles.wiildMoodtrailssAnimalDetailScreenHabitatPanel}>
            <Text
              style={styles.wiildMoodtrailssAnimalDetailScreenHabitatHeading}>
              🗺 HABITAT
            </Text>
            <Text style={styles.wiildMoodtrailssAnimalDetailScreenHabitatCopy}>
              {animal.habitat}
            </Text>
          </View>

          <WiildMoodtrailssGuidanceList
            heading="BEHAVIOR TIPS"
            headingColor={'#E8EEFF'}
            items={animal.behaviorTips}
            marker="✓"
            markerColor={'#22C55E'}
          />

          <WiildMoodtrailssGuidanceList
            heading="WHAT NOT TO DO"
            headingColor={'#FF6B6B'}
            items={animal.whatNotToDo}
            marker="✕"
            markerColor={'#EF4444'}
          />

          <View style={styles.wiildMoodtrailssAnimalDetailScreenInsightPanel}>
            <Text
              style={styles.wiildMoodtrailssAnimalDetailScreenInsightHeading}>
              ⚡ FIELD NOTE
            </Text>
            <Text style={styles.wiildMoodtrailssAnimalDetailScreenInsightCopy}>
              {animal.insightNote}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wiildMoodtrailssGuideHeaderHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wiildMoodtrailssGuideHeaderLeadingGraphic: {
    width: 22,
    height: 22,
    tintColor: '#9333EA',
  },
  wiildMoodtrailssGuideHeaderHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 22,
  },
  wiildMoodtrailssGuideSegmentedControlSegmentFrame: {
    flexDirection: 'row',
    backgroundColor: '#0F1729',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 4,
    gap: 4,
  },
  wiildMoodtrailssGuideSegmentedControlSegment: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssGuideSegmentedControlSegmentSelected: {
    backgroundColor: '#1A2440',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  wiildMoodtrailssGuideSegmentedControlSegmentLabel: {
    color: '#8B95B0',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
  },
  wiildMoodtrailssGuideSegmentedControlSegmentLabelSelected: {
    color: '#FFFFFF',
  },
  wiildMoodtrailssAnimalGuideCardPanel: {
    flex: 1,
    backgroundColor: '#0F1729',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    overflow: 'hidden',
  },
  wiildMoodtrailssAnimalGuideCardMediaFrame: {
    height: 120,
  },
  wiildMoodtrailssAnimalGuideCardMedia: {
    flex: 1,
  },
  wiildMoodtrailssAnimalGuideCardMediaFade: {
    ...StyleSheet.absoluteFillObject,
  },
  wiildMoodtrailssAnimalGuideCardContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 4,
  },
  wiildMoodtrailssAnimalGuideCardHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
  },
  wiildMoodtrailssAnimalGuideCardDistanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  wiildMoodtrailssAnimalGuideCardProximityIcon: {
    fontSize: 10,
  },
  wiildMoodtrailssAnimalGuideCardDistanceText: {
    flex: 1,
    color: '#A78BFA',
    fontFamily: 'Nunito-Regular',
    fontSize: 10,
    lineHeight: 14,
  },

  wiildMoodtrailssSafetyNoteCardPanel: {
    backgroundColor: '#0F1729',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 16,
    gap: 8,
  },
  wiildMoodtrailssSafetyNoteCardHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    lineHeight: 20,
  },
  wiildMoodtrailssSafetyNoteCardSummary: {
    color: '#6B7A96',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    lineHeight: 19.5,
  },
  wiildMoodtrailssLibraryScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  wiildMoodtrailssLibraryScreenHeaderBlock: {
    paddingHorizontal: WiildMoodtrailssSpacing.md,
    gap: 14,
    paddingBottom: 8,
  },
  wiildMoodtrailssLibraryScreenHint: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    paddingHorizontal: WiildMoodtrailssSpacing.sm,
  },
  wiildMoodtrailssLibraryScreenAnimalList: {
    paddingHorizontal: WiildMoodtrailssSpacing.md,
    paddingTop: 4,
  },
  wiildMoodtrailssLibraryScreenGridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  wiildMoodtrailssLibraryScreenGridSpacer: {
    flex: 1,
  },
  wiildMoodtrailssLibraryScreenSeparator: {
    height: 12,
  },
  wiildMoodtrailssLibraryScreenSafetyList: {
    paddingHorizontal: WiildMoodtrailssSpacing.md,
    gap: 12,
    paddingTop: 4,
  },
  wiildMoodtrailssAnimalDetailScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  wiildMoodtrailssAnimalDetailScreenNotFoundLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
    alignItems: 'center',
    justifyContent: 'center',
    gap: WiildMoodtrailssSpacing.md,
  },
  wiildMoodtrailssAnimalDetailScreenNotFoundMessage: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
  },
  wiildMoodtrailssAnimalDetailScreenNavigateBackLabel: {
    color: '#FF6B1A',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
  },
  wiildMoodtrailssAnimalDetailScreenBannerFrame: {
    height: 280,
  },
  wiildMoodtrailssAnimalDetailScreenBannerMedia: {
    flex: 1,
    justifyContent: 'space-between',
  },
  wiildMoodtrailssAnimalDetailScreenBannerFade: {
    ...StyleSheet.absoluteFillObject,
  },
  wiildMoodtrailssAnimalDetailScreenNavigationBar: {
    paddingHorizontal: WiildMoodtrailssSpacing.md,
    zIndex: 1,
  },
  wiildMoodtrailssAnimalDetailScreenNavigationControl: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(7, 12, 26, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssAnimalDetailScreenNavigationGlyph: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  wiildMoodtrailssAnimalDetailScreenBannerCaption: {
    paddingHorizontal: WiildMoodtrailssSpacing.md,
    paddingBottom: WiildMoodtrailssSpacing.lg,
    zIndex: 1,
  },
  wiildMoodtrailssAnimalDetailScreenBannerHeading: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 28,
  },
  wiildMoodtrailssAnimalDetailScreenMainContent: {
    paddingHorizontal: WiildMoodtrailssSpacing.md,
    paddingTop: WiildMoodtrailssSpacing.md,
    gap: WiildMoodtrailssSpacing.lg,
  },
  wiildMoodtrailssAnimalDetailScreenDistanceNotice: {
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
  wiildMoodtrailssAnimalDetailScreenDistanceGlyph: {
    fontSize: 16,
  },
  wiildMoodtrailssAnimalDetailScreenDistanceCopy: {
    flex: 1,
    color: '#C084FC',
    fontFamily: 'Nunito-Medium',
    fontSize: 13,
    lineHeight: 18,
  },
  wiildMoodtrailssAnimalDetailScreenOverviewCopy: {
    color: '#6B7A96',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 21,
  },
  wiildMoodtrailssAnimalDetailScreenHabitatPanel: {
    backgroundColor: '#0F1729',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 14,
    gap: 8,
  },
  wiildMoodtrailssAnimalDetailScreenHabitatHeading: {
    color: '#8B95B0',
    fontFamily: 'Montserrat-Bold',
    fontSize: 11,
    letterSpacing: 0.8,
  },
  wiildMoodtrailssAnimalDetailScreenHabitatCopy: {
    color: '#E8EEFF',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  wiildMoodtrailssAnimalDetailScreenGuidanceSection: {
    gap: 12,
  },
  wiildMoodtrailssAnimalDetailScreenGuidanceHeading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    letterSpacing: 0.8,
  },
  wiildMoodtrailssAnimalDetailScreenGuidanceItems: {
    gap: 10,
  },
  wiildMoodtrailssAnimalDetailScreenGuidanceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  wiildMoodtrailssAnimalDetailScreenGuidanceMarker: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    lineHeight: 20,
    width: 16,
  },
  wiildMoodtrailssAnimalDetailScreenGuidanceCopy: {
    flex: 1,
    color: '#6B7A96',
    fontFamily: 'Nunito-Regular',
    fontSize: 13.5,
    lineHeight: 20,
  },
  wiildMoodtrailssAnimalDetailScreenInsightPanel: {
    backgroundColor: 'rgba(234, 179, 8, 0.08)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.45)',
    padding: 14,
    gap: 8,
  },
  wiildMoodtrailssAnimalDetailScreenInsightHeading: {
    color: '#EAB308',
    fontFamily: 'Montserrat-Bold',
    fontSize: 11,
    letterSpacing: 0.8,
  },
  wiildMoodtrailssAnimalDetailScreenInsightCopy: {
    color: '#E8EEFF',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
});
