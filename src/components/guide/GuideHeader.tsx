import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {colors, fonts} from '../../consts';

export function GuideHeader() {
  return (
    <View style={styles.headerRow}>
      <Image
        source={require('../../../assets/images/tabs/guide.png')}
        style={styles.leadingGraphic}
        resizeMode="contain"
      />
      <Text style={styles.heading}>Field Guide</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  leadingGraphic: {
    width: 22,
    height: 22,
    tintColor: colors.purple,
  },
  heading: {
    color: colors.heading,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 22,
  },
});
