/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ToastAndroid,
} from 'react-native';
import { Avatar, Button, Input } from 'react-native-elements';
import validator from 'validator';
import Geolocation from '@react-native-community/geolocation';

// Imports: Firebase
import database from '@react-native-firebase/database';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { account, login } from '../../redux/actions/authActions';
import { location } from '../../redux/actions/profileActions';

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: null,
      phone: null,
      isLoading: false,
    };
  }

  addNew = (data) => {
    Geolocation.getCurrentPosition(info => {
      this.props.location({ location: info.coords });
      database()
        .ref(`/Users/${data.uid}`)
        .set({
          displayName: data.displayName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          uid: data.uid,
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          status: true,
        })
        .then(() => {
          this.props.account(data);
          this.props.login({
            email: data.email,
            uid: data.uid,
          });
          this.setState({ isLoading: false });
          ToastAndroid.show('Berhasil Login', ToastAndroid.SHORT);
        })
        .catch(() => {
          ToastAndroid.show('Terjadi gangguan, coba lagi', ToastAndroid.SHORT);
        });
    });
  }


  updateProfile = async () => {
    const { fullname, phone } = this.state;
    if (fullname && phone) {
      if (validator.isByteLength(fullname, { min: 2, max: 25 })) {
        if (validator.isMobilePhone(phone, ['id-ID'])) {
          try {
            this.setState({ isLoading: true });
            const { email, uid } = this.props.auth;
            const update = {
              displayName: validator.trim(fullname),
              phoneNumber: phone,
              email: email,
              uid: uid,
            };
            this.addNew(update);
          } catch (error) {
            this.setState({ isLoading: false });
            ToastAndroid.show(error.code, ToastAndroid.SHORT);
          }
        } else {
          ToastAndroid.show('No Telephone harus valid', ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show('Panjang nama 2 - 5 karakter', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Semua input harus terpenuhi', ToastAndroid.SHORT);
    }
  }

  render() {
    const { fullname, isLoading } = this.state;
    return (
      <SafeAreaView style={styles.scaffold}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.center}>
              <Avatar
                // rounded
                size="xlarge"
                title={fullname ? fullname.slice(0,2) : '-'}
                showEditButton
                // eslint-disable-next-line react-native/no-inline-styles
                overlayContainerStyle={{ backgroundColor: '#bcbec1' }}
                activeOpacity={0.7}
              />
            </View>
            <Input
              placeholder="Nama Lengkap"
              onChangeText={(e) => this.setState({ fullname: e })}
            />
            <Input
              placeholder="No Telephone"
              keyboardType="number-pad"
              onChangeText={(e) => this.setState({ phone: e })}
            />
            <Button
              title="Lanjut"
              loading={isLoading}
              onPress={() => this.updateProfile()}
              containerStyle={styles.mb_10}
            />
            <Button
              type="outline"
              title="Kembali"
              onPress={() => this.props.navigation.navigate('register')}
              containerStyle={styles.mb_10}
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
    paddingHorizontal: 20,
  },
  center: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    color: '#313335',
    marginTop: 30,
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
    account: (request) => dispatch(account(request)),
    login: (request) => dispatch(login(request)),
    location: (request) => dispatch(location(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Account);
