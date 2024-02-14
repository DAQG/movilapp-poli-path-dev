import React, {useState} from 'react';
import {Building} from '../../interfaces/building.interface.ts';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {IonIcon} from '../utils/IonIcon.tsx';
import {environment} from '../../../environments/environment.ts';
import {useTheme} from '../../../config/theme/globalStyles.ts';

interface Props {
  building: Building;
}

export const BuildingDescription = ({building}: Props) => {
  const globalColors = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      style={[styles.container, {backgroundColor: globalColors.background}]}>
      <Text style={[styles.name, {color: globalColors.primaryText}]}>
        {building.name}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <View
          style={[styles.noContainer, {backgroundColor: globalColors.success}]}>
          <IonIcon
            name={'business-outline'}
            color={globalColors.white}
            size={15}
          />
          <Text style={{color: globalColors.white}}>
            Edificio N° {building.no}
          </Text>
        </View>
        <Pressable
          style={({pressed}) => ({
            opacity: pressed ? 0.5 : 1,
          })}
          onPress={() => setModalVisible(true)}>
          <IonIcon name={'images'} color={globalColors.iconPrimary} />
        </Pressable>
      </View>
      <Text
        style={{marginBottom: 10, color: globalColors.whiteOrBlackPlaceholder}}>
        Cantidad de visitas: {building.visits}
      </Text>
      <Text style={[styles.description, {color: globalColors.textDescription}]}>
        {building.description}
      </Text>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          console.log('Modal closed');
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.63)',
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}>
          <Pressable
            style={({pressed}) => ({
              opacity: pressed ? 0.5 : 1,
              marginBottom: 40,
            })}
            onPress={() => setModalVisible(false)}>
            <IonIcon
              name={'close-circle'}
              color={globalColors.white}
              size={35}
            />
          </Pressable>
          <FlatList
            data={building.imageUrls}
            scrollEventThrottle={16}
            decelerationRate={0}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
            renderItem={({item}) => (
              <Image
                width={400}
                height={300}
                resizeMode={'stretch'}
                style={{
                  overflow: 'hidden',
                  borderRadius: 10,
                }}
                source={{uri: `${environment.APP_HOST}/${item}`}}
                onError={error =>
                  console.log('Error cargando la imagen:', error)
                }
              />
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },

  image: {
    width: 300,
    height: 200,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  name: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  description: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 10,
  },

  noContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});
