/* eslint-disable prettier/prettier */
import React from 'react';
import {Avatar, ListItem} from 'react-native-elements';

export default function Items(props) {
  return (
    <ListItem
      key={props.id}
      leftAvatar={
        <Avatar
          // rounded
          size="medium"
          title={props.title.slice(0,2)}
          showEditButton
          // eslint-disable-next-line react-native/no-inline-styles
          overlayContainerStyle={{backgroundColor: '#bcbec1'}}
          activeOpacity={0.7}
        />
      }
      title={props.title || 'Unknown'}
      subtitle={props.subtitle || 'Unknown'}
      subtitleProps={{
        numberOfLines: 1,
      }}
      chevron={props.chevron ? true : false}
    />
  );
}
