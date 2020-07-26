/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import { Image, Text } from 'react-native-elements';

// Imports: Firebase
import database from '@react-native-firebase/database';

// Component
import Header from '../component/Header';
import Item from '../component/Items';

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
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={this.getAllFriends()}
              progressViewOffset={100}
            />
          }
        >
          <Header title="Obrolan" {...this.props} />
          <View style={styles.container}>
            {/* Handle Alert */}
            {friends_.length === 0 && (
              <View
                style={styles.center}
              >
                <Image
                  source={require('../assets/svg/undraw_opened_gi4n.png')}
                  resizeMode="contain"
                  style={styles.svg}
                />
                <Text h4>Mulai Obrolan</Text>
                <Text style={styles.textCenter}>
                  Sapa teman barumu dan kami ingatkan hindari membagikan informasi yang sensitif
                </Text>
              </View>
            )}
            {/* Loop Data */}
            {!isLoading && friends_.length >= 1 && friends_.map((val, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => this.props.navigation.navigate('detail_chat',{
                  name: val[1].displayName,
                  uid: val[1].uid,
                })}
              >
                <Item
                  id={key}
                  title={val[1].displayName}
                  subtitle={val[1].status ? 'Online' : 'Offline'}
                  photo={val[1].photo}
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
  center: {
    flex: 1,
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  svg: {
    width: 250,
    height: 200,
    marginTop: 50,
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
