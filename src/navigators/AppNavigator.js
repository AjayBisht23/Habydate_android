import React, {PureComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {connect} from 'react-redux';
import SplashScreen from '../screens/SplashScreen';
import enableFontPatch from './enableFontPatch';
import GetStartedScreen from '../screens/auth/GetStartedScreen';
import HomeScreen from '../screens/dashboard/home/HomeScreen';
import LoginAndRegisterScreen from '../screens/auth/LoginAndRegisterScreen';
import VerificationScreen from '../screens/auth/VerificationScreen';
import RegistrationStepScreen from '../screens/auth/RegistrationStepScreen';
import AddPhotoScreen from '../screens/auth/AddPhotoScreen';
import CongratulationsScreen from '../screens/auth/CongratulationsScreen';
import MenuScreen from '../screens/dashboard/menu/MenuScreen';
import {W_WIDTH} from '../utils/regex';
import MatchesScreen from '../screens/dashboard/matches/MatchesScreen';
import MessagesScreen from '../screens/dashboard/messages/MessagesScreen';
import WhoLikesMeScreen from '../screens/dashboard/messages/WhoLikesMeScreen';
import SeekerRequestScreen from '../screens/dashboard/messages/SeekerRequestScreen';
import PaymentPackagesScreen from '../screens/dashboard/payment/PaymentPackagesScreen';
import PaymentMethodScreen from '../screens/dashboard/payment/PaymentMethodScreen';
import NotificationsScreen from '../screens/dashboard/notifications/NotificationsScreen';
import SeekerDetailScreen from '../screens/dashboard/seekers/SeekerDetailScreen';
import SeekerListsScreen from '../screens/dashboard/seekers/SeekerListsScreen';
import SeekerUsersScreen from '../screens/dashboard/seekers/SeekerUsersScreen';
import SeekerSendRequestScreen from '../screens/dashboard/seekers/SeekerSendRequestScreen';
import SettingsScreen from '../screens/dashboard/settings/SettingsScreen';
import AccountSettingScreen from '../screens/dashboard/settings/AccountSettingScreen';
import MyProfileScreen from '../screens/dashboard/profile/MyProfileScreen';
import OtherProfileScreen from '../screens/dashboard/profile/OtherProfileScreen';
import AllPhotoScreen from '../screens/dashboard/profile/AllPhotoScreen';

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

function HomeStackScreen() {
    return (
        <Stack.Navigator screenOptions={navigationOption()}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="OtherProfile" component={OtherProfileScreen} />
            <Stack.Screen name="AllPhotos" component={AllPhotoScreen} />
        </Stack.Navigator>
    );
}

function MyProfileStackScreen() {
    return (
        <Stack.Navigator screenOptions={navigationOption()}>
            <Stack.Screen name="MyProfile" component={MyProfileScreen} />
            <Stack.Screen name="OtherProfile" component={OtherProfileScreen} />
            <Stack.Screen name="AllPhotos" component={AllPhotoScreen} />
        </Stack.Navigator>
    );
}

function PaymentStackScreen() {
    return (
        <Stack.Navigator screenOptions={navigationOption()}>
            <Stack.Screen name="PaymentPackages" component={PaymentPackagesScreen} />
            <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
        </Stack.Navigator>
    );
}

function MatchesStackScreen() {
  return (
      <Stack.Navigator screenOptions={navigationOption()}>
        <Stack.Screen name="Matches" component={MatchesScreen} />
      </Stack.Navigator>
  );
}

function MessagesStackScreen() {
  return (
      <Stack.Navigator screenOptions={navigationOption()}>
        <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen name="WhoLikeMe" component={WhoLikesMeScreen} />
        <Stack.Screen name="SeekerRequest" component={SeekerRequestScreen} />
      </Stack.Navigator>
  );
}

function NotificationStackScreen() {
    return (
        <Stack.Navigator screenOptions={navigationOption()}>
            <Stack.Screen name="Notification" component={NotificationsScreen} />
            <Stack.Screen name="SeekerDetail" component={SeekerDetailScreen} />
        </Stack.Navigator>
    );
}

function SeekerStackScreen() {
    return (
        <Stack.Navigator screenOptions={navigationOption()}>
            {/*<Stack.Screen name="SeekerList" component={SeekerListsScreen} />*/}
            <Stack.Screen name="SeekerUser" component={SeekerUsersScreen} />
            <Stack.Screen name="SeekerSendRequest" component={SeekerSendRequestScreen} />
        </Stack.Navigator>
    );
}

function SettingStackScreen() {
    return (
        <Stack.Navigator screenOptions={navigationOption()}>
            <Stack.Screen name="Setting" component={SettingsScreen} />
            <Stack.Screen name="AccountSetting" component={AccountSettingScreen} />
        </Stack.Navigator>
    );
}

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
                  <Stack.Screen name="AddPhoto" component={AddPhotoScreen}/>
                  <Stack.Screen name="Congratulations" component={CongratulationsScreen}/>
                </Stack.Navigator>
              : <Drawer.Navigator initialRouteName="Home"
                                  drawerContent={props => <MenuScreen {...props} />}
                                  edgeWidth={W_WIDTH - 50}>
                  <Drawer.Screen name="MyProfile" component={MyProfileStackScreen} />
                  <Drawer.Screen name="Home" component={HomeStackScreen} />
                  <Drawer.Screen name="Payments" component={PaymentStackScreen} />
                  <Drawer.Screen name="Matches" component={MatchesStackScreen} />
                  <Drawer.Screen name="Messages" component={MessagesStackScreen} />
                  <Drawer.Screen name="Notifications" component={NotificationStackScreen} />
                  <Drawer.Screen name="Seekers" component={SeekerStackScreen} />
                  <Drawer.Screen name="Settings" component={SettingStackScreen} />
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
