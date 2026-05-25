import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {colors, fonts} from '../../consts';

export type GuideTab = 'animals' | 'safety';

type Props = {
  activeSection: GuideTab;
  onChange: (tab: GuideTab) => void;
};

const sections: {id: GuideTab; label: string}[] = [
  {id: 'animals', label: 'Animal Guide'},
  {id: 'safety', label: 'Wild Safety'},
];

export function GuideSegmentedControl({activeSection, onChange}: Props) {
  return (
    <View style={styles.segmentFrame}>
      {sections.map(section => {
        const isSelected = section.id === activeSection;
        return (
          <Pressable
            key={section.id}
            onPress={() => onChange(section.id)}
            style={[
              styles.segment,
              isSelected && styles.segmentSelected,
            ]}>
            <Text
              style={[
                styles.segmentLabel,
                isSelected && styles.segmentLabelSelected,
              ]}>
              {section.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  segmentFrame: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    padding: 4,
    gap: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentSelected: {
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  segmentLabel: {
    color: colors.textDim,
    fontFamily: fonts.montserratSemiBold,
    fontSize: 13,
  },
  segmentLabelSelected: {
    color: colors.text,
  },
});
