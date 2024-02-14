import {StyleSheet, TextInput, View} from 'react-native';
import {IonIcon} from './IonIcon.tsx';
import React from 'react';

interface Props {
  value: string;
  name: string;
  placeholder: string;
  iconName?: string;
  onChange: (value: string) => void;
}

export const Input = ({iconName, onChange, placeholder, value}: Props) => {
  return (
    <View style={styles.containerInput}>
      <View style={styles.labelAndIconContainer}>
        {iconName && <IonIcon size={20} color="gray" name={iconName} />}
        <TextInput
          value={value}
          style={styles.textInput}
          onChangeText={onChange}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 12,
    display: 'flex',
    paddingHorizontal: 15,
    backgroundColor: globalColors.white,
    borderColor: globalColors.lightGray,
  },
  labelAndIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    gap: 5,
  },
  textInput: {
    backgroundColor: 'transparent',
    height: 50,
    flex: 3,
  },
});
