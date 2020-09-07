import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../../../components/general/HeaderComponent';
import MatchComponent from '../../../components/matches/MatchComponent';
import {getAllMatchesLists} from '../../../actions/matchesAction';

class MatchesScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        getAllMatchesLists(this.props.user.uid, true)
    }

    onBackPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    onRightPress = () => {

    };

    render() {
        const {theme, navigation, matches} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent title={'Matches'}
                                 theme={theme}
                                 // rightView={<Button transparent onPress={this.onRightPress}>
                                 //     <Icon type={'Feather'} name={'search'} style={{color: theme.subSecondaryColor}} />
                                 // </Button>}
                                 onLeftPress={this.onBackPress}/>
                <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                    <FlatList
                        data={matches}
                        extraData={matches}
                        renderItem={({item}) => <MatchComponent theme={theme} item={item}/> }
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
    matches: state.auth.matches,
});

export default connect(mapStateToProps)(MatchesScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
