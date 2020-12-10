import PropTypes from 'prop-types';
import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
// @ts-ignore
import ParsedText from 'react-native-parsed-text';
import Communications from 'react-native-communications';

const WWW_URL_PATTERN = /^www\./i;
const textStyle = {
  fontSize: 16,
  lineHeight: 20,
  marginTop: 5,
  marginBottom: 5,
  marginLeft: 10,
  marginRight: 10,
};
const styles = {
  left: StyleSheet.create({
    container: {},
    text: {
      color: 'black',
      ...textStyle,
    },
    link: {
      color: 'black',
      textDecorationLine: 'underline',
    },
  }),
  right: StyleSheet.create({
    container: {},
    text: {
      color: 'white',
      ...textStyle,
    },
    link: {
      color: 'white',
      textDecorationLine: 'underline',
    },
  }),
};
const DEFAULT_OPTION_TITLES = ['Call', 'Text', 'Cancel'];
export default class MessageText extends React.Component {
  static contextTypes = {
    actionSheet: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    return (
      !!this.props.currentMessage &&
      !!nextProps.currentMessage &&
      this.props.currentMessage.text !== nextProps.currentMessage.text
    );
  }

  onUrlPress = (url: string) => {
    // When someone sends a message that includes a website address beginning with "www." (omitting the scheme),
    // react-native-parsed-text recognizes it as a valid url, but Linking fails to open due to the missing scheme.
    if (WWW_URL_PATTERN.test(url)) {
      this.onUrlPress(`http://${url}`);
    } else {
      Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
        } else {
          Linking.openURL(url);
        }
      });
    }
  };

  onPhonePress = (phone: string) => {
    const {optionTitles} = this.props;
    const options =
      optionTitles && optionTitles.length > 0
        ? optionTitles.slice(0, 3)
        : DEFAULT_OPTION_TITLES;
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Communications.phonecall(phone, true);
            break;
          case 1:
            Communications.text(phone);
            break;
          default:
            break;
        }
      },
    );
  };

  onEmailPress = (email: string) =>
    Communications.email([email], null, null, null, null);

  render() {
    const linkStyle = [
      styles[this.props.position].link,
      this.props.linkStyle && this.props.linkStyle[this.props.position],
    ];
    return (
      <View
        style={[
          styles[this.props.position].container,
          this.props.containerStyle &&
            this.props.containerStyle[this.props.position],
        ]}>
        <ParsedText
          style={[
            styles[this.props.position].text,
            this.props.theme.chatTheme[this.props.position].text,
            this.props.textStyle && this.props.textStyle[this.props.position],
            this.props.customTextStyle,
          ]}
          parse={[
            {type: 'url', style: linkStyle, onPress: this.onUrlPress},
            {type: 'phone', style: linkStyle, onPress: this.onPhonePress},
            {type: 'email', style: linkStyle, onPress: this.onEmailPress},
          ]}
          childrenProps={{...this.props.textProps}}>
          {this.props.currentMessage.text}
        </ParsedText>
      </View>
    );
  }
}
