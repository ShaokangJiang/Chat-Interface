import React, { Component } from 'react';
import { Container, Content, Text, StyleProvider, H1, H2, Left, Title, Button, Header, List, ListItem, Separator, Icon, Body, View, Fab, Right, Tab, Tabs, ScrollableTab } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import * as Font from 'expo-font';
import MainTab from './MainTab';
import Ordering from './Ordering';
import Home from './Home';
import Add from './Add';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer
} from '@react-navigation/native';

class MainScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      category: {},
      loading: true
    }
    this.storeData = this.storeData.bind(this);
    this.getData = this.getData.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this)
    this.getOtherTabs = this.getOtherTabs.bind(this);
  }


  async storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) { // saving error
    }
  }

  async getData(key) {
    try {
      const value = await AsyncStorage.getItem(key)
      return JSON.parse(value);
    } catch (e) { // error reading value
    }
  }

  async initialize() {
    await AsyncStorage.removeItem("category");
    await AsyncStorage.removeItem("data");
    let cat = await this.getData("category");
    if (cat === null) {//no item, do initialize
      let categories = {
        "Income": ["Salary"],
        "Expense": ["Normal", "Emergent"]
      };
      this.setState({
        category: categories
      });
      await this.storeData("category", JSON.stringify(categories));
    } else {
      this.setState({
        category: cat
      });
    }

    let dat = await this.getData("data");
    if (dat === null) {
      let time = new Date().toLocaleDateString();
      let data = {};
      data[time] = [
        {
          "Amount": 0,
          "Income": true,
          "Category": "Salary",
          "Title": "Initial Salary",
          "Description": "Here is your initial salary, it is just a sample"
        },
        {
          "Amount": 0,
          "Income": false,
          "Category": "Normal",
          "Title": "Initial Expense",
          "Description": "Here is your initial Expense, it is just a sample"
        },
        {
          "Amount": 0,
          "Income": false,
          "Category": "Emergent",
          "Title": "Initial Expense",
          "Description": "Here is your initial Expense, it is just a sample"
        }
      ];

      // console.log(data);
      this.setState({
        data: data
      });
      await this.storeData("data", JSON.stringify(data.stringify));
    } else {
      this.setState({
        data: dat
      });
    }
  }

  async handleModifyCategory(categories) {
    this.setState({
      category: categories
    });
    await this.storeData("category", categories);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    await this.initialize();
    this.setState({ loading: false })
  }


  async handleAddItem(obj) {

  }

  async handleEditItem(obj) {

  }

  getOtherTabs(props) {
    let tabs = [];
    for (let i of Object.values(this.state.category.Income)) {
      //console.log(i);
      tabs.push(
        <Tab heading={i} key={i} tabStyle={{ backgroundColor: "#2b82c9" }} activeTabStyle={{ backgroundColor: "#2b82c9" }}>
          <MainTab {...props} category={i} data={this.state.data} />
        </Tab>
      );
    }
    for (let i of Object.values(this.state.category.Expense)) {
      //console.log(i);
      tabs.push(
        <Tab heading={i} key={i} tabStyle={{ backgroundColor: "#2b82c9" }} activeTabStyle={{ backgroundColor: "#2b82c9" }}>
          <MainTab {...props} category={i} data={this.state.data} />
        </Tab>
      );
    }
    return tabs;
  }

  render() {
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
    return (

      <Stack.Navigator initialRouteName="Organize" screenOptions={{
        headerStyle: {
          backgroundColor: '#2b82c9',
        },
        headerTintColor: '#fff'
      }}>
        <Stack.Screen name="Organize" options={{ header: (props) => <CustomHeader {...props} /> }}>
          {(props) =>
            <StyleProvider style={getTheme(material)}>
              <Container>
                <Tabs renderTabBar={() => <ScrollableTab style={{ height: '6%' }} />} initialPage={1} >
                  <Tab heading="Order" tabStyle={{ backgroundColor: "#2b82c9" }} activeTabStyle={{ backgroundColor: "#2b82c9" }}>
                    <Ordering {...props} category={this.state.category} />
                  </Tab>
                  <Tab heading="Home" tabStyle={{ backgroundColor: "#2b82c9" }} activeTabStyle={{ backgroundColor: "#2b82c9" }}>
                    <Home {...props} data={this.state.data} />
                  </Tab>
                  {this.getOtherTabs(props)}
                </Tabs>
              </Container>
            </StyleProvider>
          }
        </Stack.Screen>
        <Stack.Screen name="Add" options={{ header: (props) => <CustomHeader {...props} /> }}>
          {(props) => <Add {...props} />}
        </Stack.Screen>
      </Stack.Navigator>

    );
  }

}

const CustomHeader = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
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
      ) : <View style={{ paddingLeft: 10 }}></View>}

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
