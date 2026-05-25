import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';

import {
  colors,
  fonts,
  placeCategoryFilters,
  type PlaceCategoryFilter,
} from '../../consts';

type Props = {
  active: PlaceCategoryFilter;
  onChange: (category: PlaceCategoryFilter) => void;
  compact?: boolean;
};

export function CategoryFilter({active, onChange, compact}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}>
      {placeCategoryFilters.map(item => {
        const selected = item.id === active;
        return (
          <Pressable
            key={item.id}
            onPress={() => onChange(item.id)}
            style={[
              styles.chip,
              compact && styles.chipCompact,
              selected && styles.chipActive,
            ]}>
            <Text
              style={[
                styles.label,
                compact && styles.labelCompact,
                selected && styles.labelActive,
              ]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 8,
    paddingBottom: 4,
  },
  chip: {
    backgroundColor: colors.chipBg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  chipCompact: {
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    color: colors.textDim,
    fontFamily: fonts.montserratBold,
    fontSize: 11,
  },
  labelCompact: {
    fontSize: 10,
  },
  labelActive: {
    color: colors.text,
  },
});
