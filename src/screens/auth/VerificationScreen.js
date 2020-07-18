import React, {Component, createRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import Header from '../../components/general/Header';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import {Black, White} from '../../themes/constantColors';
import {ASPECT_RATIO, shadow, W_WIDTH} from '../../utils/regex';
import CommonButton from '../../components/general/CommonButton';

class VerificationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    nextPress = () => {
        const {phone_number, countryCode, callingCode} = this.state;
        const {navigation, route} = this.props;
        let params = route.params;
        let type = params.type;
        navigation.navigate('Verification', {type, callingCode, phone_number});
    };

    onChangeText = code => {
        this.setState({value: code}, () => {
            // if (code.length >= 4)
            //     this.props.navigation.navigate('SetupProfile');
        });
    };

    field = createRef();

    render() {
        const {value} = this.state;
        const {theme, navigation, route} = this.props;
        let params = route.params;
        let phone_number = params.phone_number;
        let callingCode = params.callingCode;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <Header theme onLeftPress={this.onBackPress}/>
                <View style={{flex: 1}}>
                    <Text style={[styles.titleText, {color: theme.primaryColor}]}>{'Enter verification code'}</Text>
                    <Text style={[styles.subTitleText, {color: theme.subPrimaryColor}]}>
                        <Text>We sent an</Text>
                        <Text style={{color: theme.primaryColor}}> SMS </Text>
                        <Text>with a code  to verify your phone number</Text>
                    </Text>
                    <Text style={[styles.subTitleText, {color: theme.primaryColor}]}>{`+${callingCode[0]} ${phone_number}`}</Text>
                    <CodeField
                        value={value}
                        onChangeText={this.onChangeText}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFiledRoot}
                        keyboardType="number-pad"
                        renderCell={({index, symbol, isFocused}) => (
                            <View
                                key={index}
                                style={[styles.cellRoot, isFocused && styles.focusCell]}>
                                <Text style={[styles.cellText, {color: theme.primaryColor}]}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            </View>
                        )}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:  ASPECT_RATIO(55)}}>
                        <Text style={[styles.resentText, {color: theme.subPrimaryColor}]}>Resend code in </Text>
                        <Text style={[styles.timeText, {color: theme.primaryColor}]}>15 sec</Text>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <CommonButton
                        theme={theme}
                        backgroundColor={theme.pinkColor}
                        borderColor={theme.pinkColor}
                        textColor={theme.backgroundColor}
                        title={'Next'}
                        onPress={this.nextPress}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(VerificationScreen);

const CELL_COUNT = 4;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleText: {
        marginHorizontal: 20,
        marginTop: 15,
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
    },
    subTitleText: {
        marginHorizontal: 40,
        marginVertical: 15,
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
    },
    codeFiledRoot: {
        marginTop: 20,
        width: W_WIDTH - (W_WIDTH - 240),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cellRoot: {
        width: 45,
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: White,
        ...shadow(4)
    },
    cellText: {
        color: Black,
        fontSize: 16,
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: Black,
        borderBottomWidth: 0,
    },
    resentText: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
    },
    timeText: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
    }
});
