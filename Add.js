import React, { Component } from 'react';
import { Container, Form, Textarea, Picker, Content, Label, Input, Text, StyleProvider, Left, Title, Button, Header, List, ListItem, Separator, Icon, Body, View, Fab, Right, Item } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import materialDark from './native-base-theme/variables/material-dark';
import { AppearanceProvider } from 'react-native-appearance';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class ThemeExample extends Component {


  constructor(props) {
    super(props);
    this.state = {
      active: false,
      date: new Date(),
      income: "Income",
      amount: 0,
      second: this.props.category.Income[0]
    }
    this.setDate = this.setDate.bind(this);
    this.setMode = this.setMode.bind(this);
    this.setshow = this.setShow.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.changeTemp('date', this.state.date);
    this.props.changeTemp("income", "Income");
    this.props.changeTemp("description", "   ");
    this.props.changeTemp("category", this.props.category.Income[0]);
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
    this.props.changeTemp('date', currentDate);
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

  getSecondarySelection() {
    let re = [];
    let id = 0;
    if (this.state.income.localeCompare("Income") === 0) {
      for (let a of this.props.category.Income) {
        re.push(
          <Picker.Item key={id++} label={a} value={a} />
        );
      }
    } else {
      for (let a of this.props.category.Expense) {
        re.push(
          <Picker.Item key={id++} label={a} value={a} />
        );
      }

    }
    return re;
  }

  render() {
    return (
      <Container>
        <Item>
          <Input placeholder="Title" onChange={(event) => this.props.changeTemp("title", event.nativeEvent.text)} />
        </Item>
        <View style={{ marginLeft: 5, marginRight: 5, marginBottom: 10 }}>

          <Item style={{ borderColor: 'transparent', marginBottom: '3%' }}>
            <Text>{"Category:"}</Text>
            <Body style={{backgroundColor: 'white'}}>
              <Item picker >
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  textStyle={{ color: "#5cb85c" }}
                  itemStyle={{
                    backgroundColor: "#d3d3d3",
                    marginLeft: 0,
                    paddingLeft: 10
                  }}
                  itemTextStyle={{ color: '#788ad2' }}
                  style={{ width: undefined }}
                  selectedValue={this.state.income}
                  onValueChange={(value) => {
                    this.props.changeTemp("income", value)
                    this.props.changeTemp("category", value.localeCompare("Income") === 0 ? this.props.category.Income[0] : this.props.category.Expense[0]);
                    this.setState({ income: value })
                  }}
                >
                  <Picker.Item label="Income" value="Income" />
                  <Picker.Item label="Expense" value="Expense" />
                </Picker>
              </Item></Body>
            <Right style={{backgroundColor: 'white'}}>
              <Item picker >
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  textStyle={{ color: "#5cb85c" }}
                  itemStyle={{
                    backgroundColor: "#d3d3d3",
                    marginLeft: 0,
                    paddingLeft: 10
                  }}
                  itemTextStyle={{ color: '#788ad2' }}
                  selectedValue={this.state.second}
                  onValueChange={(value) => {
                    this.props.changeTemp("category", value);
                    this.setState({ second: value });
                    //console.log(value);
                  }}
                >
                  {this.getSecondarySelection()}
                </Picker>
              </Item></Right>
          </Item>

          <Item >
            <Input placeholder="Amount" keyboardType="numeric" onChange={(event) => this.props.changeTemp("amount", parseFloat(event.nativeEvent.text))} />
            <Button primary bordered iconLeft onPress={this.showDatepicker}><Icon type="MaterialIcons" name='schedule' /><Text>{this.state.date.toDateString()}</Text></Button>
          </Item>
        </View>

        <Content>

          <Textarea rowSpan={20}
            onChange={(event) => {
              this.props.changeTemp("description", event.nativeEvent.text);
            }} placeholder="Textarea" />
        </Content>
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
      </Container>
    );
  }
}