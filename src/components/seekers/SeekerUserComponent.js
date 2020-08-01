import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ASPECT_RATIO, shadow, TouchableFeedback, W_WIDTH} from '../../utils/regex';
import FastImage from 'react-native-fast-image';
import {ONLINE} from '../../themes/constantColors';
import {Icon} from "native-base";

class SeekerUserComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme, item, navigation} = this.props;

        return (
            <TouchableFeedback onPress={() => navigation.navigate('SeekerSendRequest')}>
                <View style={[styles.container]}>
                    <View style={[styles.innerView, {backgroundColor: theme.textInputBackgroundColor}]}>
                        <FastImage source={{uri: item.photoUrl}} style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}/>
                        <FastImage source={require('./../../assets/blur_effect.png')} style={{position: 'absolute', bottom: 0, left: 0, right: 0, top: 0}}/>
                        <View style={styles.bottomView}>
                            <View style={[styles.bottomNameView]}>
                                <Text style={[styles.nameText, {color: theme.backgroundColor}]}>{item.name}</Text>
                                <Text style={[styles.nameText, {color: theme.backgroundColor}]}>, {item.age}</Text>
                            </View>
                            <View style={[styles.bottomNameView]}>
                                <Icon type={'Feather'} name={'map-pin'} style={{fontSize: 14, color: theme.backgroundColor}}/>
                                <Text style={[styles.locationText, {color: theme.backgroundColor}]}> 4km away</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableFeedback>
        );
    }
}

export default SeekerUserComponent;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        height: 177,
        width: (W_WIDTH/2) - 20,
        overflow: 'hidden'
    },
    innerView: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden'
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingBottom: 15,
        paddingHorizontal: 15,
    },
    bottomNameView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    onlineView: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: ONLINE,
        marginRight: 5,
    },
    nameText: {
        fontSize: 18,
        fontWeight: '600'
    },
    locationText: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: '400'
    }
});
