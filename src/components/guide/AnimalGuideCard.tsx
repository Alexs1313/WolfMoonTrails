import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors, fonts} from '../../consts';
import type {GuideAnimal} from '../../data';
import {guideAnimalImages} from '../../data';

type Props = {
  animal: GuideAnimal;
  onPress: () => void;
};

export function formatSafeDistance(meters: number): string {
  return `${meters} meters minimum`;
}

export function AnimalGuideCard({animal, onPress}: Props) {
  return (
    <Pressable style={styles.panel} onPress={onPress}>
      <View style={styles.mediaFrame}>
        <ImageBackground
          source={guideAnimalImages[animal.id]}
          style={styles.media}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(0,0,0,0)', colors.surfaceOverlayEnd]}
            locations={[0.5, 1]}
            style={styles.mediaFade}
          />
        </ImageBackground>
      </View>
      <View style={styles.content}>
        <Text style={styles.heading} numberOfLines={1}>
          {animal.name}
        </Text>
        <View style={styles.distanceRow}>
          <Text style={styles.proximityIcon}>🛡</Text>
          <Text style={styles.distanceText}>
            {formatSafeDistance(animal.safeDistanceMeters)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    overflow: 'hidden',
  },
  mediaFrame: {
    height: 120,
  },
  media: {
    flex: 1,
  },
  mediaFade: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 4,
  },
  heading: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 13,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  proximityIcon: {
    fontSize: 10,
  },
  distanceText: {
    flex: 1,
    color: colors.purpleMuted,
    fontFamily: fonts.nunitoRegular,
    fontSize: 10,
    lineHeight: 14,
  },
});
