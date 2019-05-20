import React from 'react';
import { Alert, Text, View, StyleSheet, Image, Dimensions, TextInput, Button, TouchableOpacity, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get("window");
const background = require("../assets/bg.png");
const lockIcon = require("../assets/lock.png");
const personIcon = require("../assets/person.png");

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    onLoginPress = () => {
        if (this.state.email == '' || this.state.password == '') {
            alert("Please Enter Your Email or Password.");
        }
        else {
          if(this.state.email == 'amna@gmail.com' && this.state.password == '#am123am'){
            const { navigate } = this.props.navigation;
            navigate("Main");
          }
          else{Alert.alert("Error email or password please try again!")}
        }
    }

    render() {
        return (
            <ImageBackground source={background} style={styles.background} >
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
                            </View>
                            <TextInput
                                placeholder="Email Address"
                                placeholderTextColor="#FFF"
                                style={styles.input}
                                value={this.state.email}
                                onChangeText={(text) => this.setState({ email: text })}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
                            </View>
                            <TextInput
                                placeholderTextColor="#FFF"
                                placeholder="Password"
                                style={styles.input}
                                value={this.state.password}
                                onChangeText={(text) => this.setState({ password: text })}
                                secureTextEntry={true}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={this.onLoginPress} >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width: width,
        height: height,
    },
    wrapper: {
        paddingVertical: 300,
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        height: 20,
        width: 20,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 18,
        color:'#FFFF'
    },
    button: {
        backgroundColor: "#004cae",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
    },
});
