import React, {createContext, useState, FC, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appearance} from 'react-native';

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({children}) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light');

  console.log('theme', theme);

  const toggleTheme = async () => {
    if (theme === 'light') {
      await AsyncStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      await AsyncStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
