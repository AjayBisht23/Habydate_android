import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import NHHeader from '../../../components/general/NHHeader';
import NotificationItem from './components/NotificationItem';
import {getNotificationLists} from '../../../services/notificationsAction';
import {updateUserAction} from '../../../services/userAction';
import {getStore} from '../../../../App';
import {NOTIFICATION_UNREAD_COUNT} from '../../../services/types';

class Notifications extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    this.getData();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext: any): boolean {
    let readCount = this.props.notifications;
    if (nextProps.notifications.length > readCount)
      this.updateNotificationCount({
        notificationReadCount: nextProps.notifications.length,
      });

    return true;
  }

  getData = () => {
    getNotificationLists(this.props.user.uid).then((res) => {
      if (res.length > 0)
        this.updateNotificationCount({notificationReadCount: res.length});
    });
  };

  updateNotificationCount = (parameter) => {
    updateUserAction(this.props.user.uid, parameter, 'notifications');
    getStore.dispatch({
      type: NOTIFICATION_UNREAD_COUNT,
      payload: 0,
    });
  };

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    const {theme, navigation, notifications} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <NHHeader
          title={'Notifications'}
          theme={theme}
          onLeftPress={this.onBackPress}
        />
        <View style={[styles.innerView]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={notifications}
            extraData={notifications}
            renderItem={({item}) => (
              <NotificationItem
                refreshData={this.getData}
                theme={theme}
                item={item}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.auth.theme,
  user: state.auth.user,
  notifications: state.auth.notifications,
});

export default connect(mapStateToProps)(Notifications);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerView: {
    flex: 1,
  },
});
