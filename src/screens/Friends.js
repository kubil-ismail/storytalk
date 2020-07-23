/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

// Component
import Header from '../component/Header';
import Item from '../component/Items';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { friends } from '../redux/actions/profileActions';

import database from '@react-native-firebase/database';

export class Friends extends Component {
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

  componentDidMount = () => {
    this.getAllFriends();
  }

  render() {
    const { friends_, isLoading } = this.state;
    return (
      <SafeAreaView style={styles.scaffold}>
        <ScrollView>
          <Header title="Teman" />
          <View style={styles.container}>
            {!isLoading && friends_.map((val, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => this.props.navigation.navigate('detail_profile', {
                  name: val[1].displayName,
                  fullname: val[1].displayName,
                  email: val[1].email,
                  phone: val[1].phoneNumber,
                })}
              >
                <Item
                  id={key}
                  key={key}
                  title={val[1].displayName}
                  subtitle={val[1].status ? 'Online' : 'Offline'}
                  url="null"
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
    friends: (request) => dispatch(friends(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Friends);
