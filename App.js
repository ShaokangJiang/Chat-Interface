import React, { Component } from 'react';
import { Container, Content, Text, StyleProvider, H1, H2, Left, Title, Button, Header, List, ListItem, Separator, Icon, Body, View, Fab, Right, Tab, Tabs, ScrollableTab } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import materialDark from './native-base-theme/variables/material-dark';
import { AppearanceProvider, Appearance, useColorScheme } from 'react-native-appearance';

import { Alert } from 'react-native';
import * as Font from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer
} from '@react-navigation/native';


class MainScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }

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
          <Content padder>
            <Text>Hello</Text>
          </Content>
          <Footer ></Footer>
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
