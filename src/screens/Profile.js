/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ToastAndroid,
} from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { logout } from '../redux/actions/authActions';

// Component
import Header from '../component/Header';
import Loader from '../component/Loader';

// Imports: Firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  setOffline = () => {
    const { uid } = this.props.auth;
    database()
      .ref(`/Users/${uid}`)
      .update({
        status: false,
      })
      .then(() => {
        ToastAndroid.show('Logout Berhasil', ToastAndroid.SHORT);
      })
      .catch(() => {
        ToastAndroid.show('Terjadi gangguan, coba lagi', ToastAndroid.SHORT);
      });
  }

  onLogout = async () => {
    try {
      this.setState({ isLoading: true });
      await auth().signOut();
      this.setOffline();
      this.props.logout();
      this.setState({ isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
      ToastAndroid.show('Terdapat kesalahan, Coba lagi', ToastAndroid.SHORT);
    }
  }

  render() {
    const { fullname, email, phone } = this.props.auth;
    const { location, shareLocation } = this.props.profile;
    const list = [
      {
        name: 'Email',
        subtitle: email,
      },
      {
        name: 'Nomor telepon',
        subtitle: phone ? phone.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3') : 'Uknown',
      },
    ];
    return (
      <SafeAreaView style={styles.scaffold}>
        <ScrollView>
          <Header title="Profile" />
          <Loader isLoading={this.state.isLoading} />
          <View style={styles.container}>
            <ListItem
              key={0}
              leftAvatar={
                <Avatar
                  // rounded
                  size="medium"
                  source={{
                    uri:
                      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                  }}
                  title={fullname ? fullname.slice(0,2) : '-'}
                  // eslint-disable-next-line react-native/no-inline-styles
                  overlayContainerStyle={{ backgroundColor: '#bcbec1' }}
                  activeOpacity={0.7}
                  />
                }
              title={fullname || 'Unknown'}
              subtitle="Online"
              bottomDivider
              onPress={() => this.props.navigation.navigate('edit_profile')}
              chevron
            />
            {
              list.map((val, key) => (
                <ListItem
                  key={key}
                  title={val.name}
                  subtitle={val.subtitle}
                />
              ))
            }
            {shareLocation && (
              <ListItem
                key={4}
                title="Lokasi Pengguna"
                onPress={() => this.props.navigation.navigate('detail_map',
                {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  name: fullname ? fullname : 'Unknown',
                })}
                chevron
              />
            )}
            <ListItem
              key={6}
              title="Ubah Password"
              onPress={() => this.props.navigation.navigate('edit_profile')}
              chevron
            />
            <ListItem
              key={7}
              title="Logout"
              onPress={() => this.onLogout()}
              chevron
            />
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
    logout: (request) => dispatch(logout(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
