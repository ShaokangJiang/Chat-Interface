import React, { Component } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import DraggableFlatList from './index'
import { Form, Item, Label, Input, Container, Picker, Content, Text, StyleProvider, Left, Title, CheckBox, Button, Header, List, ListItem, Separator, Icon, Body, View, Fab, Right } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import materialDark from './native-base-theme/variables/material-dark';
import { AppearanceProvider, Appearance, useColorScheme } from 'react-native-appearance';
import { Overlay } from 'react-native-elements';
import Modal from 'react-native-modal';

class Example extends Component {

  state = {
    data: [...Array(20)].map((d, index) => ({
      key: `item-${index}`,
      label: index,
      backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
    }))
  }

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: isActive ? 'blue' : item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onLongPress={move}
        onPressOut={moveEnd}>
        <Text style={{
          fontWeight: 'bold',
          color: 'white',
          fontSize: 32,
        }}>{item.label}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <DraggableFlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          scrollPercent={5}
          onMoveEnd={({ data }) => this.setState({ data })}
        />
      </View>
    )
  }
}

class Order extends Component {


  constructor(props) {
    super(props);
    this.state = {
      data: this.props.category.Expense,
      visible: false,
      addText: "",
      addCategory: "",
      notification: "",
    }
    this.setVisible = this.setVisible.bind(this);
    this.testconflict = this.testconflict.bind(this);
  }

  setVisible() {
    this.setState({ visible: !this.state.visible });
  }


  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      <ListItem thumbnail
        style={{
          height: 70
        }}
        onLongPress={move}
        onPressOut={moveEnd}>
        <Left style={{ marginLeft: 0 }}><Icon type="MaterialIcons" name="menu" /></Left>
        <Body >
          <Text>{item}</Text>
        </Body>
        <Right><Button transparent iconLeft onPress={() => {
          Alert.alert(
            'Remove confirmation',
            'Are you sure to delete? This effort can not be redo.',
            [
              {
                text: 'Cancel',
                onPress: () => { },
                style: 'cancel'
              },
              {
                text: 'OK', onPress: () => {
                  let h = this.props.category;
                  if(this.testconflict(false, item)){
                    //console.log(this.testconflict(false, item));
                    Alert.alert(
                      "Conflict found",
                      "Be sure to remove items belongs to this category at first");
                    return;
                  }
                  h.Expense.splice(h.Expense.indexOf(item), 1);
                  this.props.handleModifyCategory(h);
                }
              }
            ],
            { cancelable: false }
          );
        }}>
          <Icon type="MaterialIcons" name='delete' style={{ color: 'red' }} />
        </Button></Right>
      </ListItem>
    )
  }

  getIncome() {
    let re = [];
    for (let k of this.props.category.Income) {
      re.push(
        <ListItem key={k}>
          <Body><Text>{k}</Text></Body>
          <Right><Button transparent iconLeft onPress={() => {

            Alert.alert(
              'Remove confirmation',
              'Are you sure to delete? This effort can not be redo.',
              [
                {
                  text: 'Cancel',
                  onPress: () => { },
                  style: 'cancel'
                },
                {
                  text: 'OK', onPress: () => {
                  if(this.testconflict(true, k)){
                    Alert.alert(
                      "Conflict found",
                      "Be sure to remove items belongs to this category at first");
                    return;
                  }
                    let h = this.props.category;
                    h.Income.splice(h.Income.indexOf(k), 1);
                    this.props.handleModifyCategory(h);
                  }
                }
              ],
              { cancelable: false }
            );
          }}>
            <Icon type="MaterialIcons" name='delete' style={{ color: 'red' }} />
          </Button></Right>
        </ListItem>
      );
    }
    return re;
  }

  testconflict(income, category){
    for(let k of Object.keys(this.props.data)){
      for(let m of this.props.data[k]){
        if(m.Income === income && m.Category.localeCompare(category) === 0){
          return true;
        }
      }
    }
    return false;
  }

  render() {
    //console.log(this.state.data);
    return (
        <Container>

          <List>

            <ListItem itemDivider key={1}>
            <Text>Income</Text>
                    </ListItem>
            {this.getIncome()}
            
            <ListItem itemDivider key={2}>
            <Text>Expense</Text>
                    </ListItem>
          </List>

          <DraggableFlatList
            data={this.props.category.Expense}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item}`}
            scrollPercent={5}
            onMoveEnd={({ data }) => {
              let h = this.props.category;
              h.Expense = data;
              this.props.handleModifyCategory(h);
            }}
          />

          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => { this.setVisible() }}>
            <Icon name="add" />
          </Fab>
          <View style={{ height: '30%' }}>
            <Modal isVisible={this.state.visible} onBackdropPress={() => { this.setVisible() }}>
   
              <View style={{ backgroundColor: Appearance.getColorScheme() === 'dark'? '#36454F': 'white', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center' }}>
                <Form>
                  <Text style={{ color: 'red' }}>{this.state.notification}</Text>
                  <Item floatingLabel last style={{ paddingBottom: '3%', alignItems: 'stretch', width: '90%' }}>
                    <Label style={{color: Appearance.getColorScheme() === 'dark'? '#d3d3d3': 'white'}}>Name</Label>
                    <Input onChange={(event) => this.setState({ addText: event.nativeEvent.text })} style={{color: Appearance.getColorScheme() === 'dark'? '#d3d3d3': 'white'}}/>
                  </Item>
                  <Item style={{ borderColor: 'transparent', marginTop: '6%' }}>
                    <Text style={{color: Appearance.getColorScheme() === 'dark'? '#d3d3d3': 'white'}}>{"Category:"}</Text>
                    <Right>
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
                          selectedValue={this.state.addCategory}
                          onValueChange={(value) => this.setState({ addCategory: value })}
                        >
                          <Picker.Item label="Income" value="Income" />
                          <Picker.Item label="Expense" value="Expense" />
                        </Picker>
                      </Item></Right>
                  </Item>
                </Form>

                <Button block style={{ backgroundColor: 'lightblue', margin: '5%', marginTop: '12%' }}
                  onPress={() => {
                    let h = this.props.category;
                    if (h[this.state.addCategory].indexOf(this.state.addText) === -1) {
                      h[this.state.addCategory].push(this.state.addText);
                      this.props.handleModifyCategory(h);
                      this.setVisible();
                    } else {
                      this.setState({ notification: "Dupicate record" });
                    }
                  }}>
                  <Text>Add</Text>
                </Button>
              </View>
            </Modal>
          </View>
        </Container>
    );
  }
}
export default Order;



