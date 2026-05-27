import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {WlffMuddTraillsScreenContainer} from '../WlffMuddTraillsComponents/WlffMuddTraillsIndex';
import {
  WlffMuddTraillsRoutes,
  WlffMuddTraillsGetCategoryById,
  WlffMuddTraillsSpacing,
} from '../WlffMuddTraillsConsts/WlffMuddTraillsIndex';
import {
  WlffMuddTraillsGetPlaceById,
  WlffMuddTraillsPlaceImages,
  type WlffMuddTraillsPlace,
} from '../WlffMuddTraillsData/WlffMuddTraillsIndex';
import {WlffMuddTraillsOpenPlaceOnWildMap} from '../WlffMuddTraillsRoutes/WlffMuddTraillsOpenWildMap';
import type {WlffMuddTraillsShelfStackParamList} from '../WlffMuddTraillsRoutes/WlffMuddTraillsTypes';
import {
  WlffMuddTraillsGetSavedPlaceIds,
  WlffMuddTraillsRemovePlaceSaved,
} from '../WlffMuddTraillsUtils/WlffMuddTraillsSavedPlacesStorage';

type WlffMuddTraillsGetSubtitleProps = {
  count: number;
};

function WlffMuddTraillsGetSubtitle(count: number): string {
  if (count === 0) {
    return 'Your saved wilderness awaits';
  }
  if (count === 1) {
    return '1 wild place saved';
  }
  return `${count} wild spots saved`;
}

function WlffMuddTraillsSavedSpotsHeader({
  count,
}: WlffMuddTraillsGetSubtitleProps) {
  return (
    <View style={styles.wlffMuddTraillsSavedSpotsHeaderLayout}>
      <View style={styles.wlffMuddTraillsSavedSpotsHeaderHeadingRow}>
        <Text style={styles.wlffMuddTraillsSavedSpotsHeaderLeadingGlyph}>
          🔖
        </Text>
        <Text style={styles.wlffMuddTraillsSavedSpotsHeaderHeading}>
          Saved Spots
        </Text>
      </View>
      <Text style={styles.wlffMuddTraillsSavedSpotsHeaderSubtitle}>
        {WlffMuddTraillsGetSubtitle(count)}
      </Text>
    </View>
  );
}

type WlffMuddTraillsSavedEmptyStateProps = {
  onExplore: () => void;
};

function WlffMuddTraillsSavedEmptyState({
  onExplore,
}: WlffMuddTraillsSavedEmptyStateProps) {
  return (
    <View style={styles.wlffMuddTraillsSavedEmptyStateLayout}>
      <Image
        source={require('../../assets/images/empty_saved.png')}
        style={styles.wlffMuddTraillsSavedEmptyStateIllustration}
        resizeMode="contain"
      />
      <Text style={styles.wlffMuddTraillsSavedEmptyStateHeading}>
        No Wild Spots Saved Yet
      </Text>
      <Text style={styles.wlffMuddTraillsSavedEmptyStateMessage}>
        Start exploring to find wilderness destinations worth saving for your
        next adventure.
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={onExplore}
        style={({pressed}) => [
          styles.wlffMuddTraillsSavedEmptyStateCtaFrame,
          pressed && styles.wlffMuddTraillsSavedEmptyStateCtaFramePressed,
        ]}>
        <LinearGradient
          colors={['#FF6B1A', '#FF4500']}
          start={{x: 0.15, y: 0}}
          end={{x: 0.85, y: 1}}
          style={styles.wlffMuddTraillsSavedEmptyStateCta}>
          <Text style={styles.wlffMuddTraillsSavedEmptyStateCtaLabel}>
            Explore Wild Trails →
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

type WlffMuddTraillsSavedSpotCardProps = {
  place: WlffMuddTraillsPlace;
  onOpenDetails: () => void;
  onOpenMap: () => void;
  onDismiss: () => void;
};

function WlffMuddTraillsSavedSpotCard({
  place,
  onOpenDetails,
  onOpenMap,
  onDismiss,
}: WlffMuddTraillsSavedSpotCardProps) {
  const category = WlffMuddTraillsGetCategoryById(place.category);

  return (
    <View style={styles.wlffMuddTraillsSavedSpotCardPanel}>
      <View style={styles.wlffMuddTraillsSavedSpotCardMediaFrame}>
        <ImageBackground
          source={WlffMuddTraillsPlaceImages[place.imageKey]}
          style={styles.wlffMuddTraillsSavedSpotCardMedia}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(7, 12, 26, 0.85)', 'rgba(7, 12, 26, 0.4)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.wlffMuddTraillsSavedSpotCardMediaFade}
          />
          <View
            style={[
              styles.wlffMuddTraillsSavedSpotCardCategoryChip,
              {backgroundColor: category.color},
            ]}>
            <Text style={styles.wlffMuddTraillsSavedSpotCardCategoryLabel}>
              {category.label.toUpperCase()}
            </Text>
          </View>
          <View style={styles.wlffMuddTraillsSavedSpotCardCaptionBlock}>
            <Text style={styles.wlffMuddTraillsSavedSpotCardHeading}>
              {place.title}
            </Text>
            <View style={styles.wlffMuddTraillsSavedSpotCardLocationRow}>
              <Text style={styles.wlffMuddTraillsSavedSpotCardLocationGlyph}>
                ◆
              </Text>
              <Text
                style={styles.wlffMuddTraillsSavedSpotCardLocationText}
                numberOfLines={1}>
                {place.location}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.wlffMuddTraillsSavedSpotCardActionRow}>
        <Pressable
          style={styles.wlffMuddTraillsSavedSpotCardPrimaryActionFrame}
          onPress={onOpenDetails}>
          <LinearGradient
            colors={['#FF6B1A', '#FF4500']}
            start={{x: 0.15, y: 0}}
            end={{x: 0.85, y: 1}}
            style={styles.wlffMuddTraillsSavedSpotCardPrimaryAction}>
            <Text style={styles.wlffMuddTraillsSavedSpotCardPrimaryActionLabel}>
              Open Details
            </Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          style={styles.wlffMuddTraillsSavedSpotCardRouteControl}
          onPress={onOpenMap}>
          <Text style={styles.wlffMuddTraillsSavedSpotCardRouteGlyph}>➤</Text>
        </Pressable>
        <Pressable
          style={styles.wlffMuddTraillsSavedSpotCardDismissControl}
          onPress={onDismiss}>
          <Text style={styles.wlffMuddTraillsSavedSpotCardDismissGlyph}>✕</Text>
        </Pressable>
      </View>
    </View>
  );
}

type WlffMuddTraillsShelfScreenProps = StackScreenProps<
  WlffMuddTraillsShelfStackParamList,
  typeof WlffMuddTraillsRoutes.shelf.main
>;

export function WlffMuddTraillsShelfScreen({
  navigation,
}: WlffMuddTraillsShelfScreenProps) {
  const insets = useSafeAreaInsets();
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      WlffMuddTraillsGetSavedPlaceIds().then(setSavedIds);
    }, []),
  );

  const savedPlaces = useMemo(
    () =>
      savedIds
        .map(id => WlffMuddTraillsGetPlaceById(id))
        .filter((place): place is WlffMuddTraillsPlace => place !== undefined),
    [savedIds],
  );

  const openExplore = useCallback(() => {
    navigation.getParent()?.navigate(WlffMuddTraillsRoutes.tabs.explore);
  }, [navigation]);

  const openPlace = useCallback(
    (id: string) => {
      navigation.navigate(WlffMuddTraillsRoutes.shelf.detail, {id});
    },
    [navigation],
  );

  const handleRemove = useCallback(async (id: string) => {
    await WlffMuddTraillsRemovePlaceSaved(id);
    setSavedIds(prev => prev.filter(item => item !== id));
  }, []);

  const openMap = useCallback(
    (id: string) => {
      WlffMuddTraillsOpenPlaceOnWildMap(navigation, id);
    },
    [navigation],
  );

  const renderPlace = useCallback(
    ({item}: {item: WlffMuddTraillsPlace}) => (
      <WlffMuddTraillsSavedSpotCard
        place={item}
        onOpenDetails={() => openPlace(item.id)}
        onOpenMap={() => openMap(item.id)}
        onDismiss={() => handleRemove(item.id)}
      />
    ),
    [handleRemove, openMap, openPlace],
  );

  const isEmpty = savedPlaces.length === 0;

  return (
    <View style={styles.wlffMuddTraillsShelfScreenScreenLayout}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingBottom:
            Math.max(insets.bottom, WlffMuddTraillsSpacing.lg) + 80,
        }}>
        <View
          style={[
            styles.wlffMuddTraillsShelfScreenHeader,
            {paddingTop: insets.top + 10},
          ]}>
          <WlffMuddTraillsSavedSpotsHeader count={savedPlaces.length} />
        </View>

        {isEmpty ? (
          <WlffMuddTraillsSavedEmptyState onExplore={openExplore} />
        ) : (
          <FlatList
            data={savedPlaces}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={renderPlace}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.wlffMuddTraillsShelfScreenList,
              {
                paddingBottom:
                  Math.max(insets.bottom, WlffMuddTraillsSpacing.lg) + 80,
              },
            ]}
            ItemSeparatorComponent={() => (
              <View style={styles.wlffMuddTraillsShelfScreenSeparator} />
            )}
          />
        )}
      </ScrollView>
    </View>
  );
}

type WlffMuddTraillsShelfDetailScreenProps = StackScreenProps<
  WlffMuddTraillsShelfStackParamList,
  typeof WlffMuddTraillsRoutes.shelf.detail
>;

export function WlffMuddTraillsShelfDetailScreen({
  route,
}: WlffMuddTraillsShelfDetailScreenProps) {
  return (
    <WlffMuddTraillsScreenContainer>
      <Text style={styles.wlffMuddTraillsShelfDetailScreenHeading}>
        Entry {route.params.id}
      </Text>
    </WlffMuddTraillsScreenContainer>
  );
}

const styles = StyleSheet.create({
  wlffMuddTraillsSavedSpotsHeaderLayout: {
    gap: 4,
  },
  wlffMuddTraillsSavedSpotsHeaderHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wlffMuddTraillsSavedSpotsHeaderLeadingGlyph: {
    fontSize: 22,
    color: '#FF6B1A',
  },
  wlffMuddTraillsSavedSpotsHeaderHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 20,
    lineHeight: 30,
  },
  wlffMuddTraillsSavedSpotsHeaderSubtitle: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    lineHeight: 19.5,
  },
  wlffMuddTraillsSavedEmptyStateLayout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: WlffMuddTraillsSpacing.md,
    paddingBottom: WlffMuddTraillsSpacing.xxl,
    gap: 14,
  },
  wlffMuddTraillsSavedEmptyStateIllustration: {
    width: 90,
    height: 90,
    marginTop: 50,
  },
  wlffMuddTraillsSavedEmptyStateHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
  },
  wlffMuddTraillsSavedEmptyStateMessage: {
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 22.4,
    textAlign: 'center',
    maxWidth: 290,
  },
  wlffMuddTraillsSavedEmptyStateCtaFrame: {
    marginTop: WlffMuddTraillsSpacing.sm,
    borderRadius: 14,
    shadowColor: '#FF6B1A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    width: '55%',
  },
  wlffMuddTraillsSavedEmptyStateCtaFramePressed: {
    opacity: 0.92,
  },
  wlffMuddTraillsSavedEmptyStateCta: {
    height: 49,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsSavedEmptyStateCtaLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14.3,
    lineHeight: 21,
  },
  wlffMuddTraillsSavedSpotCardPanel: {
    backgroundColor: '#0F1729',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    overflow: 'hidden',
  },
  wlffMuddTraillsSavedSpotCardMediaFrame: {
    height: 130,
  },
  wlffMuddTraillsSavedSpotCardMedia: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  wlffMuddTraillsSavedSpotCardMediaFade: {
    ...StyleSheet.absoluteFillObject,
  },
  wlffMuddTraillsSavedSpotCardCategoryChip: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    zIndex: 1,
  },
  wlffMuddTraillsSavedSpotCardCategoryLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 8,
    letterSpacing: 0.5,
  },
  wlffMuddTraillsSavedSpotCardCaptionBlock: {
    zIndex: 1,
    gap: 4,
    marginTop: 'auto',
  },
  wlffMuddTraillsSavedSpotCardHeading: {
    color: '#E8EEFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    lineHeight: 22.5,
  },
  wlffMuddTraillsSavedSpotCardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  wlffMuddTraillsSavedSpotCardLocationGlyph: {
    color: '#8B95B0',
    fontSize: 11,
  },
  wlffMuddTraillsSavedSpotCardLocationText: {
    flex: 1,
    color: '#8B95B0',
    fontFamily: 'Nunito-Regular',
    fontSize: 11,
    lineHeight: 16.5,
  },
  wlffMuddTraillsSavedSpotCardActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  wlffMuddTraillsSavedSpotCardPrimaryActionFrame: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  wlffMuddTraillsSavedSpotCardPrimaryAction: {
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsSavedSpotCardPrimaryActionLabel: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    lineHeight: 18,
  },
  wlffMuddTraillsSavedSpotCardRouteControl: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#1A2440',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsSavedSpotCardRouteGlyph: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  wlffMuddTraillsSavedSpotCardDismissControl: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlffMuddTraillsSavedSpotCardDismissGlyph: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
  wlffMuddTraillsShelfScreenScreenLayout: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  wlffMuddTraillsShelfScreenHeader: {
    paddingHorizontal: WlffMuddTraillsSpacing.md,
    paddingBottom: WlffMuddTraillsSpacing.md,
  },
  wlffMuddTraillsShelfScreenList: {
    paddingHorizontal: WlffMuddTraillsSpacing.md,
  },
  wlffMuddTraillsShelfScreenSeparator: {
    height: 14,
  },
  wlffMuddTraillsShelfDetailScreenHeading: {
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: WlffMuddTraillsSpacing.md,
  },
});
