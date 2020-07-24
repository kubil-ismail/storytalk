/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ToastAndroid,
} from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import validator from 'validator';

// Imports: Firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { account, login } from '../../redux/actions/authActions';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      isLoading: false,
    };
  }

  setOnline = (uid) => {
    database()
      .ref(`/Users/${uid}`)
      .update({
        status: true,
      })
      .then(() => {
        ToastAndroid.show('Login Sukses', ToastAndroid.SHORT);
      })
      .catch(() => {
        ToastAndroid.show('Terjadi gangguan, coba lagi', ToastAndroid.SHORT);
      });
  }

  getProfile = (uid) => {
    database()
      .ref(`/Users/${uid}`)
      .once('value')
      .then(snapshot => {
        this.props.account(snapshot.val());
      });
  }

  onLogin = async () => {
    const { email, password } = this.state;
    if (email && password) {
      if (validator.isEmail(email)) {
        if (validator.isByteLength(password, { min: 8, max: 14 })) {
          this.setState({ isLoading: true });
          try {
            const authCheck = await auth().signInWithEmailAndPassword(email,password);
            this.props.login({
              email: authCheck.user.email,
              uid: authCheck.user.uid,
            });
            this.getProfile(authCheck.user.uid);
            this.setOnline(authCheck.user.uid);
            this.setState({ isLoading: false });
          } catch (error) {
            ToastAndroid.show(error.code, ToastAndroid.SHORT);
            this.setState({ isLoading: false });
          }
        } else {
          ToastAndroid.show('Password harus valid', ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show('Email harus valid', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Semua input harus terpenuhi', ToastAndroid.SHORT);
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.scaffold}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Selamat Datang di StoryTalk</Text>
            <Text style={styles.desc}>
              Jika Anda memiliki Akun StoryTalk,
              masuk dengan alamat email anda
            </Text>
            <Input
              placeholder="Email"
              onChangeText={(e) => this.setState({ email: e })}
              keyboardType="email-address"
            />
            <Input
              placeholder="Password"
              onChangeText={(e) => this.setState({ password: e })}
              secureTextEntry
            />
            <Button
              title="Masuk"
              onPress={() => this.onLogin()}
              loading={this.state.isLoading}
              containerStyle={styles.mb_10}
            />
            <Button
              title="Daftar"
              type="outline"
              onPress={() => this.props.navigation.navigate('register')}
              containerStyle={styles.mb_10}
            />
            <Button
              title="Lupa Kata Sandi"
              type="clear"
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
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    account: (request) => dispatch(account(request)),
    login: (request) => dispatch(login(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Login);
