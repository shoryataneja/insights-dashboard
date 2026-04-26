import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header';
import StabilitySummary from '../components/StabilitySummary';
import CycleTrends from '../components/CycleTrends';
import BodyMetabolicTrends from '../components/BodyMetabolicTrends';
import BodySignals from '../components/BodySignals';
import LifestyleImpact from '../components/LifestyleImpact';
import BottomTabBar from '../components/BottomTabBar';

const HomeScreen = () => (
  <View style={styles.container}>
    <StatusBar style="dark" />
    <Header />
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <StabilitySummary />
      <CycleTrends />
      <BodyMetabolicTrends />
      <BodySignals />
      <LifestyleImpact />
      <View style={{ height: 120 }} />
    </ScrollView>
    <BottomTabBar />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 20, gap: 16 },
});

export default HomeScreen;
