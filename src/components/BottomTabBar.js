import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS } from '../constants/theme';

const BottomTabBar = () => {
  const tabs = [
    { name: 'Home', icon: 'home-outline' },
    { name: 'Cycle', icon: 'time-outline' },
    { name: 'Insights', icon: 'stats-chart', active: true },
    { name: 'Add', icon: 'add-circle-outline', special: true },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab}>
        <Ionicons name="home" size={24} color={COLORS.tabInactive} />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.tab}>
        <Ionicons name="time-outline" size={24} color={COLORS.tabInactive} />
        <Text style={styles.label}>Track</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab}>
        <Ionicons name="stats-chart" size={24} color={COLORS.textPrimary} />
        <Text style={[styles.label, styles.activeLabel]}>Insights</Text>
      </TouchableOpacity>

      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={32} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: RADIUS.xl,
    marginHorizontal: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    fontSize: 10,
    fontFamily: FONTS.medium,
    color: COLORS.tabInactive,
    marginTop: 4,
  },
  activeLabel: {
    color: COLORS.textPrimary,
  },
  fabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomTabBar;
