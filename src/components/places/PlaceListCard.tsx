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
import {PlaceTag} from './PlaceTag';

type Props = {
  place: Place;
  isBookmarked: boolean;
  onPress: () => void;
  onToggleBookmark: () => void;
  onShare: () => void;
};

export function PlaceListCard({
  place,
  isBookmarked,
  onPress,
  onToggleBookmark,
  onShare,
}: Props) {
  const category = getCategoryById(place.category);
  const previewLabels = place.animals.slice(0, 4);

  return (
    <View style={styles.panel}>
      <View style={styles.mediaFrame}>
        <ImageBackground
          source={placeImages[place.imageKey]}
          style={styles.media}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(0,0,0,0)', colors.surfaceOverlayEnd]}
            locations={[0.4, 1]}
            style={styles.mediaFade}
          />
          <View
            style={[styles.categoryChip, {backgroundColor: category.color}]}>
            <Text style={styles.categoryLabel}>
              {category.label.toUpperCase()}
            </Text>
          </View>
          <Pressable
            onPress={onToggleBookmark}
            style={[
              styles.bookmarkControl,
              isBookmarked && styles.bookmarkControlActive,
            ]}
            hitSlop={8}>
            <Text
              style={[
                styles.bookmarkGlyph,
                isBookmarked && styles.bookmarkGlyphActive,
              ]}>
              {isBookmarked ? '★' : '☆'}
            </Text>
          </Pressable>
        </ImageBackground>
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>{place.title}</Text>
        <View style={styles.locationRow}>
          <Text style={styles.locationGlyph}>◆</Text>
          <Text style={styles.locationText}>{place.location}</Text>
        </View>
        <Text style={styles.summary} numberOfLines={2}>
          {place.shortDescription}
        </Text>
        <View style={styles.tagRow}>
          {previewLabels.map(label => (
            <PlaceTag key={label} label={label} />
          ))}
        </View>
        <View style={styles.actionRow}>
          <Pressable style={styles.shareControl} onPress={onShare} hitSlop={6}>
            <Text style={styles.shareGlyph}>↗</Text>
          </Pressable>
          <Pressable style={styles.detailsControl} onPress={onPress}>
            <Text style={styles.detailsLabel}>View Details →</Text>
          </Pressable>
        </View>
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
  mediaFrame: {
    height: 170,
  },
  media: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  mediaFade: {
    ...StyleSheet.absoluteFillObject,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    zIndex: 1,
  },
  categoryLabel: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 9,
    letterSpacing: 1,
  },
  bookmarkControl: {
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
  bookmarkControlActive: {
    borderColor: colors.primary,
  },
  bookmarkGlyph: {
    color: colors.textDim,
    fontSize: 16,
  },
  bookmarkGlyphActive: {
    color: colors.primary,
  },
  content: {
    padding: 16,
    gap: 6,
  },
  heading: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 15,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationGlyph: {
    color: colors.textDim,
    fontSize: 10,
  },
  locationText: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 12,
  },
  summary: {
    color: colors.textSecondary,
    fontFamily: fonts.nunitoRegular,
    fontSize: 12.5,
    lineHeight: 18.75,
    marginTop: 2,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  shareControl: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareGlyph: {
    color: colors.textDim,
    fontSize: 15,
  },
  detailsControl: {
    flex: 1,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsLabel: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 13,
  },
});
