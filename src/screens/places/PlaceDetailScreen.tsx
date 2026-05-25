import React, {useCallback, useEffect, useState} from 'react';
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

import {PlaceInfoCard, PlaceTag} from '../../components/places';
import {Routes, colors, fonts, getCategoryById, spacing} from '../../consts';
import {formatCoordinates, getPlaceById, placeImages} from '../../data';
import type {
  OverviewStackParamList,
  ShelfStackParamList,
} from '../../navigation/types';
import {openPlaceOnWildMap} from '../../navigation/openWildMap';
import {sharePlace} from '../../utils/sharePlace';
import {isPlaceSaved, togglePlaceSaved} from '../../utils/savedPlacesStorage';

type PlaceDetailRoute =
  | typeof Routes.overview.detail
  | typeof Routes.shelf.detail;

type Props = StackScreenProps<
  OverviewStackParamList & ShelfStackParamList,
  PlaceDetailRoute
>;

export function PlaceDetailScreen({navigation, route}: Props) {
  const insets = useSafeAreaInsets();
  const place = getPlaceById(route.params.id);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (place) {
      isPlaceSaved(place.id).then(setIsBookmarked);
    }
  }, [place]);

  const handleToggleBookmark = useCallback(async () => {
    if (!place) {
      return;
    }
    const next = await togglePlaceSaved(place.id);
    setIsBookmarked(next);
  }, [place]);

  const handleShare = useCallback(() => {
    if (!place) {
      return;
    }
    void sharePlace(place);
  }, [place]);

  const handleOpenMap = useCallback(() => {
    if (!place) {
      return;
    }
    openPlaceOnWildMap(navigation, place.id);
  }, [navigation, place]);

  if (!place) {
    return (
      <View style={styles.notFoundLayout}>
        <Text style={styles.notFoundMessage}>Destination not found.</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.navigateBackLabel}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const category = getCategoryById(place.category);
  const coords = formatCoordinates(place.latitude, place.longitude);

  return (
    <View style={styles.screenLayout}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, spacing.lg) + 24,
        }}>
        <View style={styles.bannerFrame}>
          <ImageBackground
            source={placeImages[place.imageKey]}
            style={styles.bannerMedia}
            resizeMode="cover">
            <LinearGradient
              colors={['rgba(0,0,0,0.2)', 'rgba(7,12,26,0.95)']}
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
              <View
                style={[
                  styles.categoryChip,
                  {backgroundColor: category.color},
                ]}>
                <Text style={styles.categoryLabel}>
                  {category.label.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.bannerHeading}>{place.title}</Text>
              <View style={styles.locationRow}>
                <Text style={styles.locationGlyph}>◆</Text>
                <Text style={styles.locationText}>{place.location}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.actionsRow}>
            <Pressable style={styles.actionButton} onPress={handleOpenMap}>
              <Text style={styles.actionGlyph}>➤</Text>
              <Text style={styles.actionLabel}>View on Map</Text>
            </Pressable>
            <Pressable
              style={[
                styles.actionButton,
                isBookmarked && styles.actionButtonActive,
              ]}
              onPress={handleToggleBookmark}>
              <Text
                style={[
                  styles.actionGlyph,
                  isBookmarked && styles.actionGlyphActive,
                ]}>
                {isBookmarked ? '★' : '☆'}
              </Text>
              <Text
                style={[
                  styles.actionLabel,
                  isBookmarked && styles.actionLabelActive,
                ]}>
                {isBookmarked ? 'Saved' : 'Save'}
              </Text>
            </Pressable>
            <Pressable style={styles.shareControl} onPress={handleShare}>
              <Text style={styles.shareIcon}>↗</Text>
            </Pressable>
          </View>

          <View style={styles.coordsBar}>
            <Text style={styles.coordsIcon}>◆</Text>
            <Text style={styles.coordsText}>{coords}</Text>
          </View>

          <Text style={styles.sectionTitle}>ABOUT THIS DESTINATION</Text>
          <Text style={styles.overviewCopy}>{place.fullDescription}</Text>

          <Text style={styles.sectionTitle}>WILDLIFE YOU MAY ENCOUNTER</Text>
          <View style={styles.tagsRow}>
            {place.animals.map(animal => (
              <PlaceTag key={animal} label={animal} />
            ))}
          </View>

          <View style={styles.infoCards}>
            <PlaceInfoCard
              leadingSymbol="◷"
              accentColor={colors.yellow}
              heading="BEST TIME TO VISIT"
              summary={place.bestTimeToVisit}
            />
            <PlaceInfoCard
              leadingSymbol="!"
              accentColor={colors.primary}
              heading="SAFETY NOTE"
              summary={place.safetyNote}
            />
            <PlaceInfoCard
              leadingSymbol="✦"
              accentColor={colors.blue}
              heading="SCENIC HIGHLIGHT"
              summary={place.scenicHighlight}
            />
            <PlaceInfoCard
              leadingSymbol="›"
              accentColor={colors.green}
              heading="ROUTE ACCESSIBILITY"
              summary={place.accessibility}
            />
          </View>

          <Text style={styles.sectionTitle}>ADDRESS</Text>
          <Text style={styles.address}>{place.address}</Text>
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
  bannerFrame: {
    height: 320,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationGlyph: {
    color: colors.text,
    fontSize: 20,
  },
  bannerCaption: {
    padding: spacing.md,
    gap: 8,
    zIndex: 1,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  categoryLabel: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 9,
    letterSpacing: 1,
  },
  bannerHeading: {
    color: colors.text,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 26,
    lineHeight: 32,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationGlyph: {
    color: colors.primary,
    fontSize: 12,
  },
  locationText: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 14,
  },
  mainContent: {
    padding: spacing.md,
    gap: 14,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionButtonActive: {
    borderColor: colors.primary,
  },
  actionGlyph: {
    color: colors.text,
    fontSize: 16,
  },
  actionGlyphActive: {
    color: colors.primary,
  },
  actionLabel: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 13,
  },
  actionLabelActive: {
    color: colors.primary,
  },
  shareControl: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    color: colors.text,
    fontSize: 18,
  },
  coordsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  coordsIcon: {
    color: colors.purple,
    fontSize: 12,
  },
  coordsText: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 13,
    flex: 1,
  },
  sectionTitle: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 13,
    letterSpacing: 0.5,
    marginTop: 4,
  },
  overviewCopy: {
    color: colors.textSecondary,
    fontFamily: fonts.nunitoRegular,
    fontSize: 14,
    lineHeight: 22,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  infoCards: {
    gap: 10,
    marginTop: 4,
  },
  address: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 14,
    lineHeight: 21,
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
