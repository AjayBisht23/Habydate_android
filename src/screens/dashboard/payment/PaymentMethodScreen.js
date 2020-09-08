import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../../components/general/HeaderComponent';
import {Icon} from "native-base";
import FastImage from 'react-native-fast-image';
import stripe from 'tipsi-stripe'
import {STRIPE_PUBLIC_KEY} from '../../../config/config';
import {TouchableFeedback} from '../../../utils/regex';
import {paymentUsingCard} from '../../../actions/paymentAction';

class PaymentMethodScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        stripe.setOptions({
            publishableKey: STRIPE_PUBLIC_KEY
        })
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    openCardDetail = async () => {
        const token = await stripe.paymentRequestWithCardForm({
            // Only iOS support this options
            smsAutofillDisabled: true,
            requiredBillingAddressFields: 'full',
            prefilledInformation: {
                billingAddress: {
                    name: '',
                    line1: '',
                    line2: '',
                    city: '',
                    state: '',
                    country: '',
                    postalCode: '',
                    email: '',
                },
            },
        });
        let tokenId = token.tokenId;
        if (Boolean(tokenId)) {
           paymentUsingCard({
               amount: 100,
               currency: "usd",
               token: tokenId
           })
        }
    };

    render() {
        const {theme, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent title={'Payment Method'} theme={theme} onLeftPress={this.onBackPress}/>
                <View style={[styles.innerView, {backgroundColor: theme.primaryBackgroundColor}]}>
                    <Text style={[styles.titleText, {color: theme.subSecondaryColor}]}>Choose your preferred payment method</Text>
                    <TouchableFeedback onPress={this.openCardDetail}>
                        <View style={[styles.optionView, {backgroundColor: theme.backgroundColor}]}>
                            <View style={{flex: 1}}>
                                <Text style={{color: theme.secondaryColor}}>Credit or debit card</Text>
                            </View>
                            <Icon type={'Feather'} name={'chevron-right'} style={{fontSize: 30, color: theme.subPrimaryColor}}/>
                        </View>
                    </TouchableFeedback>
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
