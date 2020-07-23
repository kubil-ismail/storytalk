/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import Friends from '../screens/Friends';
import ChatList from '../screens/ChatList';
import Location from '../screens/Location';
import Profile from '../screens/Profile';

const BottomTab = createBottomTabNavigator();

export default class Home extends Component {
  render() {
    return (
      <BottomTab.Navigator
        tabBarOptions={{
          activeTintColor: '#2f363e',
          showLabel: false,
          style: styles.topBar,
        }}
      >
        <BottomTab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="people-outline" color={color} size={size} />
            ),
          }}
          component={Friends}
          name="friends"
        />
        <BottomTab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="chatbox-ellipses-outline" color={color} size={size} />
            ),
          }}
          component={ChatList}
          name="chatList"
        />
        <BottomTab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="md-location-outline" color={color} size={size} />
            ),
          }}
          component={Location}
          name="search"
        />
        <BottomTab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="ellipsis-horizontal-outline" color={color} size={size} />
            ),
          }}
          component={Profile}
          name="profile"
        />
      </BottomTab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#f9f9fa',
    elevation: 0,
    borderTopColor: '#fff',
    height: 60
  },
});
