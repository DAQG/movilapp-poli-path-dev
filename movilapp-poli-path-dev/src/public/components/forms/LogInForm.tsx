import {PrimaryButton} from '../PrimaryButton.tsx';
import React from 'react';
import {CustomInput} from '../CustomInput.tsx';
import {SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {EMAIL_REGEX, PASSWORD_REGEX} from '../../../constants/regex.const.ts';
import {RootStackParamList} from '../../routes/AuthAppStackNavigator.tsx';
import {useTheme} from '../../../config/theme/globalStyles.ts';

interface Props {
  onSubmit: SubmitHandler<LogInInputs>;
}

export interface LogInInputs {
  email: string;
  password: string;
}

export const LogInForm = ({onSubmit}: Props) => {
  const colors = useTheme();
  const {control, handleSubmit} = useForm<LogInInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.form}>
      <View>
        <CustomInput
          name={'email'}
          label={'Email'}
          placeholder={'Email'}
          control={control}
          iconName={'mail'}
          rules={{
            required: 'Este campo es requerido',
            pattern: {
              value: EMAIL_REGEX,
              message: 'El email debe ser de la Escuela Politécnica Nacional',
            },
          }}
        />
        <CustomInput
          name={'password'}
          label={'Contraseña'}
          placeholder={'Contraseña'}
          control={control}
          iconName={'eye-off'}
          secureTextEntry={true}
          rules={{
            required: 'Este campo es requerido',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
            pattern: {
              value: PASSWORD_REGEX,
              message:
                'La contraseña debe tener al menos una mayúscula, una minúscula y un número',
            },
          }}
        />
      </View>
      <Text
        style={[styles.forgotPasswordText, {color: colors.secondary}]}
        onPress={() => navigator.navigate('RecoverPassword')}>
        ¿Olvidaste tu contraseña?
      </Text>

      <PrimaryButton label="Ingresar" onPress={handleSubmit(onSubmit)} />
      <View style={styles.dontHaveAccountContainer}>
        <Text style={{color: colors.primary}}>¿No tienes cuenta?</Text>
        <Text
          style={{color: colors.secondary}}
          onPress={() => navigator.navigate('SignUp')}>
          Regístrate
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginVertical: 10,
  },
  forgotPasswordText: {
    textAlign: 'right',
    marginBottom: 30,
  },
  dontHaveAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    marginVertical: 15,
  },
});
