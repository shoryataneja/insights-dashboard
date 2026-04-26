import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Dimensions, Animated,
} from 'react-native';
import Svg, { Rect, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import Card from './Card';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Full 14-month dataset (Jul prev year → Aug current year)
const ALL_DATA = [
  { month: 'Jul', value: 27 },
  { month: 'Aug', value: 29 },
  { month: 'Sep', value: 31 },
  { month: 'Oct', value: 26 },
  { month: 'Nov', value: 30 },
  { month: 'Dec', value: 28 },
  { month: 'Jan', value: 28 },
  { month: 'Feb', value: 30 },
  { month: 'Mar', value: 28 },
  { month: 'Apr', value: 32 },
  { month: 'May', value: 28 },
  { month: 'Jun', value: 26 },
  { month: 'Jul', value: 29 },
  { month: 'Aug', value: 31 },
];

const WINDOW = 6;   // visible bars at once
const STEP   = 2;   // bars to shift per arrow press

const BAR_W    = 16;
const SVG_H    = 150;
const MAX_VAL  = 36;
const CHART_TOP = 24;
const CHART_H  = SVG_H - CHART_TOP - 4;
const NAV_BTN  = 32;
const CHART_INNER_W = SCREEN_WIDTH - 32 - 32 - (NAV_BTN + 8) * 2;
const SPACING_PER = CHART_INNER_W / WINDOW;

function barH(val) {
  return (val / MAX_VAL) * CHART_H;
}
function bx(i) {
  return SPACING_PER * i + SPACING_PER / 2 - BAR_W / 2;
}

const CycleTrends = () => {
  const [offset, setOffset] = useState(ALL_DATA.length - WINDOW); // start at latest
  const slideAnim = useRef(new Animated.Value(0)).current;

  const canGoBack    = offset > 0;
  const canGoForward = offset + WINDOW < ALL_DATA.length;

  const slide = (direction) => {
    const toValue = direction === 'back' ? -CHART_INNER_W : CHART_INNER_W;

    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();

    setOffset(prev =>
      direction === 'back'
        ? Math.max(0, prev - STEP)
        : Math.min(ALL_DATA.length - WINDOW, prev + STEP)
    );
  };

  const visible = ALL_DATA.slice(offset, offset + WINDOW);

  return (
    <View>
      <Text style={styles.sectionHeading}>Cycle Trends</Text>
      <Card>
        <View style={styles.row}>
          {/* Back arrow */}
          <TouchableOpacity
            style={[styles.navBtn, !canGoBack && styles.navBtnDisabled]}
            onPress={() => canGoBack && slide('back')}
            activeOpacity={canGoBack ? 0.7 : 1}
          >
            <Ionicons
              name="chevron-back"
              size={15}
              color={canGoBack ? COLORS.purple : '#D0D0D0'}
            />
          </TouchableOpacity>

          {/* Chart */}
          <View style={styles.chartWrap}>
            <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
              <Svg width={CHART_INNER_W} height={SVG_H}>
                <Defs>
                  <LinearGradient id="ctPurple" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#C4B8F0" stopOpacity="1" />
                    <Stop offset="1" stopColor="#B0A0E8" stopOpacity="1" />
                  </LinearGradient>
                  <LinearGradient id="ctGreen" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#90C8A0" stopOpacity="1" />
                    <Stop offset="1" stopColor="#78B888" stopOpacity="1" />
                  </LinearGradient>
                  <LinearGradient id="ctPink" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#F0C0CC" stopOpacity="1" />
                    <Stop offset="1" stopColor="#E8A8B8" stopOpacity="1" />
                  </LinearGradient>
                </Defs>

                {visible.map((item, i) => {
                  const h    = barH(item.value);
                  const x    = bx(i);
                  const topH = Math.round(h * 0.30);
                  const midH = Math.round(h * 0.42);
                  const botH = h - topH - midH;
                  const topY = CHART_TOP + (CHART_H - h);
                  const midY = topY + topH;
                  const botY = midY + midH;

                  return (
                    <G key={`${item.month}-${offset}-${i}`}>
                      <Rect x={x} y={topY} width={BAR_W} height={topH + BAR_W / 2} rx={BAR_W / 2} fill="url(#ctPurple)" />
                      <Rect x={x} y={midY} width={BAR_W} height={midH} rx={2} fill="url(#ctGreen)" />
                      <Rect x={x} y={botY - BAR_W / 2} width={BAR_W} height={botH + BAR_W / 2} rx={BAR_W / 2} fill="url(#ctPink)" />
                    </G>
                  );
                })}
              </Svg>

              {/* Value labels */}
              {visible.map((item, i) => {
                const h    = barH(item.value);
                const x    = bx(i);
                const topY = CHART_TOP + (CHART_H - h);
                return (
                  <Text
                    key={`val-${i}`}
                    style={[styles.barVal, { left: x + BAR_W / 2 - 12, top: topY - 20 }]}
                  >
                    {item.value}
                  </Text>
                );
              })}
            </Animated.View>

            {/* X-axis labels — outside animation so they don't slide */}
            <View style={styles.xAxis}>
              {visible.map((item, i) => (
                <Text key={i} style={styles.xLabel}>{item.month}</Text>
              ))}
            </View>
          </View>

          {/* Forward arrow */}
          <TouchableOpacity
            style={[styles.navBtn, !canGoForward && styles.navBtnDisabled]}
            onPress={() => canGoForward && slide('forward')}
            activeOpacity={canGoForward ? 0.7 : 1}
          >
            <Ionicons
              name="chevron-forward"
              size={15}
              color={canGoForward ? COLORS.purple : '#D0D0D0'}
            />
          </TouchableOpacity>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navBtn: {
    width: NAV_BTN,
    height: NAV_BTN,
    borderRadius: NAV_BTN / 2,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  navBtnDisabled: {
    borderColor: '#EFEFEF',
    backgroundColor: '#F8F8F8',
  },
  chartWrap: {
    flex: 1,
    position: 'relative',
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  barVal: {
    position: 'absolute',
    width: 24,
    textAlign: 'center',
    fontSize: 11,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 4,
  },
  xLabel: {
    fontSize: 11,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default CycleTrends;
