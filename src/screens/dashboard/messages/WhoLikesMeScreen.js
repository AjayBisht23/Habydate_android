import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../../components/general/HeaderComponent';
import WhoLikeComponent from '../../../components/messages/WhoLikeComponent';
import {getWhoLikedMeLists} from '../../../actions/swipeCardAction';

class MessagesScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        getWhoLikedMeLists(this.props.user.uid)
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    render() {
        const {theme, navigation, peopleWhoLiked} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent title={'People who liked you'} theme={theme} onLeftPress={this.onBackPress}/>
                <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                    <FlatList
                        data={peopleWhoLiked}
                        extraData={peopleWhoLiked}
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
    user: state.auth.user,
    peopleWhoLiked: state.auth.peopleWhoLiked,
});

export default connect(mapStateToProps)(MessagesScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
