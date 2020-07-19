import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import CommonTextInput from '../general/CommonTextInput';
import CommonButton from '../general/CommonButton';
import {ASPECT_RATIO, W_WIDTH} from '../../utils/regex';

class Step1Component extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            username: '',
            email: '',
        }
    }

    nextPress = () => {
        const {onPress} = this.props;
        onPress(1);
    };

    render() {
        const {fullName, username, email} = this.state;
        const {theme} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <ScrollView>
                    <Text style={[styles.titleText, {color: theme.primaryColor}]}>{'Basic Info'}</Text>
                    <View>
                        <CommonTextInput
                            placeholder={'Full Name'}
                            keyboardType={'default'}
                            value={fullName}
                            onChangeText={(fullName)=>this.setState({fullName})}
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
                        <CommonButton
                            theme={theme}
                            container={{marginTop: ASPECT_RATIO(123)}}
                            backgroundColor={theme.pinkColor}
                            borderColor={theme.pinkColor}
                            textColor={theme.backgroundColor}
                            title={'Continue'}
                            onPress={this.nextPress}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Step1Component;

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
