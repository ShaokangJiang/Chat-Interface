import React, { Component } from 'react';
import { Container, Content, Text, StyleProvider, Left, Title, Button, Header, List, ListItem, Separator, Icon, Body, View, Fab, Right, Item } from 'native-base';
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

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>

          <Item>
            <ListItem>
              
            </ListItem>
          </Item>
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
                style={{ width: "90%" }}
              />)}
            <Text>{this.state.date.toDateString()}</Text>
            
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}