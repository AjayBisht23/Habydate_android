import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, Switch} from 'react-native';
import {connect} from 'react-redux';
import {Button, Icon} from 'native-base';
import HeaderComponent from '../../../components/general/HeaderComponent';
import MessagesComponent from '../../../components/messages/MessagesComponent';
import {PINK, White} from '../../../themes/constantColors';
import {TouchableFeedback} from '../../../utils/regex';
import {getAllConversation} from '../../../actions/userAction';

class MessagesScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        getAllConversation(this.props.user.uid)
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    onRightPress = () => {

    };

    toggleSwitch = (value) => {

    };

    renderHeader = () => {
        const {theme, navigation} = this.props;
        return <View>
            <View style={[styles.rowView, {borderRadius: 15, paddingVertical: 15, borderBottomWidth: 0, backgroundColor: '#FD353920', paddingHorizontal: 25}]}>
                <Text style={[styles.headText, {color: theme.primaryColor}]}>Available for video call</Text>
                <Switch
                    trackColor={{ false: theme.subPrimaryColor, true: theme.pinkColor }}
                    thumbColor={White}
                    ios_backgroundColor={'transparent'}
                    onValueChange={this.toggleSwitch}
                    value={true}
                />
            </View>
            <TouchableFeedback onPress={() => navigation.navigate('SeekerRequest')}>
                <View style={[styles.rowView, {borderColor: theme.borderColor}]}>
                    <Text style={[styles.headText, {color: theme.primaryColor}]}>Seekers Requests</Text>
                    <View style={[{flexDirection: 'row', alignItems: 'center',}]}>
                        <View style={styles.countView}>
                            <Text style={[styles.countText, {color: theme.backgroundColor}]}>4</Text>
                        </View>
                        <Icon type={'Feather'} name={'chevron-right'} style={{color: theme.subSecondaryColor}} />
                    </View>
                </View>
            </TouchableFeedback>
            <TouchableFeedback onPress={() => navigation.navigate('WhoLikeMe')}>
                <View style={[styles.rowView, {borderBottomWidth: 0}]}>
                    <Text style={[styles.headText, {color: theme.primaryColor}]}>Who Likes Me</Text>
                    <View style={[{flexDirection: 'row', alignItems: 'center',}]}>
                        <View style={styles.countView}>
                            <Text style={[styles.countText, {color: theme.backgroundColor}]}>12</Text>
                        </View>
                        <Icon type={'Feather'} name={'chevron-right'} style={{color: theme.subSecondaryColor}} />
                    </View>
                </View>
            </TouchableFeedback>
            <Text style={[styles.titleText, {color: theme.primaryColor}]}>Messages</Text>
        </View>
    };

    render() {
        const {theme, navigation, conversations} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent theme={theme}
                                 rightView={<Button transparent onPress={this.onRightPress}>
                                     <Icon type={'Feather'} name={'search'} style={{color: theme.subSecondaryColor}} />
                                 </Button>}
                                 onLeftPress={this.onBackPress}/>
                <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                    <FlatList
                        data={conversations}
                        extraData={conversations}
                        ListHeaderComponent={this.renderHeader}
                        renderItem={({item}) => <MessagesComponent theme={theme} item={item} navigation={navigation}/> }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
    user: state.auth.user,
    conversations: state.auth.conversations,
});

export default connect(mapStateToProps)(MessagesScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        marginHorizontal: 20,
        marginVertical: 5,
        paddingVertical: 10
    },
    headText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '400',
    },
    countView: {
        paddingHorizontal: 15,
        paddingVertical: 4,
        backgroundColor: PINK,
        borderRadius: 15
    },
    countText: {
        fontSize: 14,
        fontWeight: '800'
    },
    titleText: {
        marginHorizontal: 20,
        marginVertical: 10,
        fontSize: 32,
        fontWeight: '800'
    }
});
