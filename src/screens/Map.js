/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import MapView, { PROVIDER_GOOGLE, Marker  } from 'react-native-maps';
import { View, StyleSheet, Image }  from 'react-native';

export default class Map extends Component {
  render() {
    const { name } = this.props.route.params;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          // provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          // showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
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
