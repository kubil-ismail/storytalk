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

// Imports: Firebase
import auth from '@react-native-firebase/auth';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { account } from '../../redux/actions/authActions';

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    const { fullname, phone } = this.props.auth;
    this.state = {
      fullname: fullname,
      phone: phone,
      isLoading: false,
    };
  }

  updateProfile = async () => {
    const { fullname, phone } = this.state;
    if (fullname && phone) {
      if (validator.isByteLength(fullname, { min: 2, max: 25 })) {
        if (validator.isMobilePhone(phone, ['id-ID'])) {
          try {
            this.setState({ isLoading: true });
            const update = {
              displayName: fullname,
              phoneNumber: phone,
            };
            await auth().currentUser.updateProfile(update);
            this.props.account(update);
            this.setState({ isLoading: false });
            ToastAndroid.show('Update profile berhasil', ToastAndroid.SHORT);
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
    const { fullname, phone } = this.state;
    return (
      <SafeAreaView style={styles.scaffold}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.center}>
              <Avatar
                // rounded
                size="xlarge"
                title={fullname ? fullname.slice(0, 2) : '-'}
                showEditButton
                // eslint-disable-next-line react-native/no-inline-styles
                overlayContainerStyle={{ backgroundColor: '#bcbec1' }}
                activeOpacity={0.7}
              />
            </View>
            <Input
              placeholder="Nama Lengkap"
              defaultValue={fullname}
              onChangeText={(e) => this.setState({ fullname: e })}
            />
            <Input
              placeholder="No Telephone"
              defaultValue={phone}
              onChangeText={(e) => this.setState({ phone: e })}
            />
            <Button
              title="Update"
              onPress={() => this.updateProfile()}
              loading={this.state.isLoading}
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
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
