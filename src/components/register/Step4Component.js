import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import CommonButton from '../general/CommonButton';
import {W_WIDTH} from '../../utils/regex';
import {educationData} from '../../json/RegisterJson';

class Step4Component extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedEducation: props.selectedEducation,
            educationData: educationData
        }
    }

    onEducationPress = (item) => {
        const {selectedEducation} = this.state;
        const {onPress} = this.props;
        if (item.title === selectedEducation)
            this.setState({selectedEducation: ''});
        else
            this.setState({selectedEducation: item.title}, () => {
                const {selectedEducation} = this.state;
                onPress(4, {selectedEducation});
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
