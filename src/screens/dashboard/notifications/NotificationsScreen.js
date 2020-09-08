import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../../components/general/HeaderComponent';
import NotificationComponent from '../../../components/notifcations/NotificationComponent';
import {getNotificationLists} from '../../../actions/notificationsAction';

class NotificationsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notificationData: []
        }
    }

    componentDidMount(): void {
        this.getData();
    }

    getData = () => {
        getNotificationLists(this.props.user.uid).then(response => {
           this.setState({notificationData: response});
        });
    };

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    render() {
        const {notificationData} = this.state;
        const {theme, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent title={'Notifications'} theme={theme} onLeftPress={this.onBackPress}/>
                <View style={[styles.innerView]}>
                    <FlatList showsVerticalScrollIndicator={false}
                              showsHorizontalScrollIndicator={false}
                              data={notificationData}
                              extraData={notificationData}
                              renderItem={({item}) => <NotificationComponent refreshData={this.getData} theme={theme} item={item} navigation={navigation}/> }
                              keyExtractor={item => item.id.toString()}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
    user: state.auth.user,
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
