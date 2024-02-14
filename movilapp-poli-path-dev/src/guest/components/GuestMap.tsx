import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  PermissionsAndroid,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Dimensions,
} from 'react-native';
import MapView, {MapMarker, Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import GetLocation from 'react-native-get-location';
import Geolocation from '@react-native-community/geolocation';
import {GOOGLE_MAPS_API_KEY} from '@env';
import {
  DistanceResult,
  getDistance,
} from '../../presentation/api/map.service.ts';
import {Building} from '../../presentation/interfaces/building.interface.ts';
import {IonIcon} from '../../presentation/components/utils/IonIcon.tsx';
import {getBuildings} from '../api/buildings.service.ts';
import {data} from '../../presentation/components/map/Map.tsx';
import {useTheme} from '../../config/theme/globalStyles.ts';

export type Location = {
  latitude: number;
  longitude: number;
  name?: string;
  description?: string;
};

export const GuestMap = () => {
  const globalColors = useTheme();
  const windowHeight = Dimensions.get('window').height;
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [buildings, setBuildings] = useState<Building[] | null>(null);
  const [destinationLocation, setDestinationLocation] =
    useState<Location | null>(null);
  const [distanceResult, setDistanceResult] = useState<DistanceResult | null>(
    null,
  );
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [walkingTime, setWalkingTime] = useState(0);
  const [routeStatus, setRouteStatus] = useState<
    'idle' | 'creatingRoute' | 'routeCreated'
  >('idle');

  const mapRef = useRef<MapView>(null);
  const markerRef = useRef<MapMarker | null>(null);

  useEffect(() => {
    getBuildings()
      .then(buildingsApi => setBuildings(buildingsApi))
      .catch(error => console.log(error));

    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permiso de Ubicación',
            message: 'Necesitamos acceder a tu ubicación',
            buttonNeutral: 'Preguntar luego',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Utiliza watchPosition para suscribirte a actualizaciones de ubicación
          Geolocation.watchPosition(
            position => {
              setCurrentLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            error => {
              console.error(error);
            },
            {
              enableHighAccuracy: true,
              distanceFilter: 10, // Filtro de distancia en metros, ajusta según tus necesidades
            },
          );
        } else {
          console.log('Permiso de ubicación denegado');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission().then();
  }, []);

  const handleGuestCurrentLocation = async () => {
    try {
      setIsFetchingLocation(true);
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });

      setCurrentLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      mapRef.current?.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingLocation(false);
    }
  };

  const handleGoTo = async () => {
    setRouteStatus('creatingRoute');
    mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
    });

    const walkingSpeed = 5; // km/h
    const deviationFactor = 1.3; // % de desviación
    const distance =
      haversineDistance(
        currentLocation as Location,
        destinationLocation as Location,
      ) * deviationFactor;
    setWalkingTime(distance / walkingSpeed);

    getDistance(
      {
        latitude: currentLocation?.latitude || 0,
        longitude: currentLocation?.longitude || 0,
      },
      {
        latitude: destinationLocation?.latitude || 0,
        longitude: destinationLocation?.longitude || 0,
      },
    )
      .then((result: DistanceResult) => setDistanceResult(result))
      .catch((err: Error) => console.log(err));

    setRouteStatus('routeCreated');
  };

  const handleClearAll = () => {
    setRouteStatus('idle');
    setWalkingTime(0);
    setDestinationLocation(null);
    markerRef.current?.hideCallout();
    mapRef.current?.animateToRegion({
      latitude: currentLocation?.latitude || 0,
      longitude: currentLocation?.longitude || 0,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    });
  };

  function haversineDistance(location1: Location, location2: Location) {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371; // Radio de la tierra en km

    const dLat = toRad(location2.latitude - location1.latitude);
    const dLon = toRad(location2.longitude - location1.longitude);
    const lat1 = toRad(location1.latitude);
    const lat2 = toRad(location2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  return (
    <View style={{flex: 1}}>
      <View
        style={{width: '100%', height: windowHeight - 230, borderRadius: 10}}>
        <MapView
          ref={mapRef}
          showsMyLocationButton={false}
          showsUserLocation={true}
          showsBuildings={false}
          showsCompass={false}
          showsTraffic={false}
          showsIndoors={false}
          showsIndoorLevelPicker={false}
          style={{width: '100%', height: '100%', borderRadius: 10}}
          initialRegion={{
            latitude: -0.21219531695648688,
            longitude: -78.49055567381913,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          region={{
            latitude: -0.21219531695648688,
            longitude: -78.49055567381913,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          maxDelta={0.002}
          minDelta={0.002}>
          {currentLocation && (
            <Marker
              identifier={'origin'}
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Mi Ubicación">
              <View style={{display: 'none'}}>
                <IonIcon
                  name={'location'}
                  color={globalColors.primary}
                  size={30}
                />
              </View>
            </Marker>
          )}

          {destinationLocation && (
            <Marker
              identifier={'destination'}
              coordinate={{
                latitude: destinationLocation.latitude,
                longitude: destinationLocation.longitude,
              }}
              title={destinationLocation.name || 'Destino'}
              description={destinationLocation.description || 'Destino'}>
              <View style={{display: 'none'}}>
                <IonIcon
                  name={'location'}
                  color={globalColors.primary}
                  size={30}
                />
              </View>
            </Marker>
          )}

          {routeStatus === 'routeCreated' && (
            <View>
              <Polyline
                strokeColor={globalColors.primary}
                strokeWidth={4}
                lineJoin={'bevel'}
                strokeColors={[
                  globalColors.primary,
                  globalColors.secondary,
                  globalColors.primary,
                ]}
                coordinates={[
                  {
                    latitude: currentLocation?.latitude || 0,
                    longitude: currentLocation?.longitude || 0,
                  },
                  {
                    latitude: destinationLocation?.latitude || 0,
                    longitude: destinationLocation?.longitude || 0,
                  },
                ]}
              />
              <MapViewDirections
                origin={{
                  latitude: currentLocation?.latitude || 0,
                  longitude: currentLocation?.longitude || 0,
                }}
                destination={{
                  latitude: destinationLocation?.latitude || 0,
                  longitude: destinationLocation?.longitude || 0,
                }}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth={4}
                strokeColor={globalColors.secondary}
                lineJoin={'bevel'}
                lineCap={'round'}
                lineDashPattern={[0]}
                timePrecision={'now'}
                precision={'high'}
                mode={'WALKING'}
              />
            </View>
          )}

          {data.map(item => (
            <Marker
              key={item.name}
              coordinate={{
                latitude: parseFloat(item.latitude),
                longitude: parseFloat(item.longitude),
              }}
              title={item.name}
              image={require('../../assets/img/entrada.png')}
              onPress={() => {
                setDestinationLocation({
                  latitude: parseFloat(item.latitude),
                  longitude: parseFloat(item.longitude),
                  name: item.name,
                });
                setRouteStatus('idle');
                setWalkingTime(0);
              }}
            />
          ))}

          {buildings?.map(
            building =>
              building && (
                <Marker
                  ref={markerRef}
                  key={building.id}
                  coordinate={{
                    latitude: building.latitude,
                    longitude: building.longitude,
                  }}
                  title={building.name}
                  description={building.description}
                  onPress={() => {
                    setDestinationLocation({
                      latitude: building.latitude,
                      longitude: building.longitude,
                      name: building.name,
                    });
                    setRouteStatus('idle');
                    setWalkingTime(0);
                  }}
                  image={require('../../assets/img/icon-logo.png')}
                />
              ),
          )}
        </MapView>

        {walkingTime > 0 && (
          <View
            style={{
              position: 'absolute',
              top: 5,
              left: 10,
              right: 10,
              backgroundColor: 'rgba(0,0,0,0.63)',
              borderRadius: 8,
              padding: 8,
              opacity: routeStatus === 'creatingRoute' ? 0.5 : 1,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
              }}>
              <Text
                style={{
                  color: globalColors.white,
                  fontSize: 12,
                  textAlign: 'center',
                }}>
                Distancia: {distanceResult?.distance},
              </Text>
              <IonIcon name={'walk'} color={globalColors.white} size={20} />
              <Text
                style={{
                  color: globalColors.white,
                  fontSize: 12,
                  textAlign: 'center',
                }}>
                Tiempo estimado: {Math.round(walkingTime * 60)} min
              </Text>
            </View>
          </View>
        )}

        {destinationLocation && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: windowHeight / 50,
              left: 16,
              backgroundColor: globalColors.primary,
              borderRadius: 8,
              padding: 8,
              opacity: routeStatus === 'creatingRoute' ? 0.5 : 1,
            }}
            onPress={handleGoTo}
            disabled={routeStatus === 'creatingRoute'}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                paddingVertical: 5,
              }}>
              <IonIcon name={'navigate'} color={globalColors.white} size={20} />
              <Text
                lineBreakMode={'tail'}
                numberOfLines={1}
                style={{
                  color: globalColors.white,
                  fontSize: 15,
                  textAlign: 'center',
                  maxWidth: 150,
                }}>
                Ir a {destinationLocation?.name || 'Destino'}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: windowHeight / 50,
            right: 16,
            backgroundColor: globalColors.primary,
            borderRadius: 8,
            padding: 8,
            opacity: isFetchingLocation ? 0.5 : 1,
          }}
          onPress={handleGuestCurrentLocation}
          disabled={isFetchingLocation}>
          {isFetchingLocation ? (
            <ActivityIndicator size="small" color={globalColors.white} />
          ) : (
            <IonIcon name={'locate'} color={globalColors.white} size={30} />
          )}
        </TouchableOpacity>
      </View>
      {routeStatus === 'routeCreated' && (
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            backgroundColor: globalColors.mediumGray,
            borderRadius: 100,
            marginTop: 10,
            padding: 5,
          }}
          onPress={handleClearAll}>
          <IonIcon
            name={'trash-bin-outline'}
            color={globalColors.white}
            size={20}
          />
          <Text style={{color: globalColors.white}}>Limpiar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
