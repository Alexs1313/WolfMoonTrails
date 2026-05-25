import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors, fonts} from '../../consts';
import type {Place} from '../../data';
import {placeImages} from '../../data';

type Props = {
  place: Place;
};

export function FeaturedPlaceCard({place}: Props) {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={placeImages[place.imageKey]}
        style={styles.image}
        resizeMode="cover">
        <LinearGradient
          colors={[
            colors.heroOverlayStart,
            colors.heroOverlayMid,
            'rgba(0,0,0,0)',
          ]}
          locations={[0, 0.6, 1]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradient}
        />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>⭐ FEATURED</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.title}>{place.title}</Text>
          <View style={styles.locationRow}>
            <Text style={styles.pin}>◆</Text>
            <Text style={styles.location}>{place.location}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 190,
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 14,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    zIndex: 1,
  },
  badgeText: {
    color: colors.text,
    fontFamily: fonts.montserratBold,
    fontSize: 9,
    letterSpacing: 1,
  },
  footer: {
    zIndex: 1,
    gap: 4,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pin: {
    color: colors.primary,
    fontSize: 11,
  },
  location: {
    color: colors.primary,
    fontFamily: fonts.nunitoRegular,
    fontSize: 11,
  },
});
