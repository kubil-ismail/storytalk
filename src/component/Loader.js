/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

export default function loader(props) {
  return (
    <Spinner
      visible={props.isLoading}
      textContent={'Loading...'}
      textStyle={{ color: '#fff' }}
    />
  );
}
