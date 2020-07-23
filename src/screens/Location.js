/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

// Component
import Header from '../component/Header';
import Item from '../component/Items';

export default class Location extends Component {
  render() {
    const list = [
      {
        name: 'Amy Farha',
        subtitle: 'Dibagikan 1 jam yang lalu',
      },
      {
        name: 'Chris Jackson',
        subtitle: 'Dibagikan 1 jam yang lalu',
      },
    ];
    return (
      <SafeAreaView style={styles.scaffold}>
        <ScrollView>
          <Header title="Lokasi" />
          <View style={styles.container}>
            {
              list.map((val, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => this.props.navigation.navigate('detail_map', {
                    name: val.name,
                  })}
                >
                  <Item
                    id={key}
                    key={key}
                    title={val.name}
                    subtitle={val.subtitle}
                    url="null"
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
