import {Text, View} from 'react-native';
import {globalStyles, useTheme} from '../../../config/theme/globalStyles.ts';
import React from 'react';
import {CustomInput} from '../../../public/components/CustomInput.tsx';
import {useForm} from 'react-hook-form';
import {PrimaryButton} from '../../../public/components/PrimaryButton.tsx';
import {useAuth} from '../../../context/AuthContext.tsx';
import {useUpdateData} from '../../hooks/use-update-data.ts';
import {ErrorMessage} from '../../components/utils/ErrorMessage.tsx';
import {CustomActivityIndicator} from '../../components/utils/CustomActivityIndicator.tsx';
import {RootStackProfileSettingsParamList} from '../../routes/StackProfileSettingsNavigator.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface DataSettingsInputs {
  name: string;
  lastname: string;
}

export const DataSettingsScreen = () => {
  const globalColors = useTheme();
  const {user, setUserData} = useAuth();
  const [updateData, {isLoading, error}] = useUpdateData();
  const navigator =
    useNavigation<NavigationProp<RootStackProfileSettingsParamList>>();

  const {control, handleSubmit} = useForm<DataSettingsInputs>({
    defaultValues: {
      name: user?.name || '',
      lastname: user?.lastname || '',
    },
  });

  const handleOnSubmit = handleSubmit(async data => {
    if (!user) {
      return;
    }

    try {
      await updateData({lastname: data.lastname, name: data.name, id: user.id});
      setUserData({...user, ...data});
      navigator.goBack();
    } catch (err) {
      console.log(err);
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
        Puedes cambiar tus datos
      </Text>
      {error && <ErrorMessage error={error} />}
      {isLoading && <CustomActivityIndicator isLoading={isLoading} />}
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
      <PrimaryButton label={'Guardar cambios'} onPress={handleOnSubmit} />
    </View>
  );
};
