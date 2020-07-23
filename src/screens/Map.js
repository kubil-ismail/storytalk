/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import MapView, { Marker  } from 'react-native-maps';
import { View, StyleSheet, Image }  from 'react-native';

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
          >
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/proxy/xpG71rhva0Mf7-SD2acrKvBmRXA0KBnAo-aF9vMw7in6BItQyC-4Y4PTu6LltyZstDEBjIqKjCUGRlXP6Ccp_dOB3kgu6c_CsRFb7T_thFPJqadS56hJBNcoIbLyoENRupGqm4rt3QV6'
              }}
              style={styles.marker} />
          </Marker>
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
