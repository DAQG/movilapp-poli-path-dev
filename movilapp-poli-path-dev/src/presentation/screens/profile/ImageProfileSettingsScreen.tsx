import {Image, StyleSheet, Text, View} from 'react-native';
import {globalStyles, useTheme} from '../../../config/theme/globalStyles.ts';
import React, {useState} from 'react';
import {PrimaryButton} from '../../../public/components/PrimaryButton.tsx';
import {useAuth} from '../../../context/AuthContext.tsx';
import {RootStackProfileSettingsParamList} from '../../routes/StackProfileSettingsNavigator.tsx';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {updateImageProfile} from '../../api/user.service.ts';
import axios from 'axios';
import {CustomActivityIndicator} from '../../components/utils/CustomActivityIndicator.tsx';
import {ErrorMessage} from '../../components/utils/ErrorMessage.tsx';

export const ImageProfileSettingsScreen = () => {
  const globalColors = useTheme();
  const {image} =
    useRoute<RouteProp<RootStackProfileSettingsParamList, 'ImageProfile'>>()
      .params;
  const navigator =
    useNavigation<NavigationProp<RootStackProfileSettingsParamList>>();

  const {user, setUserData} = useAuth();
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState('');

  const handleUploadImage = async () => {
    if (!image || !user) {
      return;
    }
    setIsUploadingImage(true);

    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });

    try {
      await updateImageProfile(formData);
      setUserData({...user, imageUrl: image.uri});
      setIsUploadingImage(false);
      navigator.goBack();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(
          'Error al actualizar la imagen de perfil',
          e.stack,
          e.message,
        );
      }
      setError('Error al actualizar la imagen de perfil');
      console.log('Otro error', e);
    } finally {
      setIsUploadingImage(false);
    }
  };

  return (
    <View
      style={[
        globalStyles.container,
        {backgroundColor: globalColors.background},
      ]}>
      <Image
        source={{uri: image.uri}}
        style={[styles.profileButton, {borderColor: globalColors.lightGray}]}
      />
      {isUploadingImage && (
        <View>
          <View style={globalStyles.containerCenter}>
            <CustomActivityIndicator isLoading={isUploadingImage} />
          </View>
          <Text style={[globalStyles.bodyText, globalStyles.textCenter]}>
            Subiendo imagen...
          </Text>
        </View>
      )}
      {error && !isUploadingImage && <ErrorMessage error={error} />}
      <PrimaryButton label={'Guardar imagen'} onPress={handleUploadImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  profileButton: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 20,
    borderWidth: 0.5,
    backgroundColor: '#3498db',
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
