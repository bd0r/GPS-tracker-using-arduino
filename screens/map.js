import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, StatusBar, ImageBackground } from 'react-native';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';


export default class map extends React.Component {

    constructor(props) {
        super(props);

        const { params } = this.props.navigation.state;
        datatime = params.time;
        latlng = params.datas;
        lat = parseFloat(latlng.substring(0, latlng.indexOf(",")));
        lng = parseFloat(latlng.substring(latlng.indexOf(",") + 1));
        console.log(lat);
        console.log(lng);
        coords = "{latitude: " + lat + ", longitude: " + lng + "}";
        
        this.state = {
            latitude: 0,
            longitude: 0,
            coords: { latitude: 33.3271, longitude: 44.2955 },
        };

    }

    componentDidMount(){
        this.setState({coords:{latitude:lat, longitude: lng},
        
        })
    }
    render() {

        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: this.state.coords.latitude,
                        longitude: this.state.coords.longitude,
                        latitudeDelta: 0.0,
                        longitudeDelta: 0.012
                    }}>
                    <MapView.Marker
                        coordinate={this.state.coords}
                        title="Your GPS Was Here At."
                        description={datatime}
                    />
                </MapView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    map: {
        flex: 1,
        alignSelf: 'stretch'
    }
});

/* ---------------------- Draw Line -------------------------
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView, Polyline } from 'expo';

const points = [
          {latitude: 33.32114, longitude: 44.24255},
          {latitude: 33.32129, longitude: 44.24371},
          {latitude: 33.32194, longitude: 44.24764},
          {latitude: 33.32298, longitude: 44.25269},
          {latitude: 33.32613, longitude: 44.28313},
          {latitude: 33.32596, longitude: 44.28566},
          {latitude: 33.32531,  longitude: 44.28752},
          {latitude: 33.32543, longitude:44.28845},
          {latitude: 33.32333, longitude: 44.28939}
];

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: 33.32100,
            longitude:  44.24200,
            latitudeDelta: 0.0,
            longitudeDelta: 0.012
          }}>
          <MapView.Polyline
          coordinates={points}
          strokeWidth={5}
          strokeColor="#00a8fa"
          lineCap="around"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch'
  }
});

*/



/* ----------------------------- Current location marker ----------------------------------------------

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

export default class App extends Component {
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
       location,
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location), location, });
 };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          onRegionChange={this._handleMapRegionChange}
        >
    <MapView.Marker
      coordinate={this.state.location.coords}
      title="My Marker"
      description="Some description"
    />
        </MapView>

        <Text>
          Location: {this.state.locationResult}
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

*/