import React, { Component } from 'react';
import { Container, Content, Text, StyleProvider, Left, Title, Button, Header, List, ListItem, Separator, Icon, Body, View, Fab, Right } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class ThemeExample extends Component {


  constructor(props) {
    super(props);
    this.state = {
      active: false,
      date: new Date()
    }
    this.storeData = this.storeData.bind(this);
    this.getData = this.getData.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setMode = this.setMode.bind(this);
    this.setshow = this.setShow.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  setDate(dat) {
    this.setState({ date: dat });
  }

  setMode(variable) {
    this.setState({ mode: variable });
  }

  setShow(bool) {
    this.setState({ show: bool });
  }

  onChange(event, selectedDate) {
    const currentDate = selectedDate || this.state.date;
    this.setShow(Platform.OS === 'ios');
    this.setDate(currentDate);
  }

  showMode = (currentMode) => {
    this.setShow(true);
    this.setMode(currentMode);
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  showTimepicker = () => {
    this.showMode('time');
  };

  async storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) { // saving error
    }
  }

  async getData(key) {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) { // value previously stored
      }
    } catch (e) { // error reading value
    }
  }

  async handleAddItem(obj){

  }

  async handleEditItem(obj){
    
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Content>
            <Text>
              I have changed the text color.
            </Text>
            <Button light><Text> Light </Text></Button>
            <Button primary><Text> Primary </Text></Button>
            <Button success><Text> Success </Text></Button>

            <Button primary onPress={this.showDatepicker}><Text>Show date picker!</Text></Button>

            {this.state.show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.date}
                        mode={this.state.mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.onChange}
                        style={{width: "90%"}}
                      />)}  
<Text>{this.state.date.toDateString()}</Text>
            <List>
              <Separator bordered>
                <Text>MIDFIELD</Text>
              </Separator>
              <ListItem button onPress={() => { Alert.alert("aaa"); }}>
                <Body>
                  <Text>Kumar Pratik</Text>
                  <Text note>Doing what you like will always keep you happy . .</Text>
                </Body>
                <Right><Icon name="arrow-forward" /></Right>
              </ListItem>
              <ListItem last>
                <Text>Lee Allen</Text>
              </ListItem>
              <Separator bordered>
                <Text>MIDFIELD</Text>
              </Separator>
              <ListItem>
                <Text>Caroline Aaron</Text>
              </ListItem>
              <ListItem last>
                <Text>Lee Allen</Text>
              </ListItem>
              <Separator bordered>
                <Text>MIDFIELD</Text>
              </Separator>
              <ListItem>
                <Body>
                  <Text>Kumar Pratik</Text>
                  <Text note>Doing what you like will always keep you happy . .</Text>
                </Body>
              </ListItem>
              <ListItem last>
                <Text>Lee Allen</Text>
              </ListItem>
              <Separator bordered>
                <Text>MIDFIELD</Text>
              </Separator>
              <ListItem>
                <Text>Caroline Aaron</Text>
              </ListItem>
              <ListItem last>
                <Text>Lee Allen</Text>
              </ListItem>
              <Separator bordered>
                <Text>MIDFIELD</Text>
              </Separator>
              <ListItem>
                <Body>
                  <Text>Kumar Pratik</Text>
                  <Text note>Doing what you like will always keep you happy . .</Text>
                </Body>
              </ListItem>
              <ListItem last>
                <Text>Lee Allen</Text>
              </ListItem>
              <Separator bordered>
                <Text>MIDFIELD</Text>
              </Separator>
              <ListItem>
                <Text>Caroline Aaron</Text>
              </ListItem>
              <ListItem last>
                <Text>Lee Allen</Text>
              </ListItem>
            </List>


          </Content>

          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="share" />
            <Button style={{ backgroundColor: '#34A34F' }}>
              <Icon name="logo-whatsapp" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="logo-facebook" />
            </Button>
            <Button disabled style={{ backgroundColor: '#DD5144' }}>
              <Icon name="mail" />
            </Button>
          </Fab>
        </Container>
      </StyleProvider>
    );
  }
}