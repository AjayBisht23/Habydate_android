import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ASPECT_RATIO, shadow, TouchableFeedback, W_WIDTH} from '../../utils/regex';
import FastImage from 'react-native-fast-image';
import {ONLINE, PINK, White} from '../../themes/constantColors';

class MessagesComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme, item, navigation} = this.props;

        return (
            <TouchableFeedback onPress={() => navigation.navigate('ChatScreen')}>
                <View style={[styles.container]}>
                    <View style={styles.rowView}>
                        <View style={styles.profileView}>
                            <FastImage source={{uri: item.photoUrl}} style={{width: 46, height: 46, borderRadius: 23}}/>
                            <View style={[styles.onlineView, {backgroundColor: item.online ? ONLINE : theme.subSecondaryColor}]} />
                        </View>
                        <View style={[styles.textView, {borderColor: theme.borderColor}]}>
                            <View style={[styles.innerRowView]}>
                                <Text style={[styles.nameText, {color: theme.secondaryColor}]}>{item.name}</Text>
                                <Text style={[styles.timeText, {color: theme.secondaryColor}]}>{item.date}</Text>
                            </View>
                            <View style={[styles.innerRowView, {marginTop: 5}]}>
                                <Text style={[styles.messageText, {color: theme.primaryColor}]}>{item.massage}</Text>
                                {item.read && <View style={styles.readView}/>}
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableFeedback>
        );
    }
}

export default MessagesComponent;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    rowView: {
       flexDirection: 'row',
    },
    profileView: {
       paddingVertical: 15,
    },
    onlineView: {
        position: 'absolute',
        left: 2,
        top: 13,
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: White,
        backgroundColor: ONLINE,
        marginRight: 5,
    },
    textView: {
        flex: 1,
        marginLeft: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
    },
    innerRowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    nameText: {
        fontSize: 16,
        fontWeight: '400'
    },
    messageText: {
        fontSize: 16,
        fontWeight: '500'
    },
    timeText: {
        fontSize: 14,
        fontWeight: '400'
    },
    readView: {
        marginLeft: 10,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: PINK,
    }
});
