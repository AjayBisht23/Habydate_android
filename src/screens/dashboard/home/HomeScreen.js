import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import {Modal, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Button, Icon} from "native-base";
import HeaderComponent from '../../../components/general/HeaderComponent';
import {HEIGHT_RATIO, shadow, TouchableFeedback} from '../../../utils/regex';
import {ONLINE, PINK, RED, SUPERLIKE, White} from '../../../themes/constantColors';
import FastImage from 'react-native-fast-image';
import FilterModal from './FilterModal';

const data = [
    {
        id: 1,
        photoUrl: 'https://images.unsplash.com/photo-1521167318043-b2ce52398029?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        name: 'Anne Garza',
        age: '22',
        location: 'Bolivar',
        online: true,
        match: 90
    },
    {
        id: 2,
        photoUrl: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        name: 'Mariana',
        age: '22',
        location: 'Bolivar',
        online: true,
        match: 95
    },
    {
        id: 3,
        photoUrl: 'https://images.unsplash.com/photo-1518675970634-bdd3fe443f52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        name: 'Antanella',
        age: '20',
        location: 'Bolivar',
        online: true,
        match: 80
    },
    {
        id: 4,
        photoUrl: 'https://images.unsplash.com/photo-1536720298877-693b87f05655?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        name: 'Lina Jessica',
        age: '18',
        location: 'Bolivar',
        online: false,
        match: 85
    },
    {
        id: 5,
        photoUrl: 'https://images.unsplash.com/photo-1510696324343-95958c75f30c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        name: 'Anne Garza',
        age: '22',
        location: 'Bolivar',
        online: false,
        match: 90
    },
    {
        id: 6,
        photoUrl: 'https://images.unsplash.com/photo-1456412684996-31507d7d17b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        name: 'Ana Lucia',
        age: '22',
        location: 'Bolivar',
        online: false,
        match: 85
    },
    {
        id: 7,
        photoUrl: 'https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        name: 'Maria Jose',
        age: '22',
        location: 'Bolivar',
        online: false,
        match: 80
    },
    {
        id: 8,
        photoUrl: 'https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        name: 'Anne Garza',
        age: '22',
        location: 'Bolivar',
        online: false,
        match: 75
    },
    {
        id: 9,
        photoUrl: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        name: 'Maria Jose',
        age: '22',
        location: 'Bolivar',
        online: false,
        match: 80
    },
    {
        id: 10,
        photoUrl: 'https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        name: 'Anne Garza',
        age: '22',
        location: 'Bolivar',
        online: false,
        match: 75
    },
];

class HomeScreen extends Component {

    constructor (props) {
        super(props);
        this.state = {
            cards: data,
            swipedAllCards: false,
            modalVisible: false,
        }
    }

    onMenuPress = () => {
        const {navigation} = this.props;
        navigation.openDrawer();
    };

    onFilterPress = () => {
        this.setState({modalVisible: true});
    };

    onSwiped = (type) => {

    };

    onSwipedAllCards = () => {
        this.setState({swipedAllCards: true})
    };

    swipeLeft = () => {
        const {navigation} = this.props;
        navigation.navigate('OtherProfile')
    };

    onButtonPress = (type) => {
        const {swipedAllCards} = this.state;

        if (swipedAllCards)
            return;

        if (type === 'left')
            this.swiper.swipeLeft();
        else if (type === 'right')
            this.swiper.swipeRight();
        else if (type === 'top')
            this.swiper.swipeTop();
    };

    renderCard = (item, index) => {
        const {theme} = this.props;
        return (
            <View style={[styles.cardView, {backgroundColor: theme.backgroundColor, borderColor: theme.borderColor}]}>
                <FastImage source={{uri: item.photoUrl}} style={{flex: 1, borderRadius: 20, overflow: 'hidden'}}/>
                <View style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0}}>
                    <View style={{position: 'absolute', right: 0, left: 0, bottom: 20}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            {item.online && <View style={styles.onlineView} />}
                            <Text style={[styles.nameText, {color: theme.backgroundColor}]}>{item.name}</Text>
                            <Text style={[styles.nameText, {color: theme.backgroundColor}]}>, {item.age}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 5}}>
                            <Icon type={'Feather'} name={'map-pin'} style={{fontSize: 16, color: theme.backgroundColor}}/>
                            <Text style={[styles.locationText, {color: theme.backgroundColor}]}> 2 km away</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    };

    render () {
        const {cards, modalVisible} = this.state;
        const {theme, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: theme.container.backgroundColor}]}>
                <HeaderComponent title={'Discover'}
                                 theme={theme}
                                 leftView={<Button transparent onPress={this.onMenuPress}>
                                     <Icon type={'Feather'} name={'align-left'} style={{fontSize: 28, color: theme.primaryColor}} />
                                 </Button>}
                                 rightView={<View style={{flexDirection: 'row'}}>
                                     <Button transparent onPress={this.onFilterPress}>
                                         <Icon type={'Feather'} name={'filter'} style={{fontSize: 25, color: theme.primaryColor}} />
                                     </Button>
                                 </View>}/>
                <View style={[styles.innerView, {backgroundColor: theme.primaryBackgroundColor}]}>
                    <View style={[styles.bottomView]}>
                        <TouchableFeedback onPress={() => this.onButtonPress('left')}>
                            <View style={[styles.commonLike, {backgroundColor: theme.backgroundColor}]}>
                                <Icon type={'Feather'} name={'x'} style={{color: RED, fontSize: 30}} />
                            </View>
                        </TouchableFeedback>
                        <TouchableFeedback onPress={() => this.onButtonPress('top')}>
                            <View style={[styles.commonLike, {backgroundColor: theme.backgroundColor, padding: 15, borderRadius: 35}]}>
                                <Icon type={'Feather'} name={'star'} style={{color: SUPERLIKE, fontSize: 30}} />
                            </View>
                        </TouchableFeedback>
                        <TouchableFeedback onPress={() => this.onButtonPress('right')}>
                            <View style={[styles.commonLike, {backgroundColor: theme.backgroundColor}]}>
                                <Icon type={'Feather'} name={'heart'} style={{color: theme.pinkColor, fontSize: 30}} />
                            </View>
                        </TouchableFeedback>
                    </View>
                    <Swiper
                        ref={swiper => {this.swiper = swiper}}
                        onSwipedLeft={() => this.onSwiped('left')}
                        onSwipedRight={() => this.onSwiped('right')}
                        onSwipedTop={() => this.onSwiped('top')}
                        onTapCard={this.swipeLeft}
                        disableBottomSwipe={true}
                        cards={cards}
                        renderCard={this.renderCard}
                        onSwipedAll={this.onSwipedAllCards}
                        backgroundColor={theme.primaryBackgroundColor}
                        containerStyle={{bottom: HEIGHT_RATIO(0.15)}}
                        stackSize={3}
                        stackSeparation={-30}
                        overlayLabels={overlayLabel}
                        animateOverlayLabelsOpacity
                        animateCardOpacity
                        swipeBackCard
                    />
                </View>
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {}}
                >
                    <FilterModal theme={theme}
                                 onClose={(data) => {
                                     let setStateData = {modalVisible: false};

                                     this.setState(setStateData);
                                 }}
                    />
                </Modal>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerView: {
        flex: 1
    },
    bottomView: {
        height: HEIGHT_RATIO(.15),
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    commonLike: {
        padding: 20,
        marginHorizontal: 8,
        marginBottom: HEIGHT_RATIO(.03),
        borderRadius: 40,
        ...shadow(),
    },
    cardView: {
        height: HEIGHT_RATIO(0.65),
        borderRadius: 20,
        justifyContent: 'center',
        borderWidth: 1,
        ...shadow(),
    },
    onlineView: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: ONLINE,
        marginRight: 5,
    },
    nameText: {
        fontSize: 24,
        fontWeight: '800'
    },
    locationText: {
        fontSize: 16,
        fontWeight: '800'
    }
});

const overlayLabel = {
    left: {
        title: 'NOPE',
        style: {
            label: {
                backgroundColor: RED,
                borderColor: RED,
                color: White,
                borderWidth: 1
            },
            wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: -30
            }
        }
    },
    right: {
        title: 'LIKE',
        style: {
            label: {
                backgroundColor: PINK,
                borderColor: PINK,
                color: White,
                borderWidth: 1
            },
            wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: 30
            }
        }
    },
    top: {
        title: 'SUPER LIKE',
        style: {
            label: {
                backgroundColor: SUPERLIKE,
                borderColor: SUPERLIKE,
                color: White,
                borderWidth: 1
            },
            wrapper: {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }
        }
    }
};
