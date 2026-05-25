import React, {useCallback, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {MapPlaceCard, WildMapView} from '../../components/map';
import {CategoryFilter} from '../../components/places';
import {
  Routes,
  colors,
  fonts,
  spacing,
  type PlaceCategoryFilter,
} from '../../consts';
import {featuredPlace, getPlaceById, places} from '../../data';
import type {RegionsStackParamList} from '../../navigation/types';
import {
  getSavedPlaceIds,
  togglePlaceSaved,
} from '../../utils/savedPlacesStorage';

type Props = StackScreenProps<
  RegionsStackParamList,
  typeof Routes.regions.main
>;

export function RegionsScreen({navigation, route}: Props) {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState<PlaceCategoryFilter>('all');
  const [selectedId, setSelectedId] = useState(featuredPlace.id);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      getSavedPlaceIds().then(setSavedIds);
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const placeId = route.params?.placeId;
      if (!placeId) {
        return;
      }
      const place = getPlaceById(placeId);
      if (place) {
        setCategory('all');
        setSelectedId(place.id);
      }
      navigation.setParams({placeId: undefined});
    }, [navigation, route.params?.placeId]),
  );

  const filteredPlaces = useMemo(() => {
    if (category === 'all') {
      return places;
    }
    return places.filter(place => place.category === category);
  }, [category]);

  const selectedPlace = useMemo(() => {
    const match = filteredPlaces.find(p => p.id === selectedId);
    if (match) {
      return match;
    }
    return filteredPlaces[0] ?? featuredPlace;
  }, [filteredPlaces, selectedId]);

  const handleCategoryChange = useCallback(
    (next: PlaceCategoryFilter) => {
      setCategory(next);
      const nextPlaces =
        next === 'all' ? places : places.filter(p => p.category === next);
      if (!nextPlaces.some(p => p.id === selectedId)) {
        setSelectedId(nextPlaces[0]?.id ?? featuredPlace.id);
      }
    },
    [selectedId],
  );

  const handleToggleSave = useCallback(async () => {
    if (!selectedPlace) {
      return;
    }
    const saved = await togglePlaceSaved(selectedPlace.id);
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
    navigation.navigate(Routes.regions.detail, {id: selectedPlace.id});
  }, [navigation, selectedPlace]);

  return (
    <View style={[styles.root]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, spacing.lg) + 80,
          paddingTop: insets.top,
        }}>
        <View style={styles.content}>
          <Text style={styles.title}>Wild Map</Text>
          <Text style={styles.subtitle}>
            Tap a pin to explore a destination
          </Text>
          <CategoryFilter
            active={category}
            onChange={handleCategoryChange}
            compact
          />
          <WildMapView
            places={filteredPlaces}
            selectedId={selectedPlace.id}
            onSelect={setSelectedId}
          />
          <MapPlaceCard
            place={selectedPlace}
            saved={savedIds.includes(selectedPlace.id)}
            onToggleSave={handleToggleSave}
            onViewDetails={openDetails}
          />
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
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    gap: 16,
    paddingTop: spacing.sm,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 20,
  },
  subtitle: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 13,
    marginTop: -8,
  },
});
