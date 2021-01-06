import React, { Component } from 'react';
import { Container, Content, Text, StyleProvider, H1, H2, Left, Footer, Title, Button, Header, List, ListItem, Separator, Icon, Body, View, Fab, Right, Tab, Tabs, ScrollableTab } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import materialDark from './native-base-theme/variables/material-dark';
import { GiftedChat } from 'react-native-gifted-chat'
import { AppearanceProvider, Appearance, useColorScheme } from 'react-native-appearance';

import { Alert } from 'react-native';
import * as Font from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer
} from '@react-navigation/native';

var UniqueID = 1;

class MainScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          _id: UniqueID++,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native'
          },
        },
      ]
    }
  }

  addMessage(content) {
    let a = content.concat(this.state.messages);
    this.setState({ messages: a});
    let newContent = [{
      _id: UniqueID++,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native'
      },
    }];
    a = newContent.concat(a);
    this.setState({ messages: a });
  }


  render() {
    //console.log("aaa")
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
    return (
      <StyleProvider style={getTheme(this.state.theme === 'dark' ? materialDark : material)}>
        <Container>
          <Header>
            <Body>
              <Title>Chat</Title>
            </Body>
          </Header>
            <GiftedChat
              messages={this.state.messages}
              onSend={messages => this.addMessage(messages)}
              user={{
                _id: 1,
              }}
              placeholder="Type a message..."
            />
        </Container>
      </StyleProvider>
    );
  }

}

export default function App() {
  return (
    <AppearanceProvider>
      <MainScreen />
    </AppearanceProvider>
  );
}
