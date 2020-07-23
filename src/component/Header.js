/* eslint-disable prettier/prettier */
import React from 'react';
import { Header } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default function Headers(props) {
  return (
    <Header
      placement="left"
      backgroundColor="#fff"
      centerComponent={{ text: props.title || 'Unknown', style: styles.title }}
      rightComponent={
        <Icon name={props.icon || 'ios-search-outline'} color="#313335" size={20} />
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
