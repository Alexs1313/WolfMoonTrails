import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors, fonts, getCategoryById} from '../../consts';
import type {Place} from '../../data';
import {placeImages} from '../../data';

type Props = {
  place: Place;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onViewDetails: () => void;
};

export function MapPlaceCard({
  place,
  isBookmarked,
  onToggleBookmark,
  onViewDetails,
}: Props) {
  const category = getCategoryById(place.category);

  return (
    <View style={styles.panel}>
      <ImageBackground
        source={placeImages[place.imageKey]}
        style={styles.media}
        resizeMode="cover">
        <LinearGradient
          colors={[colors.mediaGradientStart, 'rgba(0,0,0,0)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.mediaFade}
        />
        <View style={[styles.categoryChip, {backgroundColor: category.color}]}>
          <Text style={styles.categoryLabel}>
            {category.label.toUpperCase()}
          </Text>
        </View>
        <View style={styles.bannerTextBlock}>
          <Text style={styles.heading}>{place.title}</Text>
          <View style={styles.locationRow}>
            <Text style={styles.locationGlyph}>◆</Text>
            <Text style={styles.locationText}>{place.location}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.actionRow}>
        <Pressable
          style={[
            styles.bookmarkControl,
            isBookmarked && styles.bookmarkControlActive,
          ]}
          onPress={onToggleBookmark}>
          <Text
            style={[
              styles.bookmarkLabel,
              isBookmarked && styles.bookmarkLabelActive,
            ]}>
            {isBookmarked ? 'Saved' : 'Save Spot'}
          </Text>
        </Pressable>
        <Pressable style={styles.detailsControl} onPress={onViewDetails}>
          <Text style={styles.detailsLabel}>View Details →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    overflow: 'hidden',
  },
  media: {
    height: 120,
    padding: 14,
    justifyContent: 'space-between',
  },
  mediaFade: {
    ...StyleSheet.absoluteFillObject,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    zIndex: 1,
  },
  categoryLabel: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 8,
    letterSpacing: 0.5,
  },
  bannerTextBlock: {
    zIndex: 1,
    gap: 4,
  },
  heading: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 14,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationGlyph: {
    color: colors.primary,
    fontSize: 10,
  },
  locationText: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 11,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  bookmarkControl: {
    flex: 1,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkControlActive: {
    borderColor: colors.primary,
  },
  bookmarkLabel: {
    color: colors.textDim,
    fontFamily: fonts.montserratSemiBold,
    fontSize: 12,
  },
  bookmarkLabelActive: {
    color: colors.primary,
  },
  detailsControl: {
    flex: 1,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsLabel: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 12,
  },
});
