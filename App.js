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
import base64 from 'base-64';
import Base64 from 'Base64';
import * as Font from 'expo-font';
import * as FileSystem from 'expo-file-system';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer
} from '@react-navigation/native';

//import {NlpManager} from 'node-nlp-rn';
//import { dockStart } from '@nlpjs/basic';
import { containerBootstrap } from '@nlpjs/core';
import { Nlp } from '@nlpjs/nlp';
import { Ner } from '@nlpjs/ner';
import { LangEn } from '@nlpjs/lang-en-min';


var UniqueID = 1;

let GlobalTheme;

let count = 0;
let finished = false;

var IAM_API = Constants.manifest.extra.EXPO_IAM_access_token;
var wsURI;

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = Base64.atob(dataURI.split(',')[1]);
  else
    byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }


  return new Blob([ia], { type: mimeString });
}

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
      await recording.prepareToRecordAsync({
        android: {
          extension: '.wav',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.caf',
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      });
      await recording.startAsync();
      recording.setOnRecordingStatusUpdate(async (status) => {
        count++;
        console.log(status)
        console.log(this.state.recording.getURI())
        //console.log(await FileSystem.getInfoAsync(this.state.recording.getURI()))
        if (count > 20 && !finished) {
          this.stopRecording();
          finished = true
        }
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
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    //console.log(recording)
    // let a = await FileSystem.readAsStringAsync(uri, {
    //   encoding: FileSystem.EncodingType.Base64
    // });


    // console.log(a)
    // var base64 = "data:audio/wav;base64," + a
    // //console.log(dataURItoBlob(base64))
    // this.getRecognition(dataURItoBlob(base64));
    //use blob to pass


  }

  async getRecognition(blob) {
    var websocket = new WebSocket(wsURI);
    websocket.onopen = function (evt) {
      console.log("In open")
      var message = {
        action: 'start'
      };
      websocket.send(JSON.stringify(message));

      // Prepare and send the audio file.
      websocket.send(blob);

      websocket.send(JSON.stringify({ action: 'stop' }));
    };
    websocket.onclose = function (evt) {
      console.log("In close")
      console.log(evt.data);
    };
    websocket.onmessage = function (evt) {
      console.log("In message")
      console.log(evt.data);
    };
    websocket.onerror = function (evt) {
      console.log("In error")
      console.log(evt.data);
    };

  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ theme: Appearance.getColorScheme() });
    GlobalTheme = Appearance.getColorScheme();

    // var sev = await fetch("https://iam.cloud.ibm.com/identity/token?grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=" + IAM_API, {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   method: "POST"
    // })

    // var res = await sev.json();
    // //console.log(res)


    // wsURI = 'wss://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/' + Constants.manifest.extra.EXPO_IAM_address + '/v1/recognize'
    //   + '?access_token=' + res.access_token
    //   + '&model=en-US_BroadbandModel';

    //console.log(wsURI);

    this.setState({ loading: false })
    // await this.startRecording();


  }

  async addMessage(content) {
    let a = content.concat(this.state.messages);
    this.setState({ messages: a });
    let newContent = [{
      _id: UniqueID++,
      text: await this.generateMessage(content.text),
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native'
      },
    }];
    a = newContent.concat(a);
    this.setState({ messages: a });
  }

  async generateMessage() {

    const container = await containerBootstrap();
    container.use(Nlp);
    container.use(Ner);
    container.use(LangEn);
    const nlp = container.get('nlp');
    nlp.settings.autoSave = false;
    nlp.forceNER = true;
    nlp.addLanguage('en');
    // Adds the utterances and intents for the NLP
    nlp.addDocument('en', 'goodbye for now', 'greetings.bye');
    nlp.addDocument('en', 'bye bye take care', 'greetings.bye');
    nlp.addDocument('en', 'okay see you later', 'greetings.bye');
    nlp.addDocument('en', 'bye for now', 'greetings.bye');
    nlp.addDocument('en', 'i must go', 'greetings.bye');
    nlp.addDocument('en', 'hello', 'greetings.hello');
    nlp.addDocument('en', 'hi', 'greetings.hello');
    nlp.addDocument('en', 'howdy', 'greetings.hello');

    // Train also the NLG
    nlp.addAnswer('en', 'greetings.bye', 'Till next time');
    nlp.addAnswer('en', 'greetings.bye', 'see you soon!');
    nlp.addAnswer('en', 'greetings.hello', 'Hey there!');
    nlp.addAnswer('en', 'greetings.hello', 'Greetings!');
    await nlp.train();
    const response = await nlp.process('en', 'I should go now');
    console.log(response);

    console.log(response);
    let entities = {}
    for (let i of response.entities) {
      entities[i.datetime] = i.resolution;
    }
    return response.answer + JSON.stringify(entities, null, 2)
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
