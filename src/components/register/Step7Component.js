import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import CommonButton from '../general/CommonButton';
import {ASPECT_RATIO, W_WIDTH} from '../../utils/regex';

class Step7Component extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedReligion: '',
            religionData: [
                {
                    id: 1,
                    title: 'Christian',
                    selected: false
                },
                {
                    id: 2,
                    title: 'Muslim',
                    selected: false
                },
                {
                    id: 3,
                    title: 'Hindu',
                    selected: false
                },
                {
                    id: 4,
                    title: 'Atheist',
                    selected: false
                },
                {
                    id: 5,
                    title: 'Sikh',
                    selected: false
                },
                {
                    id: 6,
                    title: 'Buddhist',
                    selected: false
                },
                {
                    id: 7,
                    title: 'Others',
                    selected: false
                },
            ]
        }
    }

    onReligionPress = (item) => {
        const {onPress} = this.props;
        this.setState({selectedReligion: item.title}, () => {
            onPress(7);
        });
    };

    renderReligionItem = ({ item }) => {
        const {selectedReligion} = this.state;
        const {theme} = this.props;
        let selected = false;
        if (selectedReligion === item.title)
            selected = true;

        return (
            <CommonButton
                theme={theme}
                container={{marginVertical: 8}}
                backgroundColor={theme.backgroundColor}
                borderColor={selected ? theme.pinkColor : theme.borderColor}
                textColor={selected ? theme.pinkColor : theme.secondaryColor}
                title={item.title}
                onPress={() => this.onReligionPress(item)}
            />
        )
    };

    render() {
        const {religionData} = this.state;
        const {theme} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <ScrollView>
                    <View>
                        <Text style={[styles.titleText, {color: theme.primaryColor}]}>{`Religion`}</Text>
                        <FlatList
                            data={religionData}
                            renderItem={this.renderReligionItem}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Step7Component;

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
