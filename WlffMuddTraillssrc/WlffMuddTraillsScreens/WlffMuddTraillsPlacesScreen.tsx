import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  WlffMuddTraillsRoutes,
  WlffMuddTraillsGetCategoryById,
  WlffMuddTraillsPlaceCategoryFilters,
  WlffMuddTraillsSpacing,
  type WlffMuddTraillsPlaceCategoryFilter,
} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';
import {
  WlffMuddTraillsFeaturedPlace,
  WlffMuddTraillsFormatCoordinates,
  WlffMuddTraillsGetPlaceById,
  WlffMuddTraillsPlaceImages,
  WlffMuddTraillsPlaces,
  type WlffMuddTraillsPlace,
} from '../WlffMuddTraillsData/WlffMuddTraillsIndex';
import type {
  WlffMuddTraillsOverviewStackParamList,
  WlffMuddTraillsShelfStackParamList,
} from '../WlffMuddTraillsRoutes/WlffMuddTraillsTypes';
import {WlffMuddTraillsOpenPlaceOnWildMap} from '../WlffMuddTraillsRoutes/WlffMuddTraillsOpenWildMap';
import {WlffMuddTraillsSharePlace} from '../WlffMuddTraillsUtils/WlffMuddTraillsSharePlace';
import {
  WlffMuddTraillsGetSavedPlaceIds,
  WlffMuddTraillsIsPlaceSaved,
  WlffMuddTraillsTogglePlaceSaved,
} from '../WlffMuddTraillsUtils/WlffMuddTraillsSavedPlacesStorage';

type WlffMuddTraillsPlaceTagProps = {
  label: string;
};

function WlffMuddTraillsPlaceTag({label}: WlffMuddTraillsPlaceTagProps) {
  return (
    <View style={styles.wlffMuddTraillsPlaceTagChip}>
      <Text style={styles.wlffMuddTraillsPlaceTagChipLabel}>{label}</Text>
    </View>
  );
}

type WlffMuddTraillsPlaceInfoCardProps = {
  leadingSymbol: string;
  accentColor: string;
  heading: string;
  summary: string;
};

function WlffMuddTraillsPlaceInfoCard({
  leadingSymbol,
  accentColor,
  heading,
  summary,
}: WlffMuddTraillsPlaceInfoCardProps) {
  return (
    <View style={styles.wlffMuddTraillsPlaceInfoCardPanel}>
      <View style={styles.wlffMuddTraillsPlaceInfoCardHeadingRow}>
        <Text
          style={[
            styles.wlffMuddTraillsPlaceInfoCardLeadingSymbol,
            {color: accentColor},
          ]}>
          {leadingSymbol}
        </Text>
        <Text
          style={[
            styles.wlffMuddTraillsPlaceInfoCardHeading,
            {color: accentColor},
          ]}>
          {heading}
        </Text>
      </View>
      <Text style={styles.wlffMuddTraillsPlaceInfoCardSummary}>{summary}</Text>
    </View>
  );
}

type WlffMuddTraillsPlaceSearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

function WlffMuddTraillsPlaceSearchBar({
  value,
  onChangeText,
}: WlffMuddTraillsPlaceSearchBarProps) {
  return (
    <View style={styles.wlffMuddTraillsPlaceSearchBarInputFrame}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search destinations…"
        placeholderTextColor="rgba(232, 238, 255, 0.5)"
        style={styles.wlffMuddTraillsPlaceSearchBarInput}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const brandMark = require('../../assets/images/logo-wolf.png');

function WlffMuddTraillsGetGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) {
    return 'Good morning, explorer';
  }
  if (hour < 18) {
    return 'Good afternoon, explorer';
  }
  return 'Good evening, explorer';
}

function WlffMuddTraillsPlacesHeader() {
  return (
    <View style={styles.wlffMuddTraillsPlacesHeaderHeaderRow}>
      <View style={styles.wlffMuddTraillsPlacesHeaderCopyBlock}>
        <Text style={styles.wlffMuddTraillsPlacesHeaderGreeting}>
          {WlffMuddTraillsGetGreeting()}
        </Text>
        <View style={styles.wlffMuddTraillsPlacesHeaderHeadingRow}>
          <Image
            source={brandMark}
            style={styles.wlffMuddTraillsPlacesHeaderBrandMark}
            resizeMode="contain"
          />
          <Text style={styles.wlffMuddTraillsPlacesHeaderHeading}>
            Wolf Moon Trails
          </Text>
        </View>
      </View>
      <View style={styles.wlffMuddTraillsPlacesHeaderProfileFrame}>
        <Image
          source={require('../../assets/images/apicon.png')}
          style={styles.wlffMuddTraillsPlacesHeaderProfileImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

type WlffMuddTraillsCategoryFilterProps = {
  activeCategory: WlffMuddTraillsPlaceCategoryFilter;
  onChange: (category: WlffMuddTraillsPlaceCategoryFilter) => void;
  compact?: boolean;
};

function WlffMuddTraillsCategoryFilter({
  activeCategory,
  onChange,
  compact,
}: WlffMuddTraillsCategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.wlffMuddTraillsCategoryFilterFilterRow}>
      {WlffMuddTraillsPlaceCategoryFilters.map(item => {
        const isSelected = item.id === activeCategory;
        return (
          <Pressable
            key={item.id}
            onPress={() => onChange(item.id)}
            style={[
              styles.wlffMuddTraillsCategoryFilterFilterChip,
              compact && styles.wlffMuddTraillsCategoryFilterFilterChipCompact,
              isSelected &&
                styles.wlffMuddTraillsCategoryFilterFilterChipSelected,
            ]}>
            <Text
              style={[
                styles.wlffMuddTraillsCategoryFilterFilterLabel,
                compact &&
                  styles.wlffMuddTraillsCategoryFilterFilterLabelCompact,
                isSelected &&
                  styles.wlffMuddTraillsCategoryFilterFilterLabelSelected,
              ]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

type WlffMuddTraillsFeaturedPlaceCardProps = {
  place: WlffMuddTraillsPlace;
  onPress: () => void;
  onShare: () => void;
};

function WlffMuddTraillsFeaturedPlaceCard({
  place,
  onPress,
  onShare,
}: WlffMuddTraillsFeaturedPlaceCardProps) {
  return (
    <Pressable
      style={styles.wlffMuddTraillsFeaturedPlaceCardPanel}
      onPress={onPress}>
      <ImageBackground
        source={WlffMuddTraillsPlaceImages[place.imageKey]}
        style={styles.wlffMuddTraillsFeaturedPlaceCardMedia}
        resizeMode="cover">
        <LinearGradient
          colors={[
            'rgba(7, 12, 26, 0.85)',
            'rgba(7, 12, 26, 0.4)',
            'rgba(0,0,0,0)',
          ]}
          locations={[0, 0.6, 1]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.wlffMuddTraillsFeaturedPlaceCardMediaFade}
        />
        <View style={styles.wlffMuddTraillsFeaturedPlaceCardTopRow}>
          <View style={styles.wlffMuddTraillsFeaturedPlaceCardHighlightChip}>
            <Text style={styles.wlffMuddTraillsFeaturedPlaceCardHighlightLabel}>
              ⭐ FEATURED
            </Text>
          </View>
          <Pressable
            style={styles.wlffMuddTraillsFeaturedPlaceCardShareControl}
            onPress={onShare}
            hitSlop={8}>
            <Text style={styles.wlffMuddTraillsFeaturedPlaceCardShareGlyph}>
              ↗
            </Text>
          </Pressable>
        </View>
        <View style={styles.wlffMuddTraillsFeaturedPlaceCardCaptionBlock}>
          <Text style={styles.wlffMuddTraillsFeaturedPlaceCardHeading}>
            {place.title}
          </Text>
          <View style={styles.wlffMuddTraillsFeaturedPlaceCardLocationRow}>
            <Text style={styles.wlffMuddTraillsFeaturedPlaceCardLocationGlyph}>
              ◆
            </Text>
            <Text style={styles.wlffMuddTraillsFeaturedPlaceCardLocationText}>
              {place.location}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

type WlffMuddTraillsPlaceListCardProps = {
  place: WlffMuddTraillsPlace;
  isBookmarked: boolean;
  onPress: () => void;
  onToggleBookmark: () => void;
  onShare: () => void;
};

function WlffMuddTraillsPlaceListCard({
  place,
  isBookmarked,
  onPress,
  onToggleBookmark,
  onShare,
}: WlffMuddTraillsPlaceListCardProps) {
  const category = WlffMuddTraillsGetCategoryById(place.category);
  const previewLabels = place.animals.slice(0, 4);

  return (
    <View style={styles.wlffMuddTraillsPlaceListCardPanel}>
      <View style={styles.wlffMuddTraillsPlaceListCardMediaFrame}>
        <ImageBackground
          source={WlffMuddTraillsPlaceImages[place.imageKey]}
          style={styles.wlffMuddTraillsPlaceListCardMedia}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(7, 12, 26, 0.75)']}
            locations={[0.4, 1]}
            style={styles.wlffMuddTraillsPlaceListCardMediaFade}
          />
          <View
            style={[
              styles.wlffMuddTraillsPlaceListCardCategoryChip,
              {backgroundColor: category.color},
            ]}>
            <Text style={styles.wlffMuddTraillsPlaceListCardCategoryLabel}>
              {category.label.toUpperCase()}
            </Text>
          </View>
          <Pressable
            onPress={onToggleBookmark}
            style={[
              styles.wlffMuddTraillsPlaceListCardBookmarkControl,
              isBookmarked &&
                styles.wlffMuddTraillsPlaceListCardBookmarkControlActive,
            ]}
            hitSlop={8}>
            <Text
              style={[
                styles.wlffMuddTraillsPlaceListCardBookmarkGlyph,
                isBookmarked &&
                  styles.wlffMuddTraillsPlaceListCardBookmarkGlyphActive,
              ]}>
              {isBookmarked ? '★' : '☆'}
            </Text>
          </Pressable>
        </ImageBackground>
      </View>

      <View style={styles.wlffMuddTraillsPlaceListCardContent}>
        <Text style={styles.wlffMuddTraillsPlaceListCardHeading}>
          {place.title}
        </Text>
        <View style={styles.wlffMuddTraillsPlaceListCardLocationRow}>
          <Text style={styles.wlffMuddTraillsPlaceListCardLocationGlyph}>
            ◆
          </Text>
          <Text style={styles.wlffMuddTraillsPlaceListCardLocationText}>
            {place.location}
          </Text>
        </View>
        <Text
          style={styles.wlffMuddTraillsPlaceListCardSummary}
          numberOfLines={2}>
          {place.shortDescription}
        </Text>
        <View style={styles.wlffMuddTraillsPlaceListCardTagRow}>
          {previewLabels.map(label => (
            <WlffMuddTraillsPlaceTag key={label} label={label} />
          ))}
        </View>
        <View style={styles.wlffMuddTraillsPlaceListCardActionRow}>
          <Pressable
            style={styles.wlffMuddTraillsPlaceListCardShareControl}
            onPress={onShare}
            hitSlop={6}>
            <Text style={styles.wlffMuddTraillsPlaceListCardShareGlyph}>↗</Text>
          </Pressable>
          <Pressable
            style={styles.wlffMuddTraillsPlaceListCardDetailsControl}
            onPress={onPress}>
            <Text style={styles.wlffMuddTraillsPlaceListCardDetailsLabel}>
              View Details →
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

type WlffMuddTraillsPlacesScreenProps = StackScreenProps<
  WlffMuddTraillsOverviewStackParamList,
  typeof WlffMuddTraillsRoutes.overview.main
>;

export function WlffMuddTraillsPlacesScreen({
  navigation,
}: WlffMuddTraillsPlacesScreenProps) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [category, setCategory] =
    useState<WlffMuddTraillsPlaceCategoryFilter>('all');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      WlffMuddTraillsGetSavedPlaceIds().then(setSavedIds);
    }, []),
  );

  const filteredPlaces = useMemo(() => {
    const query = search.trim().toLowerCase();
    return WlffMuddTraillsPlaces.filter(place => {
      const matchesCategory = category === 'all' || place.category === category;
      if (!matchesCategory) {
        return false;
      }
      if (!query) {
        return true;
      }
      const haystack = [
        place.title,
        place.location,
        place.country,
        place.shortDescription,
        ...place.animals,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [category, search]);

  const openPlace = useCallback(
    (id: string) => {
      navigation.navigate(WlffMuddTraillsRoutes.overview.detail, {id});
    },
    [navigation],
  );

  const handleToggleSave = useCallback(async (id: string) => {
    const saved = await WlffMuddTraillsTogglePlaceSaved(id);
    setSavedIds(prev =>
      saved ? [...new Set([...prev, id])] : prev.filter(item => item !== id),
    );
  }, []);

  const handleShare = useCallback((place: WlffMuddTraillsPlace) => {
    void WlffMuddTraillsSharePlace(place);
  }, []);

  const renderPlace = useCallback(
    ({item}: {item: WlffMuddTraillsPlace}) => (
      <WlffMuddTraillsPlaceListCard
        place={item}
        isBookmarked={savedIds.includes(item.id)}
        onPress={() => openPlace(item.id)}
        onToggleBookmark={() => handleToggleSave(item.id)}
        onShare={() => handleShare(item)}
      />
    ),
    [handleShare, handleToggleSave, openPlace, savedIds],
  );

  return (
    <View style={styles.wlffMuddTraillsPlacesScreenScreenLayout}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingTop: insets.top + 10,
          paddingBottom:
            Math.max(insets.bottom, WlffMuddTraillsSpacing.lg) + 80,
        }}>
        <FlatList
          data={filteredPlaces}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={renderPlace}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.wlffMuddTraillsPlacesScreenList,
            {
              paddingBottom:
                Math.max(insets.bottom, WlffMuddTraillsSpacing.lg) + 80,
            },
          ]}
          ItemSeparatorComponent={() => (
            <View style={styles.wlffMuddTraillsPlacesScreenSeparator} />
          )}
          ListHeaderComponent={
            <View style={styles.wlffMuddTraillsPlacesScreenHeaderBlock}>
              <WlffMuddTraillsPlacesHeader />
              <WlffMuddTraillsPlaceSearchBar
                value={search}
                onChangeText={setSearch}
              />
              <WlffMuddTraillsFeaturedPlaceCard
                place={WlffMuddTraillsFeaturedPlace}
                onPress={() => openPlace(WlffMuddTraillsFeaturedPlace.id)}
                onShare={() => handleShare(WlffMuddTraillsFeaturedPlace)}
              />
              <Text style={styles.wlffMuddTraillsPlacesScreenSectionTitle}>
                CATEGORIES
              </Text>
              <WlffMuddTraillsCategoryFilter
                activeCategory={category}
                onChange={setCategory}
              />
              <Text style={styles.wlffMuddTraillsPlacesScreenSectionTitle}>
                DESTINATIONS
              </Text>
            </View>
          }
          ListEmptyComponent={
            <Text style={styles.wlffMuddTraillsPlacesScreenEmpty}>
              No destinations match your search.
            </Text>
          }
        />
      </ScrollView>
    </View>
  );
}

type WlffMuddTraillsPlaceDetailRoute =
  | typeof WlffMuddTraillsRoutes.overview.detail
  | typeof WlffMuddTraillsRoutes.shelf.detail;

type WlffMuddTraillsPlaceDetailScreenProps = StackScreenProps<
  WlffMuddTraillsOverviewStackParamList & WlffMuddTraillsShelfStackParamList,
  WlffMuddTraillsPlaceDetailRoute
>;

export function WlffMuddTraillsPlaceDetailScreen({
  navigation,
  route,
}: WlffMuddTraillsPlaceDetailScreenProps) {
  const insets = useSafeAreaInsets();
  const place = WlffMuddTraillsGetPlaceById(route.params.id);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (place) {
      WlffMuddTraillsIsPlaceSaved(place.id).then(setIsBookmarked);
    }
  }, [place]);

  const handleToggleBookmark = useCallback(async () => {
    if (!place) {
      return;
    }
    const next = await WlffMuddTraillsTogglePlaceSaved(place.id);
    setIsBookmarked(next);
  }, [place]);

  const handleShare = useCallback(() => {
    if (!place) {
      return;
    }
    void WlffMuddTraillsSharePlace(place);
  }, [place]);

  const handleOpenMap = useCallback(() => {
    if (!place) {
      return;
    }
    WlffMuddTraillsOpenPlaceOnWildMap(navigation, place.id);
  }, [navigation, place]);

  if (!place) {
    return (
      <View style={styles.wlffMuddTraillsPlaceDetailScreenNotFoundLayout}>
        <Text style={styles.wlffMuddTraillsPlaceDetailScreenNotFoundMessage}>
          Destination not found.
        </Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text
            style={styles.wlffMuddTraillsPlaceDetailScreenNavigateBackLabel}>
            Go back
          </Text>
        </Pressable>
      </View>
    );
  }

  const category = WlffMuddTraillsGetCategoryById(place.category);
  const coords = WlffMuddTraillsFormatCoordinates(
    place.latitude,
    place.longitude,
  );

  return (
    <View style={styles.wlffMuddTraillsPlaceDetailScreenScreenLayout}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingBottom:
            Math.max(insets.bottom, WlffMuddTraillsSpacing.lg) + 24,
        }}>
        <View style={styles.wlffMuddTraillsPlaceDetailScreenBannerFrame}>
          <ImageBackground
            source={WlffMuddTraillsPlaceImages[place.imageKey]}
            style={styles.wlffMuddTraillsPlaceDetailScreenBannerMedia}
            resizeMode="cover">
            <LinearGradient
              colors={['rgba(0,0,0,0.2)', 'rgba(7,12,26,0.95)']}
              style={styles.wlffMuddTraillsPlaceDetailScreenBannerFade}
            />
            <View
              style={[
                styles.wlffMuddTraillsPlaceDetailScreenNavigationBar,
                {paddingTop: insets.top + 8},
              ]}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={
                  styles.wlffMuddTraillsPlaceDetailScreenNavigationControl
                }>
                <Text
                  style={
                    styles.wlffMuddTraillsPlaceDetailScreenNavigationGlyph
                  }>
                  ←
                </Text>
              </Pressable>
            </View>
            <View style={styles.wlffMuddTraillsPlaceDetailScreenBannerCaption}>
              <View
                style={[
                  styles.wlffMuddTraillsPlaceDetailScreenCategoryChip,
                  {backgroundColor: category.color},
                ]}>
                <Text
                  style={styles.wlffMuddTraillsPlaceDetailScreenCategoryLabel}>
                  {category.label.toUpperCase()}
                </Text>
              </View>
              <Text
                style={styles.wlffMuddTraillsPlaceDetailScreenBannerHeading}>
                {place.title}
              </Text>
              <View style={styles.wlffMuddTraillsPlaceDetailScreenLocationRow}>
                <Text
                  style={styles.wlffMuddTraillsPlaceDetailScreenLocationGlyph}>
                  ◆
                </Text>
                <Text
                  style={styles.wlffMuddTraillsPlaceDetailScreenLocationText}>
                  {place.location}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.wlffMuddTraillsPlaceDetailScreenMainContent}>
          <View style={styles.wlffMuddTraillsPlaceDetailScreenActionsRow}>
            <Pressable
              style={styles.wlffMuddTraillsPlaceDetailScreenActionButton}
              onPress={handleOpenMap}>
              <Text style={styles.wlffMuddTraillsPlaceDetailScreenActionGlyph}>
                ➤
              </Text>
              <Text style={styles.wlffMuddTraillsPlaceDetailScreenActionLabel}>
                View on Map
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.wlffMuddTraillsPlaceDetailScreenActionButton,
                isBookmarked &&
                  styles.wlffMuddTraillsPlaceDetailScreenActionButtonActive,
              ]}
              onPress={handleToggleBookmark}>
              <Text
                style={[
                  styles.wlffMuddTraillsPlaceDetailScreenActionGlyph,
                  isBookmarked &&
                    styles.wlffMuddTraillsPlaceDetailScreenActionGlyphActive,
                ]}>
                {isBookmarked ? '★' : '☆'}
              </Text>
              <Text
                style={[
                  styles.wlffMuddTraillsPlaceDetailScreenActionLabel,
                  isBookmarked &&
                    styles.wlffMuddTraillsPlaceDetailScreenActionLabelActive,
                ]}>
                {isBookmarked ? 'Saved' : 'Save'}
              </Text>
            </Pressable>
            <Pressable
              style={styles.wlffMuddTraillsPlaceDetailScreenShareControl}
              onPress={handleShare}>
              <Text style={styles.wlffMuddTraillsPlaceDetailScreenShareIcon}>
                ↗
              </Text>
            </Pressable>
          </View>

          <View style={styles.wlffMuddTraillsPlaceDetailScreenCoordsBar}>
            <Text style={styles.wlffMuddTraillsPlaceDetailScreenCoordsIcon}>
              ◆
            </Text>
            <Text style={styles.wlffMuddTraillsPlaceDetailScreenCoordsText}>
              {coords}
            </Text>
          </View>

          <Text style={styles.wlffMuddTraillsPlaceDetailScreenSectionTitle}>
            ABOUT THIS DESTINATION
          </Text>
          <Text style={styles.wlffMuddTraillsPlaceDetailScreenOverviewCopy}>
            {place.fullDescription}
          </Text>

          <Text style={styles.wlffMuddTraillsPlaceDetailScreenSectionTitle}>
            WILDLIFE YOU MAY ENCOUNTER
          </Text>
          <View style={styles.wlffMuddTraillsPlaceDetailScreenTagsRow}>
            {place.animals.map(animal => (
              <WlffMuddTraillsPlaceTag key={animal} label={animal} />
            ))}
          </View>

          <View style={styles.wlffMuddTraillsPlaceDetailScreenInfoCards}>
            <WlffMuddTraillsPlaceInfoCard
              leadingSymbol="◷"
              accentColor={'#EAB308'}
              heading="BEST TIME TO VISIT"
              summary={place.bestTimeToVisit}
            />
            <WlffMuddTraillsPlaceInfoCard
              leadingSymbol="!"
              accentColor={'#FF6B1A'}
              heading="SAFETY NOTE"
              summary={place.safetyNote}
            />
            <WlffMuddTraillsPlaceInfoCard
              leadingSymbol="✦"
              accentColor={'#3B82F6'}
              heading="SCENIC HIGHLIGHT"
              summary={place.scenicHighlight}
            />
            <WlffMuddTraillsPlaceInfoCard
              leadingSymbol="›"
              accentColor={'#22C55E'}
              heading="ROUTE ACCESSIBILITY"
              summary={place.accessibility}
            />
          </View>

          <Text style={styles.wlffMuddTraillsPlaceDetailScreenSectionTitle}>
            ADDRESS
          </Text>
          <Text style={styles.wlffMuddTraillsPlaceDetailScreenAddress}>
            {place.address}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wlffMuddTraillsPlaceTagChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  wlffMuddTraillsPlaceTagChipLabel: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 10,
  },
  wlffMuddTraillsPlaceInfoCardPanel: {
    backgroundColor: '#0F1729',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 16,
    gap: 8,
  },
  wlffMuddTraillsPlaceInfoCardHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  wlffMuddTraillsPlaceInfoCardLeadingSymbol: {
    fontSize: 14,
  },
  wlffMuddTraillsPlaceInfoCardHeading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  wlffMuddTraillsPlaceInfoCardSummary: {
    color: '#FFFFFF',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 21,
  },
  wlffMuddTraillsPlaceSearchBarInputFrame: {
    backgroundColor: '#0F1729',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    height: 45,
    justifyContent: 'center',
    paddingHorizontal: 17,
  },
  wlffMuddTraillsPlaceSearchBarInput: {
    color: '#E8EEFF',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    padding: 0,
  },
  wlffMuddTraillsPlacesHeaderHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wlffMuddTraillsPlacesHeaderCopyBlock: {
    flex: 1,
    gap: 2,
  },
  wlffMuddTraillsPlacesHeaderGreeting: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
  },
  wlffMuddTraillsPlacesHeaderHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  wlffMuddTraillsPlacesHeaderBrandMark: {
    width: 28,
    height: 28,
  },
  wlffMuddTraillsPlacesHeaderHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 20,
  },
  wlffMuddTraillsPlacesHeaderProfileFrame: {
    width: 40,
    height: 40,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#1A2440',
  },
  wlffMuddTraillsPlacesHeaderProfileImage: {
    width: '100%',
    height: '100%',
  },
  wlffMuddTraillsCategoryFilterFilterRow: {
    gap: 8,
    paddingBottom: 4,
  },
  wlffMuddTraillsCategoryFilterFilterChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  wlffMuddTraillsCategoryFilterFilterChipCompact: {
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  wlffMuddTraillsCategoryFilterFilterChipSelected: {
    backgroundColor: '#FF6B1A',
    borderColor: '#FF6B1A',
  },
  wlffMuddTraillsCategoryFilterFilterLabel: {
    color: '#8B95B0',
    fontFamily: 'Montserrat-Bold',
    fontSize: 11,
  },
  wlffMuddTraillsCategoryFilterFilterLabelCompact: {
    fontSize: 10,
  },
  wlffMuddTraillsCategoryFilterFilterLabelSelected: {
    color: '#FFFFFF',
  },
  wlffMuddTraillsFeaturedPlaceCardPanel: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 190,
  },
  wlffMuddTraillsFeaturedPlaceCardMedia: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 14,
  },
  wlffMuddTraillsFeaturedPlaceCardMediaFade: {
    ...StyleSheet.absoluteFillObject,
  },
  wlffMuddTraillsFeaturedPlaceCardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  wlffMuddTraillsFeaturedPlaceCardHighlightChip: {
    backgroundColor: '#FF6B1A',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  wlffMuddTraillsFeaturedPlaceCardShareControl: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: 'rgba(7, 12, 26, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsFeaturedPlaceCardShareGlyph: {
    color: '#8B95B0',
    fontSize: 15,
  },
  wlffMuddTraillsFeaturedPlaceCardHighlightLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 9,
    letterSpacing: 1,
  },
  wlffMuddTraillsFeaturedPlaceCardCaptionBlock: {
    zIndex: 1,
    gap: 4,
  },
  wlffMuddTraillsFeaturedPlaceCardHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 16,
  },
  wlffMuddTraillsFeaturedPlaceCardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  wlffMuddTraillsFeaturedPlaceCardLocationGlyph: {
    color: '#FF6B1A',
    fontSize: 11,
  },
  wlffMuddTraillsFeaturedPlaceCardLocationText: {
    color: '#FF6B1A',
    fontFamily: 'Nunito-Regular',
    fontSize: 11,
  },
  wlffMuddTraillsPlaceListCardPanel: {
    backgroundColor: '#0F1729',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    overflow: 'hidden',
  },
  wlffMuddTraillsPlaceListCardMediaFrame: {
    height: 170,
  },
  wlffMuddTraillsPlaceListCardMedia: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  wlffMuddTraillsPlaceListCardMediaFade: {
    ...StyleSheet.absoluteFillObject,
  },
  wlffMuddTraillsPlaceListCardCategoryChip: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    zIndex: 1,
  },
  wlffMuddTraillsPlaceListCardCategoryLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 9,
    letterSpacing: 1,
  },
  wlffMuddTraillsPlaceListCardBookmarkControl: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: 'rgba(7, 12, 26, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  wlffMuddTraillsPlaceListCardBookmarkControlActive: {
    borderColor: '#FF6B1A',
  },
  wlffMuddTraillsPlaceListCardBookmarkGlyph: {
    color: '#8B95B0',
    fontSize: 16,
  },
  wlffMuddTraillsPlaceListCardBookmarkGlyphActive: {
    color: '#FF6B1A',
  },
  wlffMuddTraillsPlaceListCardContent: {
    padding: 16,
    gap: 6,
  },
  wlffMuddTraillsPlaceListCardHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
  },
  wlffMuddTraillsPlaceListCardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  wlffMuddTraillsPlaceListCardLocationGlyph: {
    color: '#8B95B0',
    fontSize: 10,
  },
  wlffMuddTraillsPlaceListCardLocationText: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
  },
  wlffMuddTraillsPlaceListCardSummary: {
    color: '#6B7A96',
    fontFamily: 'Nunito-Regular',
    fontSize: 12.5,
    lineHeight: 18.75,
    marginTop: 2,
  },
  wlffMuddTraillsPlaceListCardTagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  wlffMuddTraillsPlaceListCardActionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  wlffMuddTraillsPlaceListCardShareControl: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsPlaceListCardShareGlyph: {
    color: '#8B95B0',
    fontSize: 15,
  },
  wlffMuddTraillsPlaceListCardDetailsControl: {
    flex: 1,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FF6B1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsPlaceListCardDetailsLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
  },
  wlffMuddTraillsPlacesScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  wlffMuddTraillsPlacesScreenList: {
    paddingHorizontal: WlffMuddTraillsSpacing.md,
    gap: 16,
  },
  wlffMuddTraillsPlacesScreenHeaderBlock: {
    gap: 16,
    paddingTop: WlffMuddTraillsSpacing.sm,
    paddingBottom: 4,
  },
  wlffMuddTraillsPlacesScreenSectionTitle: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  wlffMuddTraillsPlacesScreenSeparator: {
    height: 16,
  },
  wlffMuddTraillsPlacesScreenEmpty: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: WlffMuddTraillsSpacing.lg,
  },
  wlffMuddTraillsPlaceDetailScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  wlffMuddTraillsPlaceDetailScreenBannerFrame: {
    height: 320,
  },
  wlffMuddTraillsPlaceDetailScreenBannerMedia: {
    flex: 1,
    justifyContent: 'space-between',
  },
  wlffMuddTraillsPlaceDetailScreenBannerFade: {
    ...StyleSheet.absoluteFillObject,
  },
  wlffMuddTraillsPlaceDetailScreenNavigationBar: {
    paddingHorizontal: WlffMuddTraillsSpacing.md,
    zIndex: 1,
  },
  wlffMuddTraillsPlaceDetailScreenNavigationControl: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(7, 12, 26, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsPlaceDetailScreenNavigationGlyph: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  wlffMuddTraillsPlaceDetailScreenBannerCaption: {
    padding: WlffMuddTraillsSpacing.md,
    gap: 8,
    zIndex: 1,
  },
  wlffMuddTraillsPlaceDetailScreenCategoryChip: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  wlffMuddTraillsPlaceDetailScreenCategoryLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 9,
    letterSpacing: 1,
  },
  wlffMuddTraillsPlaceDetailScreenBannerHeading: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 26,
    lineHeight: 32,
  },
  wlffMuddTraillsPlaceDetailScreenLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  wlffMuddTraillsPlaceDetailScreenLocationGlyph: {
    color: '#FF6B1A',
    fontSize: 12,
  },
  wlffMuddTraillsPlaceDetailScreenLocationText: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
  },
  wlffMuddTraillsPlaceDetailScreenMainContent: {
    padding: WlffMuddTraillsSpacing.md,
    gap: 14,
  },
  wlffMuddTraillsPlaceDetailScreenActionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  wlffMuddTraillsPlaceDetailScreenActionButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#0F1729',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  wlffMuddTraillsPlaceDetailScreenActionButtonActive: {
    borderColor: '#FF6B1A',
  },
  wlffMuddTraillsPlaceDetailScreenActionGlyph: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  wlffMuddTraillsPlaceDetailScreenActionGlyphActive: {
    color: '#FF6B1A',
  },
  wlffMuddTraillsPlaceDetailScreenActionLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
  },
  wlffMuddTraillsPlaceDetailScreenActionLabelActive: {
    color: '#FF6B1A',
  },
  wlffMuddTraillsPlaceDetailScreenShareControl: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#0F1729',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsPlaceDetailScreenShareIcon: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  wlffMuddTraillsPlaceDetailScreenCoordsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0F1729',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  wlffMuddTraillsPlaceDetailScreenCoordsIcon: {
    color: '#9333EA',
    fontSize: 12,
  },
  wlffMuddTraillsPlaceDetailScreenCoordsText: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    flex: 1,
  },
  wlffMuddTraillsPlaceDetailScreenSectionTitle: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    letterSpacing: 0.5,
    marginTop: 4,
  },
  wlffMuddTraillsPlaceDetailScreenOverviewCopy: {
    color: '#6B7A96',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 22,
  },
  wlffMuddTraillsPlaceDetailScreenTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wlffMuddTraillsPlaceDetailScreenInfoCards: {
    gap: 10,
    marginTop: 4,
  },
  wlffMuddTraillsPlaceDetailScreenAddress: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 21,
  },
  wlffMuddTraillsPlaceDetailScreenNotFoundLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  wlffMuddTraillsPlaceDetailScreenNotFoundMessage: {
    color: '#FFFFFF',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
  },
  wlffMuddTraillsPlaceDetailScreenNavigateBackLabel: {
    color: '#FF6B1A',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
});
