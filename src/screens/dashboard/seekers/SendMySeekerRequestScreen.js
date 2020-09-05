import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../../components/general/HeaderComponent';
import SeekerRequestComponent from '../../../components/messages/SeekerRequestComponent';
import {getMySeekerRequest} from '../../../actions/userAction';

class SendMySeekerRequestScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        getMySeekerRequest(this.props.user.uid)
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    render() {
        const {theme, navigation, mySendSeekerRequests} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent title={'Send My Seekers Request'}
                                 theme={theme}
                                 onLeftPress={this.onBackPress}/>
                <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                    {
                        mySendSeekerRequests.length === 0
                            ? <View style={styles.emptyView}>
                                <Text style={[styles.infoText, {color: theme.subPrimaryColor}]}>No data found</Text>
                            </View>
                            : <FlatList
                                data={mySendSeekerRequests}
                                extraData={mySendSeekerRequests}
                                renderItem={({item}) => <SeekerRequestComponent type={'my'} theme={theme} navigation={navigation} item={item}/> }
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
    mySendSeekerRequests: state.auth.mySendSeekerRequests,
});

export default connect(mapStateToProps)(SendMySeekerRequestScreen);

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
