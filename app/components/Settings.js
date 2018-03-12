import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, AsyncStorage} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base'

var IP_KEY = "voice_ipaddress"

class Home extends React.Component {
  static navigationOptions = { title: 'Settings' };
  constructor(props) {
    super(props);
    this.state={ipaddress:'192.168.1.45'};
  }
  componentDidMount() {
    AsyncStorage.getItem(IP_KEY).then(async (value) => {
      if(value!=null) this.setState({ipaddress:value})
    });
  }
  handleChange(value) {
    this.setState({ipaddress:value})
  }
  handleSave() {
    AsyncStorage.setItem(IP_KEY, this.state.ipaddress);
    this.props.navigation.navigate('Home');
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.view}>
          <Form>
            <Item floatingLabel last>
              <Label style={{color:'white'}}>IP</Label>
              <Input style={{color:'white'}} value={this.state.ipaddress} onChangeText={this.handleChange.bind(this)}/>
            </Item>
            <Button block light onPress={this.handleSave.bind(this)} style={{marginTop:20}}>
              <Text>Save</Text>
            </Button>
          </Form>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#2f3640',
    flex: 1,
    flexDirection:'column',
  },
  view: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
