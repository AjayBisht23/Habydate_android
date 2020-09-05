import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {seekerData} from '../../../json/SeekerJson';
import HeaderComponent from '../../../components/general/HeaderComponent';
import SeekerItemComponent from '../../../components/seekers/SeekerItemComponent';
import {Button, Icon} from 'native-base';

class SeekerListsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            seekerData
        }
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    onSendSeeker = () => {
        const {navigation} = this.props;
        navigation.navigate('SendMySeekerRequest');
    };

    render() {
        const {seekerData} = this.state;
        const {theme, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent title={'Seekers'}
                                 theme={theme}
                                 rightView={<Button transparent onPress={this.onSendSeeker}>
                                     <Icon type={'Feather'} name={'send'} style={{fontSize: 28, color: theme.primaryColor}} />
                                 </Button>}
                                 onLeftPress={this.onBackPress}/>
                <View style={[styles.container, {backgroundColor: theme.container.backgroundColor, paddingHorizontal: 10}]}>
                    <FlatList
                        data={seekerData}
                        extraData={seekerData}
                        renderItem={({item}) => <SeekerItemComponent theme={theme} navigation={navigation} item={item}/> }
                        numColumns={3}
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

export default connect(mapStateToProps)(SeekerListsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
