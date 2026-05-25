import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  CategoryFilter,
  FeaturedPlaceCard,
  PlaceListCard,
  PlaceSearchBar,
  PlacesHeader,
} from '../../components/places';
import {
  Routes,
  colors,
  fonts,
  spacing,
  type PlaceCategoryFilter,
} from '../../consts';
import {featuredPlace, places, type Place} from '../../data';
import type {OverviewStackParamList} from '../../navigation/types';
import {
  getSavedPlaceIds,
  togglePlaceSaved,
} from '../../utils/savedPlacesStorage';

type Props = StackScreenProps<
  OverviewStackParamList,
  typeof Routes.overview.main
>;

export function PlacesScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<PlaceCategoryFilter>('all');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      getSavedPlaceIds().then(setSavedIds);
    }, []),
  );

  const filteredPlaces = useMemo(() => {
    const query = search.trim().toLowerCase();
    return places.filter(place => {
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
      navigation.navigate(Routes.overview.detail, {id});
    },
    [navigation],
  );

  const handleToggleSave = useCallback(async (id: string) => {
    const saved = await togglePlaceSaved(id);
    setSavedIds(prev =>
      saved ? [...new Set([...prev, id])] : prev.filter(item => item !== id),
    );
  }, []);

  const renderPlace = useCallback(
    ({item}: {item: Place}) => (
      <PlaceListCard
        place={item}
        saved={savedIds.includes(item.id)}
        onPress={() => openPlace(item.id)}
        onToggleSave={() => handleToggleSave(item.id)}
      />
    ),
    [handleToggleSave, openPlace, savedIds],
  );

  return (
    <View style={[styles.root]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingTop: insets.top + 10,
          paddingBottom: Math.max(insets.bottom, spacing.lg) + 80,
        }}>
        <FlatList
          data={filteredPlaces}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={renderPlace}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.list,
            {paddingBottom: Math.max(insets.bottom, spacing.lg) + 80},
          ]}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={
            <View style={styles.headerBlock}>
              <PlacesHeader />
              <PlaceSearchBar value={search} onChangeText={setSearch} />
              <Pressable onPress={() => openPlace(featuredPlace.id)}>
                <FeaturedPlaceCard place={featuredPlace} />
              </Pressable>
              <Text style={styles.sectionTitle}>CATEGORIES</Text>
              <CategoryFilter active={category} onChange={setCategory} />
              <Text style={styles.sectionTitle}>DESTINATIONS</Text>
            </View>
          }
          ListEmptyComponent={
            <Text style={styles.empty}>No destinations match your search.</Text>
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    paddingHorizontal: spacing.md,
    gap: 16,
  },
  headerBlock: {
    gap: 16,
    paddingTop: spacing.sm,
    paddingBottom: 4,
  },
  sectionTitle: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  separator: {
    height: 16,
  },
  empty: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 14,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
