import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import CommonButton from '../general/CommonButton';
import {ASPECT_RATIO, W_WIDTH} from '../../utils/regex';
import {maritalData} from '../../json/RegisterJson';

class Step5Component extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMaritalStatus: props.selectedMaritalStatus,
            maritalData: maritalData
        }
    }

    onMaritalPress = (item) => {
        const {selectedMaritalStatus} = this.state;
        const {onPress} = this.props;
        if (item.title === selectedMaritalStatus)
            this.setState({selectedMaritalStatus: ''});
        else
            this.setState({selectedMaritalStatus: item.title}, () => {
                const {selectedMaritalStatus} = this.state;
                onPress(5, {selectedMaritalStatus});
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
                            keyExtractor={item => item.id.toString()}
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
