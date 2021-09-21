import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';

import { View, Text } from 'react-native';

import firebase from "firebase/app";
import "firebase/firestore";

/* redux configration  */
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnUpAWzZQ2AEraqqxY_cZVbt-uwIMPt5Y",
  authDomain: "oneinsta-7bbee.firebaseapp.com",
  projectId: "oneinsta-7bbee",
  storageBucket: "oneinsta-7bbee.appspot.com",
  messagingSenderId: "206932416010",
  appId: "1:206932416010:web:09f65c204082972e3431f3",
  measurementId: "G-6TBT0C2TWZ"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import MainScreen from './components/Main'

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {

    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options = {{ headerShown: false}} />
          <Stack.Screen name="Register" component={RegisterScreen} />
    
          </Stack.Navigator>
    
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    )

  }
}

export default App
