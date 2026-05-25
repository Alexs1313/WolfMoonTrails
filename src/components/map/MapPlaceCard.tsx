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
  saved: boolean;
  onToggleSave: () => void;
  onViewDetails: () => void;
};

export function MapPlaceCard({
  place,
  saved,
  onToggleSave,
  onViewDetails,
}: Props) {
  const category = getCategoryById(place.category);

  return (
    <View style={styles.card}>
      <ImageBackground
        source={placeImages[place.imageKey]}
        style={styles.image}
        resizeMode="cover">
        <LinearGradient
          colors={[colors.heroOverlayStart, 'rgba(0,0,0,0)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradient}
        />
        <View style={[styles.badge, {backgroundColor: category.color}]}>
          <Text style={styles.badgeText}>{category.label.toUpperCase()}</Text>
        </View>
        <View style={styles.imageContent}>
          <Text style={styles.title}>{place.title}</Text>
          <View style={styles.locationRow}>
            <Text style={styles.pin}>◆</Text>
            <Text style={styles.location}>{place.location}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.actions}>
        <Pressable
          style={[styles.saveButton, saved && styles.saveButtonActive]}
          onPress={onToggleSave}>
          <Text style={[styles.saveLabel, saved && styles.saveLabelActive]}>
            {saved ? 'Saved' : 'Save Spot'}
          </Text>
        </Pressable>
        <Pressable style={styles.detailsButton} onPress={onViewDetails}>
          <Text style={styles.detailsLabel}>View Details →</Text>
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
  image: {
    height: 120,
    padding: 14,
    justifyContent: 'space-between',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    zIndex: 1,
  },
  badgeText: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 8,
    letterSpacing: 0.5,
  },
  imageContent: {
    zIndex: 1,
    gap: 4,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 14,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pin: {
    color: colors.primary,
    fontSize: 10,
  },
  location: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 11,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  saveButton: {
    flex: 1,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonActive: {
    borderColor: colors.primary,
  },
  saveLabel: {
    color: colors.textDim,
    fontFamily: fonts.montserratSemiBold,
    fontSize: 12,
  },
  saveLabelActive: {
    color: colors.primary,
  },
  detailsButton: {
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
