import React, { Component } from 'react';
import { Container, Content, Text, StyleProvider, Left, Title, Button, Header, List, ListItem, Separator, Icon, Body, View, Fab, Right } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
export default class ThemeExample extends Component {


  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }

  storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) { // saving error
    }
  }

  getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) { // value previously stored
      }
    } catch (e) { // error reading value
    }
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header >
            <Left />
            <Body>
              <Title>Organize</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <Text>
              I have changed the text color.
            </Text>
            <Button light><Text> Light </Text></Button>
            <Button primary><Text> Primary </Text></Button>
            <Button success><Text> Success </Text></Button>

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