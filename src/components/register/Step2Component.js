import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, Modal} from 'react-native';
import CommonButton from '../general/CommonButton';
import {ASPECT_RATIO, W_WIDTH} from '../../utils/regex';
import HeightModal from './HeightModal';

class Step2Component extends Component {

    constructor(props) {
        super(props);
        this.state = {
            birthday: '',
            height: `0' / 00'`,
            modalVisible: false,
            selectedBodyType: '',
            selectedGender: '',
            bodyTypeData: [
                {
                    id: 1,
                    title: 'Thin',
                    selected: false
                },
                {
                    id: 2,
                    title: 'Average',
                    selected: false
                },
                {
                    id: 3,
                    title: 'Athletic',
                    selected: false
                },
                {
                    id: 4,
                    title: 'Curvy',
                    selected: false
                },
            ],
            genderData: [
                {
                    id: 1,
                    title: 'Man',
                    selected: false
                },
                {
                    id: 2,
                    title: 'Woman',
                    selected: false
                },
                {
                    id: 3,
                    title: 'Non-binary',
                    selected: false
                },
            ]
        }
    }

    nextPress = () => {
        const {onPress} = this.props;
        onPress(2);
    };

    openHeightPress = () => {
        this.setState({modalVisible: true});
    };

    onBodyTypePress = (item) => {
        this.setState({selectedBodyType: item.title});
    };

    renderBodyTypeItem = ({ item }) => {
        const {selectedBodyType} = this.state;
        const {theme} = this.props;
        let selected = false;
        if (selectedBodyType === item.title)
            selected = true;

        return (
            <CommonButton
                theme={theme}
                container={{marginVertical: 8}}
                backgroundColor={theme.backgroundColor}
                borderColor={selected ? theme.pinkColor : theme.borderColor}
                textColor={selected ? theme.pinkColor : theme.secondaryColor}
                title={item.title}
                onPress={() => this.onBodyTypePress(item)}
            />
        )
    };

    onGenderPress = (item) => {
        this.setState({selectedGender: item.title});
    };

    renderGenderItem = ({ item }) => {
        const {selectedGender} = this.state;
        const {theme} = this.props;
        let selected = false;
        if (selectedGender === item.title)
            selected = true;

        return (
            <CommonButton
                theme={theme}
                container={{marginVertical: 8}}
                backgroundColor={theme.backgroundColor}
                borderColor={selected ? theme.pinkColor : theme.borderColor}
                textColor={selected ? theme.pinkColor : theme.secondaryColor}
                title={item.title}
                onPress={() => this.onGenderPress(item)}
            />
        )
    };

    render() {
        const {birthday, height, bodyTypeData, genderData, modalVisible} = this.state;
        const {theme} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <ScrollView>
                    <Text style={[styles.titleText, {color: theme.primaryColor}]}>{'My Birthday is'}</Text>
                    <View>
                        <Text style={[styles.titleTextInput, {color: theme.subPrimaryColor}]}>Date of Birth*</Text>
                        <Text style={[styles.titleTextInput, {color: theme.subSecondaryColor}]}>Your age will be public</Text>
                        <Text style={[styles.titleTextInput, {color: theme.subPrimaryColor}]}>Height</Text>
                        <CommonButton
                            theme={theme}
                            container={{marginTop: 5}}
                            backgroundColor={theme.textInputBackgroundColor}
                            borderColor={theme.textInputBackgroundColor}
                            textColor={theme.subPrimaryColor}
                            title={height}
                            onPress={this.openHeightPress}
                            dropDownArrow={true}
                            arrowColor={theme.subPrimaryColor}
                        />
                        <Text style={[styles.titleText, {color: theme.primaryColor}]}>{'Body Type'}</Text>
                        <FlatList
                            scrollEnabled={false}
                            data={bodyTypeData}
                            renderItem={this.renderBodyTypeItem}
                            keyExtractor={item => item.id.toString()}
                        />
                        <Text style={[styles.titleText, {color: theme.primaryColor}]}>{'Gender'}</Text>
                        <FlatList
                            scrollEnabled={false}
                            data={genderData}
                            renderItem={this.renderGenderItem}
                            keyExtractor={item => item.id.toString()}
                        />
                        <CommonButton
                            theme={theme}
                            container={{marginVertical: ASPECT_RATIO(30)}}
                            backgroundColor={theme.pinkColor}
                            borderColor={theme.pinkColor}
                            textColor={theme.backgroundColor}
                            title={'Continue'}
                            onPress={this.nextPress}
                        />
                    </View>
                </ScrollView>
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {}}
                >
                    <HeightModal theme={theme}
                                 onClose={(height) => {
                                     let setStateData = {modalVisible: false};
                                     if (height)
                                         setStateData.height = height;

                                     this.setState(setStateData);
                                 }}
                    />
                </Modal>
            </View>
        );
    }
}

export default Step2Component;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: W_WIDTH
    },
    titleText: {
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 10,
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center'
    },
    titleTextInput: {
        marginHorizontal: 20,
        marginVertical: 5,
        fontSize: 14,
        fontWeight: '500'
    }
});
