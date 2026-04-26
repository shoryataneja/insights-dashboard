import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_PAD = 16;
const APP_PAD = 32;
const SVG_W = SCREEN_WIDTH - APP_PAD - CARD_PAD * 2;
const SVG_H = 130;
const PAD_LEFT = 36;
const CHART_W = SVG_W - PAD_LEFT;

// Two rising lines to create the double-band gradient effect
// Line 1 (upper band top edge): rises steeply
// Line 2 (lower band bottom edge): starts at bottom, rises gently
const line1 = `M 0,${SVG_H - 10} C ${CHART_W * 0.3},${SVG_H - 20} ${CHART_W * 0.6},${SVG_H * 0.55} ${CHART_W},${SVG_H * 0.18}`;
const line2 = `M 0,${SVG_H - 10} C ${CHART_W * 0.3},${SVG_H - 15} ${CHART_W * 0.6},${SVG_H * 0.72} ${CHART_W},${SVG_H * 0.42}`;

// Area for upper (lighter) band
const upperArea = `${line1} L ${CHART_W},${SVG_H * 0.42} C ${CHART_W * 0.6},${SVG_H * 0.72} ${CHART_W * 0.3},${SVG_H - 15} 0,${SVG_H - 10} Z`;
// Area for lower (darker) band — between line2 and bottom
const lowerArea = `${line2} L ${CHART_W},${SVG_H} L 0,${SVG_H} Z`;

// Dot position at ~Mar (60% of chart width)
const DOT_X = CHART_W * 0.60;
const DOT_Y = SVG_H * 0.55;

const xLabels = ['Jan', 'Feb', 'Mar', 'Apr'];
const yLabels = ['32d', '28d', '24d'];

const StabilitySummary = () => (
  <View>
    {/* Section title outside card */}
    <Text style={styles.sectionTitle}>Stability Summary</Text>

    <View style={styles.card}>
      <Text style={styles.cardSubtitle}>
        Based on your recent logs and symptom patterns.
      </Text>

      <Text style={styles.scoreLabel}>Stability Score</Text>
      <Text style={styles.scoreValue}>78%</Text>

      {/* Chart */}
      <View style={styles.chartOuter}>
        {/* Y-axis */}
        <View style={styles.yAxis}>
          {yLabels.map((l) => (
            <Text key={l} style={styles.yLabel}>{l}</Text>
          ))}
        </View>

        <View style={{ flex: 1, position: 'relative' }}>
          {/* Badge — centered above the dot (Mar = 60% of chart width) */}
          <View style={styles.badgeWrap}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{'Stability\nImproving'}</Text>
            </View>
            <View style={styles.badgeArrow} />
          </View>
          <Svg width="100%" height={SVG_H}>
            <Defs>
              {/* Darker purple band (bottom) */}
              <LinearGradient id="lowerBand" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#8B7FD4" stopOpacity="0.55" />
                <Stop offset="1" stopColor="#8B7FD4" stopOpacity="0.30" />
              </LinearGradient>
              {/* Lighter purple band (upper) */}
              <LinearGradient id="upperBand" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#C4BCEE" stopOpacity="0.40" />
                <Stop offset="1" stopColor="#C4BCEE" stopOpacity="0.10" />
              </LinearGradient>
            </Defs>

            {/* Lower darker band */}
            <Path d={lowerArea} fill="url(#lowerBand)" />
            {/* Upper lighter band */}
            <Path d={upperArea} fill="url(#upperBand)" />

            {/* Top line (upper edge of upper band) */}
            <Path
              d={line1}
              stroke="#9B8FE0"
              strokeWidth={0}
              fill="none"
            />

            {/* Dashed vertical at dot */}
            <Path
              d={`M ${DOT_X},${DOT_Y} L ${DOT_X},${SVG_H}`}
              stroke="#1A1A2E"
              strokeWidth={1.5}
              strokeDasharray="4,4"
              opacity={0.25}
            />

            {/* Green dot */}
            <Circle cx={DOT_X} cy={DOT_Y} r={6} fill="#5E9E8A" stroke="white" strokeWidth={2.5} />
          </Svg>

          {/* X-axis */}
          <View style={styles.xAxis}>
            {xLabels.map((l) => (
              <Text
                key={l}
                style={[styles.xLabel, l === 'Mar' && styles.xLabelBold]}
              >
                {l}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: CARD_PAD,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    position: 'relative',
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  scoreLabel: {
    fontSize: 16,
    fontFamily: FONTS.semibold,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  scoreValue: {
    fontSize: 42,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  badgeWrap: {
    position: 'absolute',
    // DOT_X = CHART_W * 0.60, badge ~90px wide, center it over the dot
    left: CHART_W * 0.60 - 45,
    top: -8,
    alignItems: 'center',
    zIndex: 10,
  },
  badge: {
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    lineHeight: 18,
  },
  badgeArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#1A1A2E',
  },
  chartOuter: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  yAxis: {
    width: PAD_LEFT,
    height: SVG_H,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 6,
    paddingTop: 4,
    paddingBottom: 4,
  },
  yLabel: {
    fontSize: 11,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingRight: 4,
  },
  xLabel: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    flex: 1,
  },
  xLabelBold: {
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
  },
});

export default StabilitySummary;
