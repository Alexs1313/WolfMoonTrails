import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

import {ScreenContainer} from '../components';
import {
  getPlaceById,
  PlaceImages,
  type WiildMoodtrailssPlace,
} from '../data';
import {WiildMoodtrailssOpenPlaceOnWildMap} from '../utils/OpenWildMap';
import {
  WiildMoodtrailssGetSavedPlaceIds,
  WiildMoodtrailssRemovePlaceSaved,
} from '../utils/SavedPlacesStorage';

const ROUTE_SHELF_MAIN = 'ShelfMain' as const;
const ROUTE_SHELF_DETAIL = 'ShelfDetail' as const;
const ROUTE_TAB_EXPLORE = 'Explore' as const;

type WiildMoodtrailssShelfStackParamList = {
  ShelfMain: undefined;
  ShelfDetail: {id: string};
};

type WiildMoodtrailssPlaceCategoryId =
  | 'wolf-lands'
  | 'bear-country'
  | 'forest-giants'
  | 'sky-hunters';

type WiildMoodtrailssPlaceCategory = {
  id: WiildMoodtrailssPlaceCategoryId;
  label: string;
  color: string;
};

const WiildMoodtrailssPlaceCategories: WiildMoodtrailssPlaceCategory[] = [
  {id: 'wolf-lands', label: 'Wolf Lands', color: '#9333EA'},
  {id: 'bear-country', label: 'Bear Country', color: '#FF6B1A'},
  {id: 'forest-giants', label: 'Forest Giants', color: '#22C55E'},
  {id: 'sky-hunters', label: 'Sky Watchers', color: '#3B82F6'},
];

const WiildMoodtrailssPlaceCategoryById = WiildMoodtrailssPlaceCategories.reduce<
  Record<WiildMoodtrailssPlaceCategoryId, WiildMoodtrailssPlaceCategory>
>((acc, category) => {
  acc[category.id] = category;
  return acc;
}, {} as Record<WiildMoodtrailssPlaceCategoryId, WiildMoodtrailssPlaceCategory>);

function WiildMoodtrailssGetCategoryById(id: WiildMoodtrailssPlaceCategoryId) {
  return WiildMoodtrailssPlaceCategoryById[id];
}

const HEADER_TOP_PADDING = 16;
const PAGE_BOTTOM_PADDING = 80;

type WiildMoodtrailssGetSubtitleProps = {
  count: number;
};

function WiildMoodtrailssGetSavedSubtitle(count: number): string {
  if (count === 0) {
    return 'Your saved wilderness awaits';
  }
  if (count === 1) {
    return '1 wild place saved';
  }
  return `${count} wild spots saved`;
}

function WiildMoodtrailssSavedSpotsHeader({
  count,
}: WiildMoodtrailssGetSubtitleProps) {
  return (
    <View style={styles.wiildMoodtrailssSavedSpotsHeaderLayout}>
      <View style={styles.wiildMoodtrailssSavedSpotsHeaderHeadingRow}>
        <Text style={styles.wiildMoodtrailssSavedSpotsHeaderLeadingGlyph}>
          🔖
        </Text>
        <Text style={styles.wiildMoodtrailssSavedSpotsHeaderHeading}>
          Saved Spots
        </Text>
      </View>
      <Text style={styles.wiildMoodtrailssSavedSpotsHeaderSubtitle}>
        {WiildMoodtrailssGetSavedSubtitle(count)}
      </Text>
    </View>
  );
}

type WiildMoodtrailssSavedEmptyStateProps = {
  onExplore: () => void;
};

function WiildMoodtrailssSavedEmptyState({
  onExplore,
}: WiildMoodtrailssSavedEmptyStateProps) {
  return (
    <View style={styles.wiildMoodtrailssSavedEmptyStateLayout}>
      <Image
        source={require('../../assets/images/wiild-moodtrailss-empty_saved.png')}
        style={styles.wiildMoodtrailssSavedEmptyStateIllustration}
        resizeMode="contain"
      />
      <Text style={styles.wiildMoodtrailssSavedEmptyStateHeading}>
        No Wild Spots Saved Yet
      </Text>
      <Text style={styles.wiildMoodtrailssSavedEmptyStateMessage}>
        Start exploring to find wilderness destinations worth saving for your
        next adventure.
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={onExplore}
        style={({pressed}) => [
          styles.wiildMoodtrailssSavedEmptyStateCtaFrame,
          pressed && styles.wiildMoodtrailssSavedEmptyStateCtaFramePressed,
        ]}>
        <LinearGradient
          colors={['#FF6B1A', '#FF4500']}
          start={{x: 0.15, y: 0}}
          end={{x: 0.85, y: 1}}
          style={styles.wiildMoodtrailssSavedEmptyStateCta}>
          <Text style={styles.wiildMoodtrailssSavedEmptyStateCtaLabel}>
            Explore Wild Trails →
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

type WiildMoodtrailssSavedSpotCardProps = {
  place: WiildMoodtrailssPlace;
  onOpenDetails: () => void;
  onOpenMap: () => void;
  onDismiss: () => void;
};

function WiildMoodtrailssSavedSpotCard({
  place,
  onOpenDetails,
  onOpenMap,
  onDismiss,
}: WiildMoodtrailssSavedSpotCardProps) {
  const category = WiildMoodtrailssGetCategoryById(place.category);

  return (
    <View style={styles.wiildMoodtrailssSavedSpotCardPanel}>
      <View style={styles.wiildMoodtrailssSavedSpotCardMediaFrame}>
        <ImageBackground
          source={PlaceImages[place.imageKey]}
          style={styles.wiildMoodtrailssSavedSpotCardMedia}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(7, 12, 26, 0.85)', 'rgba(7, 12, 26, 0.4)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.wiildMoodtrailssSavedSpotCardMediaFade}
          />
          <View
            style={[
              styles.wiildMoodtrailssSavedSpotCardCategoryChip,
              {backgroundColor: category.color},
            ]}>
            <Text style={styles.wiildMoodtrailssSavedSpotCardCategoryLabel}>
              {category.label.toUpperCase()}
            </Text>
          </View>
          <View style={styles.wiildMoodtrailssSavedSpotCardCaptionBlock}>
            <Text style={styles.wiildMoodtrailssSavedSpotCardHeading}>
              {place.title}
            </Text>
            <View style={styles.wiildMoodtrailssSavedSpotCardLocationRow}>
              <Text style={styles.wiildMoodtrailssSavedSpotCardLocationGlyph}>
                ◆
              </Text>
              <Text
                style={styles.wiildMoodtrailssSavedSpotCardLocationText}
                numberOfLines={1}>
                {place.location}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.wiildMoodtrailssSavedSpotCardActionRow}>
        <Pressable
          style={styles.wiildMoodtrailssSavedSpotCardPrimaryActionFrame}
          onPress={onOpenDetails}>
          <LinearGradient
            colors={['#FF6B1A', '#FF4500']}
            start={{x: 0.15, y: 0}}
            end={{x: 0.85, y: 1}}
            style={styles.wiildMoodtrailssSavedSpotCardPrimaryAction}>
            <Text style={styles.wiildMoodtrailssSavedSpotCardPrimaryActionLabel}>
              Open Details
            </Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          style={styles.wiildMoodtrailssSavedSpotCardRouteControl}
          onPress={onOpenMap}>
          <Text style={styles.wiildMoodtrailssSavedSpotCardRouteGlyph}>➤</Text>
        </Pressable>
        <Pressable
          style={styles.wiildMoodtrailssSavedSpotCardDismissControl}
          onPress={onDismiss}>
          <Text style={styles.wiildMoodtrailssSavedSpotCardDismissGlyph}>✕</Text>
        </Pressable>
      </View>
    </View>
  );
}

type WiildMoodtrailssShelfScreenProps = StackScreenProps<
  WiildMoodtrailssShelfStackParamList,
  typeof ROUTE_SHELF_MAIN
>;

export function WiildMoodtrailssShelfScreen({
  navigation,
}: WiildMoodtrailssShelfScreenProps) {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const refresh = useCallback(() => {
    WiildMoodtrailssGetSavedPlaceIds().then(setSavedIds);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const savedPlaces = useMemo(
    () =>
      savedIds
        .map(id => getPlaceById(id))
        .filter((place): place is WiildMoodtrailssPlace => place !== undefined),
    [savedIds],
  );

  const openExplore = useCallback(
    () => navigation.getParent()?.navigate(ROUTE_TAB_EXPLORE),
    [navigation],
  );

  const openPlace = useCallback(
    (id: string) =>
      navigation.navigate(ROUTE_SHELF_DETAIL, {id}),
    [navigation],
  );

  const handleRemove = useCallback(async (id: string) => {
    await WiildMoodtrailssRemovePlaceSaved(id);
    setSavedIds(prev => prev.filter(item => item !== id));
  }, []);

  const openMap = useCallback(
    (id: string) => {
      WiildMoodtrailssOpenPlaceOnWildMap(navigation, id);
    },
    [navigation],
  );

  const renderPlace = useCallback(
    ({item}: {item: WiildMoodtrailssPlace}) => {
      const id = item.id;
      return (
        <WiildMoodtrailssSavedSpotCard
          place={item}
          onOpenDetails={() => openPlace(id)}
          onOpenMap={() => openMap(id)}
          onDismiss={() => handleRemove(id)}
        />
      );
    },
    [handleRemove, openMap, openPlace],
  );

  const isEmpty = savedPlaces.length === 0;

  return (
    <View style={styles.wiildMoodtrailssShelfScreenScreenLayout}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.wiildMoodtrailssShelfScreenScrollContent}>
        <View
          style={[
            styles.wiildMoodtrailssShelfScreenHeader,
            {paddingTop: HEADER_TOP_PADDING},
          ]}>
          <WiildMoodtrailssSavedSpotsHeader count={savedPlaces.length} />
        </View>

        {isEmpty ? (
          <WiildMoodtrailssSavedEmptyState onExplore={openExplore} />
        ) : (
          <View
            style={[
              styles.wiildMoodtrailssShelfScreenList,
              styles.wiildMoodtrailssShelfScreenListContent,
            ]}>
            {savedPlaces.map((place, index) => (
              <React.Fragment key={place.id}>
                {renderPlace({item: place})}
                {index < savedPlaces.length - 1 ? (
                  <WiildMoodtrailssSavedSeparator />
                ) : null}
              </React.Fragment>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function WiildMoodtrailssSavedSeparator() {
  return <View style={styles.wiildMoodtrailssShelfScreenSeparator} />;
}

type WiildMoodtrailssShelfDetailScreenProps = StackScreenProps<
  WiildMoodtrailssShelfStackParamList,
  typeof ROUTE_SHELF_DETAIL
>;

export function WiildMoodtrailssShelfDetailScreen({
  route,
}: WiildMoodtrailssShelfDetailScreenProps) {
  return (
    <ScreenContainer>
      <Text style={styles.wiildMoodtrailssShelfDetailScreenHeading}>
        Entry {route.params.id}
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wiildMoodtrailssSavedSpotsHeaderLayout: {
    gap: 4,
  },
  wiildMoodtrailssSavedSpotsHeaderHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wiildMoodtrailssSavedSpotsHeaderLeadingGlyph: {
    fontSize: 22,
    color: '#FF6B1A',
  },
  wiildMoodtrailssSavedSpotsHeaderHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 20,
    lineHeight: 30,
  },
  wiildMoodtrailssSavedSpotsHeaderSubtitle: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    lineHeight: 19.5,
  },
  wiildMoodtrailssSavedEmptyStateLayout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 14,
  },
  wiildMoodtrailssSavedEmptyStateIllustration: {
    width: 90,
    height: 90,
    marginTop: 50,
  },
  wiildMoodtrailssSavedEmptyStateHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
  },
  wiildMoodtrailssSavedEmptyStateMessage: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 22.4,
    textAlign: 'center',
    maxWidth: 290,
  },
  wiildMoodtrailssSavedEmptyStateCtaFrame: {
    marginTop: 8,
    borderRadius: 14,
    shadowColor: '#FF6B1A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    width: '55%',
  },
  wiildMoodtrailssSavedEmptyStateCtaFramePressed: {
    opacity: 0.92,
  },
  wiildMoodtrailssSavedEmptyStateCta: {
    height: 49,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssSavedEmptyStateCtaLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14.3,
    lineHeight: 21,
  },
  wiildMoodtrailssSavedSpotCardPanel: {
    backgroundColor: '#0F1729',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    overflow: 'hidden',
  },
  wiildMoodtrailssSavedSpotCardMediaFrame: {
    height: 130,
  },
  wiildMoodtrailssSavedSpotCardMedia: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  wiildMoodtrailssSavedSpotCardMediaFade: {
    ...StyleSheet.absoluteFillObject,
  },
  wiildMoodtrailssSavedSpotCardCategoryChip: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    zIndex: 1,
  },
  wiildMoodtrailssSavedSpotCardCategoryLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 8,
    letterSpacing: 0.5,
  },
  wiildMoodtrailssSavedSpotCardCaptionBlock: {
    zIndex: 1,
    gap: 4,
    marginTop: 'auto',
  },
  wiildMoodtrailssSavedSpotCardHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    lineHeight: 22.5,
  },
  wiildMoodtrailssSavedSpotCardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  wiildMoodtrailssSavedSpotCardLocationGlyph: {
    color: '#8B95B0',
    fontSize: 11,
  },
  wiildMoodtrailssSavedSpotCardLocationText: {
    flex: 1,
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 11,
    lineHeight: 16.5,
  },
  wiildMoodtrailssSavedSpotCardActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  wiildMoodtrailssSavedSpotCardPrimaryActionFrame: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  wiildMoodtrailssSavedSpotCardPrimaryAction: {
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssSavedSpotCardPrimaryActionLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    lineHeight: 18,
  },
  wiildMoodtrailssSavedSpotCardRouteControl: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#1A2440',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssSavedSpotCardRouteGlyph: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  wiildMoodtrailssSavedSpotCardDismissControl: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wiildMoodtrailssSavedSpotCardDismissGlyph: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
  wiildMoodtrailssShelfScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
    paddingTop: 30,
  },
  wiildMoodtrailssShelfScreenHeader: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  wiildMoodtrailssShelfScreenList: {
    paddingHorizontal: 16,
  },
  wiildMoodtrailssShelfScreenSeparator: {
    height: 14,
  },
  wiildMoodtrailssShelfDetailScreenHeading: {
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 16,
  },

  wiildMoodtrailssShelfScreenScrollContent: {
    paddingBottom: PAGE_BOTTOM_PADDING,
  },

  wiildMoodtrailssShelfScreenListContent: {
    paddingBottom: PAGE_BOTTOM_PADDING,
  },
});
