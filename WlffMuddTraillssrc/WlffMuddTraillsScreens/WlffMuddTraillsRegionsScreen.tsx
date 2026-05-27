import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {WlffMuddTraillsRoutes, WlffMuddTraillsGetCategoryById, WlffMuddTraillsPlaceCategoryFilters, WlffMuddTraillsSpacing, type WlffMuddTraillsPlaceCategoryFilter} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';
import {WlffMuddTraillsDarkMapStyle} from '../WlffMuddTraillsConsts/WlffMuddTraillsMapStyle';
import {
  WlffMuddTraillsFeaturedPlace,
  WlffMuddTraillsGetPlaceById,
  WlffMuddTraillsGetPlaceCoordinates,
  WlffMuddTraillsGetPlacesCoordinates,
  WlffMuddTraillsGetPlacesRegion,
  WlffMuddTraillsMapFitPadding,
  WlffMuddTraillsPlaceImages,
  WlffMuddTraillsPlaces,
  type WlffMuddTraillsPlace,
} from '../WlffMuddTraillsData/WlffMuddTraillsIndex';
import type {WlffMuddTraillsRegionsStackParamList} from '../WlffMuddTraillsRoutes/WlffMuddTraillsTypes';
import {WlffMuddTraillsPlaceDetailScreen} from './WlffMuddTraillsPlacesScreen';
import {
  WlffMuddTraillsGetSavedPlaceIds,
  WlffMuddTraillsTogglePlaceSaved,
} from '../WlffMuddTraillsUtils/WlffMuddTraillsSavedPlacesStorage';

const usesGoogleMaps = Platform.OS === 'android';

type WlffMuddTraillsCategoryFilterProps = {
  activeCategory: WlffMuddTraillsPlaceCategoryFilter;
  onChange: (category: WlffMuddTraillsPlaceCategoryFilter) => void;
  compact?: boolean;
};

function WlffMuddTraillsCategoryFilter({activeCategory, onChange, compact}: WlffMuddTraillsCategoryFilterProps) {
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
              isSelected && styles.wlffMuddTraillsCategoryFilterFilterChipSelected,
            ]}>
            <Text
              style={[
                styles.wlffMuddTraillsCategoryFilterFilterLabel,
                compact && styles.wlffMuddTraillsCategoryFilterFilterLabelCompact,
                isSelected && styles.wlffMuddTraillsCategoryFilterFilterLabelSelected,
              ]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const markerAssetResting = require('../../assets/images/tabler_map-pin-filled.png');
const markerAssetFocused = require('../../assets/images/map_pin.png');

type WlffMuddTraillsMapPinMarkerProps = {
  isFocused: boolean;
  onPress: () => void;
};

const MARKER_WIDTH = 28;
const MARKER_HEIGHT = 36;

const markerDimensions = {width: MARKER_WIDTH, height: MARKER_HEIGHT};

function WlffMuddTraillsMapPinMarker({isFocused, onPress}: WlffMuddTraillsMapPinMarkerProps) {
  return (
    <Pressable onPress={onPress} hitSlop={10} style={styles.wlffMuddTraillsMapPinMarkerMarkerFrame}>
      <Image
        source={isFocused ? markerAssetFocused : markerAssetResting}
        style={styles.wlffMuddTraillsMapPinMarkerMarkerGraphic}
        resizeMode="contain"
      />
    </Pressable>
  );
}

type WlffMuddTraillsMapOverlayCardProps = {
  place: WlffMuddTraillsPlace;
};

function WlffMuddTraillsMapOverlayCard({place}: WlffMuddTraillsMapOverlayCardProps) {
  const category = WlffMuddTraillsGetCategoryById(place.category);

  return (
    <View style={styles.wlffMuddTraillsMapOverlayCardPanel}>
      <Text style={styles.wlffMuddTraillsMapOverlayCardHeading} numberOfLines={1}>
        {place.title}
      </Text>
      <Text style={styles.wlffMuddTraillsMapOverlayCardLocationText} numberOfLines={1}>
        {place.location}
      </Text>
      <View style={styles.wlffMuddTraillsMapOverlayCardCategoryRow}>
        <View
          style={[styles.wlffMuddTraillsMapOverlayCardCategorySwatch, {backgroundColor: category.color}]}
        />
        <Text style={[styles.wlffMuddTraillsMapOverlayCardCategoryLabel, {color: category.color}]}>
          {category.label.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}

type WlffMuddTraillsWildMapViewProps = {
  WlffMuddTraillsPlaces: WlffMuddTraillsPlace[];
  selectedId: string;
  onSelect: (id: string) => void;
};

function WlffMuddTraillsWildMapView({WlffMuddTraillsPlaces, selectedId, onSelect}: WlffMuddTraillsWildMapViewProps) {
  const mapRef = useRef<MapView>(null);
  const [prevSelectedId, setPrevSelectedId] = useState(selectedId);
  const selectedPlace = WlffMuddTraillsPlaces.find(p => p.id === selectedId);
  const isSelectionTransition = prevSelectedId !== selectedId;

  useEffect(() => {
    if (!isSelectionTransition) {
      return;
    }
    const timer = setTimeout(() => setPrevSelectedId(selectedId), 400);
    return () => clearTimeout(timer);
  }, [isSelectionTransition, selectedId]);

  const shouldTrackMarkerChanges = useCallback(
    (placeId: string) =>
      isSelectionTransition &&
      (placeId === selectedId || placeId === prevSelectedId),
    [isSelectionTransition, prevSelectedId, selectedId],
  );

  const initialRegion = useMemo(() => WlffMuddTraillsGetPlacesRegion(WlffMuddTraillsPlaces), [WlffMuddTraillsPlaces]);

  const fitPlaces = useCallback(
    (animated = true) => {
      const coordinates = WlffMuddTraillsGetPlacesCoordinates(WlffMuddTraillsPlaces);
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
        edgePadding: WlffMuddTraillsMapFitPadding,
        animated,
      });
    },
    [WlffMuddTraillsPlaces],
  );

  useEffect(() => {
    fitPlaces(false);
  }, [fitPlaces]);

  useEffect(() => {
    const place = WlffMuddTraillsPlaces.find(p => p.id === selectedId);
    if (!place || !mapRef.current) {
      return;
    }

    mapRef.current.animateToRegion(
      {
        ...WlffMuddTraillsGetPlaceCoordinates(place),
        latitudeDelta: 10,
        longitudeDelta: 10,
      },
      300,
    );
  }, [WlffMuddTraillsPlaces, selectedId]);

  return (
    <View style={styles.wlffMuddTraillsWildMapViewMapFrame}>
      <MapView
        ref={mapRef}
        provider={usesGoogleMaps ? PROVIDER_GOOGLE : undefined}
        style={styles.wlffMuddTraillsWildMapViewMap}
        initialRegion={initialRegion}
        customMapStyle={usesGoogleMaps ? WlffMuddTraillsDarkMapStyle : undefined}
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
        {WlffMuddTraillsPlaces.map(place => (
          <Marker
            key={place.id}
            identifier={place.id}
            coordinate={WlffMuddTraillsGetPlaceCoordinates(place)}
            anchor={{x: 0.5, y: 1}}
            onPress={() => onSelect(place.id)}
            tracksViewChanges={shouldTrackMarkerChanges(place.id)}>
            <WlffMuddTraillsMapPinMarker
              isFocused={place.id === selectedId}
              onPress={() => onSelect(place.id)}
            />
          </Marker>
        ))}
      </MapView>
      {selectedPlace && (
        <View style={styles.wlffMuddTraillsWildMapViewFloatingPanel} pointerEvents="none">
          <WlffMuddTraillsMapOverlayCard place={selectedPlace} />
        </View>
      )}
    </View>
  );
}

type WlffMuddTraillsMapPlaceCardProps = {
  place: WlffMuddTraillsPlace;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onViewDetails: () => void;
};

function WlffMuddTraillsMapPlaceCard({
  place,
  isBookmarked,
  onToggleBookmark,
  onViewDetails,
}: WlffMuddTraillsMapPlaceCardProps) {
  const category = WlffMuddTraillsGetCategoryById(place.category);

  return (
    <View style={styles.wlffMuddTraillsMapPlaceCardPanel}>
      <ImageBackground
        source={WlffMuddTraillsPlaceImages[place.imageKey]}
        style={styles.wlffMuddTraillsMapPlaceCardMedia}
        resizeMode="cover">
        <LinearGradient
          colors={['rgba(7, 12, 26, 0.85)', 'rgba(0,0,0,0)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.wlffMuddTraillsMapPlaceCardMediaFade}
        />
        <View style={[styles.wlffMuddTraillsMapPlaceCardCategoryChip, {backgroundColor: category.color}]}>
          <Text style={styles.wlffMuddTraillsMapPlaceCardCategoryLabel}>
            {category.label.toUpperCase()}
          </Text>
        </View>
        <View style={styles.wlffMuddTraillsMapPlaceCardBannerTextBlock}>
          <Text style={styles.wlffMuddTraillsMapPlaceCardHeading}>{place.title}</Text>
          <View style={styles.wlffMuddTraillsMapPlaceCardLocationRow}>
            <Text style={styles.wlffMuddTraillsMapPlaceCardLocationGlyph}>◆</Text>
            <Text style={styles.wlffMuddTraillsMapPlaceCardLocationText}>{place.location}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.wlffMuddTraillsMapPlaceCardActionRow}>
        <Pressable
          style={[
            styles.wlffMuddTraillsMapPlaceCardBookmarkControl,
            isBookmarked && styles.wlffMuddTraillsMapPlaceCardBookmarkControlActive,
          ]}
          onPress={onToggleBookmark}>
          <Text
            style={[
              styles.wlffMuddTraillsMapPlaceCardBookmarkLabel,
              isBookmarked && styles.wlffMuddTraillsMapPlaceCardBookmarkLabelActive,
            ]}>
            {isBookmarked ? 'Saved' : 'Save Spot'}
          </Text>
        </Pressable>
        <Pressable style={styles.wlffMuddTraillsMapPlaceCardDetailsControl} onPress={onViewDetails}>
          <Text style={styles.wlffMuddTraillsMapPlaceCardDetailsLabel}>View Details →</Text>
        </Pressable>
      </View>
    </View>
  );
}

type WlffMuddTraillsRegionsScreenProps = StackScreenProps<
  WlffMuddTraillsRegionsStackParamList,
  typeof WlffMuddTraillsRoutes.regions.main
>;

export function WlffMuddTraillsRegionsScreen({navigation, route}: WlffMuddTraillsRegionsScreenProps) {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState<WlffMuddTraillsPlaceCategoryFilter>('all');
  const [selectedId, setSelectedId] = useState(WlffMuddTraillsFeaturedPlace.id);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      WlffMuddTraillsGetSavedPlaceIds().then(setSavedIds);
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const placeId = route.params?.placeId;
      if (!placeId) {
        return;
      }
      const place = WlffMuddTraillsGetPlaceById(placeId);
      if (place) {
        setCategory('all');
        setSelectedId(place.id);
      }
      navigation.setParams({placeId: undefined});
    }, [navigation, route.params?.placeId]),
  );

  const filteredPlaces = useMemo(() => {
    if (category === 'all') {
      return WlffMuddTraillsPlaces;
    }
    return WlffMuddTraillsPlaces.filter(place => place.category === category);
  }, [category]);

  const selectedPlace = useMemo(() => {
    const match = filteredPlaces.find(p => p.id === selectedId);
    if (match) {
      return match;
    }
    return filteredPlaces[0] ?? WlffMuddTraillsFeaturedPlace;
  }, [filteredPlaces, selectedId]);

  const handleCategoryChange = useCallback(
    (next: WlffMuddTraillsPlaceCategoryFilter) => {
      setCategory(next);
      const nextPlaces =
        next === 'all' ? WlffMuddTraillsPlaces : WlffMuddTraillsPlaces.filter(p => p.category === next);
      if (!nextPlaces.some(p => p.id === selectedId)) {
        setSelectedId(nextPlaces[0]?.id ?? WlffMuddTraillsFeaturedPlace.id);
      }
    },
    [selectedId],
  );

  const handleToggleSave = useCallback(async () => {
    if (!selectedPlace) {
      return;
    }
    const saved = await WlffMuddTraillsTogglePlaceSaved(selectedPlace.id);
    setSavedIds(prev =>
      saved
        ? [...new Set([...prev, selectedPlace.id])]
        : prev.filter(id => id !== selectedPlace.id),
    );
  }, [selectedPlace]);

  const openDetails = useCallback(() => {
    if (!selectedPlace) {
      return;
    }
    navigation.navigate(WlffMuddTraillsRoutes.regions.detail, {id: selectedPlace.id});
  }, [navigation, selectedPlace]);

  return (
    <View style={styles.wlffMuddTraillsRegionsScreenScreenLayout}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, WlffMuddTraillsSpacing.lg) + 80,
          paddingTop: insets.top,
        }}>
        <View style={styles.wlffMuddTraillsRegionsScreenMainColumn}>
          <Text style={styles.wlffMuddTraillsRegionsScreenHeading}>Trail Map</Text>
          <Text style={styles.wlffMuddTraillsRegionsScreenDescription}>
            Tap a marker to explore a destination
          </Text>
          <WlffMuddTraillsCategoryFilter
            activeCategory={category}
            onChange={handleCategoryChange}
            compact
          />
          <WlffMuddTraillsWildMapView
            WlffMuddTraillsPlaces={filteredPlaces}
            selectedId={selectedPlace.id}
            onSelect={setSelectedId}
          />
          <WlffMuddTraillsMapPlaceCard
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

type WlffMuddTraillsRegionsPlaceDetailScreenProps = StackScreenProps<
  WlffMuddTraillsRegionsStackParamList,
  typeof WlffMuddTraillsRoutes.regions.detail
>;

export function WlffMuddTraillsRegionsPlaceDetailScreen(props: WlffMuddTraillsRegionsPlaceDetailScreenProps) {
  return (
    <WlffMuddTraillsPlaceDetailScreen
      navigation={props.navigation as never}
      route={props.route as never}
    />
  );
}

const styles = StyleSheet.create({
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
  wlffMuddTraillsMapPinMarkerMarkerFrame: {
    width: MARKER_WIDTH,
    height: MARKER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  wlffMuddTraillsMapPinMarkerMarkerGraphic: {
    width: MARKER_WIDTH,
    height: MARKER_HEIGHT,
  },
  wlffMuddTraillsMapOverlayCardPanel: {
    backgroundColor: 'rgba(15, 23, 41, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 2,
  },
  wlffMuddTraillsMapOverlayCardHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 11,
  },
  wlffMuddTraillsMapOverlayCardLocationText: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 9,
  },
  wlffMuddTraillsMapOverlayCardCategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  wlffMuddTraillsMapOverlayCardCategorySwatch: {
    width: 6,
    height: 6,
    borderRadius: 2,
  },
  wlffMuddTraillsMapOverlayCardCategoryLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 8,
    letterSpacing: 0.5,
  },
  wlffMuddTraillsWildMapViewMapFrame: {
    height: 384,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#0F1729',
  },
  wlffMuddTraillsWildMapViewMap: {
    ...StyleSheet.absoluteFillObject,
  },
  wlffMuddTraillsWildMapViewFloatingPanel: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
  },
  wlffMuddTraillsMapPlaceCardPanel: {
    backgroundColor: '#0F1729',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    overflow: 'hidden',
  },
  wlffMuddTraillsMapPlaceCardMedia: {
    height: 120,
    padding: 14,
    justifyContent: 'space-between',
  },
  wlffMuddTraillsMapPlaceCardMediaFade: {
    ...StyleSheet.absoluteFillObject,
  },
  wlffMuddTraillsMapPlaceCardCategoryChip: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    zIndex: 1,
  },
  wlffMuddTraillsMapPlaceCardCategoryLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 8,
    letterSpacing: 0.5,
  },
  wlffMuddTraillsMapPlaceCardBannerTextBlock: {
    zIndex: 1,
    gap: 4,
  },
  wlffMuddTraillsMapPlaceCardHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  wlffMuddTraillsMapPlaceCardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  wlffMuddTraillsMapPlaceCardLocationGlyph: {
    color: '#FF6B1A',
    fontSize: 10,
  },
  wlffMuddTraillsMapPlaceCardLocationText: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 11,
  },
  wlffMuddTraillsMapPlaceCardActionRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  wlffMuddTraillsMapPlaceCardBookmarkControl: {
    flex: 1,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#1A2440',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsMapPlaceCardBookmarkControlActive: {
    borderColor: '#FF6B1A',
  },
  wlffMuddTraillsMapPlaceCardBookmarkLabel: {
    color: '#8B95B0',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
  wlffMuddTraillsMapPlaceCardBookmarkLabelActive: {
    color: '#FF6B1A',
  },
  wlffMuddTraillsMapPlaceCardDetailsControl: {
    flex: 1,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FF6B1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsMapPlaceCardDetailsLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
  },
  wlffMuddTraillsRegionsScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  wlffMuddTraillsRegionsScreenMainColumn: {
    flex: 1,
    paddingHorizontal: WlffMuddTraillsSpacing.md,
    gap: 16,
    paddingTop: WlffMuddTraillsSpacing.sm,
  },
  wlffMuddTraillsRegionsScreenHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 20,
  },
  wlffMuddTraillsRegionsScreenDescription: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    marginTop: -8,
  }
});
