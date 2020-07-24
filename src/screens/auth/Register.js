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

// Imports: Redux Actions
import { connect } from 'react-redux';
import { register } from '../../redux/actions/authActions';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      phone: null,
      password: null,
      password2: null,
      isLoading: false,
    };
  }

  onRegist = async () => {
    const { email, password, password2 } = this.state;
    if (email && password && password2) {
      if (validator.isEmail(email)) {
        if (validator.isByteLength(password, { min: 8, max: 14 })) {
          if (password === password2) {
            this.setState({ isLoading: true });
            try {
              const authCheck = await auth().createUserWithEmailAndPassword(email, password);
              this.props.register({
                email: authCheck.user.email,
                uid: authCheck.user.uid,
              });
              ToastAndroid.show('Daftar Sukses', ToastAndroid.SHORT);
              this.setState({ isLoading: false });
              this.props.navigation.navigate('account');
            } catch (error) {
              ToastAndroid.show(error.code, ToastAndroid.SHORT);
              this.setState({ isLoading: false });
            }
          } else {
            ToastAndroid.show('Password tidak cocok', ToastAndroid.SHORT);
          }
        } else {
          ToastAndroid.show('Password minimum 8 - 14 karakter', ToastAndroid.SHORT);
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
            <Text style={styles.title}>Buat Akun StoryTalk Baru</Text>
            <Text style={styles.desc}>
              Buat akun baru dan bagikan ceritamu bersama kami
            </Text>
            <Input
              placeholder="Email"
              onChangeText={(e) => this.setState({ email: e })}
              keyboardType="email-address"
            />
            <Input
              placeholder="Password (8 - 14 karakter)"
              onChangeText={(e) => this.setState({ password: e })}
              secureTextEntry
            />
            <Input
              placeholder="Konfirmasi Password"
              onChangeText={(e) => this.setState({ password2: e })}
              secureTextEntry
            />
            <Button
              title="Lanjut"
              loading={this.state.isLoading}
              onPress={() => this.onRegist()}
              containerStyle={styles.mb_10}
            />
            <Button
              title="Sudah Punya Akun"
              type="clear"
              onPress={() => this.props.navigation.navigate('login')}
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
    // Register
    register: (request) => dispatch(register(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Register);
