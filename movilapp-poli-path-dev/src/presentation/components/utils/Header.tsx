// Header.tsx
import React from 'react';
import {View, Image, Text, Pressable, StyleSheet} from 'react-native';
import {globalStyles, useTheme} from '../../../config/theme/globalStyles.ts';
import {IonIcon} from './IonIcon.tsx';

interface HeaderProps {
  onPress: () => void;
}

export const Header: React.FC<HeaderProps> = ({onPress}) => {
  const globalColors = useTheme();
  return (
    <View
      style={[styles.container, {backgroundColor: globalColors.background}]}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode={'contain'}
          source={require('../../../assets/img/icon-logo.png')}
        />
        <Text
          style={[globalStyles.logoText, {color: globalColors.primaryText}]}>
          Poli Path
        </Text>
      </View>
      <Pressable onPress={onPress}>
        <IonIcon
          name="menu-outline"
          color={globalColors.hamburgerMenu}
          size={40}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
