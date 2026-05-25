import React from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors, fonts} from '../../consts';
import type {Place} from '../../data';
import {placeImages} from '../../data';

type Props = {
  place: Place;
  onPress: () => void;
  onShare: () => void;
};

export function FeaturedPlaceCard({place, onPress, onShare}: Props) {
  return (
    <Pressable style={styles.panel} onPress={onPress}>
      <ImageBackground
        source={placeImages[place.imageKey]}
        style={styles.media}
        resizeMode="cover">
        <LinearGradient
          colors={[
            colors.mediaGradientStart,
            colors.mediaGradientMid,
            'rgba(0,0,0,0)',
          ]}
          locations={[0, 0.6, 1]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.mediaFade}
        />
        <View style={styles.topRow}>
          <View style={styles.highlightChip}>
            <Text style={styles.highlightLabel}>⭐ FEATURED</Text>
          </View>
          <Pressable
            style={styles.shareControl}
            onPress={onShare}
            hitSlop={8}>
            <Text style={styles.shareGlyph}>↗</Text>
          </Pressable>
        </View>
        <View style={styles.captionBlock}>
          <Text style={styles.heading}>{place.title}</Text>
          <View style={styles.locationRow}>
            <Text style={styles.locationGlyph}>◆</Text>
            <Text style={styles.locationText}>{place.location}</Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 190,
  },
  media: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 14,
  },
  mediaFade: {
    ...StyleSheet.absoluteFillObject,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  highlightChip: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  shareControl: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: 'rgba(7, 12, 26, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareGlyph: {
    color: colors.textDim,
    fontSize: 15,
  },
  highlightLabel: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 9,
    letterSpacing: 1,
  },
  captionBlock: {
    zIndex: 1,
    gap: 4,
  },
  heading: {
    color: colors.heading,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationGlyph: {
    color: colors.primary,
    fontSize: 11,
  },
  locationText: {
    color: colors.primary,
    fontFamily: fonts.nunitoRegular,
    fontSize: 11,
  },
});
