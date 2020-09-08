import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, Switch, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../../components/general/HeaderComponent';
import SeekerRequestComponent from '../../../components/messages/SeekerRequestComponent';
import FastImage from 'react-native-fast-image';
import {getSeekerRequestLists} from '../../../actions/seekerAction';

class SeekerRequestScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        getSeekerRequestLists(this.props.user.uid)
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    render() {
        const {theme, navigation, seekerRequests} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent title={'Seekers Request'}
                                 theme={theme}
                                 onLeftPress={this.onBackPress}/>
                <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                    {
                        seekerRequests.length === 0
                            ? <View style={styles.emptyView}>
                                <FastImage source={require('../../../assets/seeker_heart.png')} style={{width: 65, height: 60}}/>
                                <Text style={[styles.infoText, {color: theme.subPrimaryColor}]}>See people who sent you requests with Epicbae Premium</Text>
                            </View>
                            : <FlatList
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                data={seekerRequests}
                                extraData={seekerRequests}
                                renderItem={({item}) => <SeekerRequestComponent type={'others'} theme={theme} navigation={navigation} item={item}/> }
                                keyExtractor={(item, index) => index.toString()}
                            />
                    }
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
    user: state.auth.user,
    seekerRequests: state.auth.seekerRequests,
});

export default connect(mapStateToProps)(SeekerRequestScreen);

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
        textAlign: 'center'
    }
});
