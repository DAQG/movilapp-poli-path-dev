import {Image, StyleSheet, Text, View} from 'react-native';
import {globalStyles, useTheme} from '../../config/theme/globalStyles.ts';
import {IonIcon} from '../../presentation/components/utils/IonIcon.tsx';
import {PrimaryButton} from '../components/PrimaryButton.tsx';
import {BackButton} from '../components/BackButton.tsx';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '../routes/AuthAppStackNavigator.tsx';
import React from 'react';

export const SentEmailScreen = () => {
  const colors = useTheme();
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const email = useRoute<RouteProp<RootStackParamList, 'SentEmail'>>().params;

  const handleResendEmail = async () => {
    try {
      if (email) {
        console.log(email);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={[globalStyles.container, {backgroundColor: colors.background}]}>
      <BackButton onPress={() => navigator.navigate('LogIn')} />
      <Image
        resizeMode={'contain'}
        style={[globalStyles.smallLogo, {marginBottom: 20}]}
        source={require('../../assets/img/icon-logo.png')}
      />
      <Text style={globalStyles.titleText}>Verifica tu email</Text>
      <View style={styles.containerFlexRow}>
        <IonIcon name={'mail'} size={25} color={colors.muted} />
        <Text style={globalStyles.bodyText}>
          Te hemos enviado un email con un link para verificar tu cuenta
        </Text>
      </View>
      <Text style={[globalStyles.bodyText, {margin: 10}]}>
        Si no recibiste el email, haz click en el botón para reenviarlo
      </Text>
      <PrimaryButton label={'Reenviar email'} onPress={handleResendEmail} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerFlexRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginVertical: 20,
  },
});
