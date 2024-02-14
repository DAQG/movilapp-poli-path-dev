import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from '../../../config/theme/globalStyles.ts';

export const CustomActivityIndicator = ({isLoading}: {isLoading: boolean}) => {
  const colors = useTheme();
  return (
    <View style={[styles.container, styles.horizontal]}>
      {isLoading && <ActivityIndicator size="large" color={colors.success} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
