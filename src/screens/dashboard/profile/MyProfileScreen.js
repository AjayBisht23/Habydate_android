import React, {Component} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {HEIGHT_RATIO, W_WIDTH} from '../../../utils/regex';
import FastImage from 'react-native-fast-image';
import {Button, Icon} from 'native-base';
import CommonButton from '../../../components/general/CommonButton';

class MyProfileScreen extends Component {

    constructor(props) {
        super(props);
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    render() {
        const {theme, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <ParallaxScrollView
                    backgroundColor={theme.container.backgroundColor}
                    headerBackgroundColor={'transparent'}
                    contentContainerStyle={{borderTopLeftRadius: 25, borderTopRightRadius: 25, marginTop: -25}}
                    stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                    parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                    backgroundSpeed={10}
                    renderBackground={() => (
                        <View style={{height: PARALLAX_HEADER_HEIGHT, flex: 1}}>
                            <FastImage source={{uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}}
                                       style={[styles.imageView]}/>
                        </View>
                    )}
                    renderFixedHeader={() => (
                        <View key="fixed-header" style={styles.fixedSection}>
                            <Button transparent onPress={this.onBackPress}>
                                <Icon type={'Feather'} name={'chevron-left'} style={{fontSize: 30, color: theme.backgroundColor}} />
                            </Button>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Button transparent onPress={this.onBackPress}>
                                    <Icon type={'Feather'} name={'camera'} style={{color: theme.backgroundColor}} />
                                </Button>
                                <Button transparent onPress={this.onBackPress}>
                                    <Icon type={'Feather'} name={'edit'} style={{color: theme.backgroundColor}} />
                                </Button>
                            </View>
                        </View>
                    )}>
                        <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                            <View style={{alignItems: 'center', justifyContent: 'center', marginVertical: 10}}>
                                <View style={{width: 50, height: 6, borderRadius: 3, backgroundColor: theme.subSecondaryColor}}/>
                            </View>
                            <Text style={[styles.nameText, {color: theme.primaryColor}]}>Linda Kelly, 24</Text>
                            <CommonButton
                                theme={theme}
                                container={{marginVertical: 15}}
                                innerContainer={{paddingVertical: 30, borderRadius: 15}}
                                backgroundColor={theme.pinkColor}
                                borderColor={theme.pinkColor}
                                textColor={theme.backgroundColor}
                                title={'Upgrade to Premium'}
                                onPress={this.nextPress}
                            />
                            <TextInput style={[styles.bioText, {color: theme.subPrimaryColor, backgroundColor: theme.textInputBackgroundColor,}]}
                                       value={''}
                                       placeholder="Write something about yourself..."
                                       placeholderTextColor={theme.subPrimaryColor}
                                       multiline={true}
                                       numberOfLines={5}
                                       onChangeText={(note) => this.setState({note})}
                            />
                            <View style={{height: 1, backgroundColor: theme.borderColor, marginVertical: 20}}/>
                            <Text style={[styles.photoText, {color: theme.primaryColor}]}>All Photos (0)</Text>
                            <View style={[styles.addPhotoView, {backgroundColor: theme.primaryBackgroundColor, borderColor: theme.borderColor}]}>
                                <Icon type={'Feather'} name={'plus'} style={{color: theme.subSecondaryColor}} />
                                <Text style={[styles.buttonAddPhotoText, {color: theme.subSecondaryColor}]}> Add Photos</Text>
                            </View>
                            <View style={[styles.commonView, {backgroundColor: theme.backgroundColor, borderColor: theme.borderColor}]}>
                                <Text style={[styles.commonText, {color: theme.primaryColor}]}>Your Information</Text>
                            </View>
                            <View style={[styles.commonView, {backgroundColor: theme.backgroundColor, borderColor: theme.borderColor}]}>
                                <Text style={[styles.commonText, {color: theme.primaryColor}]}>Gender</Text>
                                <Text style={[styles.commonText, {color: theme.subPrimaryColor}]}>Male</Text>
                            </View>
                            <View style={[styles.commonView, {backgroundColor: theme.backgroundColor, borderColor: theme.borderColor}]}>
                                <Text style={[styles.commonText, {color: theme.primaryColor}]}>Personality</Text>
                                <Text style={[styles.commonText, {color: theme.subPrimaryColor}]}>Romantic</Text>
                            </View>
                            <View style={[styles.commonView, {backgroundColor: theme.backgroundColor, borderColor: theme.borderColor}]}>
                                <Text style={[styles.commonText, {color: theme.primaryColor}]}>Education</Text>
                                <Text style={[styles.commonText, {color: theme.subPrimaryColor}]}>Bachelor</Text>
                            </View>
                            <View style={[styles.commonView, {backgroundColor: theme.backgroundColor, borderColor: theme.borderColor}]}>
                                <Text style={[styles.commonText, {color: theme.primaryColor}]}>Marital Status</Text>
                                <Text style={[styles.commonText, {color: theme.subPrimaryColor}]}>Single Mom</Text>
                            </View>
                            <View style={[styles.commonView, {backgroundColor: theme.backgroundColor, borderColor: theme.borderColor}]}>
                                <Text style={[styles.commonText, {color: theme.primaryColor}]}>Looking for</Text>
                                <Text style={[styles.commonText, {color: theme.subPrimaryColor}]}>Friendship</Text>
                            </View>
                            <View style={[styles.commonView, {backgroundColor: theme.backgroundColor, borderColor: theme.borderColor}]}>
                                <Text style={[styles.commonText, {color: theme.primaryColor}]}>Religion</Text>
                                <Text style={[styles.commonText, {color: theme.subPrimaryColor}]}>Hindu</Text>
                            </View>
                            <View style={[styles.commonView, {backgroundColor: theme.backgroundColor, borderColor: theme.borderColor}]}>
                                <Text style={[styles.commonText, {color: theme.primaryColor}]}>Smoking</Text>
                                <Text style={[styles.commonText, {color: theme.subPrimaryColor}]}>No-Smoker</Text>
                            </View>
                            <View style={[styles.commonView, {backgroundColor: theme.backgroundColor, borderColor: theme.borderColor}]}>
                                <Text style={[styles.commonText, {color: theme.primaryColor}]}>Drinking</Text>
                                <Text style={[styles.commonText, {color: theme.subPrimaryColor}]}>No-Drinker</Text>
                            </View>
                            <View style={{marginVertical: 15}}/>
                        </View>
                </ParallaxScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(MyProfileScreen);

const PARALLAX_HEADER_HEIGHT = HEIGHT_RATIO(.468);
const STICKY_HEADER_HEIGHT = HEIGHT_RATIO(.103);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageView: {
        width: W_WIDTH,
        height: PARALLAX_HEADER_HEIGHT,
    },
    fixedSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 10,
        right: 0,
        left: 0,
    },
    nameText: {
        paddingHorizontal: 20,
        marginTop: 10,
        fontSize: 24,
        fontWeight: '800',
    },
    bioText: {
        marginHorizontal: 20,
        height: 100,
        padding: 15,
        paddingTop: 15,
        borderRadius: 15,
        marginTop: 5
    },
    photoText: {
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: '600',
    },
    addPhotoView: {
        marginHorizontal: 20,
        marginVertical: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1
    },
    buttonAddPhotoText: {
        fontSize: 18,
        fontWeight: '600',
    },
    commonView: {
        marginHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1
    },
    commonText: {
        fontSize: 18,
        fontWeight: '400'
    }
});
