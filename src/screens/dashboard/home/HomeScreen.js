import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import {Modal, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Button, Icon} from "native-base";
import HeaderComponent from '../../../components/general/HeaderComponent';
import {HEIGHT_RATIO, regex, shadow, TouchableFeedback} from '../../../utils/regex';
import {ONLINE, PINK, RED, SUPERLIKE, White} from '../../../themes/constantColors';
import FastImage from 'react-native-fast-image';
import FilterModal from './FilterModal';
import {getCurrentLocation} from '../../../utils/location';
import {discoverUsers, distance} from '../../../actions/userAction';
import PulseLoader from '../../../components/pluseloader/PulseLoader';

class HomeScreen extends Component {

    constructor (props) {
        super(props);
        this.state = {
            cards: [],
            swipedAllCards: false,
            modalVisible: false,
            loading: true,
        };
        this.location = null;
        this.filterData = {
            selectedDistance: 30,
            selectedAge: 25,
        };
    }

    componentDidMount(): void {
        getCurrentLocation().then(location => {
            this.location = location.coords;
            this.getUserData();
        }).catch(error => {
            console.log(error);
        })
    }

    getUserData = () => {
        this.setLoader(true);
        discoverUsers(this.props.user.uid, this.location, this.filterData.selectedDistance).then(response => {
            let data = [];
            for (let a in response)
                data.push(response[a]._data);

            if (data.length > 0)
                this.filterToData(data);
        });
    };

    filterToData = (data) => {
        const {selectedAge, interested, showMe} = this.filterData;

        let uid = this.props.user.uid;
        let result = data.filter(function(v, i) {
            let query = false;
            if (Boolean(interested) && Boolean(showMe))
                query = v['uid'] !== uid && v['age'] <= selectedAge && interested.includes(v['lookingFor']) && showMe.includes(v['sexuality']);
            else if (Boolean(interested))
                query = v['uid'] !== uid && v['age'] <= selectedAge && interested.includes(v['lookingFor']);
            else if (Boolean(showMe))
                query = v['uid'] !== uid && v['age'] <= selectedAge && showMe.includes(v['sexuality']);
            else
                query = v['uid'] !== uid && v['age'] <= selectedAge;

            return query;
        });
        this.setState({cards: [], loading: false}, () => {
            this.setState({cards: result});
        });
    };

    setLoader = (shown) => {
        this.setState({loading: shown})
    };

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

    swipeLeft = (index) => {
        const {navigation} = this.props;
        navigation.navigate('OtherProfile', {profileData: this.state.cards[index]})
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

    renderCardItem = (item, index) => {
        const {theme} = this.props;
        return (
            <View style={[styles.cardView, {backgroundColor: theme.backgroundColor, borderColor: theme.borderColor}]}>
                <FastImage source={{uri: regex.getProfilePic(item.photos)}} style={{flex: 1, borderRadius: 20, overflow: 'hidden'}}/>
                <View style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0}}>
                    <View style={{position: 'absolute', right: 0, left: 0, bottom: 20}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            {item.online && <View style={styles.onlineView} />}
                            <Text style={[styles.nameText, {color: theme.backgroundColor}]}>{item.name}</Text>
                            <Text style={[styles.nameText, {color: theme.backgroundColor}]}>, {item.age}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 5}}>
                            <Icon type={'Feather'} name={'map-pin'} style={{fontSize: 16, color: theme.backgroundColor}}/>
                            <Text style={[styles.locationText, {color: theme.backgroundColor, marginLeft: 5}]}>{`${distance(item.location, this.location, 'K')}`} km away</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    };

    renderCard = () => {
        const {cards} = this.state;
        const {theme} = this.props;

        return <View style={[styles.innerView, {backgroundColor: theme.primaryBackgroundColor}]}>
            {
                cards.length > 0 && <Swiper
                    ref={swiper => {this.swiper = swiper}}
                    onSwipedLeft={() => this.onSwiped('left')}
                    onSwipedRight={() => this.onSwiped('right')}
                    onSwipedTop={() => this.onSwiped('top')}
                    onTapCard={this.swipeLeft}
                    disableBottomSwipe={true}
                    cards={cards}
                    renderCard={this.renderCardItem}
                    onSwipedAll={this.onSwipedAllCards}
                    backgroundColor={theme.primaryBackgroundColor}
                    containerStyle={{bottom: HEIGHT_RATIO(0.15)}}
                    stackSize={cards.length > 2 ? 3 : cards.length}
                    stackSeparation={-30}
                    overlayLabels={overlayLabel}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                    swipeBackCard
                />
            }
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
        </View>
    };

    render () {
        const {modalVisible, loading} = this.state;
        const {theme, user} = this.props;

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
                {
                    loading
                        ?  <View style={[styles.innerView, {backgroundColor: theme.primaryBackgroundColor}]}>
                            <PulseLoader avatar={regex.getProfilePic(user.photos)}/>
                        </View>
                        :  this.renderCard()
                }
                <Modal animationType={'fade'} transparent={true} visible={modalVisible} onRequestClose={() => {}}>
                    <FilterModal theme={theme} filterData={this.filterData}
                                 onClose={(data) => {
                                     let setStateData = {modalVisible: false};
                                     this.setState(setStateData);

                                     if (data) {
                                         this.filterData = data;
                                         this.getUserData();
                                     }
                                 }}
                    />
                </Modal>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    theme: state.auth.theme,
    user: state.auth.user,
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
