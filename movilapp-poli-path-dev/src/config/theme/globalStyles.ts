import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {ThemeContext} from './ThemeContext.tsx';

export const useTheme = () => {
  const {theme} = useContext(ThemeContext);

  const lightColors = {
    primary: '#121B5B',
    primaryText: '#121B5B',
    primarySignOut: '#5e6ccc',
    secondary: '#E75168',
    background: '#fff',
    muted: '#9EA0A5',
    lightGray: '#a6a6a6',
    success: '#4caf50',
    darkGray: '#303030',
    textLabelType: '#3b3b3b',
    mediumGray: '#939393',
    lightGray2: '#eaeaea',
    searchBackground: '#eaeaea',
    resultsBackground: '#eaeaea',
    yellow: '#f5c400',
    hamburgerMenu: '#121B5B',
    white: '#fff',
    tabBottomBar: '#fff',
    tabBarActiveTintColor: '#121B5B',
    textDescription: '#000000',
    iconPrimary: '#121B5B',
    whiteOrBlack: '#000000',
    whiteOrBlackPlaceholder: '#424242',
    isDarkMode: false,
    titleCard: '#545454',
    textCard: '#343434',
    borderCard: '#dedede',
  };

  const darkColors = {
    primary: '#464646',
    primaryText: '#fff',

    primarySignOut: '#9EA0A5',
    secondary: '#E75168',
    background: '#131313',
    muted: '#9EA0A5',
    lightGray: '#303030',
    success: '#4caf50',
    darkGray: '#d3d3d3',
    textLabelType: '#131313',
    mediumGray: '#939393',
    lightGray2: '#eaeaea',
    searchBackground: '#464646',
    resultsBackground: '#464646',
    yellow: '#f5c400',
    hamburgerMenu: '#fff',
    white: '#fff',
    tabBottomBar: '#131313',
    tabBarActiveTintColor: '#fff',
    textDescription: '#fff',
    iconPrimary: '#fff',
    whiteOrBlack: '#fff',
    whiteOrBlackPlaceholder: '#fff',
    isDarkMode: true,
    titleCard: '#fff',
    textCard: '#fff',
    borderCard: '#777777',
  };

  return theme === 'light' ? lightColors : darkColors;
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  containerPrimaryBackground: {
    flex: 1,
    padding: 20,
  },

  containerForm: {
    padding: 20,
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
  },

  primaryButton: {
    borderRadius: 20,
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
    width: '100%',
    height: 50,
  },

  backButton: {
    height: 30,
    width: 30,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  secondaryButton: {
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },

  mutedText: {
    fontSize: 18,
  },

  primaryText: {
    fontSize: 18,
  },

  witheText: {
    fontSize: 18,
  },

  successText: {
    fontSize: 18,
  },

  titleText: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 10,
  },

  titleTextMedium: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 5,
  },

  smallLogo: {
    height: 70,
    width: 45,
    marginBottom: 70,
  },

  bodyText: {
    fontSize: 16,
  },

  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  containerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  textCenter: {
    textAlign: 'center',
  },

  titleSecondary: {
    fontSize: 18,
    fontWeight: '900',
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
});
