import { createAppContainer, createStackNavigator } from 'react-navigation';
import data from './data';
import map from './map';
import Main from './main';
import Drawmap from './polyline';
import Login from './login';

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    },
  },
  Main: {
    screen: Main,
    navigationOptions: {
      headerTitle: 'GPS Tracking System',
      gesturesEnabled: false,
      headerLeft: null
    },
  },
  Home: {
    screen: data,
    navigationOptions: {
      headerTitle: 'GPS Coordinates',
    },
  },
  map: {
    screen: map,
    navigationOptions: {
      headerTitle: 'Position on Map',
    },
  },
  Drawmap: {
    screen: Drawmap,
    navigationOptions: {
      headerTitle: 'Polyline Map',
    },
  },

});

export default createAppContainer(AppNavigator);