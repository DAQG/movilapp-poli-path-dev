import {Image, Text, View} from 'react-native';
import React, {useState} from 'react';
import {BackButton} from '../components/BackButton.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {globalStyles, useTheme} from '../../config/theme/globalStyles.ts';
import {PrimaryButton} from '../components/PrimaryButton.tsx';
import {RootStackParamList} from '../routes/AuthAppStackNavigator.tsx';
import {useForm} from 'react-hook-form';
import {EMAIL_REGEX} from '../../constants/regex.const.ts';
import {CustomInput} from '../components/CustomInput.tsx';
import {useSendPasswordReset} from '../hooks/use-password-reset.ts';
import {ErrorMessage} from '../../presentation/components/utils/ErrorMessage.tsx';
import {CustomActivityIndicator} from '../../presentation/components/utils/CustomActivityIndicator.tsx';
import {IonIcon} from '../../presentation/components/utils/IonIcon.tsx';

export const RecoverPasswordScreen = () => {
  const colors = useTheme();
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const [sendPasswordReset, {error, isLoading}] = useSendPasswordReset();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {control, handleSubmit} = useForm<{email: string}>({
    defaultValues: {
      email: '',
    },
  });

  const handleRecoverPassword = async (email: string) => {
    try {
      await sendPasswordReset(email);
      setIsEmailSent(true);
    } catch (err) {
      console.log('Error al recuperar contraseña', err);
    }
  };

  return (
    <View
      style={[globalStyles.container, {backgroundColor: colors.background}]}>
      <BackButton onPress={() => navigator.navigate('LogIn')} />
      <Image
        resizeMode={'contain'}
        style={globalStyles.smallLogo}
        source={require('../../assets/img/logo.png')}
      />
      <Text style={[globalStyles.titleText, {marginBottom: 50}]}>
        ¿Olvidaste tu contraseña?
      </Text>
      {error && <ErrorMessage error={error} />}
      {isLoading && <CustomActivityIndicator isLoading={isLoading} />}

      {isEmailSent && (
        <View>
          <View style={globalStyles.containerCenter}>
            <IonIcon
              name={'checkmark-circle'}
              size={50}
              color={colors.success}
            />
          </View>
          <Text style={[globalStyles.bodyText, globalStyles.textCenter]}>
            Se ha enviado un correo electrónico a tu cuenta con las
            instrucciones para recuperar tu contraseña
          </Text>
        </View>
      )}
      {!isEmailSent && (
        <View>
          <CustomInput
            control={control}
            name={'email'}
            placeholder={'Email'}
            label={'Email'}
            iconName={'mail'}
            rules={{
              required: 'Este campo es requerido',
              pattern: {value: EMAIL_REGEX, message: 'Email inválido'},
            }}
          />
          <PrimaryButton
            label={'Recuperar contraseña'}
            onPress={handleSubmit(({email}) => {
              handleRecoverPassword(email).then();
            })}
          />
        </View>
      )}
    </View>
  );
};
