import React, {useCallback, useEffect, useMemo} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
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

import {useAppDispatch, useAppSelector} from '../app/hooks';
import type {RootState} from '../app/store';
import {uiActions} from '../app/slices/uiSlice';
import {
  loadSavedPlaceIds,
  toggleSavedPlace,
} from '../app/slices/savedPlacesSlice';
import {
  FeaturedPlace,
  formatCoordinates,
  getPlaceById,
  PlaceImages,
  Places,
  type WiildMoodtrailssPlace,
} from '../data';
import {WiildMoodtrailssOpenPlaceOnWildMap} from '../utils/OpenWildMap';
import {WiildMoodtrailssSharePlace} from '../utils/SharePlace';
import {WiildMoodtrailssIsPlaceSaved} from '../utils/SavedPlacesStorage';

type WiildMoodtrailssOverviewStackParamList = {
  OverviewMain: undefined;
  OverviewDetail: {id: string};
};

type WiildMoodtrailssShelfStackParamList = {
  ShelfMain: undefined;
  ShelfDetail: {id: string};
};

const WiildMoodtrailssRoutes = {
  overview: {
    main: 'OverviewMain',
    detail: 'OverviewDetail',
  },
  shelf: {
    main: 'ShelfMain',
    detail: 'ShelfDetail',
  },
  tabs: {
    map: 'Map',
  },
  regions: {
    main: 'RegionsMain',
  },
} as const;

type WiildMoodtrailssPlaceCategoryId =
  | 'wolf-lands'
  | 'bear-country'
  | 'forest-giants'
  | 'sky-hunters';

type WiildMoodtrailssPlaceCategoryFilter =
  | 'all'
  | WiildMoodtrailssPlaceCategoryId;

const WiildMoodtrailssPlaceCategories: {
  id: WiildMoodtrailssPlaceCategoryId;
  label: string;
  color: string;
}[] = [
  {id: 'wolf-lands', label: 'Wolf Lands', color: '#9333EA'},
  {id: 'bear-country', label: 'Bear Country', color: '#FF6B1A'},
  {id: 'forest-giants', label: 'Forest Giants', color: '#22C55E'},
  {id: 'sky-hunters', label: 'Sky Watchers', color: '#3B82F6'},
];

const WiildMoodtrailssPlaceCategoryFilters: {
  id: WiildMoodtrailssPlaceCategoryFilter;
  label: string;
}[] = [
  {id: 'all', label: 'All'},
  ...WiildMoodtrailssPlaceCategories.map(c => ({id: c.id, label: c.label})),
];

function WiildMoodtrailssGetCategoryById(id: WiildMoodtrailssPlaceCategoryId): {
  id: WiildMoodtrailssPlaceCategoryId;
  label: string;
  color: string;
} {
  return WiildMoodtrailssPlaceCategories.find(c => c.id === id)!;
}

const WiildMoodtrailssSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 28,
  xxl: 32,
} as const;

const PAGE_BOTTOM_PADDING = 80;
const LIST_TOP_PADDING = 30;
const DETAIL_NAV_TOP_PADDING = 54;

function WiildMoodtrailssPlacesSeparator() {
  return <View style={styles.wiildMoodtrailssPlacesScreenSeparator} />;
}

type WiildMoodtrailssPlaceTagProps = {
  label: string;
};

function WiildMoodtrailssPlaceTag({label}: WiildMoodtrailssPlaceTagProps) {
  return (
    <View style={styles.wiildMoodtrailssPlaceTagChip}>
      <Text style={styles.wiildMoodtrailssPlaceTagChipLabel}>{label}</Text>
    </View>
  );
}

type WiildMoodtrailssPlaceInfoCardProps = {
  leadingSymbol: string;
  accentColor: string;
  heading: string;
  summary: string;
};

function WiildMoodtrailssPlaceInfoCard({
  leadingSymbol,
  accentColor,
  heading,
  summary,
}: WiildMoodtrailssPlaceInfoCardProps) {
  return (
    <View style={styles.wiildMoodtrailssPlaceInfoCardPanel}>
      <View style={styles.wiildMoodtrailssPlaceInfoCardHeadingRow}>
        <Text
          style={[
            styles.wiildMoodtrailssPlaceInfoCardLeadingSymbol,
            {color: accentColor},
          ]}>
          {leadingSymbol}
        </Text>
        <Text
          style={[
            styles.wiildMoodtrailssPlaceInfoCardHeading,
            {color: accentColor},
          ]}>
          {heading}
        </Text>
      </View>
      <Text style={styles.wiildMoodtrailssPlaceInfoCardSummary}>{summary}</Text>
    </View>
  );
}

type WiildMoodtrailssPlaceSearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

function WiildMoodtrailssPlaceSearchBar({
  value,
  onChangeText,
}: WiildMoodtrailssPlaceSearchBarProps) {
  return (
    <View style={styles.wiildMoodtrailssPlaceSearchBarInputFrame}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search destinations…"
        placeholderTextColor="rgba(232, 238, 255, 0.5)"
        style={styles.wiildMoodtrailssPlaceSearchBarInput}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const brandMark = require('../../assets/images/wiild-moodtrailss-logo-wolf.png');

function WiildMoodtrailssGetGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) {
    return 'Good morning, explorer';
  }
  if (hour < 18) {
    return 'Good afternoon, explorer';
  }
  return 'Good evening, explorer';
}

function WiildMoodtrailssPlacesHeader() {
  return (
    <View style={styles.wiildMoodtrailssPlacesHeaderHeaderRow}>
      <View style={styles.wiildMoodtrailssPlacesHeaderCopyBlock}>
        <Text style={styles.wiildMoodtrailssPlacesHeaderGreeting}>
          {WiildMoodtrailssGetGreeting()}
        </Text>
        <View style={styles.wiildMoodtrailssPlacesHeaderHeadingRow}>
          <Image
            source={brandMark}
            style={styles.wiildMoodtrailssPlacesHeaderBrandMark}
            resizeMode="contain"
          />
          <Text style={styles.wiildMoodtrailssPlacesHeaderHeading}>
            Wild Mood Trails
          </Text>
        </View>
      </View>
      <View style={styles.wiildMoodtrailssPlacesHeaderProfileFrame}>
        <Image
          source={
            Platform.OS === 'ios'
              ? require('../../assets/images/wiild-moodtrailss-apicon.png')
              : require('../../assets/images/andr_iconloader.png')
          }
          style={styles.wiildMoodtrailssPlacesHeaderProfileImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

type WiildMoodtrailssCategoryFilterProps = {
  activeCategory: WiildMoodtrailssPlaceCategoryFilter;
  onChange: (category: WiildMoodtrailssPlaceCategoryFilter) => void;
  compact?: boolean;
};

function WiildMoodtrailssCategoryFilter({
  activeCategory,
  onChange,
  compact,
}: WiildMoodtrailssCategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.wiildMoodtrailssCategoryFilterFilterRow}>
      {WiildMoodtrailssPlaceCategoryFilters.map(item => {
        const isSelected = item.id === activeCategory;
        return (
          <Pressable
            key={item.id}
            onPress={() => onChange(item.id)}
            style={[
              styles.wiildMoodtrailssCategoryFilterFilterChip,
              compact && styles.wiildMoodtrailssCategoryFilterFilterChipCompact,
              isSelected &&
                styles.wiildMoodtrailssCategoryFilterFilterChipSelected,
            ]}>
            <Text
              style={[
                styles.wiildMoodtrailssCategoryFilterFilterLabel,
                compact &&
                  styles.wiildMoodtrailssCategoryFilterFilterLabelCompact,
                isSelected &&
                  styles.wiildMoodtrailssCategoryFilterFilterLabelSelected,
              ]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

type WiildMoodtrailssFeaturedPlaceCardProps = {
  place: WiildMoodtrailssPlace;
  onPress: () => void;
  onShare: () => void;
};

function WiildMoodtrailssFeaturedPlaceCard({
  place,
  onPress,
  onShare,
}: WiildMoodtrailssFeaturedPlaceCardProps) {
  return (
    <Pressable
      style={styles.wiildMoodtrailssFeaturedPlaceCardPanel}
      onPress={onPress}>
      <ImageBackground
        source={PlaceImages[place.imageKey]}
        style={styles.wiildMoodtrailssFeaturedPlaceCardMedia}
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
          style={styles.wiildMoodtrailssFeaturedPlaceCardMediaFade}
        />
        <View style={styles.wiildMoodtrailssFeaturedPlaceCardTopRow}>
          <View style={styles.wiildMoodtrailssFeaturedPlaceCardHighlightChip}>
            <Text
              style={styles.wiildMoodtrailssFeaturedPlaceCardHighlightLabel}>
              ⭐ FEATURED
            </Text>
          </View>
          <Pressable
            style={styles.wiildMoodtrailssFeaturedPlaceCardShareControl}
            onPress={onShare}
            hitSlop={8}>
            <Text style={styles.wiildMoodtrailssFeaturedPlaceCardShareGlyph}>
              ↗
            </Text>
          </Pressable>
        </View>
        <View style={styles.wiildMoodtrailssFeaturedPlaceCardCaptionBlock}>
          <Text style={styles.wiildMoodtrailssFeaturedPlaceCardHeading}>
            {place.title}
          </Text>
          <View style={styles.wiildMoodtrailssFeaturedPlaceCardLocationRow}>
            <Text style={styles.wiildMoodtrailssFeaturedPlaceCardLocationGlyph}>
              ◆
            </Text>
            <Text style={styles.wiildMoodtrailssFeaturedPlaceCardLocationText}>
              {place.location}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

type WiildMoodtrailssPlaceListCardProps = {
  place: WiildMoodtrailssPlace;
  isBookmarked: boolean;
  onPress: () => void;
  onToggleBookmark: () => void;
  onShare: () => void;
};

function WiildMoodtrailssPlaceListCard({
  place,
  isBookmarked,
  onPress,
  onToggleBookmark,
  onShare,
}: WiildMoodtrailssPlaceListCardProps) {
  const category = WiildMoodtrailssGetCategoryById(place.category);
  const previewLabels = place.animals.slice(0, 4);

  return (
    <View style={styles.wiildMoodtrailssPlaceListCardPanel}>
      <View style={styles.wiildMoodtrailssPlaceListCardMediaFrame}>
        <ImageBackground
          source={PlaceImages[place.imageKey]}
          style={styles.wiildMoodtrailssPlaceListCardMedia}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(7, 12, 26, 0.75)']}
            locations={[0.4, 1]}
            style={styles.wiildMoodtrailssPlaceListCardMediaFade}
          />
          <View
            style={[
              styles.wiildMoodtrailssPlaceListCardCategoryChip,
              {backgroundColor: category.color},
            ]}>
            <Text style={styles.wiildMoodtrailssPlaceListCardCategoryLabel}>
              {category.label.toUpperCase()}
            </Text>
          </View>
          <Pressable
            onPress={onToggleBookmark}
            style={[
              styles.wiildMoodtrailssPlaceListCardBookmarkControl,
              isBookmarked &&
                styles.wiildMoodtrailssPlaceListCardBookmarkControlActive,
            ]}
            hitSlop={8}>
            <Text
              style={[
                styles.wiildMoodtrailssPlaceListCardBookmarkGlyph,
                isBookmarked &&
                  styles.wiildMoodtrailssPlaceListCardBookmarkGlyphActive,
              ]}>
              {isBookmarked ? '★' : '☆'}
            </Text>
          </Pressable>
        </ImageBackground>
      </View>

      <View style={styles.wiildMoodtrailssPlaceListCardContent}>
        <Text style={styles.wiildMoodtrailssPlaceListCardHeading}>
          {place.title}
        </Text>
        <View style={styles.wiildMoodtrailssPlaceListCardLocationRow}>
          <Text style={styles.wiildMoodtrailssPlaceListCardLocationGlyph}>
            ◆
          </Text>
          <Text style={styles.wiildMoodtrailssPlaceListCardLocationText}>
            {place.location}
          </Text>
        </View>
        <Text
          style={styles.wiildMoodtrailssPlaceListCardSummary}
          numberOfLines={2}>
          {place.shortDescription}
        </Text>
        <View style={styles.wiildMoodtrailssPlaceListCardTagRow}>
          {previewLabels.map(label => (
            <WiildMoodtrailssPlaceTag key={label} label={label} />
          ))}
        </View>
        <View style={styles.wiildMoodtrailssPlaceListCardActionRow}>
          <Pressable
            style={styles.wiildMoodtrailssPlaceListCardShareControl}
            onPress={onShare}
            hitSlop={6}>
            <Text style={styles.wiildMoodtrailssPlaceListCardShareGlyph}>
              ↗
            </Text>
          </Pressable>
          <Pressable
            style={styles.wiildMoodtrailssPlaceListCardDetailsControl}
            onPress={onPress}>
            <Text style={styles.wiildMoodtrailssPlaceListCardDetailsLabel}>
              View Details →
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

type WiildMoodtrailssPlacesScreenProps = StackScreenProps<
  WiildMoodtrailssOverviewStackParamList,
  typeof WiildMoodtrailssRoutes.overview.main
>;

export function WiildMoodtrailssPlacesScreen({
  navigation,
}: WiildMoodtrailssPlacesScreenProps) {
  const dispatch = useAppDispatch();
  const search = useAppSelector(state => state.ui.places.search);
  const category = useAppSelector(
    state => state.ui.places.category,
  ) as WiildMoodtrailssPlaceCategoryFilter;
  const savedIds = useAppSelector((state: RootState) => state.savedPlaces.ids);

  useFocusEffect(
    useCallback(() => {
      dispatch(loadSavedPlaceIds());
    }, [dispatch]),
  );

  const filteredPlaces = useMemo(() => {
    const query = search.trim().toLowerCase();
    return Places.filter(place => {
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
      navigation.navigate(WiildMoodtrailssRoutes.overview.detail, {id});
    },
    [navigation],
  );

  const handleToggleSave = useCallback(
    async (id: string) => {
      await dispatch(toggleSavedPlace(id)).unwrap();
    },
    [dispatch],
  );

  const handleShare = useCallback((place: WiildMoodtrailssPlace) => {
    WiildMoodtrailssSharePlace(place);
  }, []);

  const renderPlace = useCallback(
    ({item}: {item: WiildMoodtrailssPlace}) => (
      <WiildMoodtrailssPlaceListCard
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
    <View style={styles.wiildMoodtrailssPlacesScreenScreenLayout}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingTop: LIST_TOP_PADDING,
          paddingBottom: PAGE_BOTTOM_PADDING,
        }}>
        <View style={styles.wiildMoodtrailssPlacesScreenList}>
          <View style={styles.wiildMoodtrailssPlacesScreenHeaderBlock}>
            <WiildMoodtrailssPlacesHeader />
            <WiildMoodtrailssPlaceSearchBar
              value={search}
              onChangeText={text => dispatch(uiActions.setPlacesSearch(text))}
            />
            <WiildMoodtrailssFeaturedPlaceCard
              place={FeaturedPlace}
              onPress={() => openPlace(FeaturedPlace.id)}
              onShare={() => handleShare(FeaturedPlace)}
            />
            <Text style={styles.wiildMoodtrailssPlacesScreenSectionTitle}>
              CATEGORIES
            </Text>
            <WiildMoodtrailssCategoryFilter
              activeCategory={category}
              onChange={next =>
                dispatch(uiActions.setPlacesCategory(next as any))
              }
            />
            <Text style={styles.wiildMoodtrailssPlacesScreenSectionTitle}>
              DESTINATIONS
            </Text>
          </View>

          {filteredPlaces.length === 0 ? (
            <Text style={styles.wiildMoodtrailssPlacesScreenEmpty}>
              No destinations match your search.
            </Text>
          ) : (
            <View>
              {filteredPlaces.map((place, index) => (
                <React.Fragment key={place.id}>
                  {renderPlace({item: place})}
                  {index < filteredPlaces.length - 1 ? (
                    <WiildMoodtrailssPlacesSeparator />
                  ) : null}
                </React.Fragment>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

type WiildMoodtrailssPlaceDetailRoute =
  | typeof WiildMoodtrailssRoutes.overview.detail
  | typeof WiildMoodtrailssRoutes.shelf.detail;

type WiildMoodtrailssPlaceDetailScreenProps = StackScreenProps<
  WiildMoodtrailssOverviewStackParamList & WiildMoodtrailssShelfStackParamList,
  WiildMoodtrailssPlaceDetailRoute
>;

export function WiildMoodtrailssPlaceDetailScreen({
  navigation,
  route,
}: WiildMoodtrailssPlaceDetailScreenProps) {
  const dispatch = useAppDispatch();
  const place = getPlaceById(route.params.id);
  const savedIds = useAppSelector((state: RootState) => state.savedPlaces.ids);
  const isBookmarked = place ? savedIds.includes(place.id) : false;

  useFocusEffect(
    useCallback(() => {
      dispatch(loadSavedPlaceIds());
    }, [dispatch]),
  );

  const handleToggleBookmark = useCallback(async () => {
    if (!place) {
      return;
    }
    await dispatch(toggleSavedPlace(place.id)).unwrap();
  }, [dispatch, place]);

  const handleShare = useCallback(() => {
    if (!place) {
      return;
    }
    WiildMoodtrailssSharePlace(place);
  }, [place]);

  const handleOpenMap = useCallback(() => {
    if (!place) {
      return;
    }
    WiildMoodtrailssOpenPlaceOnWildMap(navigation, place.id);
  }, [navigation, place]);

  if (!place) {
    return (
      <View style={styles.wiildMoodtrailssPlaceDetailScreenNotFoundLayout}>
        <Text style={styles.wiildMoodtrailssPlaceDetailScreenNotFoundMessage}>
          Destination not found.
        </Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text
            style={styles.wiildMoodtrailssPlaceDetailScreenNavigateBackLabel}>
            Go back
          </Text>
        </Pressable>
      </View>
    );
  }

  const category = WiildMoodtrailssGetCategoryById(place.category);
  const coords = formatCoordinates(place.latitude, place.longitude);

  return (
    <View style={styles.wiildMoodtrailssPlaceDetailScreenScreenLayout}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingBottom: WiildMoodtrailssSpacing.lg + 24,
        }}>
        <View style={styles.wiildMoodtrailssPlaceDetailScreenBannerFrame}>
          <ImageBackground
            source={PlaceImages[place.imageKey]}
            style={styles.wiildMoodtrailssPlaceDetailScreenBannerMedia}
            resizeMode="cover">
            <LinearGradient
              colors={['rgba(0,0,0,0.2)', 'rgba(7,12,26,0.95)']}
              style={styles.wiildMoodtrailssPlaceDetailScreenBannerFade}
            />
            <View
              style={[
                styles.wiildMoodtrailssPlaceDetailScreenNavigationBar,
                {paddingTop: DETAIL_NAV_TOP_PADDING},
              ]}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={
                  styles.wiildMoodtrailssPlaceDetailScreenNavigationControl
                }>
                <Text
                  style={[
                    styles.wiildMoodtrailssPlaceDetailScreenNavigationGlyph,
                    Platform.OS === 'android' && {bottom: 4},
                  ]}>
                  ←
                </Text>
              </Pressable>
            </View>
            <View style={styles.wiildMoodtrailssPlaceDetailScreenBannerCaption}>
              <View
                style={[
                  styles.wiildMoodtrailssPlaceDetailScreenCategoryChip,
                  {backgroundColor: category.color},
                ]}>
                <Text
                  style={styles.wiildMoodtrailssPlaceDetailScreenCategoryLabel}>
                  {category.label.toUpperCase()}
                </Text>
              </View>
              <Text
                style={styles.wiildMoodtrailssPlaceDetailScreenBannerHeading}>
                {place.title}
              </Text>
              <View style={styles.wiildMoodtrailssPlaceDetailScreenLocationRow}>
                <Text
                  style={styles.wiildMoodtrailssPlaceDetailScreenLocationGlyph}>
                  ◆
                </Text>
                <Text
                  style={styles.wiildMoodtrailssPlaceDetailScreenLocationText}>
                  {place.location}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.wiildMoodtrailssPlaceDetailScreenMainContent}>
          <View style={styles.wiildMoodtrailssPlaceDetailScreenActionsRow}>
            <Pressable
              style={styles.wiildMoodtrailssPlaceDetailScreenActionButton}
              onPress={handleOpenMap}>
              <Text style={styles.wiildMoodtrailssPlaceDetailScreenActionGlyph}>
                ➤
              </Text>
              <Text style={styles.wiildMoodtrailssPlaceDetailScreenActionLabel}>
                View on Map
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.wiildMoodtrailssPlaceDetailScreenActionButton,
                isBookmarked &&
                  styles.wiildMoodtrailssPlaceDetailScreenActionButtonActive,
              ]}
              onPress={handleToggleBookmark}>
              <Text
                style={[
                  styles.wiildMoodtrailssPlaceDetailScreenActionGlyph,
                  isBookmarked &&
                    styles.wiildMoodtrailssPlaceDetailScreenActionGlyphActive,
                ]}>
                {isBookmarked ? '★' : '☆'}
              </Text>
              <Text
                style={[
                  styles.wiildMoodtrailssPlaceDetailScreenActionLabel,
                  isBookmarked &&
                    styles.wiildMoodtrailssPlaceDetailScreenActionLabelActive,
                ]}>
                {isBookmarked ? 'Saved' : 'Save'}
              </Text>
            </Pressable>
            <Pressable
              style={styles.wiildMoodtrailssPlaceDetailScreenShareControl}
              onPress={handleShare}>
              <Text style={styles.wiildMoodtrailssPlaceDetailScreenShareIcon}>
                ↗
              </Text>
            </Pressable>
          </View>

          <View style={styles.wiildMoodtrailssPlaceDetailScreenCoordsBar}>
            <Text style={styles.wiildMoodtrailssPlaceDetailScreenCoordsIcon}>
              ◆
            </Text>
            <Text style={styles.wiildMoodtrailssPlaceDetailScreenCoordsText}>
              {coords}
            </Text>
          </View>

          <Text style={styles.wiildMoodtrailssPlaceDetailScreenSectionTitle}>
            ABOUT THIS DESTINATION
          </Text>
          <Text style={styles.wiildMoodtrailssPlaceDetailScreenOverviewCopy}>
            {place.fullDescription}
          </Text>

          <Text style={styles.wiildMoodtrailssPlaceDetailScreenSectionTitle}>
            WILDLIFE YOU MAY ENCOUNTER
          </Text>
          <View style={styles.wiildMoodtrailssPlaceDetailScreenTagsRow}>
            {place.animals.map(animal => (
              <WiildMoodtrailssPlaceTag key={animal} label={animal} />
            ))}
          </View>

          <View style={styles.wiildMoodtrailssPlaceDetailScreenInfoCards}>
            <WiildMoodtrailssPlaceInfoCard
              leadingSymbol="◷"
              accentColor={'#EAB308'}
              heading="BEST TIME TO VISIT"
              summary={place.bestTimeToVisit}
            />
            <WiildMoodtrailssPlaceInfoCard
              leadingSymbol="!"
              accentColor={'#FF6B1A'}
              heading="SAFETY NOTE"
              summary={place.safetyNote}
            />
            <WiildMoodtrailssPlaceInfoCard
              leadingSymbol="✦"
              accentColor={'#3B82F6'}
              heading="SCENIC HIGHLIGHT"
              summary={place.scenicHighlight}
            />
            <WiildMoodtrailssPlaceInfoCard
              leadingSymbol="›"
              accentColor={'#22C55E'}
              heading="ROUTE ACCESSIBILITY"
              summary={place.accessibility}
            />
          </View>

          <Text style={styles.wiildMoodtrailssPlaceDetailScreenSectionTitle}>
            ADDRESS
          </Text>
          <Text style={styles.wiildMoodtrailssPlaceDetailScreenAddress}>
            {place.address}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wiildMoodtrailssPlaceTagChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  wiildMoodtrailssPlaceTagChipLabel: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 10,
  },
  wiildMoodtrailssPlaceInfoCardPanel: {
    backgroundColor: '#0F1729',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 16,
    gap: 8,
  },
  wiildMoodtrailssPlaceInfoCardHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  wiildMoodtrailssPlaceInfoCardLeadingSymbol: {
    fontSize: 14,
  },
  wiildMoodtrailssPlaceInfoCardHeading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  wiildMoodtrailssPlaceInfoCardSummary: {
    color: '#FFFFFF',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 21,
  },
  wiildMoodtrailssPlaceSearchBarInputFrame: {
    backgroundColor: '#0F1729',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    height: 45,
    justifyContent: 'center',
    paddingHorizontal: 17,
  },
  wiildMoodtrailssPlaceSearchBarInput: {
    color: '#E8EEFF',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    padding: 0,
  },
  wiildMoodtrailssPlacesHeaderHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wiildMoodtrailssPlacesHeaderCopyBlock: {
    flex: 1,
    gap: 2,
  },
  wiildMoodtrailssPlacesHeaderGreeting: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
  },
  wiildMoodtrailssPlacesHeaderHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  wiildMoodtrailssPlacesHeaderBrandMark: {
    width: 28,
    height: 28,
  },
  wiildMoodtrailssPlacesHeaderHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 20,
  },
  wiildMoodtrailssPlacesHeaderProfileFrame: {
    width: 40,
    height: 40,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#1A2440',
  },
  wiildMoodtrailssPlacesHeaderProfileImage: {
    width: '100%',
    height: '100%',
  },
  wiildMoodtrailssCategoryFilterFilterRow: {
    gap: 8,
    paddingBottom: 4,
  },
  wiildMoodtrailssCategoryFilterFilterChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  wiildMoodtrailssCategoryFilterFilterChipCompact: {
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  wiildMoodtrailssCategoryFilterFilterChipSelected: {
    backgroundColor: '#FF6B1A',
    borderColor: '#FF6B1A',
  },
  wiildMoodtrailssCategoryFilterFilterLabel: {
    color: '#8B95B0',
    fontFamily: 'Montserrat-Bold',
    fontSize: 11,
  },
  wiildMoodtrailssCategoryFilterFilterLabelCompact: {
    fontSize: 10,
  },
  wiildMoodtrailssCategoryFilterFilterLabelSelected: {
    color: '#FFFFFF',
  },
  wiildMoodtrailssFeaturedPlaceCardPanel: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 190,
  },
  wiildMoodtrailssFeaturedPlaceCardMedia: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 14,
  },
  wiildMoodtrailssFeaturedPlaceCardMediaFade: {
    ...StyleSheet.absoluteFillObject,
  },
  wiildMoodtrailssFeaturedPlaceCardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  wiildMoodtrailssFeaturedPlaceCardHighlightChip: {
    backgroundColor: '#FF6B1A',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  wiildMoodtrailssFeaturedPlaceCardShareControl: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: 'rgba(7, 12, 26, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssFeaturedPlaceCardShareGlyph: {
    color: '#8B95B0',
    fontSize: 15,
  },
  wiildMoodtrailssFeaturedPlaceCardHighlightLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 9,
    letterSpacing: 1,
  },
  wiildMoodtrailssFeaturedPlaceCardCaptionBlock: {
    zIndex: 1,
    gap: 4,
  },
  wiildMoodtrailssFeaturedPlaceCardHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 16,
  },
  wiildMoodtrailssFeaturedPlaceCardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  wiildMoodtrailssFeaturedPlaceCardLocationGlyph: {
    color: '#FF6B1A',
    fontSize: 11,
  },
  wiildMoodtrailssFeaturedPlaceCardLocationText: {
    color: '#FF6B1A',
    fontFamily: 'Nunito-Regular',
    fontSize: 11,
  },
  wiildMoodtrailssPlaceListCardPanel: {
    backgroundColor: '#0F1729',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    overflow: 'hidden',
  },
  wiildMoodtrailssPlaceListCardMediaFrame: {
    height: 170,
  },
  wiildMoodtrailssPlaceListCardMedia: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  wiildMoodtrailssPlaceListCardMediaFade: {
    ...StyleSheet.absoluteFillObject,
  },
  wiildMoodtrailssPlaceListCardCategoryChip: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    zIndex: 1,
  },
  wiildMoodtrailssPlaceListCardCategoryLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 9,
    letterSpacing: 1,
  },
  wiildMoodtrailssPlaceListCardBookmarkControl: {
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
  wiildMoodtrailssPlaceListCardBookmarkControlActive: {
    borderColor: '#FF6B1A',
  },
  wiildMoodtrailssPlaceListCardBookmarkGlyph: {
    color: '#8B95B0',
    fontSize: 16,
  },
  wiildMoodtrailssPlaceListCardBookmarkGlyphActive: {
    color: '#FF6B1A',
  },
  wiildMoodtrailssPlaceListCardContent: {
    padding: 16,
    gap: 6,
  },
  wiildMoodtrailssPlaceListCardHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
  },
  wiildMoodtrailssPlaceListCardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  wiildMoodtrailssPlaceListCardLocationGlyph: {
    color: '#8B95B0',
    fontSize: 10,
  },
  wiildMoodtrailssPlaceListCardLocationText: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
  },
  wiildMoodtrailssPlaceListCardSummary: {
    color: '#6B7A96',
    fontFamily: 'Nunito-Regular',
    fontSize: 12.5,
    lineHeight: 18.75,
    marginTop: 2,
  },
  wiildMoodtrailssPlaceListCardTagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  wiildMoodtrailssPlaceListCardActionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  wiildMoodtrailssPlaceListCardShareControl: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssPlaceListCardShareGlyph: {
    color: '#8B95B0',
    fontSize: 15,
  },
  wiildMoodtrailssPlaceListCardDetailsControl: {
    flex: 1,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FF6B1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssPlaceListCardDetailsLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
  },
  wiildMoodtrailssPlacesScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  wiildMoodtrailssPlacesScreenList: {
    paddingHorizontal: WiildMoodtrailssSpacing.md,
    gap: 16,
  },
  wiildMoodtrailssPlacesScreenHeaderBlock: {
    gap: 16,
    paddingTop: WiildMoodtrailssSpacing.sm,
    paddingBottom: 4,
  },
  wiildMoodtrailssPlacesScreenSectionTitle: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  wiildMoodtrailssPlacesScreenSeparator: {
    height: 16,
  },
  wiildMoodtrailssPlacesScreenEmpty: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: WiildMoodtrailssSpacing.lg,
  },
  wiildMoodtrailssPlaceDetailScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  wiildMoodtrailssPlaceDetailScreenBannerFrame: {
    height: 320,
  },
  wiildMoodtrailssPlaceDetailScreenBannerMedia: {
    flex: 1,
    justifyContent: 'space-between',
  },
  wiildMoodtrailssPlaceDetailScreenBannerFade: {
    ...StyleSheet.absoluteFillObject,
  },
  wiildMoodtrailssPlaceDetailScreenNavigationBar: {
    paddingHorizontal: WiildMoodtrailssSpacing.md,
    zIndex: 1,
  },
  wiildMoodtrailssPlaceDetailScreenNavigationControl: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(7, 12, 26, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssPlaceDetailScreenNavigationGlyph: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  wiildMoodtrailssPlaceDetailScreenBannerCaption: {
    padding: WiildMoodtrailssSpacing.md,
    gap: 8,
    zIndex: 1,
  },
  wiildMoodtrailssPlaceDetailScreenCategoryChip: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  wiildMoodtrailssPlaceDetailScreenCategoryLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 9,
    letterSpacing: 1,
  },
  wiildMoodtrailssPlaceDetailScreenBannerHeading: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 26,
    lineHeight: 32,
  },
  wiildMoodtrailssPlaceDetailScreenLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  wiildMoodtrailssPlaceDetailScreenLocationGlyph: {
    color: '#FF6B1A',
    fontSize: 12,
  },
  wiildMoodtrailssPlaceDetailScreenLocationText: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
  },
  wiildMoodtrailssPlaceDetailScreenMainContent: {
    padding: WiildMoodtrailssSpacing.md,
    gap: 14,
  },
  wiildMoodtrailssPlaceDetailScreenActionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  wiildMoodtrailssPlaceDetailScreenActionButton: {
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
  wiildMoodtrailssPlaceDetailScreenActionButtonActive: {
    borderColor: '#FF6B1A',
  },
  wiildMoodtrailssPlaceDetailScreenActionGlyph: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  wiildMoodtrailssPlaceDetailScreenActionGlyphActive: {
    color: '#FF6B1A',
  },
  wiildMoodtrailssPlaceDetailScreenActionLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
  },
  wiildMoodtrailssPlaceDetailScreenActionLabelActive: {
    color: '#FF6B1A',
  },
  wiildMoodtrailssPlaceDetailScreenShareControl: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#0F1729',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssPlaceDetailScreenShareIcon: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  wiildMoodtrailssPlaceDetailScreenCoordsBar: {
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
  wiildMoodtrailssPlaceDetailScreenCoordsIcon: {
    color: '#9333EA',
    fontSize: 12,
  },
  wiildMoodtrailssPlaceDetailScreenCoordsText: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    flex: 1,
  },
  wiildMoodtrailssPlaceDetailScreenSectionTitle: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    letterSpacing: 0.5,
    marginTop: 4,
  },
  wiildMoodtrailssPlaceDetailScreenOverviewCopy: {
    color: '#6B7A96',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 22,
  },
  wiildMoodtrailssPlaceDetailScreenTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wiildMoodtrailssPlaceDetailScreenInfoCards: {
    gap: 10,
    marginTop: 4,
  },
  wiildMoodtrailssPlaceDetailScreenAddress: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 21,
  },
  wiildMoodtrailssPlaceDetailScreenNotFoundLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  wiildMoodtrailssPlaceDetailScreenNotFoundMessage: {
    color: '#FFFFFF',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
  },
  wiildMoodtrailssPlaceDetailScreenNavigateBackLabel: {
    color: '#FF6B1A',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
});
