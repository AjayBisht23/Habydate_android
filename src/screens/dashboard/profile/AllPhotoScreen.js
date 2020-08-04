import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../../components/general/HeaderComponent';
import AllPhotoComponent from '../../../components/general/AllPhotoComponent';

class AllPhotoScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePicUrl: '',
            photoData: [
                {
                    id: 1,
                    photoUrl: '',
                },
                {
                    id: 2,
                    photoUrl: '',
                },
                {
                    id: 3,
                    photoUrl: '',
                },
                {
                    id: 4,
                    photoUrl: '',
                },
                {
                    id: 5,
                    photoUrl: '',
                },
                {
                    id: 6,
                    photoUrl: '',
                },
                {
                    id: 7,
                    photoUrl: '',
                },
                {
                    id: 8,
                    photoUrl: '',
                },
            ]
        }
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    render() {
        const {photoData} = this.state;
        const {theme, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent title={'All Photos'} theme={theme} onLeftPress={this.onBackPress}/>
                <View style={[styles.container, {backgroundColor: theme.container.backgroundColor, paddingHorizontal: 10}]}>
                    <FlatList
                        data={photoData}
                        extraData={photoData}
                        renderItem={({item}) => <AllPhotoComponent theme={theme} item={item}/> }
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
});

export default connect(mapStateToProps)(AllPhotoScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
