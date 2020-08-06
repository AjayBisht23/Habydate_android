import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView, Switch} from 'react-native';
import {ASPECT_RATIO, TouchableFeedback, W_WIDTH} from './../../../utils/regex';
import {Icon} from "native-base";
import Slider from "react-native-slider";
import {White} from '../../../themes/constantColors';
import CommonButton from '../../../components/general/CommonButton';

let lookingData = [
    {
        id: 1,
        title: 'Dating',
        selected: false
    },
    {
        id: 2,
        title: 'Friendship',
        selected: false
    },
    {
        id: 3,
        title: 'Chat Buddy',
        selected: false
    },
    {
        id: 4,
        title: 'High Buddy',
        selected: false
    },
    {
        id: 5,
        title: 'Sugar Daddy',
        selected: false
    },
    {
        id: 6,
        title: 'Sugar Momma',
        selected: false
    },
    {
        id: 7,
        title: 'Sugar Baby',
        selected: false
    },
    {
        id: 8,
        title: 'Hookups',
        selected: false
    },
    {
        id: 9,
        title: 'Friends with benefits',
        selected: false
    },
];

let showMeData = [
    {
        id: 1,
        title: 'Straight',
        selected: false
    },
    {
        id: 2,
        title: 'Gay',
        selected: false
    },
    {
        id: 3,
        title: 'Lesbian',
        selected: false
    },
    {
        id: 4,
        title: 'Bisexual',
        selected: false
    },
    {
        id: 5,
        title: 'Trans',
        selected: false
    },
    {
        id: 6,
        title: 'Others',
        selected: false
    },
];

class FilterModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLocation: 'New york',
            selectedDistance: 30,
            isLookingData: false,
            lookingData: lookingData,
            isShowMeData: false,
            showMeData: showMeData,
            selectedAge: 25,
            isMatchSound: false
        }
    }

    matchSoundSwitch = (isMatchSound) => {
        this.setState({isMatchSound})
    };

    onLookingPress = (item) => {
      item.selected = !item.selected;
      this.setState({lookingData: this.state.lookingData});
    };

    renderLookingItem = ({ item }) => {
        const {theme} = this.props;
        let selected = item.selected;

        let iconName = selected ? 'check-circle' : 'circle';
        return (
            <TouchableFeedback onPress={()=>this.onLookingPress(item)}>
                <View style={[styles.renderItemView]}>
                    <Icon type={'Feather'} name={iconName} style={{fontSize: 20, color: theme.pinkColor}}/>
                    <Text style={styles.renderItemText}>{item.title}</Text>
                </View>
            </TouchableFeedback>
        )
    };

    render() {
        const {selectedLocation, selectedDistance, isLookingData, lookingData, isShowMeData, showMeData, selectedAge, isMatchSound} = this.state;
        const {theme, onClose} = this.props;

        return (
            <View style={[styles.container]}>
                <View style={[styles.innerContainer, {backgroundColor: theme.container.backgroundColor}]}>
                    <View style={[styles.commonView, styles.itemView, {marginHorizontal: 0, paddingHorizontal: 20, borderColor: theme.borderColor}]}>
                        <Icon type={'Feather'} name={'x'} style={{fontSize: 25, color: theme.primaryColor}} onPress={()=>onClose()}/>
                        <Text style={[styles.titleText, {color: theme.primaryColor}]}>{'Filter'}</Text>
                        <Text style={[styles.titleText, {color: theme.subPrimaryColor}]}>{'Reset'}</Text>
                    </View>
                    <ScrollView>
                        <View style={{paddingBottom: 20}}>
                            <View style={[styles.itemView, styles.commonView, {borderColor: theme.borderColor}]}>
                                <Text style={[styles.commonTitleText, {color: theme.primaryColor}]}>{'Location'}</Text>
                                <View style={[styles.rightRowView]}>
                                    <Text style={[styles.commonTitleText, {color: theme.subPrimaryColor}]}>{selectedLocation}</Text>
                                    <Icon type={'Feather'} name={'chevron-right'} style={{fontSize: 22, color: theme.subPrimaryColor}}/>
                                </View>
                            </View>
                            <View style={[styles.commonView, {borderColor: theme.borderColor}]}>
                                <View style={[styles.itemView]}>
                                    <Text style={[styles.commonTitleText, {color: theme.primaryColor}]}>{'Distance'}</Text>
                                    <View style={[styles.rightRowView]}>
                                        <Text style={[styles.commonTitleText, {color: theme.subPrimaryColor}]}>{`${selectedDistance}mi`}</Text>
                                    </View>
                                </View>
                                <Slider
                                    minimumValue={1}
                                    maximumValue={200}
                                    value={selectedDistance}
                                    minimumTrackTintColor={theme.pinkColor}
                                    thumbImage={require('./../../../assets/sliderthumb.png')}
                                    thumbStyle={[styles.sliderTrack, {shadowColor: theme.pinkColor}]}
                                    thumbTintColor={theme.pinkColor}
                                    thumbTouchSize={{width: 32, height: 20}}
                                    onValueChange={(selectedDistance) => this.setState({selectedDistance: Math.round(selectedDistance)})}
                                />
                            </View>
                            <View style={[styles.commonView, {borderColor: theme.borderColor}]}>
                                <TouchableFeedback onPress={() => this.setState({isLookingData: !isLookingData})}>
                                    <View style={[styles.itemView]}>
                                        <Text style={[styles.commonTitleText, {color: theme.primaryColor}]}>{'Interested in'}</Text>
                                        <View style={[styles.rightRowView]}>
                                            <Icon type={'Feather'} name={'chevron-down'} style={{fontSize: 22, color: theme.subPrimaryColor}}/>
                                        </View>
                                    </View>
                                </TouchableFeedback>
                                {
                                    isLookingData && <View style={{marginTop: 10}}>
                                        <FlatList
                                            data={lookingData}
                                            extraData={lookingData}
                                            renderItem={this.renderLookingItem}
                                            keyExtractor={item => item.id.toString()}
                                        />
                                    </View>
                                }
                            </View>
                            <View style={[styles.commonView, {borderColor: theme.borderColor}]}>
                                <TouchableFeedback onPress={() => this.setState({isShowMeData: !isShowMeData})}>
                                    <View style={[styles.itemView]}>
                                        <Text style={[styles.commonTitleText, {color: theme.primaryColor}]}>{'Show me'}</Text>
                                        <View style={[styles.rightRowView]}>
                                            <Icon type={'Feather'} name={'chevron-down'} style={{fontSize: 22, color: theme.subPrimaryColor}}/>
                                        </View>
                                    </View>
                                </TouchableFeedback>
                                {
                                    isShowMeData && <View style={{marginTop: 10}}>
                                        <FlatList
                                            data={showMeData}
                                            extraData={showMeData}
                                            renderItem={this.renderLookingItem}
                                            keyExtractor={item => item.id.toString()}
                                        />
                                    </View>
                                }
                            </View>
                            <View style={[styles.commonView, {borderColor: theme.borderColor}]}>
                                <View style={[styles.itemView]}>
                                    <Text style={[styles.commonTitleText, {color: theme.primaryColor}]}>{'Age'}</Text>
                                    <View style={[styles.rightRowView]}>
                                        <Text style={[styles.commonTitleText, {color: theme.subPrimaryColor}]}>{`18 - ${selectedAge}`}</Text>
                                    </View>
                                </View>
                                <Slider
                                    minimumValue={18}
                                    maximumValue={80}
                                    value={selectedAge}
                                    minimumTrackTintColor={theme.pinkColor}
                                    thumbImage={require('./../../../assets/sliderthumb.png')}
                                    thumbStyle={[styles.sliderTrack, {shadowColor: theme.pinkColor}]}
                                    thumbTintColor={theme.pinkColor}
                                    thumbTouchSize={{width: 32, height: 20}}
                                    onValueChange={(selectedAge) => this.setState({selectedAge: Math.round(selectedAge)})}
                                />
                            </View>
                            <View style={[styles.itemView, styles.commonView, {borderColor: theme.borderColor}]}>
                                <Text style={[styles.commonTitleText, {color: theme.primaryColor}]}>{'Match Sound'}</Text>
                                <View style={[styles.rightRowView]}>
                                    <Switch
                                        trackColor={{ false: theme.pinkColor, true: theme.pinkColor }}
                                        thumbColor={White}
                                        ios_backgroundColor={'transparent'}
                                        onValueChange={this.matchSoundSwitch}
                                        value={isMatchSound}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <CommonButton
                        theme={theme}
                        container={{marginVertical: 20}}
                        backgroundColor={theme.pinkColor}
                        borderColor={theme.pinkColor}
                        textColor={theme.backgroundColor}
                        title={'Done'}
                        onPress={this.nextPress}
                    />
                </View>
            </View>
        );
    }
}

export default FilterModal;

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
    commonView: {
        marginHorizontal: 20,
        paddingVertical: 18,
        borderBottomWidth: 1,
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    commonTitleText: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center'
    },
    rightRowView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sliderTrack: {
        width: 32,
        height: 17,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },
    renderItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    renderItemText: {
        marginLeft: 10,
        fontSize: 14,
    }
});
