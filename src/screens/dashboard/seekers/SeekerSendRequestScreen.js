import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../../components/general/HeaderComponent';
import {ASPECT_RATIO, HEIGHT_RATIO} from '../../../utils/regex';
import FastImage from 'react-native-fast-image';
import {Icon} from "native-base";
import CommonButton from '../../../components/general/CommonButton';

class SeekerSendRequestScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
           selectedCategory: 'Choose a category',
           dateTime: 'Select date & time',
           note: '',
        }
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    openCategoryPress = () => {

    };

    openDatePress = () => {

    };

    postPress = () => {

    };

    render() {
        const {selectedCategory, dateTime, note} = this.state;
        const {theme, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent theme={theme} onLeftPress={this.onBackPress}/>
                <View style={[styles.innerView]}>
                    <ScrollView>
                        <View style={[styles.innerView, {padding: 20}]}>
                            <View style={[styles.userView, {backgroundColor: theme.secondaryColor}]}>
                                <FastImage source={{uri: 'https://images.unsplash.com/photo-1521167318043-b2ce52398029?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}}
                                           style={{width: null, height: HEIGHT_RATIO(.45)}}/>
                                <FastImage source={require('./../../../assets/seekerphotogradient.png')}
                                           style={{width: null, height: HEIGHT_RATIO(.45), position: 'absolute', bottom: 0, left: 0, right: 0}}/>
                                <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, marginHorizontal: 20, marginBottom: 20}}>
                                    <Text style={{fontSize: 24, color: theme.backgroundColor, fontWeight: '800'}}>Brice, 24</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                                        <Icon type={'Feather'} name={'map-pin'} style={{fontSize: 14, color: theme.backgroundColor}}/>
                                        <Text style={[styles.timeText, {color: theme.backgroundColor}]}> Colombia</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                                <Icon type={'Feather'} name={'list'} style={{fontSize: 16, color: theme.subPrimaryColor}}/>
                                <Text style={[styles.timeText, {color: theme.subPrimaryColor}]}> Category: </Text>
                            </View>
                            <CommonButton
                                theme={theme}
                                container={{marginTop: 5, marginHorizontal: 0}}
                                backgroundColor={theme.textInputBackgroundColor}
                                borderColor={theme.textInputBackgroundColor}
                                textColor={theme.subPrimaryColor}
                                title={selectedCategory}
                                onPress={this.openCategoryPress}
                                dropDownArrow={true}
                                arrowColor={theme.subPrimaryColor}
                            />
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                                <Icon type={'Feather'} name={'calendar'} style={{fontSize: 16, color: theme.subPrimaryColor}}/>
                                <Text style={[styles.timeText, {color: theme.subPrimaryColor}]}> Date & Time: </Text>
                            </View>
                            <CommonButton
                                theme={theme}
                                container={{marginTop: 5, marginHorizontal: 0}}
                                backgroundColor={theme.textInputBackgroundColor}
                                borderColor={theme.textInputBackgroundColor}
                                textColor={theme.subPrimaryColor}
                                title={dateTime}
                                onPress={this.openDatePress}
                                dropDownArrow={true}
                                arrowColor={theme.subPrimaryColor}
                            />
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                                <Icon type={'Feather'} name={'map-pin'} style={{fontSize: 16, color: theme.subPrimaryColor}}/>
                                <Text style={[styles.timeText, {color: theme.subPrimaryColor}]}> Location: </Text>
                            </View>
                            <FastImage source={{uri: 'https://www.google.com/maps/d/u/0/thumbnail?mid=1hITxlm0XfcDq8ZJjefioOG_Q3YY'}}
                                       style={{width: null, height: HEIGHT_RATIO(.15), borderRadius: 10, marginTop: 5}}/>
                            <View style={{marginVertical: 15}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                                    <Icon type={'Feather'} name={'file-text'} style={{fontSize: 16, color: theme.subPrimaryColor}}/>
                                    <Text style={[styles.timeText, {color: theme.subPrimaryColor}]}> Note: </Text>
                                </View>
                                <TextInput style={{
                                        flex: 1,
                                        color: theme.subPrimaryColor,
                                        backgroundColor: theme.textInputBackgroundColor,
                                        height: 100,
                                        padding: 15,
                                        borderRadius: 15,
                                        marginTop: 5
                                    }}
                                    value={note}
                                    placeholder="Type something here..."
                                    placeholderTextColor={theme.subPrimaryColor}
                                    multiline={true}
                                    numberOfLines={5}
                                    onChangeText={(note) => this.setState({note})}
                                />
                            </View>
                            <CommonButton
                                theme={theme}
                                container={{marginVertical: 20, marginHorizontal: 0}}
                                backgroundColor={theme.pinkColor}
                                borderColor={theme.pinkColor}
                                textColor={theme.backgroundColor}
                                title={'Post'}
                                onPress={this.postPress}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(SeekerSendRequestScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerView: {
        flex: 1,
    },
    userView: {
        height: HEIGHT_RATIO(.45),
        borderRadius: 5,
        overflow: 'hidden',
    },
});
