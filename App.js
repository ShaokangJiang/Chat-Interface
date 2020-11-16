import React, { Component } from 'react';
import { Container, Content, Text, StyleProvider, H1, H2, Left, Title, Button, Header, List, ListItem, Separator, Icon, Body, View, Fab, Right, Tab, Tabs, ScrollableTab } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import * as Font from 'expo-font';
import MainTab from './MainTab';
import Add from './Add';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer
} from '@react-navigation/native';

class MainScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    }
    this.storeData = this.storeData.bind(this);
    this.getData = this.getData.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this)
  }

  async storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) { // saving error
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ loading: false })
  }

  async getData(key) {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) { // value previously stored
      }
    } catch (e) { // error reading value
    }
  }

  async handleAddItem(obj) {

  }

  async handleEditItem(obj) {

  }

  render() {
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
    return (

      <Stack.Navigator initialRouteName="Main"  screenOptions={{ 
        headerStyle: {
          backgroundColor: '#2b82c9',
        },
        headerTintColor: '#fff' }}>
        <Stack.Screen name="Organize" options={{ header: (props) => <CustomHeader {...props} />}}>
          {(props) =>
            <StyleProvider style={getTheme(material)}>
              <Container>
                <Tabs renderTabBar={() => <ScrollableTab style={{height: '6%'}} />}>
                  <Tab heading="MainTab"  tabStyle={{ backgroundColor: "#2b82c9" }}  activeTabStyle={{ backgroundColor: "#2b82c9" }}>
                    <MainTab {...props} />
                  </Tab>
                  <Tab heading="MainTab" tabStyle={{ backgroundColor: "#2b82c9" }}  activeTabStyle={{ backgroundColor: "#2b82c9" }}>
                    <MainTab {...props} />
                  </Tab>
                  <Tab heading="MainTab" tabStyle={{ backgroundColor: "#2b82c9" }}  activeTabStyle={{ backgroundColor: "#2b82c9" }}>
                    <MainTab {...props} />
                  </Tab>
                  <Tab heading="MainTab" tabStyle={{ backgroundColor: "#2b82c9" }}  activeTabStyle={{ backgroundColor: "#2b82c9" }}>
                    <MainTab {...props} />
                  </Tab>
                  <Tab heading="MainTab" tabStyle={{ backgroundColor: "#2b82c9" }}  activeTabStyle={{ backgroundColor: "#2b82c9" }}>
                    <MainTab {...props} />
                  </Tab>
                </Tabs>
              </Container>
            </StyleProvider>}
        </Stack.Screen>
        <Stack.Screen name="Add" options={{ header: (props) => <CustomHeader {...props} />}}>
          {(props) => <Add {...props} />}
        </Stack.Screen>
      </Stack.Navigator>



    );
  }

}

const CustomHeader = ({scene, previous, navigation}) => {
  const {options} = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Header>
      {previous ? (
          <Left><Button transparent onPress={navigation.goBack}>
            <Icon name="arrow-back" />
          </Button></Left>
        ) : <View style={{paddingLeft: 10}}></View>}
      
      <Body><Title>{title}</Title></Body>
      <Right></Right>
    </Header>
  );
};


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <MainScreen />

    </NavigationContainer>
  );
}
