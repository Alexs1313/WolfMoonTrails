import React from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors, fonts, getCategoryById} from '../../consts';
import type {Place} from '../../data';
import {placeImages} from '../../data';

type Props = {
  place: Place;
  onOpenDetails: () => void;
  onOpenMap: () => void;
  onRemove: () => void;
};

export function SavedSpotCard({
  place,
  onOpenDetails,
  onOpenMap,
  onRemove,
}: Props) {
  const category = getCategoryById(place.category);

  return (
    <View style={styles.card}>
      <View style={styles.imageWrap}>
        <ImageBackground
          source={placeImages[place.imageKey]}
          style={styles.image}
          resizeMode="cover">
          <LinearGradient
            colors={[colors.heroOverlayStart, colors.heroOverlayMid]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.imageGradient}
          />
          <View style={[styles.categoryBadge, {backgroundColor: category.color}]}>
            <Text style={styles.categoryText}>
              {category.label.toUpperCase()}
            </Text>
          </View>
          <View style={styles.overlayContent}>
            <Text style={styles.title}>{place.title}</Text>
            <View style={styles.locationRow}>
              <Text style={styles.pin}>◆</Text>
              <Text style={styles.location} numberOfLines={1}>
                {place.location}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.detailsWrap} onPress={onOpenDetails}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{x: 0.15, y: 0}}
            end={{x: 0.85, y: 1}}
            style={styles.detailsButton}>
            <Text style={styles.detailsText}>Open Details</Text>
          </LinearGradient>
        </Pressable>
        <Pressable style={styles.mapButton} onPress={onOpenMap}>
          <Text style={styles.mapIcon}>➤</Text>
        </Pressable>
        <Pressable style={styles.removeButton} onPress={onRemove}>
          <Text style={styles.removeIcon}>✕</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    overflow: 'hidden',
  },
  imageWrap: {
    height: 130,
  },
  image: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  imageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    zIndex: 1,
  },
  categoryText: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 8,
    letterSpacing: 0.5,
  },
  overlayContent: {
    zIndex: 1,
    gap: 4,
    marginTop: 'auto',
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 15,
    lineHeight: 22.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pin: {
    color: colors.textDim,
    fontSize: 11,
  },
  location: {
    flex: 1,
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 11,
    lineHeight: 16.5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  detailsWrap: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  detailsButton: {
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsText: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 12,
    lineHeight: 18,
  },
  mapButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapIcon: {
    color: colors.text,
    fontSize: 15,
  },
  removeButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.errorBg,
    borderWidth: 1,
    borderColor: colors.errorBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeIcon: {
    color: colors.error,
    fontSize: 14,
    fontWeight: '600',
  },
});
