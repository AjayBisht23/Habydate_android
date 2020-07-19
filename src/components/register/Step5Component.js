import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import CommonButton from '../general/CommonButton';
import {ASPECT_RATIO, W_WIDTH} from '../../utils/regex';

class Step5Component extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMaritalStatus: '',
            maritalData: [
                {
                    id: 1,
                    title: 'Single',
                    selected: false
                },
                {
                    id: 2,
                    title: 'Single mom',
                    selected: false
                },
                {
                    id: 3,
                    title: 'Single dad',
                    selected: false
                },
                {
                    id: 4,
                    title: 'In a relationship',
                    selected: false
                },
                {
                    id: 5,
                    title: 'Married',
                    selected: false
                },
                {
                    id: 6,
                    title: 'Separated',
                    selected: false
                },
                {
                    id: 7,
                    title: 'Divorce',
                    selected: false
                },
                {
                    id: 8,
                    title: 'Windowed',
                    selected: false
                },
            ]
        }
    }

    onMaritalPress = (item) => {
        const {onPress} = this.props;
        this.setState({selectedMaritalStatus: item.title}, () => {
            onPress(5);
        });
    };

    renderMaritalItem = ({ item }) => {
        const {selectedMaritalStatus} = this.state;
        const {theme} = this.props;
        let selected = false;
        if (selectedMaritalStatus === item.title)
            selected = true;

        return (
            <CommonButton
                theme={theme}
                container={{marginVertical: 8}}
                backgroundColor={theme.backgroundColor}
                borderColor={selected ? theme.pinkColor : theme.borderColor}
                textColor={selected ? theme.pinkColor : theme.secondaryColor}
                title={item.title}
                onPress={() => this.onMaritalPress(item)}
            />
        )
    };

    render() {
        const {maritalData} = this.state;
        const {theme} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <ScrollView>
                    <View>
                        <Text style={[styles.titleText, {color: theme.primaryColor}]}>{`Marital Status`}</Text>
                        <FlatList
                            data={maritalData}
                            renderItem={this.renderMaritalItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Step5Component;

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
