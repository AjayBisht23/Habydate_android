import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import CommonButton from '../general/CommonButton';
import {ASPECT_RATIO, W_WIDTH} from '../../utils/regex';
import {drinkingData, eatingData, smokingData} from '../../json/RegisterJson';

class Step8Component extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drinkingStatus: props.data.drinkingStatus,
            smokingStatus: props.data.smokingStatus,
            eatingStatus: props.data.eatingStatus,
            drinkingData: drinkingData,
            smokingData: smokingData,
            eatingData: eatingData
        }
    }

    onDrinkingPress = (item) => {
        if (item.title === this.state.drinkingStatus)
            this.setState({drinkingStatus: ''});
        else
            this.setState({drinkingStatus: item.title});
    };

    renderDrinkingItem = ({ item }) => {
        const {drinkingStatus} = this.state;
        const {theme} = this.props;
        let selected = false;
        if (drinkingStatus === item.title)
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
        if (item.title === this.state.smokingStatus)
            this.setState({smokingStatus: ''});
        else
            this.setState({smokingStatus: item.title});
    };

    renderSmokingItem = ({ item }) => {
        const {smokingStatus} = this.state;
        const {theme} = this.props;
        let selected = false;
        if (smokingStatus === item.title)
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
        const {eatingStatus} = this.state;
        const {onPress} = this.props;
        if (item.title === eatingStatus)
            this.setState({eatingStatus: ''});
        else
            this.setState({eatingStatus: item.title}, () => {
                const {drinkingStatus, smokingStatus, eatingStatus} = this.state;
                if (drinkingStatus !== '' && smokingStatus !== '' && eatingStatus !== '')
                    onPress(8, {drinkingStatus, smokingStatus, eatingStatus});
            });
    };

    renderEatingItem = ({ item }) => {
        const {eatingStatus} = this.state;
        const {theme} = this.props;
        let selected = false;
        if (eatingStatus === item.title)
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
