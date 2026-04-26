import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import Card from './Card';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CARD_PAD = 16;
const APP_PAD = 32;
const SIZE = Math.min(SCREEN_WIDTH - APP_PAD - CARD_PAD * 2, 280);
const STROKE = 62;
const CENTER = SIZE / 2;
const R = (SIZE - STROKE) / 2;

// Segment order: Bloating (top-right) → Fatigue (bottom-right) → Acne (bottom-left) → Mood (left+top)
// Gradient vectors use userSpaceOnUse, pointing from segment START to END on the ring
// so color transitions follow the arc direction visibly
const data = [
  {
    percent: 31, label: 'Bloating', gradId: 'gBloating',
    // Arc goes top-center → right → bottom-right
    // Gradient: dark purple at top → light lavender at bottom-right
    from: '#8B83C8', to: '#D4D0F0',
    gx1: CENTER, gy1: 0,
    gx2: SIZE,   gy2: SIZE * 0.75,
  },
  {
    percent: 21, label: 'Fatigue', gradId: 'gFatigue',
    // Arc goes bottom-right area
    // Gradient: light lavender bleed → muted rose
    from: '#D0BCDC', to: '#C08080',
    gx1: SIZE,      gy1: SIZE * 0.55,
    gx2: CENTER,    gy2: SIZE,
  },
  {
    percent: 17, label: 'Acne', gradId: 'gAcne',
    // Arc goes bottom-center area
    // Gradient: muted rose bleed → sage green
    from: '#C8A0A8', to: '#7AA098',
    gx1: CENTER * 0.8, gy1: SIZE,
    gx2: 0,            gy2: SIZE * 0.75,
  },
  {
    percent: 31, label: 'Mood', gradId: 'gMood',
    // Large arc: bottom-left → left → top-left → top-center
    // Gradient: deeper mauve-rose at bottom → very light blush at top
    from: '#C89898', to: '#F5E2E2',
    gx1: 0,      gy1: SIZE * 0.8,
    gx2: CENTER, gy2: 0,
  },
];

function toRad(deg) {
  return ((deg - 90) * Math.PI) / 180;
}
function polarXY(deg) {
  const rad = toRad(deg);
  return { x: CENTER + R * Math.cos(rad), y: CENTER + R * Math.sin(rad) };
}
function arcPath(startDeg, endDeg) {
  const s = polarXY(startDeg);
  const e = polarXY(endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${R} ${R} 0 ${large} 1 ${e.x} ${e.y}`;
}

const BUBBLE_R = 40;
const BUBBLE_DIST = R + STROKE / 2 + BUBBLE_R + 8;

function bubblePos(midDeg) {
  const rad = toRad(midDeg);
  return {
    x: CENTER + BUBBLE_DIST * Math.cos(rad),
    y: CENTER + BUBBLE_DIST * Math.sin(rad),
  };
}

const BodySignals = () => {
  let cursor = 0;
  const segments = data.map((item) => {
    const deg = (item.percent / 100) * 360;
    const start = cursor;
    const end = cursor + deg;
    const mid = cursor + deg / 2;
    cursor += deg;
    return { ...item, start, end, mid };
  });

  const CANVAS = SIZE + BUBBLE_R * 2 + 20;
  const OFF = (CANVAS - SIZE) / 2;

  return (
    <View>
      {/* Section title outside card */}
      <Text style={styles.sectionHeading}>Body Signals</Text>

      <Card>
        <Text style={styles.sectionTitle}>Symptom Trends</Text>
        <Text style={styles.subtitle}>Compared to last cycle</Text>

        <View style={[styles.container, { width: CANVAS, height: CANVAS }]}>
          <Svg width={CANVAS} height={CANVAS} style={StyleSheet.absoluteFill}>
            <Defs>
              {segments.map((seg) => (
                <LinearGradient
                  key={seg.gradId}
                  id={seg.gradId}
                  x1={seg.gx1 + OFF}
                  y1={seg.gy1 + OFF}
                  x2={seg.gx2 + OFF}
                  y2={seg.gy2 + OFF}
                  gradientUnits="userSpaceOnUse"
                >
                  <Stop offset="0" stopColor={seg.from} stopOpacity="1" />
                  <Stop offset="1" stopColor={seg.to} stopOpacity="1" />
                </LinearGradient>
              ))}
            </Defs>

            <G x={OFF} y={OFF}>
              {segments.map((seg, i) => (
                <Path
                  key={i}
                  d={arcPath(seg.start, seg.end)}
                  stroke={`url(#${seg.gradId})`}
                  strokeWidth={STROKE}
                  strokeLinecap="butt"
                  fill="none"
                />
              ))}
            </G>
          </Svg>

          {segments.map((seg, i) => {
            const pos = bubblePos(seg.mid);
            return (
              <View
                key={i}
                style={[
                  styles.bubble,
                  {
                    left: OFF + pos.x - BUBBLE_R,
                    top: OFF + pos.y - BUBBLE_R,
                    width: BUBBLE_R * 2,
                    height: BUBBLE_R * 2,
                    borderRadius: BUBBLE_R,
                  },
                ]}
              >
                <Text style={styles.pct}>{seg.percent}%</Text>
                <Text style={styles.lbl}>{seg.label}</Text>
              </View>
            );
          })}
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeading: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  container: {
    alignSelf: 'center',
    position: 'relative',
  },
  bubble: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  pct: {
    fontSize: 15,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  lbl: {
    fontSize: 11,
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
    lineHeight: 14,
  },
});

export default BodySignals;
