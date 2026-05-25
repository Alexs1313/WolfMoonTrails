import React from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {formatSafeDistance} from '../../components/guide';
import {Routes, colors, fonts, spacing} from '../../consts';
import {getGuideAnimal, guideAnimalImages} from '../../data';
import type {LibraryStackParamList} from '../../navigation/types';

type Props = StackScreenProps<
  LibraryStackParamList,
  typeof Routes.library.detail
>;

function TipList({
  title,
  titleColor,
  items,
  icon,
  iconColor,
}: {
  title: string;
  titleColor: string;
  items: string[];
  icon: string;
  iconColor: string;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, {color: titleColor}]}>{title}</Text>
      <View style={styles.list}>
        {items.map(item => (
          <View key={item} style={styles.listItem}>
            <Text style={[styles.listIcon, {color: iconColor}]}>{icon}</Text>
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export function AnimalDetailScreen({navigation, route}: Props) {
  const insets = useSafeAreaInsets();
  const animal = getGuideAnimal(route.params.id);

  if (!animal) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Animal not found.</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, spacing.lg) + 80,
        }}>
        <View style={styles.heroWrap}>
          <ImageBackground
            source={guideAnimalImages[animal.id]}
            style={styles.hero}
            resizeMode="cover">
            <LinearGradient
              colors={['rgba(0,0,0,0.15)', 'rgba(7,12,26,0.95)']}
              style={styles.heroGradient}
            />
            <View style={[styles.topBar, {paddingTop: insets.top + 8}]}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.backButton}>
                <Text style={styles.backIcon}>←</Text>
              </Pressable>
            </View>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>{animal.name}</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.content}>
          <View style={styles.safetyBanner}>
            <Text style={styles.shieldIcon}>🛡</Text>
            <Text style={styles.safetyText}>
              Safe distance: {formatSafeDistance(animal.safeDistanceMeters)}
            </Text>
          </View>

          <Text style={styles.description}>{animal.description}</Text>

          <View style={styles.habitatCard}>
            <Text style={styles.habitatLabel}>🗺 HABITAT</Text>
            <Text style={styles.habitatText}>{animal.habitat}</Text>
          </View>

          <TipList
            title="BEHAVIOR TIPS"
            titleColor={colors.heading}
            items={animal.behaviorTips}
            icon="✓"
            iconColor={colors.green}
          />

          <TipList
            title="WHAT NOT TO DO"
            titleColor={colors.warningHeading}
            items={animal.whatNotToDo}
            icon="✕"
            iconColor={colors.error}
          />

          <View style={styles.wildFactCard}>
            <Text style={styles.wildFactLabel}>⚡ WILD FACT</Text>
            <Text style={styles.wildFactText}>{animal.wildFact}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  missing: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  missingText: {
    color: colors.textDim,
    fontFamily: fonts.nunitoRegular,
    fontSize: 16,
  },
  backLink: {
    color: colors.primary,
    fontFamily: fonts.montserratSemiBold,
    fontSize: 15,
  },
  heroWrap: {
    height: 280,
  },
  hero: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  topBar: {
    paddingHorizontal: spacing.md,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(7, 12, 26, 0.65)',
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: colors.text,
    fontSize: 20,
  },
  heroContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    zIndex: 1,
  },
  heroTitle: {
    color: colors.text,
    fontFamily: fonts.montserratExtraBold,
    fontSize: 28,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },
  safetyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.guidePurpleBg,
    borderWidth: 1,
    borderColor: colors.guidePurpleBorder,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  shieldIcon: {
    fontSize: 16,
  },
  safetyText: {
    flex: 1,
    color: colors.purpleLight,
    fontFamily: fonts.nunitoMedium,
    fontSize: 13,
    lineHeight: 18,
  },
  description: {
    color: colors.textSecondary,
    fontFamily: fonts.nunitoRegular,
    fontSize: 14,
    lineHeight: 21,
  },
  habitatCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    padding: 14,
    gap: 8,
  },
  habitatLabel: {
    color: colors.textDim,
    fontFamily: fonts.montserratBold,
    fontSize: 11,
    letterSpacing: 0.8,
  },
  habitatText: {
    color: colors.heading,
    fontFamily: fonts.nunitoRegular,
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: fonts.montserratBold,
    fontSize: 12,
    letterSpacing: 0.8,
  },
  list: {
    gap: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  listIcon: {
    fontFamily: fonts.montserratBold,
    fontSize: 14,
    lineHeight: 20,
    width: 16,
  },
  listText: {
    flex: 1,
    color: colors.textSecondary,
    fontFamily: fonts.nunitoRegular,
    fontSize: 13.5,
    lineHeight: 20,
  },
  wildFactCard: {
    backgroundColor: colors.wildFactBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.wildFactBorder,
    padding: 14,
    gap: 8,
  },
  wildFactLabel: {
    color: colors.yellow,
    fontFamily: fonts.montserratBold,
    fontSize: 11,
    letterSpacing: 0.8,
  },
  wildFactText: {
    color: colors.heading,
    fontFamily: fonts.nunitoRegular,
    fontSize: 14,
    lineHeight: 20,
  },
});
