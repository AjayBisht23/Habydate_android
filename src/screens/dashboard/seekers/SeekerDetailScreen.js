import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../../components/general/HeaderComponent';
import {ASPECT_RATIO, HEIGHT_RATIO} from '../../../utils/regex';
import FastImage from 'react-native-fast-image';
import {Icon} from "native-base";
import CommonButton from '../../../components/general/CommonButton';

class SeekerDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    render() {
        const {data} = this.state;
        const {theme, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent theme={theme} onLeftPress={this.onBackPress}/>
                <View style={[styles.innerView]}>
                    <ScrollView>
                        <View style={[styles.innerView, {padding: 20}]}>
                            <View style={[styles.userView, {backgroundColor: theme.secondaryColor}]}>
                                 <FastImage source={{uri: 'https://images.unsplash.com/photo-1521167318043-b2ce52398029?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}}
                                            style={{width: null, height: HEIGHT_RATIO(.45)}}/>
                                 <FastImage source={require('./../../../assets/seekerphotogradient.png')}
                                            style={{width: null, height: HEIGHT_RATIO(.45), position: 'absolute', bottom: 0, left: 0, right: 0}}/>
                                 <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, marginHorizontal: 20, marginBottom: 20}}>
                                     <Text style={{fontSize: 24, color: theme.backgroundColor, fontWeight: '800'}}>Brice, 24</Text>
                                     <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                                         <Icon type={'Feather'} name={'map-pin'} style={{fontSize: 14, color: theme.backgroundColor}}/>
                                         <Text style={[styles.timeText, {color: theme.backgroundColor}]}> Colombia</Text>
                                     </View>
                                 </View>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                                <Icon type={'Feather'} name={'calendar'} style={{fontSize: 16, color: theme.subPrimaryColor}}/>
                                <Text style={[styles.timeText, {color: theme.subPrimaryColor}]}> Date & Time: </Text>
                                <Text style={[styles.timeText, {color: theme.primaryColor}]}>Mon, July 2020, 2 PM</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 15}}>
                                <Icon type={'Feather'} name={'map-pin'} style={{fontSize: 16, color: theme.subPrimaryColor}}/>
                                <Text style={[styles.timeText, {color: theme.subPrimaryColor}]}> Location: </Text>
                                <Text style={[styles.timeText, {color: theme.primaryColor}]}>Hyatt, 5th Floor</Text>
                            </View>
                            <FastImage source={{uri: 'https://www.google.com/maps/d/u/0/thumbnail?mid=1hITxlm0XfcDq8ZJjefioOG_Q3YY'}}
                                       style={{width: null, height: HEIGHT_RATIO(.15), borderRadius: 10}}/>
                            <View style={{marginVertical: 15}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 15}}>
                                    <Icon type={'Feather'} name={'file-text'} style={{fontSize: 16, color: theme.subPrimaryColor}}/>
                                    <Text style={[styles.timeText, {color: theme.subPrimaryColor}]}> Note: </Text>
                                </View>
                                <Text style={[styles.timeText, {color: theme.primaryColor}]}>Launch with my boyfriend in a romantic place</Text>
                            </View>
                            <View style={[styles.requestView]}>
                                <CommonButton
                                    theme={theme}
                                    container={{flex: 1, marginHorizontal: 0, marginRight: 20}}
                                    innerContainer={{borderRadius: 5, paddingVertical: 13}}
                                    backgroundColor={theme.backgroundColor}
                                    borderColor={theme.borderColor}
                                    textColor={theme.primaryColor}
                                    title={'Decline'}
                                    onPress={this.newAccountPress}
                                />
                                <CommonButton
                                    theme={theme}
                                    container={{flex: 1, marginHorizontal: 0}}
                                    innerContainer={{borderRadius: 5, paddingVertical: 13}}
                                    backgroundColor={theme.pinkColor}
                                    borderColor={theme.pinkColor}
                                    textColor={theme.backgroundColor}
                                    title={'Accept'}
                                    onPress={this.loginPress}
                                />
                            </View>
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

export default connect(mapStateToProps)(SeekerDetailScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerView: {
        flex: 1,
    },
    userView: {
        height: HEIGHT_RATIO(.45),
        borderRadius: 5,
        overflow: 'hidden',
    },
    requestView: {
        flexDirection: 'row',
        marginVertical: 5,
        marginBottom: 15
    }
});
