import {PrimaryButton} from '../PrimaryButton.tsx';
import React from 'react';
import {CustomInput} from '../CustomInput.tsx';
import {SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/AuthAppStackNavigator.tsx';
import {EMAIL_REGEX, PASSWORD_REGEX} from '../../../constants/regex.const.ts';
import {useTheme} from '../../../config/theme/globalStyles.ts';

interface Props {
  onSubmit: SubmitHandler<SignUpInputs>;
}

export interface SignUpInputs {
  name: string;
  lastname: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export const SignUpForm = ({onSubmit}: Props) => {
  const colors = useTheme();
  const {control, handleSubmit, watch} = useForm<SignUpInputs>({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
      name: '',
    },
  });

  const password = watch('password');

  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.form}>
      <View>
        <CustomInput
          name={'name'}
          label={'Nombre'}
          placeholder={'Nombre'}
          control={control}
          iconName={'person'}
          rules={{
            required: 'Este campo es requerido',
          }}
        />
        <CustomInput
          name={'lastname'}
          label={'Apellido'}
          placeholder={'Apellido'}
          control={control}
          iconName={'person'}
          rules={{
            required: 'Este campo es requerido',
          }}
        />
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
        <CustomInput
          name={'repeatPassword'}
          label={'Confirmar contraseña'}
          placeholder={'Confirmar contraseña'}
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
            validate: (value: string) =>
              value === password || 'Las contraseñas no coinciden',
          }}
        />
      </View>
      <PrimaryButton label="Crear cuenta" onPress={handleSubmit(onSubmit)} />
      <View style={styles.dontHaveAccountContainer}>
        <Text style={{color: colors.primary}}>¿Ya tienes cuenta?</Text>
        <Text
          style={{color: colors.secondary}}
          onPress={() => navigator.navigate('LogIn')}>
          Iniciar sesión
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginVertical: 10,
  },

  dontHaveAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    marginVertical: 15,
  },
});
