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
        const {theme, onLeftPress} = this.props;
        return (
            <Header transparent>
                <Left>
                    <Button style={{width: 40}} transparent onPress={()=>onLeftPress()}>
                        <Icon type={'Feather'} name={'chevron-left'} style={{color: theme.primaryColor}} />
                    </Button>
                </Left>
            </Header>
        );
    }
}

export default HeaderComponent;
