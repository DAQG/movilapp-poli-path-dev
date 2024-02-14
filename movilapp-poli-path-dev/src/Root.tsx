import React, {useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {App} from './App.tsx';
import {AuthProvider} from './context/AuthContext.tsx';
import {BuildingListProvider} from './presentation/context/BuildingListContext.tsx';
import {ThemeProvider} from './config/theme/ThemeContext.tsx';
import {Appearance} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Root = () => {
  const [themeColor, setThemeColor] = useState('#ffffff');

  useEffect(() => {
    const getColorScheme = async () => {
      let color = '#ffffff';
      await AsyncStorage.getItem('isDarkMode')
        .then(value => {
          if (value === 'true') {
            color = '#464646';
          }
        })
        .catch(error => {
          console.log(error);
        });

      const appearanceColor = Appearance.getColorScheme() || 'light';
      if (appearanceColor === 'light') {
        color = '#ffffff';
      } else {
        color = '#464646';
      }

      setThemeColor(color);
    };

    getColorScheme().then(() => {
      console.log('Color scheme loaded');
    });
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: themeColor,
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <ThemeProvider>
        <AuthProvider>
          <BuildingListProvider>
            <App />
          </BuildingListProvider>
        </AuthProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};
