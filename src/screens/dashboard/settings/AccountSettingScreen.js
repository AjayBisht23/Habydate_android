import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import CommonTextInput from '../../../components/general/CommonTextInput';
import CommonButton from '../../../components/general/CommonButton';
import {W_WIDTH} from '../../../utils/regex';
import {connect} from 'react-redux';
import HeaderComponent from '../../../components/general/HeaderComponent';
import {getUserData, updateUserDataAction} from '../../../actions/authAction';

class AccountSettingScreen extends Component {

    constructor(props) {
        super(props);
        let user = props.user;
        this.state = {
            name: user.name,
            username: user.username,
            email: user.email,
            // phone: user.phone,
        }
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    nextPress = () => {
        updateUserDataAction(this.props.user.uid, this.state).then(() => {
            getUserData(this.props.user.uid)
        });
        this.onBackPress();
    };

    render() {
        const {name, username, email, phone} = this.state;
        const {theme} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent title={'Account Setting'} theme={theme} onLeftPress={this.onBackPress}/>
                <ScrollView>
                    <View>
                        <CommonTextInput
                            placeholder={'Full Name'}
                            keyboardType={'default'}
                            value={name}
                            onChangeText={(name)=>this.setState({name})}
                        />
                        <CommonTextInput
                            placeholder={'Username'}
                            keyboardType={'default'}
                            value={username}
                            onChangeText={(username)=>this.setState({username})}
                        />
                        <CommonTextInput
                            placeholder={'Email'}
                            keyboardType={'email-address'}
                            value={email}
                            onChangeText={(email)=>this.setState({email})}
                        />
                        {/*<CommonTextInput*/}
                        {/*    placeholder={'Phone'}*/}
                        {/*    keyboardType={'phone-pad'}*/}
                        {/*    value={phone}*/}
                        {/*    onChangeText={(phone)=>this.setState({phone})}*/}
                        {/*    editable={false}*/}
                        {/*/>*/}
                        <CommonButton
                            theme={theme}
                            container={{marginTop: 45}}
                            backgroundColor={theme.pinkColor}
                            borderColor={theme.pinkColor}
                            textColor={theme.backgroundColor}
                            title={'Done'}
                            onPress={this.nextPress}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
    user: state.auth.user,
});

export default connect(mapStateToProps)(AccountSettingScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: W_WIDTH
    },
    titleText: {
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 10,
        fontSize: 26,
        fontWeight: '800'
    },
});
