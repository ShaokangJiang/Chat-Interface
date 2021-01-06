import React, { Component } from 'react';
import { Container, Content, Text, Card, CardItem, StyleProvider, Spinner, H1, H2, Left, Footer, Title, Button, Header, List, ListItem, Separator, Icon, Body, View, Fab, Right, Tab, Tabs, ScrollableTab } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import materialDark from './native-base-theme/variables/material-dark';
import Constants from 'expo-constants';
import { Image } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { AppearanceProvider, Appearance, useColorScheme } from 'react-native-appearance';
import { Audio, Video } from 'expo-av';
import { Alert } from 'react-native';
import * as Font from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer
} from '@react-navigation/native';

var UniqueID = 1;

let GlobalTheme;

var IAM_access_token = Constants.manifest.extra.EXPO_IAM_access_token;
var wsURI = 'wss://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/'+Constants.manifest.extra.EXPO_IAM_address+'/v1/recognize'
  + '?access_token=' + IAM_access_token
  + '&model=en-US_BroadbandModel';

var websocket = new WebSocket(wsURI);
websocket.onopen = function (evt) { onOpen(evt) };
websocket.onclose = function (evt) { onClose(evt) };
websocket.onmessage = function (evt) { onMessage(evt) };
websocket.onerror = function (evt) { onError(evt) };

function onOpen(evt) {
  var message = {
    action: 'start'
  };
  websocket.send(JSON.stringify(message));

  // Prepare and send the audio file.
  websocket.send(blob);

  websocket.send(JSON.stringify({ action: 'stop' }));
}

function onClose(evt) {
//  console.log(evt.data);
}

function onMessage(evt) {
  //console.log(evt.data);
}

function onError(evt) {
  //console.log(evt.data);
}

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
      ],
      listening: false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ theme: Appearance.getColorScheme() });
    GlobalTheme = Appearance.getColorScheme();

    this.setState({ loading: false })
  }

  addMessage(content) {
    let a = content.concat(this.state.messages);
    this.setState({ messages: a });
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
              name: 'User'
            }}
            minInputToolbarHeight={140}
            renderComposer={(props) => (
              <StyleProvider {...props} style={getTheme(GlobalTheme === 'dark' ? materialDark : material)}>
                <Content style={{ height: 130, padding: 10 }}>
                      <Body>{this.state.listening ? <><Spinner color='red' /><Text>Listening</Text></> : <><Spinner color='red' /><Text>Handling</Text></>}</Body>
                  </Content>
              </StyleProvider>
            )}
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
