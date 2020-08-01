import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, Switch} from 'react-native';
import {connect} from 'react-redux';
import {Button, Icon} from 'native-base';
import HeaderComponent from '../../../components/general/HeaderComponent';
import {PINK, White} from '../../../themes/constantColors';
import WhoLikeComponent from '../../../components/messages/WhoLikeComponent';

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
                    age: '26',
                    date: 'Just Now',
                    massage: 'Hello, My Love you are so cute...',
                    online: true,
                    read: true
                },
                {
                    id: 2,
                    photoUrl: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Mariana',
                    age: '22',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: false,
                    read: false
                },
                {
                    id: 3,
                    photoUrl: 'https://images.unsplash.com/photo-1518675970634-bdd3fe443f52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Antanella',
                    age: '25',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: false,
                    read: false
                },
                {
                    id: 4,
                    photoUrl: 'https://images.unsplash.com/photo-1536720298877-693b87f05655?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Lina Jessica',
                    age: '26',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: true,
                    read: false
                },
                {
                    id: 5,
                    photoUrl: 'https://images.unsplash.com/photo-1510696324343-95958c75f30c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Anne Garza',
                    age: '26',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: false,
                    read: true
                },
                {
                    id: 6,
                    photoUrl: 'https://images.unsplash.com/photo-1456412684996-31507d7d17b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Ana Lucia',
                    age: '26',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: true,
                    read: false
                },
                {
                    id: 7,
                    photoUrl: 'https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Maria Jose',
                    age: '26',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: false,
                    read: false
                },
                {
                    id: 8,
                    photoUrl: 'https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Anne Garza',
                    age: '26',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: false,
                    read: false
                },
                {
                    id: 9,
                    photoUrl: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Maria Jose',
                    age: '26',
                    date: '2 min age',
                    massage: 'Hello, My Love you are so cute...',
                    online: false,
                    read: false
                },
                {
                    id: 10,
                    photoUrl: 'https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Anne Garza',
                    age: '26',
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

    render() {
        const {messageData} = this.state;
        const {theme, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent title={'People who liked you'} theme={theme} onLeftPress={this.onBackPress}/>
                <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                    <FlatList
                        data={messageData}
                        extraData={messageData}
                        renderItem={({item}) => <WhoLikeComponent theme={theme} item={item}/> }
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
});
