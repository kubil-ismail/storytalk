/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { Button } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { location } from '../redux/actions/profileActions';

// Component
import Header from '../component/Header';
import Item from '../component/Items';

const list = [
  {
    name: 'Amy Farha',
    subtitle: 'Dibagikan 1 jam yang lalu',
  },
  {
    name: 'Chris Jackson',
    subtitle: 'Dibagikan 1 jam yang lalu',
  },
];

export class Location extends Component {
  shareLocation = () => {
    Geolocation.getCurrentPosition(info => {
      this.props.location({ location: info.coords });
      ToastAndroid.show('Lokasi berhasil dibagikan', ToastAndroid.SHORT);
    });
  }
  render() {
    const { shareLocation } = this.props.profile;
    return (
      <SafeAreaView style={styles.scaffold}>
        <ScrollView>
          <Header title="Lokasi" />
          <View style={styles.container}>
            {!shareLocation && (
              <Button
                title="Bagikan Lokasi"
                onPress={() => this.shareLocation()}
              />
            )}
            {shareLocation && (
              <Button
                title="Perbarui Lokasi"
                onPress={() => this.shareLocation()}
              />
            )}
            {
              list.map((val, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => this.props.navigation.navigate('detail_map', {
                    name: val.name,
                  })}
                >
                  <Item
                    id={key}
                    key={key}
                    title={val.name}
                    subtitle={val.subtitle}
                    url="null"
                  />
                </TouchableOpacity>
              ))
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scaffold: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#313335',
  },
  desc: {
    marginTop: 30,
    textAlign: 'center',
    color: '#86888a',
    marginBottom: 45,
  },
  mb_10: {
    marginBottom: 10,
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    auth: state.authReducer,
    profile: state.profileReducer,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    location: (request) => dispatch(location(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Location);
