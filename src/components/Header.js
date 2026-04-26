import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const DOT = 9;
const DOT_GAP = 5;
const DOT_COLOR = '#9B8FD4';

const GridDots = () => (
  <View style={dots.grid}>
    {[0, 1, 2, 3].map((i) => (
      <View
        key={i}
        style={[
          dots.dot,
          // slightly lighter for bottom row to match screenshot
          { opacity: i >= 2 ? 0.65 : 1 },
        ]}
      />
    ))}
  </View>
);

const dots = StyleSheet.create({
  grid: {
    width: DOT * 2 + DOT_GAP,
    height: DOT * 2 + DOT_GAP,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DOT_GAP,
  },
  dot: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    backgroundColor: DOT_COLOR,
  },
});

const Header = () => (
  <View style={styles.container}>
    <GridDots />
    <Text style={styles.title}>Insights</Text>
    <View style={styles.placeholder} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
  },
  placeholder: {
    width: DOT * 2 + DOT_GAP,
  },
});

export default Header;
