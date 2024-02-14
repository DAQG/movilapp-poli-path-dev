import {Pressable, Text} from 'react-native';
import React from 'react';
import {globalStyles, useTheme} from '../../config/theme/globalStyles.ts';

interface Props {
  label: string;
  onPress: () => void;
}

export const PrimaryButton = ({label, onPress}: Props) => {
  const colors = useTheme();
  return (
    <Pressable
      onPress={() => onPress()}
      style={({pressed}) => ({
        ...globalStyles.primaryButton,
        backgroundColor: colors.primary,
        opacity: pressed ? 0.8 : 1,
      })}>
      <Text style={[globalStyles.witheText, {color: 'white'}]}>{label}</Text>
    </Pressable>
  );
};
