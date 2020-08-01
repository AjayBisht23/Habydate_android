import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../../components/general/HeaderComponent';
import {Icon} from "native-base";
import {ASPECT_RATIO, W_WIDTH} from '../../../utils/regex';
import FastImage from 'react-native-fast-image';

class PaymentMethodScreen extends Component {

    constructor(props) {
        super(props);
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    render() {
        const {theme, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent title={'Payment Method'} theme={theme} onLeftPress={this.onBackPress}/>
                <View style={[styles.innerView, {backgroundColor: theme.primaryBackgroundColor}]}>
                    <Text style={[styles.titleText, {color: theme.subSecondaryColor}]}>Choose your preferred payment method</Text>
                    <View style={[styles.optionView, {backgroundColor: theme.backgroundColor}]}>
                        <View style={{flex: 1}}>
                            <Text style={{color: theme.secondaryColor}}>Credit or debit card</Text>
                        </View>
                        <Icon type={'Feather'} name={'chevron-right'} style={{fontSize: 30, color: theme.subPrimaryColor}}/>
                    </View>
                    <View style={[styles.optionView, {backgroundColor: theme.backgroundColor}]}>
                       <View style={{flex: 1}}>
                           <FastImage source={require('./../../../assets/paypal.png')} style={{width: 81, height: 20}}/>
                       </View>
                       <Icon type={'Feather'} name={'chevron-right'} style={{fontSize: 30, color: theme.subPrimaryColor}}/>
                    </View>
                    <View style={[styles.optionView, {backgroundColor: theme.backgroundColor}]}>
                        <View style={{flex: 1}}>
                            <FastImage source={require('./../../../assets/gpay.png')} style={{width: 49, height: 20}}/>
                        </View>
                        <Icon type={'Feather'} name={'chevron-right'} style={{fontSize: 30, color: theme.subPrimaryColor}}/>
                    </View>
                    <View style={[styles.optionView, {backgroundColor: theme.backgroundColor}]}>
                        <View style={{flex: 1}}>
                            <FastImage source={require('./../../../assets/applepay.png')} style={{width: 43, height: 20}}/>
                        </View>
                        <Icon type={'Feather'} name={'chevron-right'} style={{fontSize: 30, color: theme.subPrimaryColor}}/>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(PaymentMethodScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerView: {
        flex: 1,
    },
    titleText: {
        marginHorizontal: 20,
        marginVertical: 20,
        fontSize: 14,
        fontWeight: '600'
    },
    optionView: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        paddingVertical: 8,
        marginTop: 2,
    }
});
