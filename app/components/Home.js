import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content, Button, Text, Icon} from 'native-base';
import Voice from 'react-native-voice';
import axios from 'axios';

var IP_KEY = "voice_ipaddress";

var VoiceData = [
  {voice:"light one on", command:"pin=16&on=1"},
  {voice:"light one of", command:"pin=16&on=0"},
  {voice:"light two on", command:"pin=5&on=1"},
  {voice:"light two of", command:"pin=5&on=0"},
  {voice:"fan one on", command:"pin=4&on=1"},
  {voice:"fan one of", command:"pin=4&on=0"},
  {voice:"fan two on", command:"pin=2&on=1"},
  {voice:"fan two of", command:"pin=2&on=0"},

  {voice:"light 1 on", command:"pin=16&on=1"},
  {voice:"light 1 of", command:"pin=16&on=0"},
  {voice:"light 2 on", command:"pin=5&on=1"},
  {voice:"light 2 of", command:"pin=5&on=0"},
  {voice:"fan 1 on", command:"pin=4&on=1"},
  {voice:"fan 1 of", command:"pin=4&on=0"},
  {voice:"fan 2 on", command:"pin=2&on=1"},
  {voice:"fan 2 of", command:"pin=2&on=0"},
]

export default class Home extends Component {
  static navigationOptions = {
    title: 'Welcome',
    header:null,
  };
  constructor(props) {
    super(props);
    this.state={
      active: false,
      message: "Tap to speak.",
      ipaddress:'192.168.1.45',
    }
    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    console.log(Voice)
  }
  componentDidMount() {
    AsyncStorage.getItem(IP_KEY).then(async (value) => {
      if(value!=null) this.setState({ipaddress:value})
    });
  }
  onPress() {
    if(!this.state.active) {
      Voice.start('en-US').catch((error)=>console.log(error));
    }else {
      Voice.stop();
    }
    this.setState({active:!this.state.active})
  }
  onSpeechStartHandler(event) {
    console.log("onSpeechStartHandler", event)
    this.setState({message:"Listening..."});
  }
  onSpeechEndHandler(event) {
    console.log("onSpeechEndHandler", event)
    this.setState({active:false, message:"Tap to speak."});
  }
  onSpeechResultsHandler(event) {
    console.log("onSpeechResultsHandler", event);
    var values = event.value;
    values.forEach((value)=> {
      VoiceData.forEach((data)=> {
        if(value.toLowerCase()==data.voice) {
          this.doControl(data);
          return;
        }
      })
    })
  }
  doControl(data) {
    this.setState({message:"Working..."});
    var url ="http://" + this.state.ipaddress + "?" + data.command;
    console.log(url);
    axios.get(url)
    .catch((error)=>{
      alert(error);
    });
    setTimeout(function () {
      this.setState({active:false, message:"Tap to speak."});
    }.bind(this), 500);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <Button style={this.state.active?styles.controlOn:styles.controlOff} onPress={this.onPress.bind(this)}>
            <Icon name="microphone" style={this.state.active?styles.controllOnButton:styles.controllOffButton}/>
          </Button>
        </View>
        <View style={styles.view}>
          <Text style={{color:'#fff'}}>{this.state.message}</Text>
        </View>
        <View style={styles.view}>
          <Button transparent block onPress={e=>this.props.navigation.navigate('Settings')}>
            <Icon name="cog" style={{color:'#FFF'}}/>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#2f3640',
    flex: 1,
  },
  view: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOn: {
    marginTop:130,
    height: 150,
    width: 150,
    borderRadius: 75,
    justifyContent: 'center',
    backgroundColor: '#22A7F0',
    marginBottom: 20,
  },
  controlOff: {
    marginTop:130,
    height: 150,
    width: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#fff',
    marginBottom: 20,
  },
  controllOnButton: {
    fontSize: 56,
    color:'#fff',
  },
  controllOffButton: {
    fontSize: 56,
    color:'#22A7F0',
  }
});
