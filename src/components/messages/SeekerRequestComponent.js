import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ASPECT_RATIO, shadow, TouchableFeedback, W_WIDTH} from '../../utils/regex';
import FastImage from 'react-native-fast-image';
import {ONLINE, PINK, White} from '../../themes/constantColors';
import CommonButton from '../general/CommonButton';

class SeekerRequestComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme, item} = this.props;

        return (
            <View style={[styles.container, {borderColor: theme.borderColor}]}>
                <FastImage source={{uri: item.photoUrl}} style={{width: 56, height: 56, borderRadius: 28}}/>
                <View style={[styles.infoView]}>
                    <View style={[styles.nameView]}>
                        <Text style={[styles.nameText, {color: theme.primaryColor}]}>{item.name}, {item.age}</Text>
                        <Text style={[styles.likeText, {color: theme.subPrimaryColor}]}>{'Sent you a request'}</Text>
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
                                container={{flex: 1, marginHorizontal: 0, marginRight: 20}}
                                innerContainer={{borderRadius: 5, paddingVertical: 13}}
                                backgroundColor={theme.pinkColor}
                                borderColor={theme.pinkColor}
                                textColor={theme.backgroundColor}
                                title={'Accept'}
                                onPress={this.loginPress}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default SeekerRequestComponent;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
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
        fontSize: 14,
        fontWeight: '400'
    },
    requestView: {
        flexDirection: 'row',
        marginTop: 10
    }
});
