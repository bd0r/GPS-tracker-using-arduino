import React from 'react';
import { StyleSheet, Text,RefreshControl, View,Alert, ActivityIndicator, ScrollView, StatusBar, ImageBackground, TouchableOpacity } from 'react-native';
//import { createStackNavigator } from 'react-navigation';


export default class data extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      refreshing: false,
    };
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(){
    return fetch('https://api.thingspeak.com/channels/770525/feeds.json?timezone=Asia/Baghdad')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson.feeds,
      })

    })
    .catch((error) => {
      console.log(error)
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      let feeds = this.state.dataSource.map((val, key) => {
        var d = val.created_at;
          var dd = d.replace("T", " ").replace("-","/").replace("-","/").substring(0,19);
          var h = dd.substring(11,13);
          var tm;
          if(h <= 11){tm = " AM"}
          else{tm = " PM"}
        return <View key={key} style={styles.item} >
        <TouchableOpacity onPress={() => {
          
          const { navigate } = this.props.navigation;
           navigate("map",({
             datas: val.field1,
             time: dd+tm
           }));
        }} >
            <Text style={styles.text}>{"Location: "+val.field1}</Text>
            <Text style={styles.text}>{"Time: "+dd+tm}</Text>
            </TouchableOpacity>
          </View>
      });

      return (
        <ImageBackground
          source={require('../assets/bg.jpg')}
          style={{ width: '100%', height: '100%' }}
        >
          <StatusBar
            barStyle="dark-content"
          />
          <ScrollView Style={styles.ContentContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          >
            <View style={styles.container}>
              {feeds}
            </View>
          </ScrollView>
        </ImageBackground >
      );
    }
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#002577',
    //backgroundColor: '#2fb0ed',
    //opacity: 0.5,
  },
  text:{
    fontSize: 18,
    fontWeight: 'bold',
    //color: '#FFFFFF'
  }
});


/*

getInitialState() {
    return {
      region: {
        latitude: 33.319656,
        longitude: 44.243736,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChange={this.onRegionChange}
      >
        {this.state.markers.map(marker => (
          <Marker
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    );
  }
}

*/
