import React, {Component} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {LOGIN, LOGOUT} from '../actions/types';
import {getStore} from '../../App';
import {regex} from '../utils/regex';
import {PINK} from '../themes/constantColors';
import FastImage from 'react-native-fast-image';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    this.bootstrapAsync();
    regex.changeStatusStyle('default');
  }

  bootstrapAsync = async () => {
    let userToken;

    try {
      userToken = await AsyncStorage.getItem('userToken');
      if (userToken !== null) {
        getStore.dispatch({type: LOGIN, payload: userToken});
      } else {
        getStore.dispatch({type: LOGOUT});
      }
    } catch (e) {
      getStore.dispatch({type: LOGOUT});
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: PINK,
        }}>
        <FastImage source={require('./../assets/splash_logo.png')} style={{width: 136, height: 120}}/>
      </View>
    );
  }
}

export default SplashScreen;
