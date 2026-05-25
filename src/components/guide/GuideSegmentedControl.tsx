import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {colors, fonts} from '../../consts';

export type GuideTab = 'animals' | 'safety';

type Props = {
  active: GuideTab;
  onChange: (tab: GuideTab) => void;
};

const tabs: {id: GuideTab; label: string}[] = [
  {id: 'animals', label: 'Animal Guide'},
  {id: 'safety', label: 'Wild Safety'},
];

export function GuideSegmentedControl({active, onChange}: Props) {
  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = tab.id === active;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            style={[styles.tab, isActive && styles.tabActive]}>
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  tabText: {
    color: colors.textDim,
    fontFamily: fonts.montserratSemiBold,
    fontSize: 13,
  },
  tabTextActive: {
    color: colors.text,
  },
});
