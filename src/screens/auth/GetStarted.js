import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import regex from '../../utils/regex';
import CommonButton from '../../components/general/CommonButton';
import {getFacebookData, getGoogleData} from '../../services/socialLogin';
import {getUserDataAndUpdateInFirestore} from '../../services/userAction';

class GetStarted extends Component {
  constructor(props) {
    super(props);
  }

  newAccountPress = () => {
    const {navigation} = this.props;
    navigation.navigate('LoginAndRegister', {type: 1});
  };

  loginPress = () => {
    const {navigation} = this.props;
    navigation.navigate('LoginAndRegister', {type: 2});
  };

  facebookPress = () => {
    regex.showLoader();
    getFacebookData()
      .then((response) => {
        getUserDataAndUpdateInFirestore(response).then((response) => {
          this.checkUserData(response);
        });
      })
      .catch((error) => {
        regex.hideLoader();
      });
  };

  googlePress = () => {
    regex.showLoader();
    getGoogleData()
      .then((response) => {
        getUserDataAndUpdateInFirestore(response).then((response) => {
          this.checkUserData(response);
        });
      })
      .catch((error) => {
        regex.hideLoader();
      });
  };

  checkUserData = (response) => {
    regex.hideLoader();
    const {navigation} = this.props;
    let user = response.user;

    if (user.stepCompleted > 8) {
      // Dashboard
      regex.setDashboard({token: user.uid, ...user});
    } else if (user.stepCompleted === 8) {
      // Profile step Remaining
      navigation.navigate('AddPhoto', {data: user});
    } // Register step remaining
    else navigation.navigate('RegistrationStep', {...user});
  };

  render() {
    const {theme} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={{flex: 1}}>
            <View style={styles.iconView}>
              <FastImage
                source={require('./../../assets/get_logo.png')}
                style={{width: 129, height: 75}}
              />
            </View>
            <Text style={[styles.titleText, {color: theme.primaryColor}]}>
              Chat. Date. Invite.
            </Text>
            <CommonButton
              theme={theme}
              container={{marginTop: regex.aspectRatio(45)}}
              backgroundColor={theme.pinkColor}
              borderColor={theme.pinkColor}
              textColor={theme.backgroundColor}
              title={'Create New Account'}
              onPress={this.newAccountPress}
            />
            <CommonButton
              theme={theme}
              container={{marginTop: regex.aspectRatio(10)}}
              backgroundColor={theme.backgroundColor}
              borderColor={theme.pinkColor}
              textColor={theme.pinkColor}
              title={'Login'}
              onPress={this.loginPress}
            />
            <View style={styles.orView}>
              <View
                style={{
                  width: 30,
                  height: 1,
                  backgroundColor: theme.subSecondaryColor,
                }}
              />
              <Text style={{marginHorizontal: 5, color: theme.secondaryColor}}>
                Or Login with
              </Text>
              <View
                style={{
                  width: 30,
                  height: 1,
                  backgroundColor: theme.subSecondaryColor,
                }}
              />
            </View>
            <View style={styles.bottomView}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableWithoutFeedback onPress={this.facebookPress}>
                  <View
                    style={[
                      styles.socialView,
                      {marginRight: 15, backgroundColor: theme.backgroundColor},
                    ]}>
                    <FastImage
                      source={{
                        uri:
                          'https://icons-for-free.com/iconfiles/png/512/facebook+logo+logo+website+icon-1320190502625926346.png',
                      }}
                      style={styles.socialIcon}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.googlePress}>
                  <View
                    style={[
                      styles.socialView,
                      {marginLeft: 15, backgroundColor: theme.backgroundColor},
                    ]}>
                    <FastImage
                      source={{
                        uri:
                          'https://cdn4.iconfinder.com/data/icons/bettericons/354/google-2-color-512.png',
                      }}
                      style={styles.socialIcon}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 20,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingBottom: 25,
                }}>
                <Text style={[styles.infoText, {color: theme.subPrimaryColor}]}>
                  By creating an account, you agree to our
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.infoText, {color: theme.primaryColor}]}>
                    Terms & Conditions
                  </Text>
                  <Text
                    style={[styles.infoText, {color: theme.subPrimaryColor}]}>
                    {' '}
                    and{' '}
                  </Text>
                  <Text style={[styles.infoText, {color: theme.primaryColor}]}>
                    Privacy policy
                  </Text>
                  <Text
                    style={[styles.infoText, {color: theme.subPrimaryColor}]}>
                    {' '}
                    of Legendbae
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(GetStarted);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: regex.aspectRatio(45),
  },
  titleText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
  },
  orView: {
    flexDirection: 'row',
    marginVertical: regex.aspectRatio(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    flex: 1,
  },
  socialView: {
    borderRadius: regex.aspectRatio(30),
    ...regex.shadow(5),
  },
  socialIcon: {
    width: regex.aspectRatio(45),
    height: regex.aspectRatio(45),
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
