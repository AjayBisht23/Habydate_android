import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Icon} from "native-base";
import CommonButton from '../general/CommonButton';
import {TouchableFeedback} from '../../utils/regex';

class NotificationComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme, item, navigation} = this.props;

        return (
            <TouchableFeedback onPress={()=>navigation.navigate('SeekerDetail')}>
                <View style={[styles.container, {borderColor: theme.borderColor}]}>
                    <FastImage source={{uri: item.photoUrl}} style={{width: 56, height: 56, borderRadius: 28}}/>
                    <View style={[styles.infoView]}>
                        <View style={[styles.nameView]}>
                            <Text style={[styles.nameText, {color: theme.primaryColor}]}>{item.name}
                                <Text style={[styles.likeText, {color: theme.secondaryColor}]}>{' Sent you a launch date request'}</Text>
                            </Text>
                            {
                                item.type === 'launch_request' && <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                                    <Icon type={'Feather'} name={'map-pin'} style={{fontSize: 14, color: theme.subPrimaryColor}}/>
                                    <Text style={[styles.timeText, {color: theme.subSecondaryColor}]}> {item.location}</Text>
                                </View>
                            }
                            {
                                item.type === 'launch_request' && <View style={[styles.requestView]}>
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
                                        container={{flex: 1, marginHorizontal: 0, marginRight: 20}}
                                        innerContainer={{borderRadius: 5, paddingVertical: 13}}
                                        backgroundColor={theme.pinkColor}
                                        borderColor={theme.pinkColor}
                                        textColor={theme.backgroundColor}
                                        title={'Accept'}
                                        onPress={this.loginPress}
                                    />
                                </View>
                            }
                            <Text style={[styles.timeText, {color: theme.subSecondaryColor}]}>{item.date}</Text>
                        </View>
                    </View>
                </View>
            </TouchableFeedback>
        );
    }
}

export default NotificationComponent;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        paddingVertical: 15,
    },
    infoView: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'center',
    },
    nameView: {
        flex: 1,
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600'
    },
    likeText: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: '400'
    },
    timeText: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: '400'
    },
    requestView: {
        flexDirection: 'row',
        marginVertical: 5
    }
});
