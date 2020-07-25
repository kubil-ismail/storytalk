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
import ImagePicker from 'react-native-image-picker';

// Imports: Firebase
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { account } from '../../redux/actions/authActions';

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    const { fullname, phone, photo } = this.props.auth;
    this.state = {
      fullname: fullname,
      phone: phone,
      isLoading: false,
      photo: photo,
      fileUri: '',
    };
  }

  chooseImage = () => {
    this.setState({ isLoading: true });
    let options = {
      title: 'Pilih foto',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        ToastAndroid.show('Pilih foto dibatalkan', ToastAndroid.SHORT);
        this.setState({ isLoading: false });
      } else if (response.error) {
        ToastAndroid.show('Terdapat kesalahan', ToastAndroid.SHORT);
        this.setState({ isLoading: false });
      } else if (response.customButton) {
        ToastAndroid.show('Terdapat kesalahan', ToastAndroid.SHORT);
        this.setState({ isLoading: false });
      } else if (response.fileSize >= 1077116) {
        ToastAndroid.show('Maksimal ukuran 1 Mb', ToastAndroid.SHORT);
        this.setState({ isLoading: false });
      } else {
        const filename = response.fileName;
        const pathToFile = response.path;
        if (filename && pathToFile) {
          const reference = storage().ref(filename);
          reference.putFile(pathToFile)
            .then(async () => {
              this.setState({ isLoading: false });
              this.setState({
                fileUri: response.uri,
                isLoading: false,
              });
              const url = await storage()
                .ref(filename)
                .getDownloadURL();
              this.updatePhoto(url);
              ToastAndroid.show('Foto berhasil di ubah', ToastAndroid.SHORT);
            })
            .catch(() => {
              ToastAndroid.show('Foto gagal di ubah', ToastAndroid.SHORT);
              this.setState({ isLoading: false });
            });
        }
      }
    });
  }

  updatePhoto = (data) => {
    const { displayName, phoneNumber, uid } = this.props.auth;
    database()
      .ref(`/Users/${uid}`)
      .update({
        photo: data,
      })
      .then(() => {
        this.props.account({
          displayName,
          phoneNumber,
          photo: data,
        });
        ToastAndroid.show('Foto berhasil di ubah', ToastAndroid.SHORT);
      })
      .catch(() => {
        ToastAndroid.show('Foto gagal di ubah', ToastAndroid.SHORT);
      });
  }

  renderFileUri = () => {
    const { fullname, photo, fileUri } = this.state;
    if (fileUri) {
      return <Avatar
        // rounded
        size="xlarge"
        title={fullname ? fullname.slice(0, 2) : '-'}
        onPress={() => this.chooseImage()}
        source={{ uri: fileUri }}
        // eslint-disable-next-line react-native/no-inline-styles
        overlayContainerStyle={{ backgroundColor: '#bcbec1' }}
        activeOpacity={0.7}
      />;
    } else {
      return <Avatar
        // rounded
        size="xlarge"
        title={fullname ? fullname.slice(0, 2) : '-'}
        onPress={() => this.chooseImage()}
        source={{ uri: photo }}
        // eslint-disable-next-line react-native/no-inline-styles
        overlayContainerStyle={{ backgroundColor: '#bcbec1' }}
        activeOpacity={0.7}
      />;
    }
  }

  setUpdate = (data) => {
    const { uid } = this.props.auth;
    database()
      .ref(`/Users/${uid}`)
      .update(data)
      .then(() => {
        ToastAndroid.show('Update profile berhasil', ToastAndroid.SHORT);
      })
      .catch(() => {
        ToastAndroid.show('Terjadi gangguan, coba lagi', ToastAndroid.SHORT);
      });
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
            this.setUpdate(update);
            this.props.account(update);
            this.setState({ isLoading: false });
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
              {this.renderFileUri()}
            </View>
            <Input
              placeholder="Nama Lengkap"
              defaultValue={fullname}
              onChangeText={(e) => this.setState({ fullname: e })}
            />
            <Input
              placeholder="No Telephone"
              keyboardType="number-pad"
              defaultValue={phone}
              onChangeText={(e) => this.setState({ phone: e })}
            />
            <Button
              title="Update"
              onPress={() => this.updateProfile()}
              loading={this.state.isLoading}
              containerStyle={styles.mb_10}
              // eslint-disable-next-line react-native/no-inline-styles
              buttonStyle={{ backgroundColor: '#ed5342' }}
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
