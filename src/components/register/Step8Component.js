import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import CommonButton from '../general/CommonButton';
import {ASPECT_RATIO, W_WIDTH} from '../../utils/regex';

class Step8Component extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDrinkingStatus: '',
            selectedSmokingStatus: '',
            selectedEatingStatus: '',
            drinkingData: [
                {
                    id: 1,
                    title: 'Non-drinker',
                    selected: false
                },
                {
                    id: 2,
                    title: 'Social drinker',
                    selected: false
                },
                {
                    id: 3,
                    title: 'Heavy drinker',
                    selected: false
                },
            ],
            smokingData: [
                {
                    id: 1,
                    title: 'Non-Smoker',
                    selected: false
                },
                {
                    id: 2,
                    title: 'Light Smoker',
                    selected: false
                },
                {
                    id: 3,
                    title: 'Heavy Smoker',
                    selected: false
                },
            ],
            eatingData: [
                {
                    id: 1,
                    title: 'Vegan',
                    selected: false
                },
                {
                    id: 2,
                    title: 'Vegetarian',
                    selected: false
                },
                {
                    id: 3,
                    title: 'Non-Vegetarian',
                    selected: false
                },
            ]
        }
    }

    onDrinkingPress = (item) => {
        this.setState({selectedDrinkingStatus: item.title});
    };

    renderDrinkingItem = ({ item }) => {
        const {selectedDrinkingStatus} = this.state;
        const {theme} = this.props;
        let selected = false;
        if (selectedDrinkingStatus === item.title)
            selected = true;

        return (
            <CommonButton
                theme={theme}
                container={{marginVertical: 8}}
                backgroundColor={theme.backgroundColor}
                borderColor={selected ? theme.pinkColor : theme.borderColor}
                textColor={selected ? theme.pinkColor : theme.secondaryColor}
                title={item.title}
                onPress={() => this.onDrinkingPress(item)}
            />
        )
    };

    onSmokingPress = (item) => {
        this.setState({selectedSmokingStatus: item.title});
    };

    renderSmokingItem = ({ item }) => {
        const {selectedSmokingStatus} = this.state;
        const {theme} = this.props;
        let selected = false;
        if (selectedSmokingStatus === item.title)
            selected = true;

        return (
            <CommonButton
                theme={theme}
                container={{marginVertical: 8}}
                backgroundColor={theme.backgroundColor}
                borderColor={selected ? theme.pinkColor : theme.borderColor}
                textColor={selected ? theme.pinkColor : theme.secondaryColor}
                title={item.title}
                onPress={() => this.onSmokingPress(item)}
            />
        )
    };

    onEatingPress = (item) => {
        this.setState({selectedEatingStatus: item.title});
    };

    renderEatingItem = ({ item }) => {
        const {selectedEatingStatus} = this.state;
        const {theme} = this.props;
        let selected = false;
        if (selectedEatingStatus === item.title)
            selected = true;

        return (
            <CommonButton
                theme={theme}
                container={{marginVertical: 8}}
                backgroundColor={theme.backgroundColor}
                borderColor={selected ? theme.pinkColor : theme.borderColor}
                textColor={selected ? theme.pinkColor : theme.secondaryColor}
                title={item.title}
                onPress={() => this.onEatingPress(item)}
            />
        )
    };

    render() {
        const {drinkingData, smokingData, eatingData} = this.state;
        const {theme} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <ScrollView>
                    <View>
                        <Text style={[styles.titleText, {color: theme.primaryColor}]}>{`Drinking`}</Text>
                        <FlatList
                            data={drinkingData}
                            renderItem={this.renderDrinkingItem}
                            keyExtractor={item => item.id}
                        />
                        <Text style={[styles.titleText, {color: theme.primaryColor}]}>{`Smoking`}</Text>
                        <FlatList
                            data={smokingData}
                            renderItem={this.renderSmokingItem}
                            keyExtractor={item => item.id}
                        />
                        <Text style={[styles.titleText, {color: theme.primaryColor}]}>{`Eating`}</Text>
                        <FlatList
                            data={eatingData}
                            renderItem={this.renderEatingItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Step8Component;

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
