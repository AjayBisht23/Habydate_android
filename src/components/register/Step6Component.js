import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import CommonButton from '../general/CommonButton';
import {ASPECT_RATIO, W_WIDTH} from '../../utils/regex';
import {lookingData} from '../../json/RegisterJson';

class Step6Component extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLookingFor: props.selectedLookingFor,
            lookingData: lookingData
        }
    }

    onLookingForPress = (item) => {
        const {selectedLookingFor} = this.state;
        const {onPress} = this.props;
        if (item.title === selectedLookingFor)
            this.setState({selectedLookingFor: ''});
        else
            this.setState({selectedLookingFor: item.title}, () => {
                const {selectedLookingFor} = this.state;
                onPress(6, {selectedLookingFor});
            });
    };

    renderLookingForItem = ({ item }) => {
        const {selectedLookingFor} = this.state;
        const {theme} = this.props;
        let selected = false;
        if (selectedLookingFor === item.title)
            selected = true;

        return (
            <CommonButton
                theme={theme}
                container={{marginVertical: 8}}
                backgroundColor={theme.backgroundColor}
                borderColor={selected ? theme.pinkColor : theme.borderColor}
                textColor={selected ? theme.pinkColor : theme.secondaryColor}
                title={item.title}
                onPress={() => this.onLookingForPress(item)}
            />
        )
    };

    render() {
        const {lookingData} = this.state;
        const {theme} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <ScrollView>
                    <View>
                        <Text style={[styles.titleText, {color: theme.primaryColor}]}>{`I'm Looking for`}</Text>
                        <FlatList
                            data={lookingData}
                            renderItem={this.renderLookingForItem}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Step6Component;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: W_WIDTH
    },
    titleText: {
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 10,
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center'
    },
});
