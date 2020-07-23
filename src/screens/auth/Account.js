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
import auth from '@react-native-firebase/auth';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { account, login } from '../../redux/actions/authActions';

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: null,
      phone: null,
      isLoading: false,
    };
  }

  updateProfile = async () => {
    const { fullname, phone } = this.state;
    if (fullname && phone) {
      try {
        this.setState({ isLoading: true });
        const { email, uid } = this.props.auth;
        const update = {
          displayName: fullname,
          phoneNumber: phone,
        };
        await auth().currentUser.updateProfile(update);
        this.props.account(update);
        this.props.login({ email, uid });
        this.setState({ isLoading: false });
      } catch (error) {
        this.setState({ isLoading: false });
        ToastAndroid.show(error.code, ToastAndroid.SHORT);
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
export default connect(mapStateToProps, mapDispatchToProps)(Account);
