import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, Pressable, Switch} from 'react-native';
import {globalStyles, useTheme} from '../../../config/theme/globalStyles.ts';
import {PrimaryButton} from '../../../public/components/PrimaryButton.tsx';
import {IonIcon} from '../../components/utils/IonIcon.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackProfileSettingsParamList} from '../../routes/StackProfileSettingsNavigator.tsx';
import {useAuth} from '../../../context/AuthContext.tsx';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {ThemeContext} from '../../../config/theme/ThemeContext.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfileSettingsScreen = () => {
  const {toggleTheme} = useContext(ThemeContext);
  const colors = useTheme();
  const navigator =
    useNavigation<NavigationProp<RootStackProfileSettingsParamList>>();
  const {user} = useAuth();

  const handleChangeProfilePicture = async () => {
    if (!user) {
      return;
    }

    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    };

    await launchImageLibrary(options, async response => {
      if (response.errorCode) {
        console.log('Image picker error:', response.errorCode);
        return;
      }

      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (
        !response?.assets?.[0]?.uri ||
        !response?.assets?.[0]?.base64 ||
        !response?.assets?.[0]?.type ||
        !response?.assets?.[0]?.fileName ||
        !response?.assets?.[0]?.fileSize
      ) {
        return;
      }

      navigator.navigate('ImageProfile', {
        image: {
          uri: response.assets[0].uri,
          base64: response.assets[0].base64,
          type: response.assets[0].type,
          fileName: response.assets[0].fileName,
          fileSize: response.assets[0].fileSize,
        },
      });
    });
  };

  const handleChangeData = () => {
    navigator.navigate('Data');
  };

  const handleChangePassword = () => {
    navigator.navigate('Password');
  };

  const handleToggleSwitch = async () => {
    await AsyncStorage.setItem('isDarkMode', (!colors.isDarkMode).toString());
    toggleTheme();
  };

  return (
    <View
      style={[globalStyles.container, {backgroundColor: colors.background}]}>
      <View>
        <Pressable
          style={[styles.profileButton]}
          onPress={handleChangeProfilePicture}>
          {user?.imageUrl ? (
            <Image source={{uri: user.imageUrl}} style={styles.profileImage} />
          ) : (
            <Image
              source={require('../../../assets/img/default-photo.jpg')}
              style={styles.profileImage}
            />
          )}
          <View
            style={[
              styles.editIconContainer,
              {backgroundColor: colors.primary},
            ]}>
            <IonIcon name={'create'} size={30} color={colors.white} />
          </View>
        </Pressable>

        <Text
          style={[
            globalStyles.titleText,
            {textAlign: 'center', color: colors.whiteOrBlack},
          ]}>
          {user && user.name} {user && user.lastname}
        </Text>
        <Text
          style={[
            globalStyles.bodyText,
            {marginBottom: 10, color: colors.whiteOrBlack},
          ]}>
          Aquí puedes cambiar tu foto de perfil, tus datos y tu contraseña.
        </Text>
        <PrimaryButton label={'Configurar datos'} onPress={handleChangeData} />
        <PrimaryButton
          label={'Cambiar contraseña'}
          onPress={handleChangePassword}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <IonIcon name={'moon'} size={20} color={colors.darkGray} />
            <Text style={{color: colors.whiteOrBlack}}>Modo oscuro</Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={colors.isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleToggleSwitch}
            value={colors.isDarkMode}
          />
        </View>
      </View>
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

  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    borderRadius: 20,
  },
});
