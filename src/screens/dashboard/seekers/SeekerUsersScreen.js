import React, {Component} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../../components/general/HeaderComponent';
import SeekerUserComponent from '../../../components/seekers/SeekerUserComponent';
import {discoverUsers} from '../../../actions/userAction';

class SeekerUsersScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nearByUsers: []
        };
    }

    componentDidMount(): void {
        this.getNearByUserData();
    }

    getNearByUserData = () => {
        discoverUsers(this.props.user.uid, this.props.location, 30).then(response => {
            let data = [];
            for (let a in response)
                data.push(response[a]._data);

            if (data.length > 0)
                this.filterToData(data);
        });
    };

    filterToData = (data) => {
        let uid = this.props.user.uid;
        let result = data.filter(function(v, i) {
            return v['uid'] !== uid;
        });
        this.setState({nearByUsers: result});
    };

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    onRightPress = () => {

    };

    render() {
        const {nearByUsers} = this.state;
        const {theme, route} = this.props;
        let params = route.params;
        const {title} = params.seeker;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent title={title}
                                 theme={theme}
                                 // rightView={<Button transparent onPress={this.onRightPress}>
                                 //     <Icon type={'Feather'} name={'search'} style={{color: theme.subSecondaryColor}} />
                                 // </Button>}
                                 onLeftPress={this.onBackPress}/>
                <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={nearByUsers}
                        extraData={nearByUsers}
                        renderItem={({item}) => <SeekerUserComponent {...this.props} item={item}/> }
                        numColumns={2}
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
    location: state.auth.location,
});

export default connect(mapStateToProps)(SeekerUsersScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
