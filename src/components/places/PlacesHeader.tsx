import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {colors, fonts} from '../../consts';

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
    <View style={styles.row}>
      <View style={styles.textBlock}>
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <View style={styles.titleRow}>
          <Image
            source={require('../../../assets/images/logo-wolf.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Wild Moon Trails</Text>
        </View>
      </View>
      <View style={styles.avatar}>
        <Image
          source={require('../../../assets/images/apicon.png')}
          style={styles.avatarImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  greeting: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 28,
    height: 28,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
});
