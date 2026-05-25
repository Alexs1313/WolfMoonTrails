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
  saved: boolean;
  onPress: () => void;
  onToggleSave: () => void;
};

export function PlaceListCard({
  place,
  saved,
  onPress,
  onToggleSave,
}: Props) {
  const category = getCategoryById(place.category);
  const previewAnimals = place.animals.slice(0, 4);

  return (
    <View style={styles.card}>
      <View style={styles.imageWrap}>
        <ImageBackground
          source={placeImages[place.imageKey]}
          style={styles.image}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(0,0,0,0)', colors.cardOverlayEnd]}
            locations={[0.4, 1]}
            style={styles.imageGradient}
          />
          <View style={[styles.categoryBadge, {backgroundColor: category.color}]}>
            <Text style={styles.categoryText}>
              {category.label.toUpperCase()}
            </Text>
          </View>
          <Pressable
            onPress={onToggleSave}
            style={[styles.saveButton, saved && styles.saveButtonActive]}
            hitSlop={8}>
            <Text style={[styles.saveIcon, saved && styles.saveIconActive]}>
              {saved ? '★' : '☆'}
            </Text>
          </Pressable>
        </ImageBackground>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{place.title}</Text>
        <View style={styles.locationRow}>
          <Text style={styles.pin}>◆</Text>
          <Text style={styles.location}>{place.location}</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {place.shortDescription}
        </Text>
        <View style={styles.tagsRow}>
          {previewAnimals.map(animal => (
            <PlaceTag key={animal} label={animal} />
          ))}
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.shareButton}>
            <Text style={styles.shareIcon}>↗</Text>
          </Pressable>
          <Pressable style={styles.detailsButton} onPress={onPress}>
            <Text style={styles.detailsText}>View Details →</Text>
          </Pressable>
        </View>
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
    height: 170,
  },
  image: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  imageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    zIndex: 1,
  },
  categoryText: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 9,
    letterSpacing: 1,
  },
  saveButton: {
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
  saveButtonActive: {
    borderColor: colors.primary,
  },
  saveIcon: {
    color: colors.textDim,
    fontSize: 16,
  },
  saveIconActive: {
    color: colors.primary,
  },
  body: {
    padding: 16,
    gap: 6,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 15,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  pin: {
    color: colors.textDim,
    fontSize: 10,
  },
  location: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 12,
  },
  description: {
    color: colors.textSecondary,
    fontFamily: fonts.nunitoRegular,
    fontSize: 12.5,
    lineHeight: 18.75,
    marginTop: 2,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  shareButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    color: colors.textDim,
    fontSize: 15,
  },
  detailsButton: {
    flex: 1,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsText: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 13,
  },
});
