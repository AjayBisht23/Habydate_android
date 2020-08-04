import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ASPECT_RATIO, shadow, TouchableFeedback, W_WIDTH} from '../../utils/regex';
import {Icon} from "native-base";
import FastImage from 'react-native-fast-image';

class SquarePhotoComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme, item} = this.props;

        return (
            <View style={[styles.container]}>
                    <FastImage source={{uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}}
                               style={[styles.imageView]}/>
            </View>
        );
    }
}

export default SquarePhotoComponent;

const totalWidth = W_WIDTH - 40;

const styles = StyleSheet.create({
    container: {
        height: (totalWidth/3),
        width: (totalWidth/3),
        borderRadius: 10,
    },
    imageView: {
        height: (totalWidth/3) - 10,
        width: (totalWidth/3) - 10,
        borderRadius: 10,
    },
});
