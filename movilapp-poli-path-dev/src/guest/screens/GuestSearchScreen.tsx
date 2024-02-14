import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GuestMap} from '../components/GuestMap.tsx';
import {globalStyles, useTheme} from '../../config/theme/globalStyles.ts';

export const GuestSearchScreen = () => {
  const globalColors = useTheme();
  return (
    <View
      style={[
        globalStyles.container,
        {
          marginBottom: 0,
          paddingBottom: 0,
        },
        {backgroundColor: globalColors.background},
      ]}>
      <Text style={[styles.title, {color: globalColors.primaryText}]}>
        Encuentra como llegar a tu destino
      </Text>
      <Text style={styles.text}>
        Puedes seleccionar un edificio en el mapa con nuestro logo {'  '}
        <Image
          resizeMode={'contain'}
          source={require('../../assets/img/icon-logo.png')}
          style={{width: 20, height: 20}}
        />
      </Text>
      <GuestMap />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    marginBottom: 20,
  },

  text: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
});
