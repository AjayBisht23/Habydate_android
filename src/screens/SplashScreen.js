import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import {LOGOUT} from '../actions/types';
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
    StatusBar.setHidden(true);
  }

  bootstrapAsync = async () => {
    this.openAuth();
  };

  openAuth = () => {
    StatusBar.setHidden(false);
    regex.authSignOut();
    getStore.dispatch({type: LOGOUT});
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
