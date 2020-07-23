/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    const { name, chat } = props.route.params;
    this.state = {
      messages: [
        {
          _id: 1,
          text: chat,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: name,
          },
        },
      ],
    };
  }

  // Handle send message
  onSend = (msg) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, {
        _id: msg[0]._id,
        text: msg[0].text,
        createdAt: msg[0].createdAt,
        user: {
          _id: msg[0].user._id,
          name: msg[0].user.name,
        },
      }),
    }));
  }

  // Pop chat
  renderBubble = (props) => {
    return (
      // Step 3: return the component
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

  render() {
    const { messages } = this.state;
    return (
      <GiftedChat
        messages={messages}
        onSend={msg => this.onSend(msg)}
        renderBubble={this.renderBubble}
        user={{
          _id: 1,
          name: 'User',
        }}
        showUserAvatar
        scrollToBottom
        placeholder="Type your message here..."
      />
    );
  }
}
