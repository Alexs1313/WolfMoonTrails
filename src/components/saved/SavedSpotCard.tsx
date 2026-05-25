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
  onDismiss: () => void;
};

export function SavedSpotCard({
  place,
  onOpenDetails,
  onOpenMap,
  onDismiss,
}: Props) {
  const category = getCategoryById(place.category);

  return (
    <View style={styles.panel}>
      <View style={styles.mediaFrame}>
        <ImageBackground
          source={placeImages[place.imageKey]}
          style={styles.media}
          resizeMode="cover">
          <LinearGradient
            colors={[colors.mediaGradientStart, colors.mediaGradientMid]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.mediaFade}
          />
          <View
            style={[styles.categoryChip, {backgroundColor: category.color}]}>
            <Text style={styles.categoryLabel}>
              {category.label.toUpperCase()}
            </Text>
          </View>
          <View style={styles.captionBlock}>
            <Text style={styles.heading}>{place.title}</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationGlyph}>◆</Text>
              <Text style={styles.locationText} numberOfLines={1}>
                {place.location}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.actionRow}>
        <Pressable style={styles.primaryActionFrame} onPress={onOpenDetails}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{x: 0.15, y: 0}}
            end={{x: 0.85, y: 1}}
            style={styles.primaryAction}>
            <Text style={styles.primaryActionLabel}>Open Details</Text>
          </LinearGradient>
        </Pressable>
        <Pressable style={styles.routeControl} onPress={onOpenMap}>
          <Text style={styles.routeGlyph}>➤</Text>
        </Pressable>
        <Pressable style={styles.dismissControl} onPress={onDismiss}>
          <Text style={styles.dismissGlyph}>✕</Text>
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
  mediaFrame: {
    height: 130,
  },
  media: {
    flex: 1,
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
  captionBlock: {
    zIndex: 1,
    gap: 4,
    marginTop: 'auto',
  },
  heading: {
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
  locationGlyph: {
    color: colors.textDim,
    fontSize: 11,
  },
  locationText: {
    flex: 1,
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 11,
    lineHeight: 16.5,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  primaryActionFrame: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  primaryAction: {
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryActionLabel: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 12,
    lineHeight: 18,
  },
  routeControl: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeGlyph: {
    color: colors.text,
    fontSize: 15,
  },
  dismissControl: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.errorBg,
    borderWidth: 1,
    borderColor: colors.errorBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dismissGlyph: {
    color: colors.error,
    fontSize: 14,
    fontWeight: '600',
  },
});
