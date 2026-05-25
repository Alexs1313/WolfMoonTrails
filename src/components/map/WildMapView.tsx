import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const usesGoogleMaps = Platform.OS === 'android';

import {colors} from '../../consts';
import {darkMapStyle} from '../../consts/mapStyle';
import type {Place} from '../../data';
import {
  getPlaceCoordinates,
  getPlacesCoordinates,
  getPlacesRegion,
  mapFitPadding,
} from '../../data/mapBounds';
import {MapOverlayCard} from './MapOverlayCard';
import {MapPinMarker} from './MapPinMarker';

type Props = {
  places: Place[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function WildMapView({places, selectedId, onSelect}: Props) {
  const mapRef = useRef<MapView>(null);
  const [prevSelectedId, setPrevSelectedId] = useState(selectedId);
  const selectedPlace = places.find(p => p.id === selectedId);
  const isSelectionTransition = prevSelectedId !== selectedId;

  useEffect(() => {
    if (!isSelectionTransition) {
      return;
    }
    const timer = setTimeout(() => setPrevSelectedId(selectedId), 400);
    return () => clearTimeout(timer);
  }, [isSelectionTransition, selectedId]);

  const shouldTrackMarkerChanges = useCallback(
    (placeId: string) =>
      isSelectionTransition &&
      (placeId === selectedId || placeId === prevSelectedId),
    [isSelectionTransition, prevSelectedId, selectedId],
  );

  const initialRegion = useMemo(() => getPlacesRegion(places), [places]);

  const fitPlaces = useCallback(
    (animated = true) => {
      const coordinates = getPlacesCoordinates(places);
      if (coordinates.length === 0 || !mapRef.current) {
        return;
      }

      if (coordinates.length === 1) {
        mapRef.current.animateToRegion(
          {
            ...coordinates[0],
            latitudeDelta: 12,
            longitudeDelta: 12,
          },
          animated ? 350 : 0,
        );
        return;
      }

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: mapFitPadding,
        animated,
      });
    },
    [places],
  );

  useEffect(() => {
    fitPlaces(false);
  }, [fitPlaces]);

  useEffect(() => {
    const place = places.find(p => p.id === selectedId);
    if (!place || !mapRef.current) {
      return;
    }

    mapRef.current.animateToRegion(
      {
        ...getPlaceCoordinates(place),
        latitudeDelta: 10,
        longitudeDelta: 10,
      },
      300,
    );
  }, [places, selectedId]);

  return (
    <View style={styles.mapFrame}>
      <MapView
        ref={mapRef}
        provider={usesGoogleMaps ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        initialRegion={initialRegion}
        customMapStyle={usesGoogleMaps ? darkMapStyle : undefined}
        mapType={usesGoogleMaps ? 'standard' : 'mutedStandard'}
        userInterfaceStyle="dark"
        showsCompass={false}
        showsMyLocationButton={false}
        showsUserLocation={false}
        toolbarEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        loadingEnabled
        loadingBackgroundColor={colors.surface}
        loadingIndicatorColor={colors.primary}>
        {places.map(place => (
          <Marker
            key={place.id}
            identifier={place.id}
            coordinate={getPlaceCoordinates(place)}
            anchor={{x: 0.5, y: 1}}
            onPress={() => onSelect(place.id)}
            tracksViewChanges={shouldTrackMarkerChanges(place.id)}>
            <MapPinMarker
              isFocused={place.id === selectedId}
              onPress={() => onSelect(place.id)}
            />
          </Marker>
        ))}
      </MapView>
      {selectedPlace && (
        <View style={styles.floatingPanel} pointerEvents="none">
          <MapOverlayCard place={selectedPlace} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mapFrame: {
    height: 384,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  floatingPanel: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
  },
});
