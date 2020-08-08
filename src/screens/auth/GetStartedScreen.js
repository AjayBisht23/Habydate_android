import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {ASPECT_RATIO, shadow, TouchableFeedback} from '../../utils/regex';
import CommonButton from '../../components/general/CommonButton';

class GetStartedScreen extends Component {

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

    };

    googlePress = () => {

    };

    render() {
        const {theme} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                 <View style={{flex: 1}}>
                     <View style={styles.iconView}>
                         <FastImage source={require('./../../assets/get_logo.png')} style={{width: 113, height: 82}}/>
                     </View>
                     <Text style={[styles.titleText, {color: theme.primaryColor}]}>Chat. Date. Invite.</Text>
                     <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20}}>
                         <CommonButton
                             theme={theme}
                             backgroundColor={theme.pinkColor}
                             borderColor={theme.pinkColor}
                             textColor={theme.backgroundColor}
                             title={'Create New Account'}
                             onPress={this.newAccountPress}
                         />
                     </View>
                 </View>
                 <View style={{flex: 1}}>
                     <CommonButton
                         theme={theme}
                         backgroundColor={theme.backgroundColor}
                         borderColor={theme.pinkColor}
                         textColor={theme.pinkColor}
                         title={'Login'}
                         onPress={this.loginPress}
                     />
                     <View style={styles.orView}>
                         <View style={{width: 30, height: 1, backgroundColor: theme.subSecondaryColor}} />
                         <Text style={{marginHorizontal: 5, color: theme.secondaryColor}}>Or Login with</Text>
                         <View style={{width: 30, height: 1, backgroundColor: theme.subSecondaryColor}} />
                     </View>
                     <View style={styles.bottomView}>
                         <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                             <TouchableFeedback onPress={this.facebookPress}>
                                 <View style={[styles.socialView, {marginRight: 15, backgroundColor: theme.backgroundColor}]}>
                                     <FastImage source={{uri: 'https://icons-for-free.com/iconfiles/png/512/facebook+logo+logo+website+icon-1320190502625926346.png'}} style={styles.socialIcon}/>
                                 </View>
                             </TouchableFeedback>
                             <TouchableFeedback onPress={this.googlePress}>
                                 <View style={[styles.socialView, {marginLeft: 15, backgroundColor: theme.backgroundColor}]}>
                                     <FastImage source={{uri: 'https://cdn4.iconfinder.com/data/icons/bettericons/354/google-2-color-512.png'}} style={styles.socialIcon}/>
                                 </View>
                             </TouchableFeedback>
                         </View>
                         <View style={{flex: 1, marginHorizontal: 20, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: ASPECT_RATIO(45)}}>
                             <Text style={[styles.infoText, {color: theme.subPrimaryColor}]}>By creating an account, you agree to our</Text>
                             <View style={{flexDirection: 'row'}}>
                                 <Text style={[styles.infoText, {color: theme.primaryColor}]}>Terms & Conditions</Text>
                                 <Text style={[styles.infoText, {color: theme.subPrimaryColor}]}> and </Text>
                                 <Text style={[styles.infoText, {color: theme.primaryColor}]}>Privacy policy</Text>
                                 <Text style={[styles.infoText, {color: theme.subPrimaryColor}]}> of Epicbae</Text>
                             </View>
                         </View>
                     </View>
                 </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(GetStartedScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: ASPECT_RATIO(70),
    },
    logoText: {
        marginVertical: -8,
        fontSize: ASPECT_RATIO(30),
        fontWeight: '400',
    },
    titleText: {
        textAlign: 'center',
        fontSize: ASPECT_RATIO(32),
        fontWeight: '500',
    },
    orView: {
        flexDirection: 'row',
        marginVertical: ASPECT_RATIO(45),
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomView: {
        flex: 1,
    },
    socialView: {
        borderRadius: ASPECT_RATIO(30),
        ...shadow(5),
    },
    socialIcon: {
        width: ASPECT_RATIO(60),
        height: ASPECT_RATIO(60)
    },
    infoText: {
        fontSize: 14,
        fontWeight: '500'
    }
});
