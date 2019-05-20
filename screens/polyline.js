import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';

export default class Drawmap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            coords: { latitude: 0, longitude: 0 },
            dataSource: null,
            points: [],
            isLoading: true,
        }
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        fetch('https://api.thingspeak.com/channels/770525/feeds.json?timezone=Asia/Baghdad')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.feeds,
                })
                //console.log('datasource:', this.state.dataSource)
                this.state.dataSource.map((val, key) => {
                    var latlng = val.field1;
                    var a = latlng.indexOf(',');
                    var lat = parseFloat(latlng.substring(0, a));
                    var lng = parseFloat(latlng.substring(a + 1, latlng.length));
                    this.setState({
                        coords: { latitude: lat, longitude: lng }
                    })
                    this.setState(state => {
                        const points = state.points.concat({ latitude: lat, longitude: lng });
                        return {
                            points,
                        };
                    });
                    //console.log(this.state.points)
                });
                this.setState({
                    isLoading: false
                })
               // console.log('coords:', this.state.coords)

            }).catch((error) => {
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
            return (
                <View style={styles.container} >
                    <MapView style={styles.map}
                        initialRegion={{
                            latitude: this.state.coords.latitude,
                            longitude: this.state.coords.longitude,
                            latitudeDelta: 0.0,
                            longitudeDelta: 0.012
                        }}>
                        <MapView.Polyline
                            coordinates={this.state.points}
                            strokeWidth={5}
                            strokeColor="#0086e3"
                            lineCap="round"
                        />
                        {this.state.points.map((point, index) => (
                            <MapView.Marker
                                key={index}
                                coordinate={point}
                                title={'lat:' + JSON.stringify(point.latitude) + ', ' + 'lng:' + JSON.stringify(point.longitude)}
                            />
                        ))}
                    </MapView>
                </View>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    map: {
        flex: 1,
        alignSelf: 'stretch'
    }
});
