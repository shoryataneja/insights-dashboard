import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import Card from './Card';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const INACTIVE = '#EBEBEB';
const TOTAL = 8;
const BLOCK_H = 36;
const BLOCK_R = 8;
const GAP = 7;

const rows = [
  { label: 'Sleep',    from: '#C4BCDF', to: '#A89FCC', count: 6 }, // lavender gradient
  { label: 'Hydrate',  from: '#E09080', to: '#C97060', count: 3 }, // salmon gradient
  { label: 'Caffeine', from: '#8FC4A0', to: '#6BAF85', count: 5 }, // sage green gradient
  { label: 'Exercise', from: '#F0A8BC', to: '#E08898', count: 4 }, // pink gradient
];

const LABEL_W = 68;
const CARD_PAD = 16;
const APP_PAD = 32;
const BLOCKS_W = SCREEN_WIDTH - APP_PAD - CARD_PAD * 2 - LABEL_W;
const BLOCK_W = (BLOCKS_W - GAP * (TOTAL - 1)) / TOTAL;

const LifestyleImpact = () => (
  <View>
    <Text style={styles.sectionHeading}>Lifestyle Impact</Text>
    <Card>
    <View style={styles.header}>
      <Text style={styles.subtitle}>Correlation Strength</Text>
      <View style={styles.dropdown}>
        <Text style={styles.dropdownText}>4 months</Text>
        <Ionicons name="chevron-down" size={13} color={COLORS.textSecondary} />
      </View>
    </View>

    <View style={styles.heatmap}>
      {rows.map((row, ri) => (
        <View key={row.label} style={styles.row}>
          <Text style={styles.rowLabel}>{row.label}</Text>
          <Svg width={BLOCKS_W} height={BLOCK_H}>
            <Defs>
              <LinearGradient id={`grad${ri}`} x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={row.from} stopOpacity="1" />
                <Stop offset="1" stopColor={row.to} stopOpacity="1" />
              </LinearGradient>
            </Defs>
            {Array.from({ length: TOTAL }).map((_, j) => (
              <Rect
                key={j}
                x={j * (BLOCK_W + GAP)}
                y={0}
                width={BLOCK_W}
                height={BLOCK_H}
                rx={BLOCK_R}
                fill={j < row.count ? `url(#grad${ri})` : INACTIVE}
              />
            ))}
          </Svg>
        </View>
      ))}
    </View>
    </Card>
  </View>
);

const styles = StyleSheet.create({
  sectionHeading: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: 17,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 5,
  },
  dropdownText: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
  },
  heatmap: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: {
    width: LABEL_W,
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
});

export default LifestyleImpact;
