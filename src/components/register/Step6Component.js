import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import CommonButton from '../general/CommonButton';
import {ASPECT_RATIO, W_WIDTH} from '../../utils/regex';

class Step6Component extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLookingFor: '',
            lookingData: [
                {
                    id: 1,
                    title: 'Dating',
                    selected: false
                },
                {
                    id: 2,
                    title: 'Friendship',
                    selected: false
                },
                {
                    id: 3,
                    title: 'Chat Buddy',
                    selected: false
                },
                {
                    id: 4,
                    title: 'High Buddy',
                    selected: false
                },
                {
                    id: 5,
                    title: 'Sugar Daddy',
                    selected: false
                },
                {
                    id: 6,
                    title: 'Sugar Momma',
                    selected: false
                },
                {
                    id: 7,
                    title: 'Sugar Baby',
                    selected: false
                },
                {
                    id: 8,
                    title: 'Hookups',
                    selected: false
                },
                {
                    id: 9,
                    title: 'Friends with benefits',
                    selected: false
                },
            ]
        }
    }

    onLookingForPress = (item) => {
        const {onPress} = this.props;
        this.setState({selectedLookingFor: item.title}, () => {
            onPress(6);
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
                            keyExtractor={item => item.id}
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
