import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import Splash from '../screens/Splash';
import GetStartedScreen from '../screens/auth/GetStarted';
import HomeScreen from '../screens/dashboard/home/Home';
import LoginAndRegisterScreen from '../screens/auth/LoginAndRegister';
import VerificationScreen from '../screens/auth/Verification';
import RegistrationStepScreen from '../screens/auth/RegistrationStep';
import AddPhotoScreen from '../screens/auth/AddPhoto';
import CongratulationsScreen from '../screens/auth/Congratulations';
import MenuScreen from '../screens/dashboard/menu/Menu';
import MatchesScreen from '../screens/dashboard/matches/Matches';
import MessagesScreen from '../screens/dashboard/messages/Messages';
import WhoLikesMeScreen from '../screens/dashboard/messages/WhoLikesMe';
import SeekerRequestScreen from '../screens/dashboard/seekers/SeekerRequestLists';
import PaymentPackagesScreen from '../screens/dashboard/payment/PaymentPackages';
import PaymentMethodScreen from '../screens/dashboard/payment/PaymentMethod';
import NotificationsScreen from '../screens/dashboard/notifications/Notifications';
import SeekerDetailScreen from '../screens/dashboard/seekers/SeekerDetail';
import SeekerListsScreen from '../screens/dashboard/seekers/SeekerLists';
import SeekerUsersScreen from '../screens/dashboard/seekers/SeekerUsers';
import SeekerSendRequestScreen from '../screens/dashboard/seekers/SeekerForm';
import SettingsScreen from '../screens/dashboard/settings/Settings';
import AccountSettingScreen from '../screens/dashboard/settings/AccountSetting';
import MyProfileScreen from '../screens/dashboard/profile/MyProfile';
import OtherProfileScreen from '../screens/dashboard/profile/OtherProfile';
import AllPhotoScreen from '../screens/dashboard/profile/AllPhoto';
import ChatScreen from '../screens/dashboard/messages/Chat';
import VerifiedCodeScreen from '../screens/auth/VerifiedCode';
import {firebase} from '@react-native-firebase/analytics';
import {GoogleSignin} from '@react-native-community/google-signin';
import {WEB_CLIENT_ID} from '../config/config';
import SelectInformationScreen from '../screens/dashboard/profile/SelectInformation';
import NHLoader from './components/NHLoader';
import SendMySeekerRequestScreen from '../screens/dashboard/seekers/SeekerMyRequestLists';

let Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const navigationOption = () => {
  return {
    headerShown: false,
    headerBackTitleVisible: false,
    gestureEnabled: false,
  };
};

let appNav = null;

function CommonView() {
  return (
    <>
      <Stack.Screen name="OtherProfile" component={OtherProfileScreen} />
      <Stack.Screen name="AllPhotos" component={AllPhotoScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="SeekerDetail" component={SeekerDetailScreen} />
      <Stack.Screen
        name="SelectionInformation"
        component={SelectInformationScreen}
      />
      <Stack.Screen name="WhoLikeMe" component={WhoLikesMeScreen} />
      <Stack.Screen name="SeekerRequest" component={SeekerRequestScreen} />
    </>
  );
}

function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="Home" component={HomeScreen} />
      {CommonView()}
    </Stack.Navigator>
  );
}

function MyProfileStackScreen() {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      {CommonView()}
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
      {CommonView()}
    </Stack.Navigator>
  );
}

function MessagesStackScreen() {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="Messages" component={MessagesScreen} />
      {CommonView()}
    </Stack.Navigator>
  );
}

function NotificationStackScreen() {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="Notification" component={NotificationsScreen} />
      {CommonView()}
    </Stack.Navigator>
  );
}

function SeekerStackScreen() {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="SeekerList" component={SeekerListsScreen} />
      <Stack.Screen name="SeekerUser" component={SeekerUsersScreen} />
      <Stack.Screen
        name="SeekerSendRequest"
        component={SeekerSendRequestScreen}
      />
      <Stack.Screen
        name="SendMySeekerRequest"
        component={SendMySeekerRequestScreen}
      />
      {CommonView()}
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

  async componentDidMount(): void {
    appNav = this;
    await firebase.analytics().setAnalyticsCollectionEnabled(true);
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }

  render() {
    const {user, loading} = this.props;

    if (loading) return <Splash />;

    return (
      <NavigationContainer>
        {user === null ? (
          <Stack.Navigator screenOptions={navigationOption()}>
            <Stack.Screen name="GetStarted" component={GetStartedScreen} />
            <Stack.Screen
              name="LoginAndRegister"
              component={LoginAndRegisterScreen}
            />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen
              name="RegistrationStep"
              component={RegistrationStepScreen}
            />
            <Stack.Screen name="AddPhoto" component={AddPhotoScreen} />
            <Stack.Screen
              name="Congratulations"
              component={CongratulationsScreen}
            />
            <Stack.Screen name="VerifiedCode" component={VerifiedCodeScreen} />
          </Stack.Navigator>
        ) : (
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <MenuScreen {...props} />}
            edgeWidth={0}>
            <Drawer.Screen name="MyProfile" component={MyProfileStackScreen} />
            <Drawer.Screen name="Home" component={HomeStackScreen} />
            <Drawer.Screen name="Payments" component={PaymentStackScreen} />
            <Drawer.Screen name="Matches" component={MatchesStackScreen} />
            <Drawer.Screen name="Messages" component={MessagesStackScreen} />
            <Drawer.Screen
              name="Notifications"
              component={NotificationStackScreen}
            />
            <Drawer.Screen name="Seekers" component={SeekerStackScreen} />
            <Drawer.Screen name="Settings" component={SettingStackScreen} />
          </Drawer.Navigator>
        )}
        <NHLoader loading={this.props.showLoader} />
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  user: state.auth.user,
  theme: state.theme.theme,
  showLoader: state.loader.showLoader,
});

export default connect(mapStateToProps)(AppNavigator);
