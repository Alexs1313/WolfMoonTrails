import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {
  Marker,
  type MapStyleElement,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import {useAppDispatch, useAppSelector} from '../app/hooks';
import type {RootState} from '../app/store';
import {uiActions} from '../app/slices/uiSlice';
import {loadSavedPlaceIds, toggleSavedPlace} from '../app/slices/savedPlacesSlice';
import {
  FeaturedPlace,
  getPlaceById,
  getPlaceCoordinates,
  getPlacesCoordinates,
  getPlacesRegion,
  MapFitPadding,
  PlaceImages,
  Places,
  type WiildMoodtrailssPlace,
} from '../data';
import {WiildMoodtrailssPlaceDetailScreen} from './PlacesScreen';

type WiildMoodtrailssRegionsStackParamList = {
  RegionsMain: {placeId?: string} | undefined;
  RegionsDetail: {id: string};
};

const WiildMoodtrailssRoutes = {
  regions: {
    main: 'RegionsMain',
    detail: 'RegionsDetail',
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

const WiildMoodtrailssDarkMapStyle: MapStyleElement[] = [
  {elementType: 'geometry', stylers: [{color: '#0f1729'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#8b95b0'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#070c1a'}]},
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1e2d4a'}],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{color: '#121e36'}],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{color: '#121e36'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#152a45'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#1a2440'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1e2d4a'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#121e36'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#0a1228'}],
  },
];

const usesGoogleMaps = Platform.OS === 'android';

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

const markerAssetResting = require('../../assets/images/wiild-moodtrailss-tabler_map-pin-filled.png');
const markerAssetFocused = require('../../assets/images/wiild-moodtrailss-map_pin.png');

type WiildMoodtrailssMapPinMarkerProps = {
  isFocused: boolean;
  onPress: () => void;
};

const MARKER_WIDTH = 28;
const MARKER_HEIGHT = 36;

function WiildMoodtrailssMapPinMarker({
  isFocused,
  onPress,
}: WiildMoodtrailssMapPinMarkerProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={styles.wiildMoodtrailssMapPinMarkerMarkerFrame}>
      <Image
        source={isFocused ? markerAssetFocused : markerAssetResting}
        style={styles.wiildMoodtrailssMapPinMarkerMarkerGraphic}
        resizeMode="contain"
      />
    </Pressable>
  );
}

type WiildMoodtrailssMapOverlayCardProps = {
  place: WiildMoodtrailssPlace;
};

function WiildMoodtrailssMapOverlayCard({
  place,
}: WiildMoodtrailssMapOverlayCardProps) {
  const category = WiildMoodtrailssGetCategoryById(place.category);

  return (
    <View style={styles.wiildMoodtrailssMapOverlayCardPanel}>
      <Text
        style={styles.wiildMoodtrailssMapOverlayCardHeading}
        numberOfLines={1}>
        {place.title}
      </Text>
      <Text
        style={styles.wiildMoodtrailssMapOverlayCardLocationText}
        numberOfLines={1}>
        {place.location}
      </Text>
      <View style={styles.wiildMoodtrailssMapOverlayCardCategoryRow}>
        <View
          style={[
            styles.wiildMoodtrailssMapOverlayCardCategorySwatch,
            {backgroundColor: category.color},
          ]}
        />
        <Text
          style={[
            styles.wiildMoodtrailssMapOverlayCardCategoryLabel,
            {color: category.color},
          ]}>
          {category.label.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}

type WiildMoodtrailssWildMapViewProps = {
  places: WiildMoodtrailssPlace[];
  selectedId: string;
  onSelect: (id: string) => void;
};

const PAGE_BOTTOM_PADDING = 80;
const PAGE_TOP_PADDING = 40;

function WiildMoodtrailssWildMapView({
  places,
  selectedId,
  onSelect,
}: WiildMoodtrailssWildMapViewProps) {
  const mapRef = useRef<MapView>(null);
  const prevSelectedIdRef = useRef(selectedId);
  const selectedPlace = places.find(p => p.id === selectedId);
  const isSelectionTransition = prevSelectedIdRef.current !== selectedId;

  useEffect(() => {
    if (!isSelectionTransition) {
      return;
    }
    const timer = setTimeout(() => {
      prevSelectedIdRef.current = selectedId;
    }, 400);
    return () => clearTimeout(timer);
  }, [isSelectionTransition, selectedId]);

  const shouldTrackMarkerChanges = useCallback(
    (placeId: string) =>
      isSelectionTransition &&
      (placeId === selectedId || placeId === prevSelectedIdRef.current),
    [isSelectionTransition, selectedId],
  );

  const initialRegion = useMemo(() => getPlacesRegion(places), [places]);

  const fitPlaces = useCallback(
    (animated = true) => {
      const coordinates = getPlacesCoordinates(places);
      if (coordinates.length === 0 || !mapRef.current) {
        return;
      }

      if (coordinates.length === 1) {
        mapRef.current.animateToRegion(
          {
            ...coordinates[0],
            latitudeDelta: 12,
            longitudeDelta: 12,
          },
          animated ? 350 : 0,
        );
        return;
      }

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: MapFitPadding,
        animated,
      });
    },
    [places],
  );

  useEffect(() => {
    fitPlaces(false);
  }, [fitPlaces]);

  useEffect(() => {
    const place = places.find(p => p.id === selectedId);
    if (!place || !mapRef.current) {
      return;
    }

    mapRef.current.animateToRegion(
      {
        ...getPlaceCoordinates(place),
        latitudeDelta: 10,
        longitudeDelta: 10,
      },
      300,
    );
  }, [places, selectedId]);

  return (
    <View style={styles.wiildMoodtrailssWildMapViewMapFrame}>
      <MapView
        ref={mapRef}
        provider={usesGoogleMaps ? PROVIDER_GOOGLE : undefined}
        style={styles.wiildMoodtrailssWildMapViewMap}
        initialRegion={initialRegion}
        customMapStyle={
          usesGoogleMaps ? WiildMoodtrailssDarkMapStyle : undefined
        }
        mapType={usesGoogleMaps ? 'standard' : 'mutedStandard'}
        userInterfaceStyle="dark"
        showsCompass={false}
        showsMyLocationButton={false}
        showsUserLocation={false}
        toolbarEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        loadingEnabled
        loadingBackgroundColor={'#0F1729'}
        loadingIndicatorColor={'#FF6B1A'}>
        {places.map(place => (
          <Marker
            key={place.id}
            identifier={place.id}
            coordinate={getPlaceCoordinates(place)}
            anchor={{x: 0.5, y: 1}}
            onPress={() => onSelect(place.id)}
            tracksViewChanges={shouldTrackMarkerChanges(place.id)}>
            <WiildMoodtrailssMapPinMarker
              isFocused={place.id === selectedId}
              onPress={() => onSelect(place.id)}
            />
          </Marker>
        ))}
      </MapView>
      {selectedPlace && (
        <View
          style={styles.wiildMoodtrailssWildMapViewFloatingPanel}
          pointerEvents="none">
          <WiildMoodtrailssMapOverlayCard place={selectedPlace} />
        </View>
      )}
    </View>
  );
}

type WiildMoodtrailssMapPlaceCardProps = {
  place: WiildMoodtrailssPlace;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onViewDetails: () => void;
};

function WiildMoodtrailssMapPlaceCard({
  place,
  isBookmarked,
  onToggleBookmark,
  onViewDetails,
}: WiildMoodtrailssMapPlaceCardProps) {
  const category = WiildMoodtrailssGetCategoryById(place.category);

  return (
    <View style={styles.wiildMoodtrailssMapPlaceCardPanel}>
      <ImageBackground
        source={PlaceImages[place.imageKey]}
        style={styles.wiildMoodtrailssMapPlaceCardMedia}
        resizeMode="cover">
        <LinearGradient
          colors={['rgba(7, 12, 26, 0.85)', 'rgba(0,0,0,0)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.wiildMoodtrailssMapPlaceCardMediaFade}
        />
        <View
          style={[
            styles.wiildMoodtrailssMapPlaceCardCategoryChip,
            {backgroundColor: category.color},
          ]}>
          <Text style={styles.wiildMoodtrailssMapPlaceCardCategoryLabel}>
            {category.label.toUpperCase()}
          </Text>
        </View>
        <View style={styles.wiildMoodtrailssMapPlaceCardBannerTextBlock}>
          <Text style={styles.wiildMoodtrailssMapPlaceCardHeading}>
            {place.title}
          </Text>
          <View style={styles.wiildMoodtrailssMapPlaceCardLocationRow}>
            <Text style={styles.wiildMoodtrailssMapPlaceCardLocationGlyph}>
              ◆
            </Text>
            <Text style={styles.wiildMoodtrailssMapPlaceCardLocationText}>
              {place.location}
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.wiildMoodtrailssMapPlaceCardActionRow}>
        <Pressable
          style={[
            styles.wiildMoodtrailssMapPlaceCardBookmarkControl,
            isBookmarked &&
              styles.wiildMoodtrailssMapPlaceCardBookmarkControlActive,
          ]}
          onPress={onToggleBookmark}>
          <Text
            style={[
              styles.wiildMoodtrailssMapPlaceCardBookmarkLabel,
              isBookmarked &&
                styles.wiildMoodtrailssMapPlaceCardBookmarkLabelActive,
            ]}>
            {isBookmarked ? 'Saved' : 'Save Spot'}
          </Text>
        </Pressable>
        <Pressable
          style={styles.wiildMoodtrailssMapPlaceCardDetailsControl}
          onPress={onViewDetails}>
          <Text style={styles.wiildMoodtrailssMapPlaceCardDetailsLabel}>
            View Details →
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

type WiildMoodtrailssRegionsScreenProps = StackScreenProps<
  WiildMoodtrailssRegionsStackParamList,
  typeof WiildMoodtrailssRoutes.regions.main
>;

export function WiildMoodtrailssRegionsScreen({
  navigation,
  route,
}: WiildMoodtrailssRegionsScreenProps) {
  const dispatch = useAppDispatch();
  const category = useAppSelector(
    state => state.ui.regions.category,
  ) as WiildMoodtrailssPlaceCategoryFilter;
  const selectedIdFromUi = useAppSelector(state => state.ui.regions.selectedId);
  const selectedId = selectedIdFromUi || FeaturedPlace.id;
  const savedIds = useAppSelector((state: RootState) => state.savedPlaces.ids);

  useFocusEffect(
    useCallback(() => {
      dispatch(loadSavedPlaceIds());
    }, [dispatch]),
  );

  useFocusEffect(
    useCallback(() => {
      const placeId = route.params?.placeId;
      if (!placeId) {
        return;
      }
      const place = getPlaceById(placeId);
      if (place) {
        dispatch(uiActions.setRegionsCategory('all'));
        dispatch(uiActions.setRegionsSelectedId(place.id));
      }
      navigation.setParams({placeId: undefined});
    }, [dispatch, navigation, route.params?.placeId]),
  );

  const filteredPlaces = useMemo(() => {
    if (category === 'all') {
      return Places;
    }
    return Places.filter(place => place.category === category);
  }, [category]);

  const selectedPlace = useMemo(() => {
    const match = filteredPlaces.find(p => p.id === selectedId);
    if (match) {
      return match;
    }
    return filteredPlaces[0] ?? FeaturedPlace;
  }, [filteredPlaces, selectedId]);

  const handleCategoryChange = useCallback(
    (next: WiildMoodtrailssPlaceCategoryFilter) => {
      dispatch(uiActions.setRegionsCategory(next as any));
      const nextPlaces =
        next === 'all'
          ? Places
          : Places.filter(p => p.category === next);
      if (!nextPlaces.some(p => p.id === selectedId)) {
        dispatch(
          uiActions.setRegionsSelectedId(nextPlaces[0]?.id ?? FeaturedPlace.id),
        );
      }
    },
    [dispatch, selectedId],
  );

  const handleToggleSave = useCallback(async () => {
    if (!selectedPlace) {
      return;
    }
    await dispatch(toggleSavedPlace(selectedPlace.id)).unwrap();
  }, [dispatch, selectedPlace]);

  const openDetails = useCallback(() => {
    if (!selectedPlace) {
      return;
    }
    navigation.navigate(WiildMoodtrailssRoutes.regions.detail, {
      id: selectedPlace.id,
    });
  }, [navigation, selectedPlace]);

  return (
    <View style={styles.wiildMoodtrailssRegionsScreenScreenLayout}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingBottom: PAGE_BOTTOM_PADDING,
          paddingTop: PAGE_TOP_PADDING,
        }}>
        <View style={styles.wiildMoodtrailssRegionsScreenMainColumn}>
          <Text style={styles.wiildMoodtrailssRegionsScreenHeading}>
            Trail Map
          </Text>
          <Text style={styles.wiildMoodtrailssRegionsScreenDescription}>
            Tap a marker to explore a destination
          </Text>
          <WiildMoodtrailssCategoryFilter
            activeCategory={category}
            onChange={handleCategoryChange}
            compact
          />
          <WiildMoodtrailssWildMapView
            places={filteredPlaces}
            selectedId={selectedPlace.id}
            onSelect={id => dispatch(uiActions.setRegionsSelectedId(id))}
          />
          <WiildMoodtrailssMapPlaceCard
            place={selectedPlace}
            isBookmarked={savedIds.includes(selectedPlace.id)}
            onToggleBookmark={handleToggleSave}
            onViewDetails={openDetails}
          />
        </View>
      </ScrollView>
    </View>
  );
}

type WiildMoodtrailssRegionsPlaceDetailScreenProps = StackScreenProps<
  WiildMoodtrailssRegionsStackParamList,
  typeof WiildMoodtrailssRoutes.regions.detail
>;

export function WiildMoodtrailssRegionsPlaceDetailScreen(
  props: WiildMoodtrailssRegionsPlaceDetailScreenProps,
) {
  return (
    <WiildMoodtrailssPlaceDetailScreen
      navigation={props.navigation as never}
      route={props.route as never}
    />
  );
}

const styles = StyleSheet.create({
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
  wiildMoodtrailssMapPinMarkerMarkerFrame: {
    width: MARKER_WIDTH,
    height: MARKER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  wiildMoodtrailssMapPinMarkerMarkerGraphic: {
    width: MARKER_WIDTH,
    height: MARKER_HEIGHT,
  },
  wiildMoodtrailssMapOverlayCardPanel: {
    backgroundColor: 'rgba(15, 23, 41, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 2,
  },
  wiildMoodtrailssMapOverlayCardHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 11,
  },
  wiildMoodtrailssMapOverlayCardLocationText: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 9,
  },
  wiildMoodtrailssMapOverlayCardCategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  wiildMoodtrailssMapOverlayCardCategorySwatch: {
    width: 6,
    height: 6,
    borderRadius: 2,
  },
  wiildMoodtrailssMapOverlayCardCategoryLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 8,
    letterSpacing: 0.5,
  },
  wiildMoodtrailssWildMapViewMapFrame: {
    height: 384,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#0F1729',
  },
  wiildMoodtrailssWildMapViewMap: {
    ...StyleSheet.absoluteFillObject,
  },
  wiildMoodtrailssWildMapViewFloatingPanel: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
  },
  wiildMoodtrailssMapPlaceCardPanel: {
    backgroundColor: '#0F1729',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    overflow: 'hidden',
  },
  wiildMoodtrailssMapPlaceCardMedia: {
    height: 120,
    padding: 14,
    justifyContent: 'space-between',
  },
  wiildMoodtrailssMapPlaceCardMediaFade: {
    ...StyleSheet.absoluteFillObject,
  },
  wiildMoodtrailssMapPlaceCardCategoryChip: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    zIndex: 1,
  },
  wiildMoodtrailssMapPlaceCardCategoryLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 8,
    letterSpacing: 0.5,
  },
  wiildMoodtrailssMapPlaceCardBannerTextBlock: {
    zIndex: 1,
    gap: 4,
  },
  wiildMoodtrailssMapPlaceCardHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  wiildMoodtrailssMapPlaceCardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  wiildMoodtrailssMapPlaceCardLocationGlyph: {
    color: '#FF6B1A',
    fontSize: 10,
  },
  wiildMoodtrailssMapPlaceCardLocationText: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 11,
  },
  wiildMoodtrailssMapPlaceCardActionRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  wiildMoodtrailssMapPlaceCardBookmarkControl: {
    flex: 1,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#1A2440',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssMapPlaceCardBookmarkControlActive: {
    borderColor: '#FF6B1A',
  },
  wiildMoodtrailssMapPlaceCardBookmarkLabel: {
    color: '#8B95B0',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
  wiildMoodtrailssMapPlaceCardBookmarkLabelActive: {
    color: '#FF6B1A',
  },
  wiildMoodtrailssMapPlaceCardDetailsControl: {
    flex: 1,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FF6B1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssMapPlaceCardDetailsLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
  },
  wiildMoodtrailssRegionsScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  wiildMoodtrailssRegionsScreenMainColumn: {
    flex: 1,
    paddingHorizontal: WiildMoodtrailssSpacing.md,
    gap: 16,
    paddingTop: WiildMoodtrailssSpacing.sm,
  },
  wiildMoodtrailssRegionsScreenHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 20,
  },
  wiildMoodtrailssRegionsScreenDescription: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    marginTop: -8,
  },
});
