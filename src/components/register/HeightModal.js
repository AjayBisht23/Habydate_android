import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {ASPECT_RATIO, TouchableFeedback, W_WIDTH} from '../../utils/regex';
import {Icon} from "native-base";

class HeightModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedHeightStatus: '',
            maritalData: [
                {
                    id: 1,
                    title: `4'9''`,
                    size: `145cm`,
                    selected: false
                },
                {
                    id: 2,
                    title: `4'10''`,
                    size: `147.5cm`,
                    selected: false
                },
                {
                    id: 3,
                    title: `4'11''`,
                    size: `150cm`,
                    selected: false
                },
                {
                    id: 4,
                    title: `5'0''`,
                    size: `152.5cm`,
                    selected: false
                },
                {
                    id: 5,
                    title: `5'1''`,
                    size: `155cm`,
                    selected: false
                },
                {
                    id: 6,
                    title: `5'2''`,
                    size: `157.5cm`,
                    selected: false
                },
                {
                    id: 7,
                    title: `5'3''`,
                    size: `160cm`,
                    selected: false
                },
                {
                    id: 8,
                    title: `5'4''`,
                    size: `162.5cm`,
                    selected: false
                },
                {
                    id: 9,
                    title: `5'5''`,
                    size: `165cm`,
                    selected: false
                },
                {
                    id: 10,
                    title: `5'6''`,
                    size: `167.5cm`,
                    selected: false
                },
                {
                    id: 11,
                    title: `5'7''`,
                    size: `170cm`,
                    selected: false
                },
                {
                    id: 12,
                    title: `5'8''`,
                    size: `172.5cm`,
                    selected: false
                },
                {
                    id: 13,
                    title: `5'9''`,
                    size: `175cm`,
                    selected: false
                },
                {
                    id: 14,
                    title: `5'10''`,
                    size: `177.5cm`,
                    selected: false
                },
                {
                    id: 15,
                    title: `5'11''`,
                    size: `180cm`,
                    selected: false
                },
                {
                    id: 16,
                    title: `6'0''`,
                    size: `182.5cm`,
                    selected: false
                },
                {
                    id: 17,
                    title: `6'1''`,
                    size: `185cm`,
                    selected: false
                },
                {
                    id: 18,
                    title: `6'2''`,
                    size: `187.5cm`,
                    selected: false
                },
                {
                    id: 19,
                    title: `6'3''`,
                    size: `190cm`,
                    selected: false
                },
                {
                    id: 20,
                    title: `6'4''`,
                    size: `192.5cm`,
                    selected: false
                },
                {
                    id: 21,
                    title: `6'5''`,
                    size: `195cm`,
                    selected: false
                },
            ]
        }
    }

    onHeightPress = (item) => {
        this.setState({selectedHeightStatus: item.title});
    };

    renderItem = ({ item }) => {
        const {selectedHeightStatus} = this.state;
        const {theme} = this.props;
        let selected = false;
        if (selectedHeightStatus === item.title)
            selected = true;

        let textStyle = {...styles.itemText, fontWeight: selected ? '600' : '500', color: selected ? theme.pinkColor : theme.secondaryColor};
        return (
            <TouchableFeedback onPress={()=>this.onHeightPress(item)}>
                <View style={[styles.itemView, {borderColor: theme.borderColor}]}>
                    <Text style={textStyle}>{item.title}</Text>
                    {selected && <Icon type={'Feather'} name={'check'} style={{fontSize: 20, color: theme.pinkColor}}/>}
                    <Text style={textStyle}>{item.size}</Text>
                </View>
            </TouchableFeedback>
        )
    };

    render() {
        const {maritalData, selectedHeightStatus} = this.state;
        const {theme, onClose} = this.props;

        return (
            <View style={[styles.container]}>
                <View style={[styles.innerContainer, {backgroundColor: theme.container.backgroundColor}]}>
                    <View style={[styles.itemView, {marginHorizontal: 0, paddingHorizontal: 20, borderColor: theme.borderColor}]}>
                        <Icon type={'Feather'} name={'x'} style={{fontSize: 25, color: theme.primaryColor}} onPress={()=>onClose()}/>
                        <Text style={styles.titleText}>{'Height'}</Text>
                        {
                            selectedHeightStatus === ''
                                ? <Text style={styles.titleText}>{'      '}</Text>
                                : <Icon type={'Feather'} name={'check'} style={{fontSize: 25, color: theme.pinkColor}} onPress={()=>onClose(selectedHeightStatus)}/>
                        }
                    </View>
                    <View style={[styles.itemView, {marginHorizontal: 0, paddingHorizontal: 20, paddingVertical: 0, marginTop: 20, borderBottomWidth: 0}]}>
                        <Text style={[styles.titleText, {color: theme.pinkColor}]}>{'ft/inches'}</Text>
                        <Text style={[styles.titleText, {color: theme.pinkColor}]}>{'cm'}</Text>
                    </View>
                    <FlatList
                        data={maritalData}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </View>
        );
    }
}

export default HeightModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: ASPECT_RATIO(225),
        width: W_WIDTH,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    innerContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center'
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        paddingVertical: 18,
        borderBottomWidth: 1,
    },
    itemText: {
        fontSize: 16,
    }
});
