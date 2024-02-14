import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IonIcon} from './IonIcon.tsx';
import {useTheme} from '../../../config/theme/globalStyles.ts';

interface Props {
  error?: any;
}

export const ErrorMessage = ({error}: Props) => {
  const colors = useTheme();
  if (!error) {
    return null;
  }
  if (typeof error === 'object' && error.message) {
    return (
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <IonIcon name="alert-circle-outline" size={25} color={'white'} />
          <Text numberOfLines={4} style={{color: 'white'}}>
            {error.message}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.secondary}]}>
      <View style={styles.messageContainer}>
        <IonIcon name="alert-circle-outline" size={25} color={'white'} />
        <Text style={{color: 'white'}}>{error}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
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
});
