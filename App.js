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

let count = 0;

var IAM_access_token = Constants.manifest.extra.EXPO_IAM_access_token;
var wsURI = 'wss://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/' + Constants.manifest.extra.EXPO_IAM_address + '/v1/recognize'
  + '?access_token=' + IAM_access_token
  + '&model=en-US_BroadbandModel';
console.log(wsURI);
var websocket = new WebSocket(wsURI);
websocket.onopen = function (evt) {
  websocket.send(JSON.stringify({
    action: 'start'
  }));
  console.log(evt.data);
};
websocket.onclose = function (evt) { console.log(evt.data) };
websocket.onmessage = function (evt) { console.log(evt.data) };
websocket.onerror = function (evt) { console.log(evt.data) };

// // // Prepare and send the audio file.
// // websocket.send(blob);
// websocket.send(JSON.stringify({ action: 'stop' }));

class MainScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
      listening: false,
      theme: Appearance.getColorScheme(),
      recording: undefined
    }
    this.setRecording = this.setRecording.bind(this)
  }

  setRecording(content) {
    this.setState({ recording: content })
  }


  async startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      recording.setOnRecordingStatusUpdate((status) => {
        count ++;
        console.log(status)
        if(count > 30) this.stopRecording();
      })
      this.setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async stopRecording() {
    console.log('Stopping recording..');
    let recording = this.state.recording;
    this.setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    console.log(recording)
    
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
