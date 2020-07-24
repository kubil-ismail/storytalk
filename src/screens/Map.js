/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import MapView, { Marker  } from 'react-native-maps';
import { View, StyleSheet }  from 'react-native';

export default class Map extends Component {
  render() {
    const { name, latitude, longitude } = this.props.route.params;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title={name}
            description={name}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
    height: 35,
    width: 35,
  },
});
