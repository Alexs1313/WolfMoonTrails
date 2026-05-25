import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';

import {
  colors,
  fonts,
  placeCategoryFilters,
  type PlaceCategoryFilter,
} from '../../consts';

type Props = {
  activeCategory: PlaceCategoryFilter;
  onChange: (category: PlaceCategoryFilter) => void;
  compact?: boolean;
};

export function CategoryFilter({activeCategory, onChange, compact}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterRow}>
      {placeCategoryFilters.map(item => {
        const isSelected = item.id === activeCategory;
        return (
          <Pressable
            key={item.id}
            onPress={() => onChange(item.id)}
            style={[
              styles.filterChip,
              compact && styles.filterChipCompact,
              isSelected && styles.filterChipSelected,
            ]}>
            <Text
              style={[
                styles.filterLabel,
                compact && styles.filterLabelCompact,
                isSelected && styles.filterLabelSelected,
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
  filterRow: {
    gap: 8,
    paddingBottom: 4,
  },
  filterChip: {
    backgroundColor: colors.chipBg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  filterChipCompact: {
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  filterChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterLabel: {
    color: colors.textDim,
    fontFamily: fonts.montserratBold,
    fontSize: 11,
  },
  filterLabelCompact: {
    fontSize: 10,
  },
  filterLabelSelected: {
    color: colors.text,
  },
});
