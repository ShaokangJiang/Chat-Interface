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

var tempObj = {};
var idRange = 0;

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
    this.handleModifyCategory = this.handleModifyCategory.bind(this);
    this.changeTemp = this.changeTemp.bind(this);
  }

  changeTemp(key, value){
    tempObj[key] = value;
  }

  cleanTemp(){
    tempObj = {};
  }

  async storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
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
    //await AsyncStorage.removeItem("category");
    //await AsyncStorage.removeItem("data");
    let cat = await this.getData("category");
    if (cat === null) {//no item, do initialize
      let categories = {
        "Income": ["Salary"],
        "Expense": ["Normal", "Emergent"]
      };
      this.setState({
        category: categories
      });
      await this.storeData("category", categories);
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
          "id":1,
          "Amount": 0,
          "Income": true,
          "Category": "Salary",
          "Title": "Initial Salary",
          "Description": "Here is your initial salary, it is just a sample"
        },
        {
          "id":2,
          "Amount": 0,
          "Income": false,
          "Category": "Normal",
          "Title": "Initial Expense",
          "Description": "Here is your initial Expense, it is just a sample"
        },
        {
          "id":3,
          "Amount": 0,
          "Income": false,
          "Category": "Emergent",
          "Title": "Initial Expense Emergent",
          "Description": "Here is your initial Expense, it is just a sample"
        }
      ];

      // console.log(data);
      this.setState({
        data: data
      });
      await this.storeData("data", data);
    } else {
      this.setState({
        data: dat
      });
    }

    for(let i of Object.keys(this.state.data)){
      for(let k of this.state.data[i]){
        if(k.id > idRange) idRange = k.id;
      }
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


  async handleAddItem(navigation) {
    // console.log(tempObj);
    // Object {
    //   "amount": 866,
    //   "category": "Salary",
    //   "date": 2020-11-24T03:45:29.198Z,
    //   "income": "Income",
    //   "title": "Fjk",
    // }

    if(Object.keys(tempObj).length<6) {
      Alert.alert("Please fill all fields");
      return;
    }
    navigation.goBack();
    let a = tempObj.date.toLocaleDateString();

    let temp = this.state.data;
    if(temp[a] === undefined){
      temp[a] = [];
    }
    let newElement = {};
    idRange++;
    newElement["id"] = idRange;
    newElement["Amount"] = tempObj.amount;
    newElement["Income"] = tempObj.income.localeCompare("Income") === 0 ? true : false;
    newElement["Category"] = tempObj.category;
    newElement["Title"] = tempObj.title;
    newElement["Description"] = tempObj.description;
    temp[a].push(newElement);
    console.log(temp[a]);
    this.setState({data: temp});
    await this.storeData("data", temp);

    this.cleanTemp();
    //console.log(tempObj);
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
        <Stack.Screen name="Organize" options={{ header: (props) => <CustomHeader {...props} data="normal" functions={""} /> }}>
          {(props) =>
            <StyleProvider style={getTheme(material)}>
              <Container>
                <Tabs renderTabBar={() => <ScrollableTab style={{ height: '6%' }} />} initialPage={1} >
                  <Tab heading="Order" tabStyle={{ backgroundColor: "#2b82c9" }} activeTabStyle={{ backgroundColor: "#2b82c9" }}>
                    <Ordering {...props} category={this.state.category} handleModifyCategory={this.handleModifyCategory}/>
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
        <Stack.Screen name="Add" options={{ header: (props) => <CustomHeader {...props} data="Add" functions={this.handleAddItem}/> }}>
          {(props) => <Add {...props} data={this.state.data} changeTemp={this.changeTemp} category={this.state.category}  />}
        </Stack.Screen>
      </Stack.Navigator>

    );
  }

}

const CustomHeader = ({ scene, previous, navigation, data , functions}) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
        ? options.title
        : scene.route.name;

        let rightSide = null;
  if(data.localeCompare("Add") === 0){

    return (
      <Header>
        {previous ? (
          <Left><Button transparent onPress={navigation.goBack}>
            <Icon name="arrow-back" />
          </Button></Left>
        ) : <View style={{ paddingLeft: 10 }}></View>}
  
        <Body><Title>{title}</Title></Body>
        <Right><Button transparent iconLeft onPress={() => {functions(navigation);}}><Icon type="MaterialIcons" name='save' /><Text>{"Save"}</Text></Button></Right>
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
    <NavigationContainer>
      <MainScreen />

    </NavigationContainer>
  );
}
