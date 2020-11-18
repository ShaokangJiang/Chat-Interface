import React, { Component } from 'react';
import { Container, Content, Text, StyleProvider, Left, Title, CheckBox, Button, Header, List, ListItem, Separator, Icon, Body, View, Fab, Right } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            date: new Date(),
            delete: false
        }
    }

    render() {
        return (

            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Content>
                        <Text>
                            {this.props.category}
                        </Text>
                        <Button light><Text> Light </Text></Button>
                        <Button primary><Text> Primary </Text></Button>
                        <Button success><Text> Success </Text></Button>

                        <List>
                            <Separator bordered>
                                <Text>MIDFIELD</Text>
                            </Separator>
                            <ListItem noIndent thumbnail button onPress={() => { Alert.alert("aaa"); }} onLongPress={() => { this.setState({ delete: true }) }}>

                                {this.state.delete ? (
                                    <Left style={{ marginLeft: -17, marginRight: 10 }}><CheckBox checked={true} /></Left>
                                ) : <Left style={{ marginLeft: -20 }}></Left>}
                                <Body >
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
                        <Icon name="add" />
                        <Button style={{ backgroundColor: '#34A34F' }} onPress={() => { this.props.navigation.navigate("Add") }}>
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