import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../components/general/HeaderComponent';
import {Button, Icon} from 'native-base';
import AddPhotoComponent from '../../components/register/AddPhotoComponent';

class AddPhotoScreen extends Component {

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

    onRightPress = () => {
        const {navigation} = this.props;
        navigation.navigate('Congratulations');
    };

    render() {
        const {photoData} = this.state;
        const {theme, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent title={'Add Photos'}
                                 theme={theme}
                                 rightView={<Button transparent onPress={this.onRightPress}>
                                     <Icon type={'Feather'} name={'check'} style={{color: theme.pinkColor}} />
                                 </Button>}
                                 onLeftPress={this.onBackPress}/>
                <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                    <FlatList
                        data={photoData}
                        extraData={photoData}
                        renderItem={({item}) => <AddPhotoComponent theme={theme} item={item}/> }
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

export default connect(mapStateToProps)(AddPhotoScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
