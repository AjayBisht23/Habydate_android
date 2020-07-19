import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import CommonButton from '../general/CommonButton';
import {W_WIDTH} from '../../utils/regex';

class Step4Component extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedEducation: '',
            educationData: [
                {
                    id: 1,
                    title: 'None',
                    selected: false
                },
                {
                    id: 2,
                    title: 'High School',
                    selected: false
                },
                {
                    id: 3,
                    title: 'College',
                    selected: false
                },
                {
                    id: 4,
                    title: 'Bachelor Degree',
                    selected: false
                },
                {
                    id: 5,
                    title: 'Postgraduate',
                    selected: false
                },
                {
                    id: 6,
                    title: 'Master',
                    selected: false
                },
                {
                    id: 7,
                    title: 'Phd/Doctorate',
                    selected: false
                },
                {
                    id: 8,
                    title: 'Postdoctoral',
                    selected: false
                },
            ]
        }
    }

    onEducationPress = (item) => {
        const {onPress} = this.props;
        this.setState({selectedEducation: item.title}, () => {
            onPress(4);
        });
    };

    renderEducationItem = ({ item }) => {
        const {selectedEducation} = this.state;
        const {theme} = this.props;
        let selected = false;
        if (selectedEducation === item.title)
            selected = true;

        return (
            <CommonButton
                theme={theme}
                container={{marginVertical: 8}}
                backgroundColor={theme.backgroundColor}
                borderColor={selected ? theme.pinkColor : theme.borderColor}
                textColor={selected ? theme.pinkColor : theme.secondaryColor}
                title={item.title}
                onPress={() => this.onEducationPress(item)}
            />
        )
    };

    render() {
        const {educationData} = this.state;
        const {theme} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <ScrollView>
                    <View>
                        <Text style={[styles.titleText, {color: theme.primaryColor}]}>{`What's Your Education?`}</Text>
                        <FlatList
                            data={educationData}
                            renderItem={this.renderEducationItem}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Step4Component;

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
