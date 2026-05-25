import React from 'react';
import {StyleSheet, View} from 'react-native';

type Star = {
  left: `${number}%`;
  top: `${number}%`;
  size: number;
  opacity: number;
};

const stars: Star[] = [
  {left: '12%', top: '10%', size: 3, opacity: 0.75},
  {left: '28%', top: '6%', size: 2, opacity: 0.5},
  {left: '79%', top: '11%', size: 3, opacity: 0.8},
  {left: '92%', top: '8%', size: 2, opacity: 0.6},
  {left: '5%', top: '18%', size: 2, opacity: 0.7},
  {left: '88%', top: '17%', size: 3, opacity: 0.5},
  {left: '41%', top: '4%', size: 2, opacity: 0.8},
  {left: '61%', top: '14%', size: 2, opacity: 0.4},
  {left: '16%', top: '22%', size: 3, opacity: 0.6},
  {left: '96%', top: '20%', size: 2, opacity: 0.7},
  {left: '8%', top: '7%', size: 2, opacity: 0.5},
  {left: '72%', top: '5%', size: 3, opacity: 0.6},
  {left: '52%', top: '19%', size: 2, opacity: 0.4},
  {left: '95%', top: '12%', size: 2, opacity: 0.55},
  {left: '22%', top: '29%', size: 2, opacity: 0.35},
];

export function StarField() {
  return (
    <View style={styles.field} pointerEvents="none">
      {stars.map((star, index) => (
        <View
          key={index}
          style={[
            styles.star,
            {
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              borderRadius: star.size / 2,
              opacity: star.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    ...StyleSheet.absoluteFillObject,
  },
  star: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
  },
});
