import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';

class RegistrationStepScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>

            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(RegistrationStepScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
