import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Building} from '../../presentation/interfaces/building.interface.ts';
import {IonIcon} from '../../presentation/components/utils/IonIcon.tsx';
import {environment} from '../../environments/environment.ts';
import {useTheme} from '../../config/theme/globalStyles.ts';

interface Props {
  building: Building;
}

export const GuestBuilding = ({building}: Props) => {
  const globalColors = useTheme();
  const [errorImage, setErrorImage] = React.useState(false);
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: globalColors.borderCard,
        },
      ]}>
      {building.imageUrls && building.imageUrls.length > 0 ? (
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={{uri: `${environment.APP_HOST}/${building.imageUrls[0]}`}}
          onError={error => {
            console.log('Error cargando la imagen:', error);
            setErrorImage(true);
          }}
        />
      ) : (
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={require('../../assets/img/default-corporate-image.jpg')}
          onError={error => console.log('Error cargando la imagen:', error)}
        />
      )}
      {errorImage && (
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={require('../../assets/img/default-corporate-image.jpg')}
          onError={error => {
            console.log('Error cargando la imagen:', error);
          }}
        />
      )}
      <View
        style={[
          styles.infoContainer,
          {backgroundColor: globalColors.background},
        ]}>
        <View style={styles.containerFlex}>
          <Text
            style={[
              styles.name,
              {
                color: globalColors.titleCard,
              },
            ]}>
            {building.name}
          </Text>
        </View>
        <View
          style={[styles.noContainer, {backgroundColor: globalColors.success}]}>
          <IonIcon
            name={'business-outline'}
            color={globalColors.white}
            size={15}
          />
          <Text style={{color: 'white'}}>Edificio N° {building.no}</Text>
        </View>
        <Text style={[styles.description, {color: globalColors.textCard}]}>
          {building.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    flex: 1,
    borderWidth: 0.5,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 8,
  },

  infoContainer: {
    flex: 1,
    padding: 13,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  image: {
    width: '100%',
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
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 5,
  },

  noContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 10,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },

  containerFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
