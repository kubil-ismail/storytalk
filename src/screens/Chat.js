/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { ToastAndroid } from 'react-native';

// Imports: Firebase
import database from '@react-native-firebase/database';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { account, login } from '../redux/actions/authActions';

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  sendChat = (messages) => {
    const { uid, fullname } = this.props.auth; // User Data Id
    const { params } = this.props.route; // Sender Data Id
    database()
      .ref(`/Chat/${uid}/${params.uid}`)
      .set({
        messages: messages,
      })
      .catch(() => {
        ToastAndroid.show('Terjadi gangguan, coba lagi', ToastAndroid.SHORT);
      });
    database()
      .ref(`/Chat/${params.uid}/${uid}`)
      .set({
        messages: messages,
        sender: fullname,
      })
      .catch(() => {
        ToastAndroid.show('Terjadi gangguan, coba lagi', ToastAndroid.SHORT);
      });
  }

  // Handle send message
  onSend = (msg) => {
    const newData = [...msg, ...this.state.messages];
    this.sendChat(newData);
  }

  // Pop chat
  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: '#0080f7',
          },
          left: {
            backgroundColor: '#fff',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#313335',
          },
        }}
      />
    );
  }

  // Render all chat
  renderChat = () => {
    const { uid } = this.props.auth; // User Data Id
    const { params } = this.props.route; // Sender Data Id
    database()
      .ref(`/Chat/${uid}/${params.uid}`)
      .on('value', snapshot => {
        const { value } = snapshot._snapshot;
        if (value !== null ){
          this.setState({
            messages: value.messages,
          });
        }
      });
  }

  componentDidMount = () => {
    this.renderChat();
  }

  render() {
    const { fullname, uid, photo } = this.props.auth;
    const { messages } = this.state;
    return (
      <GiftedChat
        messages={messages}
        onSend={msg => this.onSend(msg)}
        renderBubble={this.renderBubble}
        renderUsernameOnMessage={true}
        user={{
          _id: uid,
          name: fullname,
          avatar: photo,
        }}
        showUserAvatar
        scrollToBottom
        placeholder="Type your message here..."
      />
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
    account: (request) => dispatch(account(request)),
    login: (request) => dispatch(login(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
