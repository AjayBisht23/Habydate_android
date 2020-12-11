import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import NHHeader from '../../../components/general/NHHeader';
import SeekerRequest from './components/SeekerRequest';
import FastImage from 'react-native-fast-image';
import {regex} from '../../../utils/regex';
import {updateUserAction} from '../../../services/userAction';
import {getStore} from '../../../../App';
import {SEEKER_REQUESTS_COUNT} from '../../../services/types';

class SeekerRequestLists extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    this.updateSeekerRequestCount({
      seekerReadCount: this.props.seekerRequests.length,
    });
  }

  updateSeekerRequestCount = (parameter) => {
    updateUserAction(this.props.user.uid, parameter, 'seekerRequest');
    getStore.dispatch({
      type: SEEKER_REQUESTS_COUNT,
      payload: 0,
    });
  };

  onBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  renderData = () => {
    const {theme, navigation, seekerRequests, user} = this.props;

    if (!regex.isPremiumUser(user.packageEndDate)) {
      return (
        <View style={styles.emptyView}>
          <FastImage
            source={require('../../../assets/seeker_heart.png')}
            style={{width: 65, height: 60}}
          />
          <Text style={[styles.infoText, {color: theme.subPrimaryColor}]}>
            See people who sent you requests with Legendbae Premium
          </Text>
        </View>
      );
    }

    if (seekerRequests.length === 0) {
      return (
        <View style={styles.emptyView}>
          <Text style={[styles.infoText, {color: theme.subPrimaryColor}]}>
            No request found for you.
          </Text>
        </View>
      );
    } else {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={seekerRequests}
          extraData={seekerRequests}
          renderItem={({item}) => (
            <SeekerRequest
              type={'others'}
              theme={theme}
              navigation={navigation}
              item={item}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
  };

  render() {
    const {theme} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <NHHeader
          title={'Seekers Request'}
          theme={theme}
          onLeftPress={this.onBackPress}
        />
        <View
          style={[
            styles.container,
            {backgroundColor: theme.container.backgroundColor},
          ]}>
          {this.renderData()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  user: state.auth.user,
  seekerRequests: state.seeker.seekerRequests,
});

export default connect(mapStateToProps)(SeekerRequestLists);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
  },
  infoText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
  },
});
