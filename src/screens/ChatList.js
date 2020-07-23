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

export default class ChatList extends Component {
  render() {
    const list = [
      {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Hi lorem ipsum sir dolor amet lorem lorem ipsum sir dolor',
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
      },
    ];
    return (
      <SafeAreaView style={styles.scaffold}>
        <ScrollView>
          <Header title="Obrolan" />
          <View style={styles.container}>
            {
              list.map((val, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => this.props.navigation.navigate('detail_chat',{
                    name: val.name,
                    chat: val.subtitle,
                  })}
                >
                  <Item
                    id={key}
                    title={val.name}
                    subtitle={val.subtitle}
                  />
                </TouchableOpacity>
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
