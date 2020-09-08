import React from 'react';
import {View, Text} from 'react-native';
import {
    Body,
    Button,
    Header,
    Icon,
    Left,
    Right,
} from 'native-base';

class HeaderComponent extends React.PureComponent {
    render() {
        const {theme, title, titleStyle, leftView, rightView, onLeftPress, type, currentIndex} = this.props;

        if (type === 1) { // Register Step Header
            let getIndex = currentIndex;
            return (
                <Header transparent>
                    <Left>
                        {
                            currentIndex === 1
                                ? <Button transparent onPress={()=>onLeftPress(1)}>
                                    <Icon type={'Feather'} name={'chevron-left'} style={{color: theme.primaryColor}} />
                                </Button>
                                : <Button style={{paddingLeft: 15}} transparent onPress={()=>onLeftPress(2)}>
                                    <Text style={{fontSize: 14, fontWeight: '600', color: theme.pinkColor}}>Previous</Text>
                                </Button>
                        }
                    </Left>
                    <Body style={{flex: 3}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 16, fontWeight: '600', color: theme.primaryColor}}>{getIndex}</Text>
                            <Text style={{fontSize: 16, fontWeight: '600', color: theme.subSecondaryColor}}>/8</Text>
                        </View>
                    </Body>
                    <Right>
                        {
                            getIndex > 2 && <Button transparent onPress={()=>onLeftPress(3)}>
                                <Text style={{fontSize: 14, fontWeight: '600', color: theme.pinkColor}}>Skip</Text>
                            </Button>
                        }
                    </Right>
                </Header>
            );
        }

        return (
            <Header transparent>
                <Left>
                    {
                        leftView
                            ? leftView
                            : <Button transparent onPress={()=>onLeftPress()}>
                                <Icon type={'Feather'} name={'chevron-left'} style={{color: theme.primaryColor}} />
                            </Button>
                    }
                </Left>
                <Body style={{flex: 3}}>
                    {
                        title && <Text style={{fontSize: 20, fontWeight: '600', color: theme.primaryColor, ...titleStyle}}>{title}</Text>
                    }
                </Body>
                <Right>
                    {rightView}
                </Right>
            </Header>
        );
    }
}

export default HeaderComponent;
