import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../../components/general/HeaderComponent';
import NotificationComponent from '../../../components/notifcations/NotificationComponent';

class NotificationsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    photoUrl: 'https://images.unsplash.com/photo-1521167318043-b2ce52398029?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Anne Garza',
                    date: '2 min age',
                    type: 'launch_request',
                    location: 'Colombia',
                    request_status: null,
                },
                {
                    id: 2,
                    photoUrl: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Mariana',
                    date: '2 min age',
                    type: 'app_rate',
                    request_status: null,
                },
                {
                    id: 3,
                    photoUrl: 'https://images.unsplash.com/photo-1518675970634-bdd3fe443f52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Antanella',
                    date: '2 min age',
                    type: 'like',
                    request_status: null,
                },
                {
                    id: 4,
                    photoUrl: 'https://images.unsplash.com/photo-1536720298877-693b87f05655?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Lina Jessica',
                    date: '2 min age',
                    type: 'app_rate',
                    request_status: null,
                },
                {
                    id: 5,
                    photoUrl: 'https://images.unsplash.com/photo-1510696324343-95958c75f30c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Anne Garza',
                    date: '2 min age',
                    type: 'like',
                    request_status: null,
                },
                {
                    id: 6,
                    photoUrl: 'https://images.unsplash.com/photo-1456412684996-31507d7d17b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Ana Lucia',
                    date: '2 min age',
                    type: 'app_rate',
                    request_status: null,
                },
                {
                    id: 7,
                    photoUrl: 'https://images.unsplash.com/photo-1510696324343-95958c75f30c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    name: 'Anne Garza',
                    date: '2 min age',
                    type: 'like',
                    request_status: null,
                },
            ]
        }
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    render() {
        const {data} = this.state;
        const {theme, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent title={'Notifications'} theme={theme} onLeftPress={this.onBackPress}/>
                <View style={[styles.innerView]}>
                    <FlatList
                        data={data}
                        extraData={data}
                        renderItem={({item}) => <NotificationComponent
                            theme={theme}
                            item={item}
                            navigation={navigation}
                        /> }
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(NotificationsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerView: {
        flex: 1,
    },

});
