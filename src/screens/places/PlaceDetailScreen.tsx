import React, {useCallback, useEffect, useState} from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  Share,
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
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (place) {
      isPlaceSaved(place.id).then(setSaved);
    }
  }, [place]);

  const handleToggleSave = useCallback(async () => {
    if (!place) {
      return;
    }
    const next = await togglePlaceSaved(place.id);
    setSaved(next);
  }, [place]);

  const handleShare = useCallback(async () => {
    if (!place) {
      return;
    }
    await Share.share({
      message: `${place.title}\n${place.location}\n\n${place.shortDescription}`,
    });
  }, [place]);

  const handleOpenMap = useCallback(() => {
    if (!place) {
      return;
    }
    openPlaceOnWildMap(navigation, place.id);
  }, [navigation, place]);

  if (!place) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Destination not found.</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const category = getCategoryById(place.category);
  const coords = formatCoordinates(place.latitude, place.longitude);

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, spacing.lg) + 24,
        }}>
        <View style={styles.heroWrap}>
          <ImageBackground
            source={placeImages[place.imageKey]}
            style={styles.hero}
            resizeMode="cover">
            <LinearGradient
              colors={['rgba(0,0,0,0.2)', 'rgba(7,12,26,0.95)']}
              style={styles.heroGradient}
            />
            <View style={[styles.topBar, {paddingTop: insets.top + 8}]}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.backButton}>
                <Text style={styles.backIcon}>←</Text>
              </Pressable>
            </View>
            <View style={styles.heroContent}>
              <View
                style={[
                  styles.categoryBadge,
                  {backgroundColor: category.color},
                ]}>
                <Text style={styles.categoryText}>
                  {category.label.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.title}>{place.title}</Text>
              <View style={styles.locationRow}>
                <Text style={styles.pin}>◆</Text>
                <Text style={styles.location}>{place.location}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.content}>
          <View style={styles.actionsRow}>
            <Pressable style={styles.actionButton} onPress={handleOpenMap}>
              <Text style={styles.actionIcon}>➤</Text>
              <Text style={styles.actionLabel}>View on Map</Text>
            </Pressable>
            <Pressable
              style={[styles.actionButton, saved && styles.actionButtonSaved]}
              onPress={handleToggleSave}>
              <Text
                style={[styles.actionIcon, saved && styles.actionIconSaved]}>
                {saved ? '★' : '☆'}
              </Text>
              <Text
                style={[styles.actionLabel, saved && styles.actionLabelSaved]}>
                {saved ? 'Saved' : 'Save'}
              </Text>
            </Pressable>
            <Pressable style={styles.shareSquare} onPress={handleShare}>
              <Text style={styles.shareIcon}>↗</Text>
            </Pressable>
          </View>

          <View style={styles.coordsBar}>
            <Text style={styles.coordsIcon}>◆</Text>
            <Text style={styles.coordsText}>{coords}</Text>
          </View>

          <Text style={styles.sectionTitle}>ABOUT THIS DESTINATION</Text>
          <Text style={styles.body}>{place.fullDescription}</Text>

          <Text style={styles.sectionTitle}>WILDLIFE YOU MAY ENCOUNTER</Text>
          <View style={styles.tagsRow}>
            {place.animals.map(animal => (
              <PlaceTag key={animal} label={animal} />
            ))}
          </View>

          <View style={styles.infoCards}>
            <PlaceInfoCard
              icon="◷"
              iconColor={colors.yellow}
              title="BEST TIME TO VISIT"
              body={place.bestTimeToVisit}
            />
            <PlaceInfoCard
              icon="!"
              iconColor={colors.primary}
              title="SAFETY NOTE"
              body={place.safetyNote}
            />
            <PlaceInfoCard
              icon="✦"
              iconColor={colors.blue}
              title="SCENIC HIGHLIGHT"
              body={place.scenicHighlight}
            />
            <PlaceInfoCard
              icon="›"
              iconColor={colors.green}
              title="ROUTE ACCESSIBILITY"
              body={place.accessibility}
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
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroWrap: {
    height: 320,
  },
  hero: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  topBar: {
    paddingHorizontal: spacing.md,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(7, 12, 26, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: colors.text,
    fontSize: 20,
  },
  heroContent: {
    padding: spacing.md,
    gap: 8,
    zIndex: 1,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  categoryText: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 9,
    letterSpacing: 1,
  },
  title: {
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
  pin: {
    color: colors.primary,
    fontSize: 12,
  },
  location: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 14,
  },
  content: {
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
  actionButtonSaved: {
    borderColor: colors.primary,
  },
  actionIcon: {
    color: colors.text,
    fontSize: 16,
  },
  actionIconSaved: {
    color: colors.primary,
  },
  actionLabel: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 13,
  },
  actionLabelSaved: {
    color: colors.primary,
  },
  shareSquare: {
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
  body: {
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
  missing: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  missingText: {
    color: colors.text,
    fontFamily: fonts.nunitoRegular,
    fontSize: 16,
  },
  backLink: {
    color: colors.primary,
    fontFamily: fonts.montserratBold,
    fontSize: 14,
  },
});
