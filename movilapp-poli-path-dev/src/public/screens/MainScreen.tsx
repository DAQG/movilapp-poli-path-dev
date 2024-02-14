import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {globalStyles, useTheme} from '../../config/theme/globalStyles.ts';
import {PrimaryButton} from '../components/PrimaryButton.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../routes/AuthAppStackNavigator.tsx';
import {IonIcon} from '../../presentation/components/utils/IonIcon.tsx';

export const MainScreen = () => {
  const colors = useTheme();
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const handleGuest = () => {
    navigator.navigate('GuestBottomTabNavigator');
  };

  return (
    <ScrollView
      style={[globalStyles.container, {backgroundColor: colors.background}]}>
      <Image
        resizeMode={'contain'}
        source={require('../../assets/img/logo.png')}
        style={styles.logo}
      />
      <View>
        <PrimaryButton
          label="Iniciar Sesión"
          onPress={() => {
            navigator.navigate('LogIn');
          }}
        />
        <PrimaryButton
          label="Registrarse"
          onPress={() => {
            navigator.navigate('SignUp');
          }}
        />
        <Pressable
          style={({pressed}) => ({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            marginTop: 20,
            opacity: pressed ? 0.8 : 1,
            backgroundColor: colors.background,
            borderColor: '#000000',
          })}
          onPress={handleGuest}>
          <IonIcon name="person" color={colors.mediumGray} size={20} />
          <Text
            style={{
              textAlign: 'center',
              color: colors.darkGray,
              fontSize: 16,
            }}>
            Ingresa como invitado
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
    height: 400,
  },
});
