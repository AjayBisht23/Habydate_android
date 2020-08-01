import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, Switch} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../../components/general/HeaderComponent';
import FastImage from 'react-native-fast-image';
import {ASPECT_RATIO, W_WIDTH} from '../../../utils/regex';
import {White} from '../../../themes/constantColors';
import CommonButton from '../../../components/general/CommonButton';

class PaymentPackagesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePicUrl: '',
        }
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    subscribeNowPress = () => {
        const {navigation} = this.props;
        navigation.navigate('PaymentMethod');
    };

    render() {
        const {requestData} = this.state;
        const {theme, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                    <View style={styles.emptyView}>
                        <FastImage source={require('./../../../assets/payment_background.png')} style={{width: W_WIDTH, height: ASPECT_RATIO(278)}}/>
                        <FastImage source={require('./../../../assets/payment_curve.png')} style={{position: 'absolute', top: ASPECT_RATIO(278) - 50, width: W_WIDTH, height: ASPECT_RATIO(278)}}/>
                        <View>
                            <Text style={[styles.titleText, {color: theme.primaryColor}]}>Pricing</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
                                <Text style={[styles.monthlyText, {marginRight: 10, color: theme.primaryColor}]}>Bill yearly</Text>
                                <Switch
                                    trackColor={{ false: theme.pinkColor, true: theme.pinkColor }}
                                    thumbColor={White}
                                    ios_backgroundColor={'transparent'}
                                    onValueChange={this.toggleSwitch}
                                    value={true}
                                />
                                <Text style={[styles.monthlyText, {marginLeft: 10, color: theme.primaryColor}]}>Bill monthly</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.emptyView, {paddingHorizontal: 20}]}>
                        <View style={[styles.packageInfoView, {backgroundColor: theme.backgroundColor}]}>

                        </View>
                        <CommonButton
                            theme={theme}
                            container={{marginVertical: ASPECT_RATIO(25)}}
                            backgroundColor={theme.pinkColor}
                            borderColor={theme.pinkColor}
                            textColor={theme.backgroundColor}
                            title={'Subscribe Now'}
                            onPress={this.subscribeNowPress}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(PaymentPackagesScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emptyView: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    titleText: {
        marginTop: 10,
        fontSize: 34,
        fontWeight: '800',
        textAlign: 'center'
    },
    monthlyText: {
        fontSize: 16,
        fontWeight: '500',
    },
    packageInfoView: {
        flex: 1,
        borderRadius: 36,
    }
});
