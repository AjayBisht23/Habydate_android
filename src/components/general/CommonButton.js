import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ASPECT_RATIO, TouchableFeedback} from '../../utils/regex';

class CommonButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme, backgroundColor, borderColor, title, textColor, container, onPress} = this.props;

        return (
            <View style={[styles.viewContainer, container]}>
                <TouchableFeedback onPress={()=>onPress()}>
                    <View style={[styles.buttonInnerContainer, {backgroundColor, borderColor}]}>
                        <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
                    </View>
                </TouchableFeedback>
            </View>
        );
    }
}

export default CommonButton;

const styles = StyleSheet.create({
    viewContainer: {
        marginHorizontal: 20,
    },
    buttonInnerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderWidth: 1,
        borderRadius: 28,
    },
    buttonText: {
        fontSize: ASPECT_RATIO(16),
        fontWeight: '600',
    }
});
