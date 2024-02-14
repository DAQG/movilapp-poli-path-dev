import {Image, ScrollView, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import {BackButton} from '../components/BackButton.tsx';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {globalStyles, useTheme} from '../../config/theme/globalStyles.ts';
import {LogInForm, LogInInputs} from '../components/forms/LogInForm.tsx';
import {RootStackParamList} from '../routes/AuthAppStackNavigator.tsx';
import {useAuth} from '../../context/AuthContext.tsx';
import {CustomActivityIndicator} from '../../presentation/components/utils/CustomActivityIndicator.tsx';
import {ErrorMessage} from '../../presentation/components/utils/ErrorMessage.tsx';

export const LogInScreen = () => {
  const colors = useTheme();
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const {signIn, signInState} = useAuth();
  const {isLoading, error} = signInState;
  const [email, setEmail] = React.useState<string>('');

  useEffect(() => {
    return () => {
      signInState.resetError();
    };
  }, []);

  const handleLogIn = async (credentials: LogInInputs) => {
    try {
      await signIn(credentials);
      setEmail(credentials.email);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendVerification = () => {
    navigator.navigate('SentEmail', {email: email});
  };

  return (
    <ScrollView
      style={[globalStyles.container, {backgroundColor: colors.background}]}>
      <BackButton onPress={() => navigator.dispatch(StackActions.popToTop)} />
      <Image
        resizeMode={'contain'}
        style={globalStyles.smallLogo}
        source={require('../../assets/img/logo.png')}
      />
      <Text style={globalStyles.titleText}>Bienvenido</Text>
      {isLoading && <CustomActivityIndicator isLoading={isLoading} />}
      {error && <ErrorMessage error={error} />}
      {error && error.includes('Usuario no verificado') ? (
        <Text style={[globalStyles.bodyText, {margin: 15}]}>
          Si no has recibido el correo, haz click{' '}
          <Text
            onPress={handleSendVerification}
            style={[styles.link, {backgroundColor: colors.primary}]}>
            aquí
          </Text>
        </Text>
      ) : null}
      <LogInForm onSubmit={handleLogIn} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  link: {
    fontWeight: 'bold',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
});
