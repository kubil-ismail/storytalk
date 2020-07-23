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

import database from '@react-native-firebase/database';

export default class ChatList extends Component {
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
          <Header title="Obrolan" />
          <View style={styles.container}>
            {!isLoading && friends_.map((val, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => this.props.navigation.navigate('detail_chat',{
                  name: val[1].displayName,
                  chat: 'Oke Mantul Bos',
                })}
              >
                <Item
                  id={key}
                  title={val[1].displayName}
                  subtitle={'Oke Mantul Bosq'}
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
