import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import CommonButton from '../general/CommonButton';
import {W_WIDTH} from '../../utils/regex';

class Step3Component extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedSexuality: '',
            selectedPersonality: '',
            sexualityData: [
                {
                    id: 1,
                    title: 'Straight',
                    selected: false
                },
                {
                    id: 2,
                    title: 'Gay',
                    selected: false
                },
                {
                    id: 3,
                    title: 'Lesbian',
                    selected: false
                },
                {
                    id: 4,
                    title: 'Bisexual',
                    selected: false
                },
                {
                    id: 5,
                    title: 'Trans',
                    selected: false
                },
                {
                    id: 6,
                    title: 'Others',
                    selected: false
                },
            ],
            personalityData: [
                {
                    id: 1,
                    title: 'Funny',
                    selected: false
                },
                {
                    id: 2,
                    title: 'Romantic',
                    selected: false
                },
                {
                    id: 3,
                    title: 'Open-minded',
                    selected: false
                },
                {
                    id: 4,
                    title: 'Faithful',
                    selected: false
                },
                {
                    id: 5,
                    title: 'Shy',
                    selected: false
                },
                {
                    id: 6,
                    title: 'Moody',
                    selected: false
                },
                {
                    id: 7,
                    title: 'Entrepreneur',
                    selected: false
                },
                {
                    id: 8,
                    title: 'Others',
                    selected: false
                },
            ]
        }
    }

    onSexualityPress = (item) => {
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
        const {onPress} = this.props;
        this.setState({selectedPersonality: item.title}, () => {
            onPress(3);
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
                        {/*<CommonButton*/}
                        {/*    theme={theme}*/}
                        {/*    container={{marginVertical: ASPECT_RATIO(30)}}*/}
                        {/*    backgroundColor={theme.pinkColor}*/}
                        {/*    borderColor={theme.pinkColor}*/}
                        {/*    textColor={theme.backgroundColor}*/}
                        {/*    title={'Continue'}*/}
                        {/*    onPress={this.nextPress}*/}
                        {/*/>*/}
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
