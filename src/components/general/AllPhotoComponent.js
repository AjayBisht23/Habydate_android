import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ASPECT_RATIO, HEIGHT_RATIO, shadow, TouchableFeedback, W_WIDTH} from '../../utils/regex';
import FastImage from 'react-native-fast-image';

class AllPhotoComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme, item} = this.props;

        return (
            <View style={[styles.container, {borderColor: theme.borderColor}]}>
                <FastImage source={{uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}}
                           style={[styles.imageView]}/>
            </View>
        );
    }
}

export default AllPhotoComponent;

const totalWidth = W_WIDTH;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: HEIGHT_RATIO(.22),
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        overflow: 'hidden',
    },
    imageView: {
        width: null,
        height: HEIGHT_RATIO(.22),
        borderRadius: 10,
    },
});
