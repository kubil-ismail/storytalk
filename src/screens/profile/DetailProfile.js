/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

export class Profile extends Component {
  render() {
    const { fullname, email, phone } = this.props.route.params;
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
          <View style={styles.container}>
            <ListItem
              key={0}
              leftAvatar={
                <Avatar
                  // rounded
                  size="medium"
                  title={fullname.slice(0, 2)}
                  showEditButton
                  // eslint-disable-next-line react-native/no-inline-styles
                  overlayContainerStyle={{ backgroundColor: '#bcbec1' }}
                  activeOpacity={0.7}
                />
              }
              title={fullname}
              subtitle="Online"
              bottomDivider
              onPress={() => this.props.navigation.navigate('detail_chat', {
                name: fullname,
                chat: 'Hello',
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
