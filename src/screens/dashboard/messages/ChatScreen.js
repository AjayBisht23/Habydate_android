import React from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native'
import {Composer, GiftedChat, Send} from 'react-native-gifted-chat';
import {connect} from 'react-redux';
import MessageInputToolBar from '../../../components/messages/MessageInputToolBar';
import {Button, Header, Icon, Right} from 'native-base';
import {regex} from '../../../utils/regex';
import MessageItem from '../../../components/messages/MessageItem';
import FastImage from 'react-native-fast-image';
import {PINK} from '../../../themes/constantColors';

const messages = [
    {
        _id: 1,
        text: 'This is a system message',
        createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
        system: true,
    },
    {
        _id: 2,
        text: 'Hello developer',
        createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
        user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    {
        _id: 3,
        createdAt: new Date(Date.UTC(2016, 5, 13, 17, 20, 0)),
        user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
        image: 'https://placeimg.com/960/540/any',
    },
    {
        _id: 6,
        text: 'Come on!',
        createdAt: new Date(Date.UTC(2016, 5, 15, 18, 20, 0)),
        user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    {
        _id: 7,
        text: `Hello this is an example of the ParsedText, links like http://www.google.com or http://www.facebook.com are clickable and phone number 444-555-6666 can call too.
        But you can also do more with this package, for example Bob will change style and David too. foo@gmail.com
        And the magic number is 42!
        #react #react-native`,
        createdAt: new Date(Date.UTC(2016, 5, 13, 17, 20, 0)),
        user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
];

class ChatScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: [],
            replyItem: null
        }
    }

    componentDidMount() {
        this.setState({
            messages: messages
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    userTyping(text)
    {
        this.setState({message: text});
    }

    backPress = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    profilePress = () => {
        const {navigation} = this.props;
        navigation.navigate('Profile');
    };

    renderNavHeader = () => {
        const {theme, navigation} = this.props;

        return (
            <Header transparent>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableWithoutFeedback onPress={this.backPress}>
                            <View style={{width: 40}}>
                                <Icon type={'Feather'} name="chevron-left" style={{color: theme.primaryColor, fontSize: 35}} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.profilePress}>
                            <FastImage style={{width: 40, height: 40, borderRadius: 20}} source={{uri: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.profilePress}>
                            <View>
                                <Text style={[{marginLeft: 10,fontSize: 14, fontWeight: '800', color: theme.primaryColor}]}>{`Elizabeth`}</Text>
                                <Text style={[{marginLeft: 10,fontSize: 12, fontWeight: '400', color: theme.subPrimaryColor}]}>{`Active Now`}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Right>
                        <Button transparent onPress={this.searchPress}>
                            <Icon type={'Feather'} name="phone" style={{color: theme.primaryColor, fontSize: 20}} />
                        </Button>
                        <Button transparent onPress={this.optionPress}>
                            <Icon type={'Feather'} name="video" style={{color: theme.primaryColor, fontSize: 24}} />
                        </Button>
                    </Right>
                </View>
            </Header>
        )
    };

    renderToolbar = (props) => {
        const {theme} = this.props;

        let block_user = 0;
        let block_by = '';
        let name = 'Jonhy';

        if (block_user === 1 && block_by !== '') {
            return (
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 13, fontWeight: '600'}}>{`You blocked ${name}.`}</Text>
                    <Text style={{marginLeft: 5, fontSize: 13, fontWeight: '600', color: 'rgb(19,162,234)'}}>Delete chat.</Text>
                </View>
            )
        }

        return (<MessageInputToolBar theme={theme} {...props} replyItem={this.state.replyItem} />)
    };

    renderActions = (props) => {
        const {theme} = this.props;

        return (
            <View style={{height: 45, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableWithoutFeedback onPress={()=> {}}>
                    <View style={{width: 40, height: 45, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon type={'Feather'} name={'paperclip'} style={{color: theme.primaryColor, fontSize: 22}}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    };

    renderSend(props) {
        return (
            <Send {...props}>
                <View style={{marginRight: 10, marginBottom: 10}}>
                    <Icon type={'Feather'} name={'send'} style={{color: PINK, fontSize: 28}}/>
                </View>
            </Send>
        );
    }

    renderComposer = (props) => {
        return (<Composer {...props} textInputStyle={{justifyContent: 'center', paddingTop:8}}/>)
    };

    renderAccessory = (props) => {
        const {replyItem} = this.state;

        if (regex.isEmpty(replyItem))
            return null;

        let tag = 'yourself';
        let text = 'text';

        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                <View style={{flex: 1, justifyContent: 'center', marginLeft: 10}}>
                    <Text style={{fontSize: 13, fontWeight: '500'}}>{`Replying to ${tag}`}</Text>
                    <Text style={{fontSize: 12, fontWeight: '400', color: 'gray', marginTop: 1}} numberOfLines={1}>{text}</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => {}}>
                    <View style={{width: 50, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon type={'Feather'} name={'x'} style={{color: "#000", fontSize: 35}}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    };

    renderMessage(props) {
        const {theme} = this.props;
        return (<MessageItem theme={theme} {...props} />);
    }

    render() {
        const {theme} = this.props;
        const {messages, replyItem} = this.state;
        let minInputToolbarHeight = regex.isEmpty(replyItem) ? 30 : 50;

        return (
            <View style={[
                styles.container,
                {backgroundColor: theme.container.backgroundColor},
            ]}>
                {this.renderNavHeader()}
                <GiftedChat
                    ref={ref => this.chatRef = ref}
                    // Bottom toolbar
                    renderInputToolbar={this.renderToolbar}
                    renderActions={this.renderActions}
                    renderSend={this.renderSend}
                    renderComposer={this.renderComposer}
                    renderAccessory={this.renderAccessory}
                    minInputToolbarHeight={minInputToolbarHeight}
                    // Message Component
                    renderMessage={this.renderMessage.bind(this)}

                    // Others
                    placeholder={'Write something...'}
                    onInputTextChanged={(text) => this.userTyping(text)}
                    onSend={messages => this.onSend(messages)}

                    messages={messages}
                    user={{_id: 1}}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(ChatScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
