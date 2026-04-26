import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS, RADIUS, SPACING, FONTS } from '../constants/theme';

const Card = ({ title, subtitle, children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
});

export default Card;
