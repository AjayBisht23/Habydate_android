import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'native-base';
import NHHeader from '../../../components/general/NHHeader';
import MessagesItem from './components/MessagesItem';
import {PINK} from '../../../themes/constantColors';
import {getAllConversationLists} from '../../../services/conversationsAction';
import {getSeekerRequestLists} from '../../../services/seekerAction';
import {getWhoLikedMeLists} from '../../../services/swipeCardAction';

class Messages extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    getAllConversationLists(this.props.user.uid);
    getSeekerRequestLists(this.props.user.uid);
    getWhoLikedMeLists(this.props.user.uid);
  }

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  onRightPress = () => {};

  toggleSwitch = (value) => {};

  renderHeader = () => {
    const {
      theme,
      navigation,
      seekerUnreadCount,
      whoLikedUnreadCount,
    } = this.props;
    return (
      <View>
        {/*<View style={[styles.rowView, {borderRadius: 15, paddingVertical: 15, borderBottomWidth: 0, backgroundColor: '#FD353920', paddingHorizontal: 25}]}>*/}
        {/*    <Text style={[styles.headText, {color: theme.primaryColor}]}>Available for video call</Text>*/}
        {/*    <Switch*/}
        {/*        trackColor={{ false: theme.subPrimaryColor, true: theme.pinkColor }}*/}
        {/*        thumbColor={White}*/}
        {/*        ios_backgroundColor={'transparent'}*/}
        {/*        onValueChange={this.toggleSwitch}*/}
        {/*        value={true}*/}
        {/*    />*/}
        {/*</View>*/}
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('SeekerRequest')}>
          <View style={[styles.rowView, {borderColor: theme.borderColor}]}>
            <Text style={[styles.headText, {color: theme.primaryColor}]}>
              Seekers Requests
            </Text>
            <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
              {seekerUnreadCount > 0 && (
                <View style={styles.countView}>
                  <Text
                    style={[styles.countText, {color: theme.backgroundColor}]}>
                    {seekerUnreadCount}
                  </Text>
                </View>
              )}
              <Icon
                type={'Feather'}
                name={'chevron-right'}
                style={{color: theme.subSecondaryColor}}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('WhoLikeMe')}>
          <View style={[styles.rowView, {borderBottomWidth: 0}]}>
            <Text style={[styles.headText, {color: theme.primaryColor}]}>
              Who Likes Me
            </Text>
            <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
              {whoLikedUnreadCount > 0 && (
                <View style={styles.countView}>
                  <Text
                    style={[styles.countText, {color: theme.backgroundColor}]}>
                    {whoLikedUnreadCount}
                  </Text>
                </View>
              )}
              <Icon
                type={'Feather'}
                name={'chevron-right'}
                style={{color: theme.subSecondaryColor}}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Text style={[styles.titleText, {color: theme.primaryColor}]}>
          Messages
        </Text>
      </View>
    );
  };

  render() {
    const {theme, navigation, conversations, user} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <NHHeader
          title={'Messages'}
          theme={theme}
          onLeftPress={this.onBackPress}
        />
        <View
          style={[
            styles.container,
            {backgroundColor: theme.container.backgroundColor},
          ]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={conversations}
            extraData={conversations}
            ListHeaderComponent={this.renderHeader}
            renderItem={({item}) => (
              <MessagesItem
                uid={user.uid}
                theme={theme}
                item={item}
                navigation={navigation}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  user: state.auth.user,
  conversations: state.conversation.conversations,
  seekerUnreadCount: state.seeker.seekerUnreadCount,
  whoLikedUnreadCount: state.peopleLiked.whoLikedUnreadCount,
});

export default connect(mapStateToProps)(Messages);

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
    paddingVertical: 10,
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
    borderRadius: 15,
  },
  countText: {
    fontSize: 14,
    fontWeight: '800',
  },
  titleText: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 32,
    fontWeight: '800',
  },
});
