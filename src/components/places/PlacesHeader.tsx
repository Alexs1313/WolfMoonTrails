import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {colors, fonts} from '../../consts';

const brandMark = require('../../../assets/images/logo-wolf.png');

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) {
    return 'Good morning, explorer';
  }
  if (hour < 18) {
    return 'Good afternoon, explorer';
  }
  return 'Good evening, explorer';
}

export function PlacesHeader() {
  return (
    <View style={styles.headerRow}>
      <View style={styles.copyBlock}>
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <View style={styles.headingRow}>
          <Image
            source={brandMark}
            style={styles.brandMark}
            resizeMode="contain"
          />
          <Text style={styles.heading}>Wild Moon Trails</Text>
        </View>
      </View>
      <View style={styles.profileFrame}>
        <Image
          source={require('../../../assets/images/apicon.png')}
          style={styles.profileImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  copyBlock: {
    flex: 1,
    gap: 2,
  },
  greeting: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 12,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandMark: {
    width: 28,
    height: 28,
  },
  heading: {
    color: colors.heading,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 20,
  },
  profileFrame: {
    width: 40,
    height: 40,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});
