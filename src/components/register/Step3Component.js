import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import CommonButton from '../general/CommonButton';
import {W_WIDTH} from '../../utils/regex';
import {personalityData, sexualityData} from '../../json/RegisterJson';

class Step3Component extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedSexuality: props.selectedSexuality,
            selectedPersonality: props.selectedPersonality,
            sexualityData: sexualityData,
            personalityData: personalityData
        }
    }

    onSexualityPress = (item) => {
        if (item.title === this.state.selectedSexuality)
            this.setState({selectedSexuality: ''});
        else
            this.setState({selectedSexuality: item.title});
    };

    renderSexualityItem = ({ item }) => {
        const {selectedSexuality} = this.state;
        const {theme} = this.props;
        let selected = false;
        if (selectedSexuality === item.title)
            selected = true;

        return (
            <CommonButton
                theme={theme}
                container={{marginVertical: 8}}
                backgroundColor={theme.backgroundColor}
                borderColor={selected ? theme.pinkColor : theme.borderColor}
                textColor={selected ? theme.pinkColor : theme.secondaryColor}
                title={item.title}
                onPress={() => this.onSexualityPress(item)}
            />
        )
    };

    onPersonalityPress = (item) => {
        const {selectedSexuality, selectedPersonality} = this.state;
        const {onPress} = this.props;
        if (item.title === selectedPersonality)
            this.setState({selectedPersonality: ''});
        else
            this.setState({selectedPersonality: item.title}, () => {
                const {selectedSexuality, selectedPersonality} = this.state;
                if (selectedPersonality !== '' && selectedSexuality !== '')
                    onPress(3, {selectedSexuality, selectedPersonality});
            });
    };

    renderPersonalityItem = ({ item }) => {
        const {selectedPersonality} = this.state;
        const {theme} = this.props;
        let selected = false;
        if (selectedPersonality === item.title)
            selected = true;

        return (
            <CommonButton
                theme={theme}
                container={{marginVertical: 8}}
                backgroundColor={theme.backgroundColor}
                borderColor={selected ? theme.pinkColor : theme.borderColor}
                textColor={selected ? theme.pinkColor : theme.secondaryColor}
                title={item.title}
                onPress={() => this.onPersonalityPress(item)}
            />
        )
    };

    render() {
        const {sexualityData, personalityData} = this.state;
        const {theme} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <ScrollView>
                    <View>
                        <Text style={[styles.titleText, {color: theme.primaryColor}]}>{'Sexuality'}</Text>
                        <FlatList
                            data={sexualityData}
                            renderItem={this.renderSexualityItem}
                            keyExtractor={item => item.id.toString()}
                        />
                        <Text style={[styles.titleText, {color: theme.primaryColor}]}>{'Personality'}</Text>
                        <FlatList
                            data={personalityData}
                            renderItem={this.renderPersonalityItem}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Step3Component;

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
