import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import SplashScreen from '../screens/SplashScreen';
import enableFontPatch from './enableFontPatch';
import GetStartedScreen from '../screens/auth/GetStartedScreen';
import LoginAndRegisterScreen from '../screens/auth/LoginAndRegisterScreen';
import {firebase} from '@react-native-firebase/analytics';

let Stack = createStackNavigator();

enableFontPatch();

const navigationOption = () => {
  return {
    headerShown: false,
    headerBackTitleVisible: false,
    gestureEnabled: false
  };
};

let appNav = null;

class AppNavigator extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  async componentDidMount(): void {
    appNav = this;
    await firebase.analytics().setAnalyticsCollectionEnabled(true);
  }

  render() {
    const {user, loading} = this.props;

    if (loading)
      return <SplashScreen />;

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={navigationOption()}>
          <Stack.Screen name="GetStarted" component={GetStartedScreen}/>
          <Stack.Screen name="LoginAndRegister" component={LoginAndRegisterScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  user: state.auth.user,
  theme: state.auth.theme,
  showLoader: state.auth.showLoader,
});

export default connect(mapStateToProps)(AppNavigator);
