import {ScrollView, Text, View} from 'react-native';
import {globalStyles, useTheme} from '../../../config/theme/globalStyles.ts';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {CustomInput} from '../../../public/components/CustomInput.tsx';
import {PrimaryButton} from '../../../public/components/PrimaryButton.tsx';
import {useUpdatePass} from '../../hooks/use-pass.ts';
import {useAuth} from '../../../context/AuthContext.tsx';
import {ErrorMessage} from '../../components/utils/ErrorMessage.tsx';
import {CustomActivityIndicator} from '../../components/utils/CustomActivityIndicator.tsx';
import {IonIcon} from '../../components/utils/IonIcon.tsx';
import {PASSWORD_REGEX} from '../../../constants/regex.const.ts';

interface PasswordSettingsInputs {
  newPass: string;
  newPassword: string;
  confirmPassword: string;
}

export const PasswordSettingsScreen = () => {
  const globalColors = useTheme();
  const {control, handleSubmit, watch, reset} = useForm<PasswordSettingsInputs>(
    {
      defaultValues: {
        newPass: '',
        newPassword: '',
        confirmPassword: '',
      },
    },
  );
  const {user} = useAuth();
  const [updatePassword, {isLoading, error}] = useUpdatePass();
  const [isPassUpdated, setIsPassUpdated] = useState(false);

  const newPass = watch('newPassword');

  const handleOnSubmit = handleSubmit(async data => {
    if (!user) {
      return;
    }

    try {
      const res = await updatePassword({
        oldPassword: data.newPass,
        newPassword: data.newPassword,
        id: user.id,
      });
      if (res) {
        setIsPassUpdated(true);
        reset({
          newPass: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (err) {
      setIsPassUpdated(false);
      console.log('Error al actualizar contraseña', err);
    }
  });

  return (
    <View
      style={[
        globalStyles.container,
        {backgroundColor: globalColors.background},
      ]}>
      <Text
        style={[
          globalStyles.bodyText,
          {marginBottom: 30, color: globalColors.whiteOrBlack},
        ]}>
        Por tu seguridad, es recomendable que cambies tu contraseña cada cierto
        tiempo.
      </Text>
      {error && <ErrorMessage error={error} />}
      {isLoading && <CustomActivityIndicator isLoading={isLoading} />}
      {isPassUpdated && !error && (
        <View>
          <View style={globalStyles.containerCenter}>
            <IonIcon
              name={'checkmark-circle'}
              size={50}
              color={globalColors.success}
            />
          </View>
          <Text
            style={[
              globalStyles.bodyText,
              globalStyles.textCenter,
              {marginBottom: 20},
            ]}>
            Se ha actualizado tu contraseña
          </Text>
        </View>
      )}
      {error && <Text>{'\n'}</Text>}
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomInput
          name={'newPass'}
          label={'Contraseña actual'}
          placeholder={'Contraseña actual'}
          secureTextEntry={true}
          control={control}
          iconName={'eye-off'}
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
          name={'newPassword'}
          label={'Nueva contraseña'}
          placeholder={'Nueva contraseña'}
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
          name={'confirmPassword'}
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
              value === newPass || 'Las contraseñas no coinciden',
          }}
        />
        <PrimaryButton label={'Guardar cambios'} onPress={handleOnSubmit} />
      </ScrollView>
    </View>
  );
};
