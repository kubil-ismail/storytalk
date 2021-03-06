/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { login } from '../redux/actions/authActions';

// Screens
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Account from '../screens/auth/Account';

// Tab Screens
import Home from './Home-route';
import Profile from '../screens/profile/DetailProfile';
import Chat from '../screens/Chat';
import Maps from '../screens/Map';
import EditProfile from '../screens/profile/EditProfile';
import Search from '../screens/Search';

// Navigator
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export class Route extends Component {
  render() {
    const { loggedIn, regist } = this.props.auth;
    return (
      <Stack.Navigator>
        {/* Auth */}
        {!loggedIn && (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              component={Login}
              name={'login'}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              component={Register}
              name={'register'}
            />
          </>
        )}

        {regist && (
          <Stack.Screen
            options={{ headerShown: false }}
            component={Account}
            name={'account'}
          />
        )}

        {/* On Login */}
        {loggedIn && (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              component={Home}
              name={'home'}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              component={Search}
              name={'searchPeople'}
            />
            <Stack.Screen
              options={{ title: 'Edit Profile' }}
              component={EditProfile}
              name={'edit_profile'}
            />
            <Stack.Screen
              options={(req) => ({ title: req.route.params.name || 'Unknown' })}
              component={Profile}
              name={'detail_profile'}
            />
            <Stack.Screen
              options={(req) => ({ title: req.route.params.name || 'Unknown' })}
              component={Chat}
              name={'detail_chat'}
            />
            <Stack.Screen
              options={(req) => ({ title: req.route.params.name || 'Unknown' })}
              component={Maps}
              name={'detail_map'}
            />
          </>
        )}
      </Stack.Navigator>
    );
  }
}

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
    login: (request) => dispatch(login(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Route);
