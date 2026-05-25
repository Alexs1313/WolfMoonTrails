import React from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {formatSafeDistance} from '../../components/guide';
import {Routes, colors, fonts, spacing} from '../../consts';
import {getGuideAnimal, guideAnimalImages} from '../../data';
import type {LibraryStackParamList} from '../../navigation/types';

type Props = StackScreenProps<
  LibraryStackParamList,
  typeof Routes.library.detail
>;

function GuidanceList({
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
    <View style={styles.guidanceSection}>
      <Text style={[styles.guidanceHeading, {color: headingColor}]}>
        {heading}
      </Text>
      <View style={styles.guidanceItems}>
        {items.map(item => (
          <View key={item} style={styles.guidanceRow}>
            <Text style={[styles.guidanceMarker, {color: markerColor}]}>
              {marker}
            </Text>
            <Text style={styles.guidanceCopy}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export function AnimalDetailScreen({navigation, route}: Props) {
  const insets = useSafeAreaInsets();
  const animal = getGuideAnimal(route.params.id);

  if (!animal) {
    return (
      <View style={styles.notFoundLayout}>
        <Text style={styles.notFoundMessage}>Animal not found.</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.navigateBackLabel}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screenLayout}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, spacing.lg) + 80,
        }}>
        <View style={styles.bannerFrame}>
          <ImageBackground
            source={guideAnimalImages[animal.id]}
            style={styles.bannerMedia}
            resizeMode="cover">
            <LinearGradient
              colors={['rgba(0,0,0,0.15)', 'rgba(7,12,26,0.95)']}
              style={styles.bannerFade}
            />
            <View style={[styles.navigationBar, {paddingTop: insets.top + 8}]}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.navigationControl}>
                <Text style={styles.navigationGlyph}>←</Text>
              </Pressable>
            </View>
            <View style={styles.bannerCaption}>
              <Text style={styles.bannerHeading}>{animal.name}</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.distanceNotice}>
            <Text style={styles.distanceGlyph}>🛡</Text>
            <Text style={styles.distanceCopy}>
              Safe distance: {formatSafeDistance(animal.safeDistanceMeters)}
            </Text>
          </View>

          <Text style={styles.overviewCopy}>{animal.description}</Text>

          <View style={styles.habitatPanel}>
            <Text style={styles.habitatHeading}>🗺 HABITAT</Text>
            <Text style={styles.habitatCopy}>{animal.habitat}</Text>
          </View>

          <GuidanceList
            heading="BEHAVIOR TIPS"
            headingColor={colors.heading}
            items={animal.behaviorTips}
            marker="✓"
            markerColor={colors.green}
          />

          <GuidanceList
            heading="WHAT NOT TO DO"
            headingColor={colors.warningHeading}
            items={animal.whatNotToDo}
            marker="✕"
            markerColor={colors.error}
          />

          <View style={styles.insightPanel}>
            <Text style={styles.insightHeading}>⚡ FIELD NOTE</Text>
            <Text style={styles.insightCopy}>{animal.insightNote}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenLayout: {
    flex: 1,
    backgroundColor: colors.background,
  },
  notFoundLayout: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  notFoundMessage: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 16,
  },
  navigateBackLabel: {
    color: colors.primary,
    fontFamily: fonts.montserratSemiBold,
    fontSize: 15,
  },
  bannerFrame: {
    height: 280,
  },
  bannerMedia: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bannerFade: {
    ...StyleSheet.absoluteFillObject,
  },
  navigationBar: {
    paddingHorizontal: spacing.md,
    zIndex: 1,
  },
  navigationControl: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(7, 12, 26, 0.65)',
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationGlyph: {
    color: colors.text,
    fontSize: 20,
  },
  bannerCaption: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    zIndex: 1,
  },
  bannerHeading: {
    color: colors.text,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 28,
  },
  mainContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },
  distanceNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.guidePurpleBg,
    borderWidth: 1,
    borderColor: colors.guidePurpleBorder,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  distanceGlyph: {
    fontSize: 16,
  },
  distanceCopy: {
    flex: 1,
    color: colors.purpleLight,
    fontFamily: fonts.nunitoMedium,
    fontSize: 13,
    lineHeight: 18,
  },
  overviewCopy: {
    color: colors.textSecondary,
    fontFamily: fonts.nunitoRegular,
    fontSize: 14,
    lineHeight: 21,
  },
  habitatPanel: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    padding: 14,
    gap: 8,
  },
  habitatHeading: {
    color: colors.textDim,
    fontFamily: fonts.montserratBold,
    fontSize: 11,
    letterSpacing: 0.8,
  },
  habitatCopy: {
    color: colors.heading,
    fontFamily: fonts.nunitoRegular,
    fontSize: 14,
    lineHeight: 20,
  },
  guidanceSection: {
    gap: 12,
  },
  guidanceHeading: {
    fontFamily: fonts.montserratBold,
    fontSize: 12,
    letterSpacing: 0.8,
  },
  guidanceItems: {
    gap: 10,
  },
  guidanceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  guidanceMarker: {
    fontFamily: fonts.montserratBold,
    fontSize: 14,
    lineHeight: 20,
    width: 16,
  },
  guidanceCopy: {
    flex: 1,
    color: colors.textSecondary,
    fontFamily: fonts.nunitoRegular,
    fontSize: 13.5,
    lineHeight: 20,
  },
  insightPanel: {
    backgroundColor: colors.insightAccentBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.insightAccentBorder,
    padding: 14,
    gap: 8,
  },
  insightHeading: {
    color: colors.yellow,
    fontFamily: fonts.montserratBold,
    fontSize: 11,
    letterSpacing: 0.8,
  },
  insightCopy: {
    color: colors.heading,
    fontFamily: fonts.nunitoRegular,
    fontSize: 14,
    lineHeight: 20,
  },
});
