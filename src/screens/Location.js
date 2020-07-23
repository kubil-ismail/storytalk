/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Image, Text } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';

// Imports: Firebase
import database from '@react-native-firebase/database';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { location } from '../redux/actions/profileActions';

// Component
import Header from '../component/Header';
import Item from '../component/Items';


export class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends_: [],
      isLoading: true,
    };
  }

  getAllFriends = () => {
    database()
      .ref('/Users')
      .on('value', snapshot => {
        const { value } = snapshot._snapshot;
        const result = Object.keys(value).map((key) => [Number(key), value[key]]);
        this.setState({
          friends_: result,
          isLoading: false,
        });
      });
  }

  shareLocation = () => {
    const { uid } = this.props.auth;
    Geolocation.getCurrentPosition(info => {
      this.props.location({ location: info.coords });
      database()
        .ref(`/Users/${uid}`)
        .update({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        })
        .then(() => {
          ToastAndroid.show('Lokasi berhasil dibagikan', ToastAndroid.SHORT);
        })
        .catch(() => {
          ToastAndroid.show('Terjadi gangguan, coba lagi', ToastAndroid.SHORT);
        });
    });
  }

  componentDidMount = () => {
    this.getAllFriends();
  }

  render() {
    const { shareLocation } = this.props.profile;
    const { friends_, isLoading } = this.state;
    return (
      <SafeAreaView style={styles.scaffold}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              progressViewOffset={100}
              onRefresh={this.getAllFriends()}
            />
          }
        >
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
            {isLoading && friends_.length === 0 && (
              <View
                style={styles.center}
              >
                <Image
                  source={require('../assets/svg/undraw_opened_gi4n.png')}
                  resizeMode="contain"
                  style={styles.svg}
                />
                <Text h4>Lokasi Teman</Text>
                <Text style={styles.textCenter}>
                  Lihat lokasi teman mu dan mulai sapa mereka
                </Text>
              </View>
            )}
            {!isLoading && friends_.map((val, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => this.props.navigation.navigate('detail_map', {
                  name: val[1].displayName,
                  latitude: val[1].latitude,
                  longitude: val[1].longitude,
                })}
              >
                <Item
                  id={key}
                  key={key}
                  title={val[1].displayName}
                  subtitle="Detail lokasi"
                  url="null"
                  chevron
                />
              </TouchableOpacity>
            ))}
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
  center: {
    flex: 1,
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  svg: {
    width: 250,
    height: 200,
    marginTop: 50,
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
