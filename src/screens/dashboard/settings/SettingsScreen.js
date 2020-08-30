import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, Switch, Alert} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../../components/general/HeaderComponent';
import {Icon} from "native-base";
import {White} from '../../../themes/constantColors';
import {regex, TouchableFeedback} from '../../../utils/regex';
import {deleteUser, getUserData, updateUserDataAction} from '../../../actions/authAction';
import * as messages from '../../../utils/messages';

class SettingsScreen extends Component {

    constructor(props) {
        super(props);
        let user = props.user;
        this.state = {
            notificationOn: user.notificationOn,
            matchOn: user.matchOn,
            soundOn: user.soundOn,
        }
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    updateData = (parameter) => {
        updateUserDataAction(this.props.user.uid, parameter).then(() => {
            getUserData(this.props.user.uid)
        });
    };

    notificationSwitch = (notificationOn) => {
        this.setState({notificationOn});
        this.updateData({notificationOn});
    };

    matchSwitch = (matchOn) => {
        this.setState({matchOn});
        this.updateData({matchOn});
    };

    soundSwitch = (soundOn) => {
        this.setState({soundOn});
        this.updateData({soundOn});
    };

    okClick = () => {
        deleteUser(this.props.user.uid).then(() => {
           regex.clearData();
        });
    };

    onDeletePress = () => {
        Alert.alert('Account Delete', messages.deleteMsg,
            [{text: 'Cancel', onPress: () => {}, style: 'cancel'},
                     {text: 'OK', onPress: this.okClick}],
            {cancelable: false},
        );
    };

    render() {
        const {notificationOn, matchOn, soundOn} = this.state;
        const {theme, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent title={'Settings'} theme={theme} onLeftPress={this.onBackPress}/>
                <View style={[styles.container, {backgroundColor: theme.primaryBackgroundColor}]}>
                    <ScrollView>
                        <TouchableFeedback onPress={() => navigation.navigate('AccountSetting')}>
                            <View style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
                                <Text style={[styles.text, {color: theme.subPrimaryColor}]}>Account Settings</Text>
                                <Icon type={'Feather'} name={'chevron-right'} style={{color: theme.subSecondaryColor}} />
                            </View>
                        </TouchableFeedback>
                        <View style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
                            <Text style={[styles.text, {color: theme.subPrimaryColor}]}>Notifications</Text>
                            <Switch
                                trackColor={{ false: theme.pinkColor, true: theme.pinkColor }}
                                thumbColor={White}
                                ios_backgroundColor={'transparent'}
                                onValueChange={this.notificationSwitch}
                                value={notificationOn}
                            />
                        </View>
                        <View style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
                            <Text style={[styles.text, {color: theme.subPrimaryColor}]}>Pause Matches</Text>
                            <Switch
                                trackColor={{ false: theme.pinkColor, true: theme.pinkColor }}
                                thumbColor={White}
                                ios_backgroundColor={'transparent'}
                                onValueChange={this.matchSwitch}
                                value={matchOn}
                            />
                        </View>
                        <View style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
                            <Text style={[styles.text, {color: theme.subPrimaryColor}]}>Match Sound</Text>
                            <Switch
                                trackColor={{ false: theme.pinkColor, true: theme.pinkColor }}
                                thumbColor={White}
                                ios_backgroundColor={'transparent'}
                                onValueChange={this.soundSwitch}
                                value={soundOn}
                            />
                        </View>
                        <View style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
                            <Text style={[styles.text, {color: theme.subPrimaryColor}]}>Rate this App</Text>
                            <Icon type={'Feather'} name={'chevron-right'} style={{color: theme.backgroundColor}} />
                        </View>
                        <View style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
                            <Text style={[styles.text, {color: theme.subPrimaryColor}]}>Share this App</Text>
                            <Icon type={'Feather'} name={'chevron-right'} style={{color: theme.backgroundColor}} />
                        </View>
                        <TouchableFeedback onPress={this.onDeletePress}>
                            <View style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
                                <Text style={[styles.text, {color: theme.pinkColor}]}>Delete Account</Text>
                                <Icon type={'Feather'} name={'chevron-right'} style={{color: theme.backgroundColor}} />
                            </View>
                        </TouchableFeedback>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
    user: state.auth.user,
});

export default connect(mapStateToProps)(SettingsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    view: {
        marginVertical: 3,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        paddingVertical: 10,
    },
    text: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400'
    }
});
