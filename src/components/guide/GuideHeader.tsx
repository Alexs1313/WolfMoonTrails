import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {colors, fonts} from '../../consts';

export function GuideHeader() {
  return (
    <View style={styles.row}>
      <Image
        source={require('../../../assets/images/tabs/library.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={styles.title}>Field Guide</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: colors.purple,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 22,
  },
});
