import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ASPECT_RATIO, shadow, TouchableFeedback, W_WIDTH} from '../../utils/regex';
import {Icon} from "native-base";
import FastImage from 'react-native-fast-image';

class AddPhotoComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme, item, index, openLibrary, removePhoto} = this.props;

        return (
            <View style={[styles.container]}>
                <View style={[styles.innerView, {backgroundColor: theme.textInputBackgroundColor}]}>
                    {
                        item.photoUrl
                            ? <View style={[styles.innerView]}>
                                <FastImage source={{uri: item.photoUrl}} style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}/>
                                <TouchableFeedback onPress={() => removePhoto(index)}>
                                    <View style={[styles.deleteView]}>
                                        <Icon type={'Feather'} name={'trash'} style={{fontSize: 18, color: theme.backgroundColor}} />
                                    </View>
                                </TouchableFeedback>
                        </View>
                            : <TouchableFeedback onPress={() => openLibrary(item)}>
                                <View style={[styles.innerView, {alignItems: 'center', justifyContent: 'center'}]}>
                                    <View style={[styles.plusView, {backgroundColor: theme.backgroundColor}]}>
                                        <Icon type={'Feather'} name={'plus'} style={{fontSize: 20, color: theme.subSecondaryColor}} />
                                    </View>
                                </View>
                            </TouchableFeedback>
                    }
                </View>
            </View>
        );
    }
}

export default AddPhotoComponent;

const styles = StyleSheet.create({
    container: {
       marginHorizontal: 10,
       paddingHorizontal: 10,
       marginVertical: 10,
       height: 200,
       width: (W_WIDTH/2) - 20,
    },
    innerView: {
       flex: 1,
       borderRadius: 20,
       overflow: 'hidden',
    },
    plusView: {
        width: 42,
        height: 42,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadow(5)
    },
    deleteView: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#1A1A1A95',
        ...shadow(5)
    }
});
