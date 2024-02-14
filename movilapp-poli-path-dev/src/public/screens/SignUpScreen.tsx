import {Image, ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {BackButton} from '../components/BackButton.tsx';
import {globalStyles, useTheme} from '../../config/theme/globalStyles.ts';
import {SignUpForm, SignUpInputs} from '../components/forms/SignUpForm.tsx';
import {ErrorMessage} from '../../presentation/components/utils/ErrorMessage.tsx';
import {RootStackParamList} from '../routes/AuthAppStackNavigator.tsx';
import {useSignUp} from '../hooks/use-sign-up.ts';
import {CustomActivityIndicator} from '../../presentation/components/utils/CustomActivityIndicator.tsx';
import {PrimaryButton} from '../components/PrimaryButton.tsx';
import {IonIcon} from '../../presentation/components/utils/IonIcon.tsx';

export const SignUpScreen = () => {
  const colors = useTheme();
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  const [signUp, {isLoading, error}] = useSignUp();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSignUp = async (values: SignUpInputs) => {
    try {
      await signUp({
        name: values.name,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        registerDate: new Date(),
      });
      setIsEmailSent(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={[globalStyles.container, {backgroundColor: colors.background}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton onPress={() => navigator.dispatch(StackActions.popToTop)} />
        <Image
          resizeMode={'contain'}
          style={[globalStyles.smallLogo, {marginBottom: 20}]}
          source={require('../../assets/img/logo.png')}
        />
        {!isEmailSent ? (
          <>
            <Text style={globalStyles.titleText}>Regístrate</Text>
            {isLoading && <CustomActivityIndicator isLoading={isLoading} />}
            {error && <ErrorMessage error={error} />}
            <SignUpForm onSubmit={handleSignUp} />
          </>
        ) : (
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
              instrucciones para verificar tu cuenta
            </Text>
            <PrimaryButton
              label={'Ir a iniciar sesión'}
              onPress={() => navigator.navigate('LogIn')}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};
