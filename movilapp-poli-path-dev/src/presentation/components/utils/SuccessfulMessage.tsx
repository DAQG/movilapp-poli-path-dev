import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IonIcon} from './IonIcon.tsx';
import {ERROR_MESSAGES} from '../../../constants/messages.const.ts';

interface Props {
  message: string;
}

export const SuccessfulMessage = ({
  message = ERROR_MESSAGES.DEFAULT,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <IonIcon name="checkmark-circle" size={25} color={'white'} />
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4caf50',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 20,
  },
  messageContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    gap: 10,
  },
  text: {
    color: 'white',
  },
});
