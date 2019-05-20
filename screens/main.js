import React from 'react';
import { StyleSheet, View, Button, Image, ImageBackground } from 'react-native';

const marker = require("../assets/marker.png");
const polyline = require("../assets/polyline.png");

export default class Main extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {


    };
  }
 

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        elevation: null,
      },
      headerRight: (
        <Button
          color="#ff5c5c"
          primary
          title="Logout"
          onPress={() => { navigation.navigate("Login")}}>
      </Button>
      ),
      title:'Contacts'
    }
  };

  marker() {
    const { navigate } = this.props.navigation;
    navigate("Home");
  }

  Polyline() {
    const { navigate } = this.props.navigation;
    navigate("Drawmap");
  }
  render() {
    return (
      <ImageBackground
        source={require('../assets/bg.jpg')}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={styles.container}>
          <View style={styles.button}>
          <Image source={marker} style={styles.image}/>
            <Button style={styles.button} title="Maps Marker" onPress={() => { this.marker(); }}></Button>
          </View>
          <View style={styles.button}>
          <Image source={polyline} style={styles.image}/>
            <Button title="Maps polyline" onPress={() => { this.Polyline(); }}></Button>
          </View>
        </View>
      </ImageBackground >
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
  },
  button: {
    flex: 1,
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width: 200,
    height:100,
    borderRadius: 10
  }

});

