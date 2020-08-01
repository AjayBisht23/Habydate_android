import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, Switch} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../../components/general/HeaderComponent';
import {Icon} from "native-base";
import {White} from '../../../themes/constantColors';
import {TouchableFeedback} from '../../../utils/regex';

class SettingsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notification: true,
            match: true,
            sound: true,
        }
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    notificationSwitch = (notification) => {
        this.setState({notification})
    };

    matchSwitch = (match) => {
        this.setState({match})
    };

    soundSwitch = (sound) => {
        this.setState({sound})
    };

    render() {
        const {notification, match, sound} = this.state;
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
                                value={notification}
                            />
                        </View>
                        <View style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
                            <Text style={[styles.text, {color: theme.subPrimaryColor}]}>Pause Matches</Text>
                            <Switch
                                trackColor={{ false: theme.pinkColor, true: theme.pinkColor }}
                                thumbColor={White}
                                ios_backgroundColor={'transparent'}
                                onValueChange={this.matchSwitch}
                                value={match}
                            />
                        </View>
                        <View style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
                            <Text style={[styles.text, {color: theme.subPrimaryColor}]}>Match Sound</Text>
                            <Switch
                                trackColor={{ false: theme.pinkColor, true: theme.pinkColor }}
                                thumbColor={White}
                                ios_backgroundColor={'transparent'}
                                onValueChange={this.soundSwitch}
                                value={sound}
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
                        <View style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
                            <Text style={[styles.text, {color: theme.pinkColor}]}>Delete Account</Text>
                            <Icon type={'Feather'} name={'chevron-right'} style={{color: theme.backgroundColor}} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
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
