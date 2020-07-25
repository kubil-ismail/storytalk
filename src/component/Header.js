/* eslint-disable prettier/prettier */
import React from 'react';
import { Header } from 'react-native-elements';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Headers(props) {
  return (
    <Header
      placement="left"
      backgroundColor="#fff"
      centerComponent={{ text: props.title || 'Unknown', style: styles.title }}
      rightComponent={
        <TouchableOpacity
          onPress={() => props.navigation.navigate('searchPeople')}
        >
          <Icon name={props.icon || 'search'} color="#313335" size={20} />
        </TouchableOpacity>
      }
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#313335',
  },
});
