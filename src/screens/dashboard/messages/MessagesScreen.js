import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, Switch} from 'react-native';
import {connect} from 'react-redux';
import {Button, Icon} from 'native-base';
import HeaderComponent from '../../../components/general/HeaderComponent';
import MessagesComponent from '../../../components/messages/MessagesComponent';
import {PINK, White} from '../../../themes/constantColors';
import {TouchableFeedback} from '../../../utils/regex';

class MessagesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePicUrl: '',
            messageData: [
                {
                    id: 1,
                    photoUrl: 'https://images.unsplash.com/photo-1521167318043-b2ce52398029?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Anne Garza',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: true,
                    read: true
                },
                {
                    id: 2,
                    photoUrl: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Mariana',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: false,
                    read: false
                },
                {
                    id: 3,
                    photoUrl: 'https://images.unsplash.com/photo-1518675970634-bdd3fe443f52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Antanella',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: false,
                    read: false
                },
                {
                    id: 4,
                    photoUrl: 'https://images.unsplash.com/photo-1536720298877-693b87f05655?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Lina Jessica',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: true,
                    read: false
                },
                {
                    id: 5,
                    photoUrl: 'https://images.unsplash.com/photo-1510696324343-95958c75f30c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Anne Garza',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: false,
                    read: true
                },
                {
                    id: 6,
                    photoUrl: 'https://images.unsplash.com/photo-1456412684996-31507d7d17b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Ana Lucia',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: true,
                    read: false
                },
                {
                    id: 7,
                    photoUrl: 'https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Maria Jose',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: false,
                    read: false
                },
                {
                    id: 8,
                    photoUrl: 'https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Anne Garza',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: false,
                    read: false
                },
                {
                    id: 9,
                    photoUrl: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Maria Jose',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: false,
                    read: false
                },
                {
                    id: 10,
                    photoUrl: 'https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Anne Garza',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: false,
                    read: false
                },
            ]
        }
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
        const {messageData} = this.state;
        const {theme, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent theme={theme}
                                 rightView={<Button transparent onPress={this.onRightPress}>
                                     <Icon type={'Feather'} name={'search'} style={{color: theme.subSecondaryColor}} />
                                 </Button>}
                                 onLeftPress={this.onBackPress}/>
                <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                    <FlatList
                        data={messageData}
                        extraData={messageData}
                        ListHeaderComponent={this.renderHeader}
                        renderItem={({item}) => <MessagesComponent theme={theme} item={item}/> }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
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
