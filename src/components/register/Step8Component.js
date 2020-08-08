import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import CommonButton from '../general/CommonButton';
import {ASPECT_RATIO, W_WIDTH} from '../../utils/regex';
import {drinkingData, eatingData, smokingData} from '../../json/RegisterJson';

class Step8Component extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDrinkingStatus: props.selectedDrinkingStatus,
            selectedSmokingStatus: props.selectedSmokingStatus,
            selectedEatingStatus: props.selectedEatingStatus,
            drinkingData: drinkingData,
            smokingData: smokingData,
            eatingData: eatingData
        }
    }

    onDrinkingPress = (item) => {
        if (item.title === this.state.selectedDrinkingStatus)
            this.setState({selectedDrinkingStatus: ''});
        else
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
        if (item.title === this.state.selectedSmokingStatus)
            this.setState({selectedSmokingStatus: ''});
        else
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
        const {selectedEatingStatus} = this.state;
        const {onPress} = this.props;
        if (item.title === selectedEatingStatus)
            this.setState({selectedEatingStatus: ''});
        else
            this.setState({selectedEatingStatus: item.title}, () => {
                const {selectedDrinkingStatus, selectedSmokingStatus, selectedEatingStatus} = this.state;
                if (selectedDrinkingStatus !== '' && selectedSmokingStatus !== '' && selectedEatingStatus !== '')
                    onPress(8, {selectedDrinkingStatus, selectedSmokingStatus, selectedEatingStatus});
            });
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
                            keyExtractor={item => item.id.toString()}
                        />
                        <Text style={[styles.titleText, {color: theme.primaryColor}]}>{`Smoking`}</Text>
                        <FlatList
                            data={smokingData}
                            renderItem={this.renderSmokingItem}
                            keyExtractor={item => item.id.toString()}
                        />
                        <Text style={[styles.titleText, {color: theme.primaryColor}]}>{`Eating`}</Text>
                        <FlatList
                            data={eatingData}
                            renderItem={this.renderEatingItem}
                            keyExtractor={item => item.id.toString()}
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
