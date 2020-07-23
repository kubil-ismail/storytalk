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
import auth from '@react-native-firebase/auth';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { logout } from '../redux/actions/authActions';

// Component
import Header from '../component/Header';
import Loader from '../component/Loader';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  onLogout = async () => {
    try {
      this.setState({ isLoading: true });
      await auth().signOut();
      this.props.logout();
      this.setState({ isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
      ToastAndroid.show('Terdapat kesalahan, Coba lagi', ToastAndroid.SHORT);
    }
  }
  render() {
    const { fullname, email, phone } = this.props.auth;
    const list = [
      {
        name: 'Email',
        subtitle: email,
      },
      {
        name: 'Nomor telepon',
        subtitle: phone.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3'),
      },
      {
        name: 'Lokasi Pengguna',
        subtitle: 'Jakarta',
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
                  title={fullname.slice(0,2)}
                  showEditButton
                  // eslint-disable-next-line react-native/no-inline-styles
                  overlayContainerStyle={{ backgroundColor: '#bcbec1' }}
                  activeOpacity={0.7}
                />
              }
              title={fullname}
              subtitle="Online"
              bottomDivider
              onPress={() => this.props.navigation.navigate('detail_profile',{
                name: fullname,
                fullname: fullname,
                email: email,
                phone: phone,
              })}
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
            <ListItem
              key={5}
              title="Edit Profile"
              onPress={() => this.props.navigation.navigate('edit_profile')}
              chevron
            />
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
