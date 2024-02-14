import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
  Modal,
} from 'react-native';
import {Faculty} from '../../interfaces/faculty.interface.ts';
import {Building} from '../../interfaces/building.interface.ts';
import {environment} from '../../../environments/environment.ts';
import {Office} from '../../interfaces/office.interface.ts';
import {Laboratory} from '../../interfaces/laboratory.interface.ts';
import {PointOfInterest} from '../../interfaces/point-of-interest.interface.ts';
import {useTheme} from '../../../config/theme/globalStyles.ts';
import {IonIcon} from './IonIcon.tsx';

interface Props {
  entity: Faculty | Building | Office | Laboratory | PointOfInterest;
}

export const Card = ({entity}: Props) => {
  const colors = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={[styles.cardContainer, {borderColor: colors.borderCard}]}>
      <View style={styles.imageContainer}>
        {entity.imageUrls && entity.imageUrls.length > 0 && (
          <Image
            resizeMode={'cover'}
            style={styles.image}
            source={{uri: `${environment.APP_HOST}/${entity.imageUrls[0]}`}}
          />
        )}
      </View>
      <View style={styles.textContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text style={[styles.name, {color: colors.titleCard}]}>
            {entity.name}
          </Text>
          {entity.imageUrls && entity.imageUrls.length > 0 && (
            <Pressable
              style={({pressed}) => ({
                opacity: pressed ? 0.5 : 1,
              })}
              onPress={() => setModalVisible(true)}>
              <IonIcon name={'images'} color={colors.iconPrimary} />
            </Pressable>
          )}
        </View>
        {'teacherName' in entity && (
          <Text style={[styles.description, {color: colors.whiteOrBlack}]}>
            <Text style={{fontWeight: 'bold', color: colors.whiteOrBlack}}>
              Encargado:
            </Text>{' '}
            {entity.teacherName}
          </Text>
        )}
        {'codeOrNo' in entity && (
          <Text style={[styles.description, {color: colors.whiteOrBlack}]}>
            <Text style={{fontWeight: 'bold', color: colors.whiteOrBlack}}>
              Código o número:
            </Text>{' '}
            {entity.codeOrNo}
          </Text>
        )}
        {'schedule' in entity && (
          <>
            <Text
              style={[
                styles.description,
                {color: colors.textCard, fontWeight: 'bold'},
              ]}>
              Horarios:
            </Text>
            {entity.schedule.split('\n').map((day, index) => (
              <Text key={index} style={{color: colors.whiteOrBlack}}>
                - {day}
              </Text>
            ))}
          </>
        )}

        {entity.description && (
          <Text style={[styles.description, {color: colors.textCard}]}>
            {
              (entity.type = 'Oficina'
                ? `Nota: ${entity.description}`
                : entity.description)
            }
          </Text>
        )}
      </View>
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
            <IonIcon name={'close-circle'} color={colors.white} size={35} />
          </Pressable>
          <FlatList
            data={entity.imageUrls}
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
  cardContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden', // Para que las esquinas redondeadas se apliquen correctamente
  },
  imageContainer: {
    overflow: 'hidden',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
});
