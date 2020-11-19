import React, { Component } from 'react';
import { Container, Content, Text, StyleProvider, Left, Title, CheckBox, Button, Header, List, ListItem, Separator, Icon, Body, View, Fab, Right } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert, Dimensions } from 'react-native';
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

    convert2Month(data) {
        let a = new Date(data);
        const month = [];
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        return month[a.getMonth()] + ", "+ a.getFullYear();
    }

    getMonthSpending(k){
        let re = {
            "spend" : 0,
            "income" : 0
        }
        let toCompare = this.convert2Month(k);
        for(let i of Object.keys(this.props.data)){
            if(this.convert2Month(i).localeCompare(toCompare) === 0){
                for(let k of this.props.data[i]){
                    k.Income ? 
                        re.income += k.Amount : 
                        re.spend += k.Amount ;
                }
            }
        }
        return re;
    }

    getItems() {
        let re = [];
        let last = "";
        let id = 0;
        for (let i of Object.keys(this.props.data)) {
            if (last.localeCompare(this.convert2Month(i)) !== 0) {
                last = i;
                let spending = this.getMonthSpending(i);
                let subtotal = spending.income-spending.spend;
                re.push(
                    <ListItem itemDivider key={i}>
              <Left><Text>{this.convert2Month(i)}</Text></Left>
                <Right><Text><Text style={{color: 'green'}}>{"-"+spending.spend+"  "}</Text><Text style={{color: 'red'}}>{"+"+spending.income}</Text>
                </Text></Right>
                    </ListItem> );
            }
            for (let k of Object.values(this.props.data[i])) {
                if(this.props.category.localeCompare(k.Category) === 0)
                re.push(
                    <ListItem noIndent thumbnail key={id++} button onPress={() => { this.state.delete ? this.setState({ delete: false }) : Alert.alert("aaa"); }} onLongPress={() => { this.setState({ delete: true }) }}>
                        {this.state.delete ? (
                            <Left style={{ marginLeft: -17, marginRight: 10 }}><CheckBox checked={true} onPress={() => { this.setState({ delete: false }) }} /></Left>
                        ) : <Left style={{ marginLeft: -20 }}></Left>}
                        <Body >
                            <Text>{this.truncate(k.Title) + "  "}<Text style={k.Income ? { color: 'red' } : { color: 'green' }}>{(k.Income ? "+" : "-")+ k.Amount}</Text></Text>
                            <Text note>{this.truncateContent(k.Description)}</Text>
                        </Body>
                        <Right><Icon name="arrow-forward" /></Right>
                    </ListItem>
                );
            }
        }
        return re;
    }

    truncate(string) {
        let a = parseInt(Dimensions.get('window').width/15.68);
        return string.length > a ? string.substring(0, a-3) + "..." : string;
    }

    truncateContent(string) {
        let a = parseInt(Dimensions.get('window').width/8.5);
        return string.length > a ? string.substring(0, a-3) + "..." : string;
    }

    render() {
        return (

            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Content>
                        <List>
                            {this.getItems()}
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