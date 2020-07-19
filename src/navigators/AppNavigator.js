import React, {PureComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {connect} from 'react-redux';
import SplashScreen from '../screens/SplashScreen';
import enableFontPatch from './enableFontPatch';
import GetStartedScreen from '../screens/auth/GetStartedScreen';
import HomeScreen from '../screens/dashboard/HomeScreen';
import LoginAndRegisterScreen from '../screens/auth/LoginAndRegisterScreen';
import VerificationScreen from '../screens/auth/VerificationScreen';
import RegistrationStepScreen from '../screens/auth/RegistrationStepScreen';

let Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

enableFontPatch();

const navigationOption = () => {
  return {
    headerShown: false,
    headerBackTitleVisible: false,
  };
};

let appNav = null;

class AppNavigator extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    appNav = this;
  }

  render() {
    const {user, loading} = this.props;

    if (loading)
      return <SplashScreen />;

    return (
      <NavigationContainer>
          {
            user === null
              ? <Stack.Navigator screenOptions={navigationOption()}>
                  <Stack.Screen name="GetStarted" component={GetStartedScreen}/>
                  <Stack.Screen name="LoginAndRegister" component={LoginAndRegisterScreen}/>
                  <Stack.Screen name="Verification" component={VerificationScreen}/>
                  <Stack.Screen name="RegistrationStep" component={RegistrationStepScreen}/>
                </Stack.Navigator>
              : <Drawer.Navigator initialRouteName="Home">
                  <Drawer.Screen name="Home" component={HomeScreen} />
                </Drawer.Navigator>
          }
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  user: state.auth.user,
  theme: state.auth.theme,
});

export default connect(mapStateToProps)(AppNavigator);
