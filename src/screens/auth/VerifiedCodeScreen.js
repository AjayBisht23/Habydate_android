import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {regex} from '../../utils/regex';

class VerifiedCodeScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            regex.setDashboard({token: 'dfm43n34'})
        }, 500)
    }

    render() {
        const {theme} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <View style={styles.innerContainer}>
                    <FastImage source={require('./../../assets/verifiedCode.png')} style={{width: 83, height: 106}}/>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(VerifiedCodeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
