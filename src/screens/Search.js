/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SearchBar, Image, Text } from 'react-native-elements';

import Item from '../component/Items';

// Imports: Firebase
import database from '@react-native-firebase/database';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends_: [],
      isLoading: true,
      search: null,
    };
    this.getAllFriends();
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
    database()
      .ref('/Users')
      .off('value', snapshot => {
        const { value } = snapshot._snapshot;
        const result = Object.keys(value).map((key) => [Number(key), value[key]]);
        this.setState({
          friends_: result,
          isLoading: false,
        });
      });

  }
  updateSearch = (search) => {
    this.setState({ search });
    this.getAllFriends();
  };

  render() {
    const { friends_, isLoading, search } = this.state;
    return (
      <SafeAreaView style={styles.scaffold}>
        <ScrollView>
          <SearchBar
            lightTheme
            placeholder="Nama pengguna..."
            onChangeText={this.updateSearch}
            value={search}
            // eslint-disable-next-line react-native/no-inline-styles
            containerStyle={{ backgroundColor: '#fff' }}
          />
          <View style={styles.container}>
            {/* Handle Alert */}
            {friends_.length === 0 && (
              <View
                style={styles.center}
              >
                <Image
                  source={require('../assets/svg/undraw_messages1_9ah2.png')}
                  resizeMode="contain"
                  style={styles.svg}
                />
                <Text h4>Cari Teman</Text>
                <Text style={styles.textCenter}>
                  Ajak temanmu untuk gabung di storytalk dan mulai ceritakan pengalamanmu hari ini
                    </Text>
              </View>
            )}
            {/* Loop Data */}
            {!isLoading && search !== null ? friends_.map((val, key) => {
              if (val[1].displayName.includes(search.toLowerCase())) {
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => this.props.navigation.navigate('detail_profile', {
                      name: val[1].displayName,
                      fullname: val[1].displayName,
                      email: val[1].email,
                      phone: val[1].phoneNumber,
                      uid: val[1].uid,
                      photo: val[1].photo,
                    })}
                  >
                    <Item
                      id={key}
                      key={key}
                      title={val[1].displayName}
                      subtitle={val[1].status ? 'Online' : 'Offline'}
                      url="null"
                      photo={val[1].photo}
                    />
                  </TouchableOpacity>
                );
              }
            }) : (
              <View
                style={styles.center}
              >
                <Image
                  source={require('../assets/svg/undraw_messages1_9ah2.png')}
                  resizeMode="contain"
                  style={styles.svg}
                />
                <Text h4>Cari Teman</Text>
                <Text style={styles.textCenter}>
                  Ajak temanmu untuk gabung di storytalk dan mulai ceritakan pengalamanmu hari ini
                  </Text>
              </View>
            )}
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
    paddingTop: 20,
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
});

