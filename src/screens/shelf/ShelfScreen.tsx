import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  SavedEmptyState,
  SavedSpotCard,
  SavedSpotsHeader,
} from '../../components/saved';
import {Routes, colors, spacing} from '../../consts';
import {getPlaceById, type Place} from '../../data';
import {openPlaceOnWildMap} from '../../navigation/openWildMap';
import type {ShelfStackParamList} from '../../navigation/types';
import {
  getSavedPlaceIds,
  removePlaceSaved,
} from '../../utils/savedPlacesStorage';

type Props = StackScreenProps<ShelfStackParamList, typeof Routes.shelf.main>;

export function ShelfScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      getSavedPlaceIds().then(setSavedIds);
    }, []),
  );

  const savedPlaces = useMemo(
    () =>
      savedIds
        .map(id => getPlaceById(id))
        .filter((place): place is Place => place !== undefined),
    [savedIds],
  );

  const openExplore = useCallback(() => {
    navigation.getParent()?.navigate(Routes.tabs.overview);
  }, [navigation]);

  const openPlace = useCallback(
    (id: string) => {
      navigation.navigate(Routes.shelf.detail, {id});
    },
    [navigation],
  );

  const handleRemove = useCallback(async (id: string) => {
    await removePlaceSaved(id);
    setSavedIds(prev => prev.filter(item => item !== id));
  }, []);

  const openMap = useCallback(
    (id: string) => {
      openPlaceOnWildMap(navigation, id);
    },
    [navigation],
  );

  const renderPlace = useCallback(
    ({item}: {item: Place}) => (
      <SavedSpotCard
        place={item}
        onOpenDetails={() => openPlace(item.id)}
        onOpenMap={() => openMap(item.id)}
        onRemove={() => handleRemove(item.id)}
      />
    ),
    [handleRemove, openMap, openPlace],
  );

  const isEmpty = savedPlaces.length === 0;

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, spacing.lg) + 80,
        }}>
        <View style={[styles.header, {paddingTop: insets.top + 10}]}>
          <SavedSpotsHeader count={savedPlaces.length} />
        </View>

        {isEmpty ? (
          <SavedEmptyState onExplore={openExplore} />
        ) : (
          <FlatList
            data={savedPlaces}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={renderPlace}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.list,
              {paddingBottom: Math.max(insets.bottom, spacing.lg) + 80},
            ]}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  list: {
    paddingHorizontal: spacing.md,
  },
  separator: {
    height: 14,
  },
});
