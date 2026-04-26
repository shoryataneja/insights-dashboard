import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle, Line } from 'react-native-svg';
import Card from './Card';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Y_AXIS_W = 36;
const CARD_PAD = 16;
const APP_PAD = 32;
const CHART_W = SCREEN_WIDTH - APP_PAD - CARD_PAD * 2 - Y_AXIS_W;
const CHART_H = 160;
const PAD_TOP = 10;
const PAD_RIGHT = 8;

const rawPoints = [
  { x: 0,    y: 0.85 },
  { x: 0.25, y: 0.55 },
  { x: 0.5,  y: 0.75 },
  { x: 0.7,  y: 0.05 },
  { x: 0.85, y: 0.35 },
  { x: 1,    y: 0.50 },
];

const pts = rawPoints.map(p => ({
  x: p.x * (CHART_W - PAD_RIGHT),
  y: PAD_TOP + p.y * (CHART_H - PAD_TOP),
}));

function cubicPath(points) {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i], p1 = points[i + 1];
    const cpx = (p0.x + p1.x) / 2;
    d += ` C ${cpx} ${p0.y}, ${cpx} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

const linePath = cubicPath(pts);
const areaPath = `${linePath} L ${pts[pts.length-1].x} ${CHART_H} L ${pts[0].x} ${CHART_H} Z`;

const yLabels = ['75', '50', '25'];
const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

const BodyMetabolicTrends = () => {
  const [mode, setMode] = useState('Monthly');

  return (
    <View>
      <Text style={styles.sectionHeading}>Body &amp; Metabolic Trends</Text>
      <Card>
      <View style={styles.header}>
        <View>
          <Text style={styles.weightLabel}>Your weight</Text>
          <Text style={styles.unit}>in kg</Text>
        </View>
        <View style={styles.toggleContainer}>
          {['Monthly', 'Weekly'].map(m => (
            <TouchableOpacity
              key={m}
              style={[styles.toggleBtn, mode === m && styles.toggleActive]}
              onPress={() => setMode(m)}
            >
              <Text style={[styles.toggleText, mode === m && styles.toggleTextActive]}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.chartOuter}>
        <View style={styles.yAxis}>
          {yLabels.map(l => (
            <Text key={l} style={styles.yLabel}>{l}</Text>
          ))}
        </View>

        <View style={{ flex: 1 }}>
          <Svg width="100%" height={CHART_H}>
            <Defs>
              <LinearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0"   stopColor="#E57373" stopOpacity="0.38" />
                <Stop offset="0.7" stopColor="#E57373" stopOpacity="0.08" />
                <Stop offset="1"   stopColor="#FFFFFF" stopOpacity="0"    />
              </LinearGradient>
            </Defs>

            {[0.18, 0.5, 0.82].map((frac, i) => (
              <Line
                key={i}
                x1={0} y1={PAD_TOP + frac * (CHART_H - PAD_TOP)}
                x2={CHART_W} y2={PAD_TOP + frac * (CHART_H - PAD_TOP)}
                stroke="#EBEBEB" strokeWidth={1} strokeDasharray="4,4"
              />
            ))}

            <Path d={areaPath} fill="url(#wGrad)" />
            <Path d={linePath} stroke="#E57373" strokeWidth={2.5} fill="none" />

            {pts.slice(1, pts.length - 1).map((p, i) => (
              <Circle key={i} cx={p.x} cy={p.y} r={4} fill="white" stroke="#E57373" strokeWidth={2} />
            ))}
          </Svg>

          <View style={styles.xAxis}>
            {xLabels.map(l => (
              <Text key={l} style={styles.xLabel}>{l}</Text>
            ))}
          </View>
        </View>
      </View>
      </Card>
    </View>
  );
};

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
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  weightLabel: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
  },
  unit: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 3,
  },
  toggleBtn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 10,
  },
  toggleActive: { backgroundColor: COLORS.textPrimary },
  toggleText: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
  },
  toggleTextActive: { color: '#FFFFFF' },
  chartOuter: {
    flexDirection: 'row',
    marginTop: SPACING.sm,
  },
  yAxis: {
    width: Y_AXIS_W,
    height: CHART_H,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 6,
    paddingTop: PAD_TOP,
    paddingBottom: 4,
  },
  yLabel: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: PAD_RIGHT,
    marginTop: 6,
  },
  xLabel: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default BodyMetabolicTrends;
