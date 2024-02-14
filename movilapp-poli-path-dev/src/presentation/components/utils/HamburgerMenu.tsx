import {Pressable, StyleSheet, Text, View} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import React from 'react';
import {IonIcon} from './IonIcon.tsx';
import {useTheme} from '../../../config/theme/globalStyles.ts';

export const HamburgerMenu = () => {
  const globalColors = useTheme();
  const navigator = useNavigation();

  useEffect(() => {
    navigator.setOptions({
      header: () => (
        <View
          style={[
            styles.container,
            {backgroundColor: globalColors.background},
          ]}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <IonIcon
              name={'arrow-back-outline'}
              size={20}
              color={globalColors.whiteOrBlack}
              onPress={() => {
                navigator.goBack();
              }}
            />
            <Text
              style={{
                fontSize: 20,
                color: globalColors.whiteOrBlack,
                fontWeight: '500',
              }}>
              Atrás
            </Text>
          </View>
          <Pressable
            style={{marginLeft: 10}}
            onPress={() => navigator.dispatch(DrawerActions.toggleDrawer)}>
            <IonIcon
              name="menu-outline"
              color={globalColors.whiteOrBlack}
              size={40}
            />
          </Pressable>
        </View>
      ),
    });
  }, [
    globalColors.background,
    globalColors.primary,
    globalColors.white,
    globalColors.whiteOrBlack,
    navigator,
  ]);
  return <></>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 15,
  },
});
