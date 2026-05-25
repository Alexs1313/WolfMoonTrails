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
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageWrap}>
        <ImageBackground
          source={guideAnimalImages[animal.id]}
          style={styles.image}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(0,0,0,0)', colors.cardOverlayEnd]}
            locations={[0.5, 1]}
            style={styles.imageGradient}
          />
        </ImageBackground>
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {animal.name}
        </Text>
        <View style={styles.distanceRow}>
          <Text style={styles.shield}>🛡</Text>
          <Text style={styles.distance}>
            {formatSafeDistance(animal.safeDistanceMeters)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    overflow: 'hidden',
  },
  imageWrap: {
    height: 120,
  },
  image: {
    flex: 1,
  },
  imageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  body: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 4,
  },
  name: {
    color: colors.heading,
    fontFamily: fonts.montserratBold,
    fontSize: 13,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shield: {
    fontSize: 10,
  },
  distance: {
    flex: 1,
    color: colors.purpleMuted,
    fontFamily: fonts.nunitoRegular,
    fontSize: 10,
    lineHeight: 14,
  },
});
