import React, { Component } from 'react';
import { Container, Content, Text, StyleProvider, H1, H2, Left, Title, Button, Header, List, ListItem, Separator, Icon, Body, View, Fab, Right, Tab, Tabs, ScrollableTab } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import materialDark from './native-base-theme/variables/material-dark';
import { AppearanceProvider, Appearance, useColorScheme } from 'react-native-appearance';

import AsyncStorage from '@react-native-community/async-storage';
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
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Organize" screenOptions={{
            headerStyle: {
              backgroundColor: '#2b82c9',
            },
            headerTintColor: '#fff'
          }}>
            <Stack.Screen name="Website" options={{ header: (props) => <CustomHeader {...props} data="website" />, title: "Yearly Budgeting Tool" }}>
              {(props) => 
              <StyleProvider style={getTheme(this.state.theme === 'dark' ? materialDark : material)}>
              <Website {...props} data={this.state.data} category={this.state.category} />
              </StyleProvider>
              }
            </Stack.Screen>
           </Stack.Navigator>

        </NavigationContainer>
      </StyleProvider>
    );
  }

}

const CustomHeader = ({ scene, previous, navigation, data, functions, cleanTemp, deletion }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
        ? options.title
        : scene.route.name;

  let rightSide = null;
  if (data.localeCompare("Add") === 0) {

    return (
      <Header>
        {previous ? (
          <Left><Button transparent onPress={() => {
            navigation.goBack();
            cleanTemp();
          }}>
            <Icon name="arrow-back" />
          </Button></Left>
        ) : <View style={{ paddingLeft: 10 }}></View>}

        <Body><Title>{title}</Title></Body>
        <Right><Button transparent iconLeft onPress={() => { functions(navigation); }}><Icon type="MaterialIcons" name='save' /><Text>{"Save"}</Text></Button></Right>
      </Header>
    );
  }

  if (data.localeCompare("normal") === 0) {

    return (
      <Header>
        {previous ? (
          <Left><Button transparent onPress={() => {
            navigation.goBack();
            cleanTemp();
          }}>
            <Icon name="arrow-back" />
          </Button></Left>
        ) : <View style={{ paddingLeft: 10 }}></View>}

        <Body><Title>{title}</Title></Body>
        {deletion.length === 0 ? <Right><Button transparent iconLeft onPress={() => { navigation.navigate("Website") }}><Icon type="MaterialIcons" name='cloud-upload' /></Button></Right>
          : <Right><Button transparent iconLeft onPress={() => { functions() }}><Icon type="MaterialIcons" name='delete' /></Button></Right>
        }

      </Header>
    );
  }

  return (
    <Header>
      {previous ? (
        <Left><Button transparent onPress={navigation.goBack}>
          <Icon name="arrow-back" />
        </Button></Left>
      ) : <View style={{ paddingLeft: 10 }}></View>}

      <Body><Title>{title}</Title></Body>
      <Right></Right>
    </Header>
  );
};


const Stack = createStackNavigator();

export default function App() {
  return (
    <AppearanceProvider>
      <MainScreen />
    </AppearanceProvider>
  );
}
