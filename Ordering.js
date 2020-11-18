import React, { Component } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import DraggableFlatList from './index'
import { Form, Item, Label, Input, Container, Picker, Content, Text, StyleProvider, Left, Title, CheckBox, Button, Header, List, ListItem, Separator, Icon, Body, View, Fab, Right } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
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

  render() {
    //console.log(this.state.data);
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>

          <List>

            <Separator bordered>
              <Text>Income</Text>
            </Separator>
            {this.getIncome()}
            <Separator bordered>
              <Text>Expense</Text>
            </Separator>
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

              <View style={{ backgroundColor: 'white', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center' }}>
                <Form>
                  <Text style={{ color: 'red' }}>{this.state.notification}</Text>
                  <Item floatingLabel last style={{ paddingBottom: '3%', alignItems: 'stretch', width: '90%' }}>
                    <Label >Name</Label>
                    <Input onChange={(event) => this.setState({ addText: event.nativeEvent.text })} />
                  </Item>
                  <Item style={{ borderColor: 'transparent', marginTop: '6%' }}>
                    <Text>{"Category:"}</Text>
                    <Right>
                      <Item picker >
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          placeholder="Pick Category"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.addCategory}
                          onValueChange={(value) => this.setState({ addCategory: value })}
                        >
                          <Picker.Item label="Income" value="Income" />
                          <Picker.Item label="Expense" value="Expense" />
                        </Picker>
                      </Item></Right>
                  </Item>
                </Form>

                <Button block style={{ margin: '5%', marginTop: '12%' }}
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
      </StyleProvider>
    );
  }
}
export default Order;



