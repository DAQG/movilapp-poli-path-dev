import {Pressable} from 'react-native';
import React from 'react';
import {globalStyles, useTheme} from '../../config/theme/globalStyles.ts';
import {IonIcon} from '../../presentation/components/utils/IonIcon.tsx';

interface Props {
  onPress: () => void;
}

export const BackButton = ({onPress}: Props) => {
  const colors = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[globalStyles.backButton, {backgroundColor: colors.mediumGray}]}>
      <IonIcon name="arrow-back" size={20} color="white" />
    </Pressable>
  );
};
