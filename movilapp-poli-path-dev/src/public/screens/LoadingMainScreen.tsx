import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {globalStyles, useTheme} from '../../config/theme/globalStyles.ts';
import {CustomActivityIndicator} from '../../presentation/components/utils/CustomActivityIndicator.tsx';

export const LoadingMainScreen = () => {
  const colors = useTheme();
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.8,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View
      style={[globalStyles.container, {backgroundColor: colors.background}]}>
      <Animated.Image
        source={require('../../assets/img/logo.png')}
        style={[
          styles.logo,
          {transform: [{scale: scaleValue}], opacity: opacityValue},
        ]}
      />
      <CustomActivityIndicator isLoading={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
  },
});
