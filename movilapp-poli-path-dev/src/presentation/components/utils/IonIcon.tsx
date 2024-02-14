import Icon from 'react-native-vector-icons/Ionicons.js';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../../../config/theme/globalStyles.ts';

interface Props {
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
}

export const IonIcon = ({name, size = 25, color = 'white', onPress}: Props) => {
  return <Icon onPress={onPress} name={name} size={size} color={color} />;
};

export const CurrentLocationIcon = () => {
  const colors = useTheme();
  return (
    <View style={styles.shadowContainer}>
      <View
        style={[styles.currentLocation, {backgroundColor: colors.primary}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: 'rgba(83,78,252,0.3)',
  },
  currentLocation: {
    width: 15,
    height: 15,
    borderRadius: 10,
  },
});
