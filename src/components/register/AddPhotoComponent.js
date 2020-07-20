import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ASPECT_RATIO, shadow, TouchableFeedback, W_WIDTH} from '../../utils/regex';
import {Icon} from "native-base";

class AddPhotoComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme, item} = this.props;

        return (
            <View style={[styles.container]}>
                <View style={[styles.innerView, {backgroundColor: theme.textInputBackgroundColor}]}>
                    {
                        item.photoUrl
                            ? <View/>
                            : <View style={[styles.innerView, {alignItems: 'center', justifyContent: 'center'}]}>
                                  <View style={[styles.plusView, {backgroundColor: theme.backgroundColor}]}>
                                      <Icon type={'Feather'} name={'plus'} style={{fontSize: 20, color: theme.subSecondaryColor}} />
                                  </View>
                            </View>
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
       overflow: 'hidden'
    },
    innerView: {
       flex: 1,
       borderRadius: 20,
    },
    plusView: {
        width: 42,
        height: 42,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadow(5)
    }
});
