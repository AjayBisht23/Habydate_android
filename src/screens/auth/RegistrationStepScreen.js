import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, Animated} from 'react-native';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper'
import HeaderComponent from '../../components/general/HeaderComponent';
import Step1Component from '../../components/register/Step1Component';
import Step2Component from '../../components/register/Step2Component';
import Step3Component from '../../components/register/Step3Component';
import Step4Component from '../../components/register/Step4Component';
import Step5Component from '../../components/register/Step5Component';
import Step6Component from '../../components/register/Step6Component';
import Step7Component from '../../components/register/Step7Component';
import Step8Component from '../../components/register/Step8Component';
import {W_WIDTH} from '../../utils/regex';

class RegistrationStepScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 1,
            progressStatus: 100/8,
        }
    }
    anim = new Animated.Value(0);

    onBackPress = (type) => {
        const {currentIndex} = this.state;
        const {navigation} = this.props;
        if (type === 1) {
           navigation.goBack();
        } else if (type === 2) {
            let index = currentIndex - 1;
            this.scrollRef.scrollTo({x: ((index - 1) * W_WIDTH), y: 0, animated: true});
            this.setPage(index);
        } else if (type === 3) {
           this.onContinuesPress(currentIndex)
        }
    };

    onContinuesPress = (index) => {
        this.scrollRef.scrollTo({x: (index * W_WIDTH), y: 0, animated: true});
        this.setPage(index+1);
    };

    setPage = (page) => {
        this.setState({currentIndex: page, progressStatus: (page * 100)/8});
    };

    onScrollMoment = (e) => {
        let offset = e.nativeEvent.contentOffset;
        let page = Math.round(offset.x / W_WIDTH) + 1;
        this.setPage(page);
    };

    render() {
        const {currentIndex, progressStatus} = this.state;
        const {theme, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent type={1} currentIndex={currentIndex} theme={theme} onLeftPress={this.onBackPress}/>
                <View style={[styles.inner ,{backgroundColor: theme.subSecondaryColor}]}>
                    <Animated.View style={[styles.outer,{width: `${progressStatus}%`, backgroundColor: theme.pinkColor}]}/>
                </View>
                <ScrollView ref={ref => this.scrollRef = ref}
                            horizontal={true}
                            pagingEnabled={true}
                            onMomentumScrollEnd={this.onScrollMoment}
                            onScrollEndDrag={this.onScrollMoment}
                >
                    <Step1Component theme={theme} onPress={this.onContinuesPress}/>
                    <Step2Component theme={theme} onPress={this.onContinuesPress}/>
                    <Step3Component theme={theme} onPress={this.onContinuesPress}/>
                    <Step4Component theme={theme} onPress={this.onContinuesPress}/>
                    <Step5Component theme={theme} onPress={this.onContinuesPress}/>
                    <Step6Component theme={theme} onPress={this.onContinuesPress}/>
                    <Step7Component theme={theme} onPress={this.onContinuesPress}/>
                    <Step8Component theme={theme} onPress={this.onContinuesPress}/>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(RegistrationStepScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        marginVertical: 10,
        marginHorizontal: 20,
        height: 4,
        borderRadius: 2,
        overflow: 'hidden'
    },
    outer: {
        height: 4,
        borderRadius: 2,
    }
});
