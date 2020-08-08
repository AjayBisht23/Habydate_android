import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, Modal} from 'react-native';
import CommonButton from '../general/CommonButton';
import {ASPECT_RATIO, regex, W_WIDTH} from '../../utils/regex';
import HeightModal from './HeightModal';
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import moment from 'moment';
import {bodyTypeData, genderData} from '../../json/RegisterJson';
import * as messages from '../../utils/messages';

class Step2Component extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dobText: props.data.dobText,
            dobDate: null,
            height: props.data.height,
            modalVisible: false,
            selectedBodyType: props.data.selectedBodyType,
            selectedGender: props.data.selectedGender,
            bodyTypeData: bodyTypeData,
            genderData: genderData
        }
    }

    nextPress = () => {
        const {dobText, height, selectedBodyType, selectedGender} = this.state;
        const {onPress} = this.props;

        if (dobText === 'MM / DD / YYYY')
            alert(messages.enterDOB);
        else if (height === `0' / 00'`)
            alert(messages.enterHeight);
        else if (regex.isEmpty(selectedBodyType))
            alert(messages.enterBodyType);
        else if (regex.isEmpty(selectedGender))
            alert(messages.enterGender);
        else {
            onPress(2, {dobText, height, selectedBodyType, selectedGender});
        }
    };

    openHeightPress = () => {
        this.setState({modalVisible: true});
    };

    /**
     * DOB textbox click listener
     */
    onDOBPress = () => {
        let dobDate = this.state.dobDate;

        if(!dobDate || dobDate === null){
            dobDate = new Date();
            this.setState({dobDate: dobDate});
        }

        //To open the dialog
        this.dobDialogRef.open({
            date: dobDate,
            maxDate: new Date()
        });
    };

    /**
     * Call back for dob date picked event
     *
     */
    onDOBDatePicked = (date) => {
        this.setState({
            dobDate: date,
            dobText: moment(date).format('MM / DD / YYYY')
        });
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
        const {dobText, height, bodyTypeData, genderData, modalVisible} = this.state;
        const {theme} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <ScrollView>
                    <Text style={[styles.titleText, {color: theme.primaryColor}]}>{'My Birthday is'}</Text>
                    <View>
                        <Text style={[styles.titleTextInput, {color: theme.subPrimaryColor}]}>Date of Birth*</Text>
                        <CommonButton
                            theme={theme}
                            container={{marginTop: 5}}
                            backgroundColor={theme.textInputBackgroundColor}
                            borderColor={theme.textInputBackgroundColor}
                            textColor={theme.subPrimaryColor}
                            title={dobText}
                            onPress={this.onDOBPress}
                        />
                        <Text style={[styles.titleTextInput, {marginVertical: 10, color: theme.subSecondaryColor}]}>Your age will be public</Text>
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
                <Modal animationType={'fade'} transparent={true} visible={modalVisible} onRequestClose={() => {}}>
                    <HeightModal theme={theme}
                                 onClose={(height) => {
                                     let setStateData = {modalVisible: false};
                                     if (height)
                                         setStateData.height = height;

                                     this.setState(setStateData);
                                 }}/>
                </Modal>
                <DatePickerDialog ref={ref => this.dobDialogRef = ref} onDatePicked={this.onDOBDatePicked.bind(this)} />
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
