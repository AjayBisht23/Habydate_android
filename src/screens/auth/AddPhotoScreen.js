import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../components/general/HeaderComponent';
import {Button, Icon} from 'native-base';
import AddPhotoComponent from '../../components/register/AddPhotoComponent';
import ImagePicker from "react-native-customized-image-picker";
import * as messages from '../../utils/messages';
import {updateUserDataAction} from '../../actions/authAction';
import {uploadProfilePics} from '../../config/storage';
import moment from 'moment';

class AddPhotoScreen extends Component {

    lastIndex = 0;
    constructor(props) {
        super(props);
        console.log(props.route.params);
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
                {
                    id: 9,
                    photoUrl: '',
                },
                {
                    id: 10,
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
        const {photoData} = this.state;
        const {navigation, route} = this.props;
        let getResults = [];
        photoData.forEach(a => {
            if (a.photoUrl !== '') {
                let data = {...a.data};
                data.refName = `${moment.utc()}${data.filename}`;
                getResults.push(data);
            }
        });
        if (getResults.length > 0) {
            let data = route.params.data;
            let uid = data.uid;
            let photos = [];
            getResults.forEach((file) => {
                photos.push(file.refName);
                uploadProfilePics(file);
            });
            updateUserDataAction(uid, {stepCompleted: 9, photos: photos});
            navigation.navigate('Congratulations', {data: {...data, photos: photos}, photoData: getResults});
        } else
            alert(messages.selectProfile);
    };

    openLibrary = () => {
        let selectedLength = 10 - this.lastIndex;
        if (selectedLength < 0)
            return;

        ImagePicker.openPicker({
            multiple: true,
            maxSize: selectedLength
        }).then(images => {
            for (let i = 0; i < images.length; i++) {
               let getData = this.state.photoData[this.lastIndex + i];
               getData.photoUrl = images[i].path;
               getData.data = images[i];
            }
            this.setState({photoData: this.state.photoData});
            this.lastIndex = this.lastIndex + images.length;
        });
    };

    removePhoto = (index) => {
        let getData = this.state.photoData[index];
        getData.photoUrl = '';
        getData.data = '';
        this.setState({photoData: this.state.photoData}, () => {
            let getResults = [];
            this.state.photoData.forEach(a => {
                if (a.photoUrl !== '')
                    getResults.push(a.data);
            });
            for (let i = 0; i < this.state.photoData.length; i++) {
                let getData = this.state.photoData[i];
                if (i < getResults.length) {
                    getData.photoUrl = getResults[i].path;
                    getData.data = getResults[i];
                } else {
                    getData.photoUrl = '';
                    getData.data = '';
                }
            }
            this.lastIndex = getResults.length;
            this.setState({photoData: this.state.photoData});
        });
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
                        renderItem={({item, index}) => <AddPhotoComponent theme={theme} item={item} index={index} openLibrary={this.openLibrary} removePhoto={this.removePhoto}/> }
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
