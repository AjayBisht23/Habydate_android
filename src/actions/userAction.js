import {
    conversationsCollection,
    matchesCollection,
    seekerRequestCollection,
    swipeCardsCollection,
    usersCollection,
} from '../config/firestore';
import geohash from "ngeohash";
import {getStore} from '../../App';
import {CONVERSATIONS, MATCHES, MY_SEND_SEEKER_REQUESTS, PEOPLE_WHO_LIKED, SEEKER_REQUESTS} from './types';
import {getUserDetail} from './authAction';
import moment from 'moment';
import {regex} from '../utils/regex';

export function distance(location, location1, unit) {
    let lat1 = location.latitude,
        lon1 = location.longitude,
        lat2 = location1.latitude,
        lon2 = location1.longitude;

    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    } else {
        let radlat1 = Math.PI * lat1/180;
        let radlat2 = Math.PI * lat2/180;
        let theta = lon1-lon2;
        let radtheta = Math.PI * theta/180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === "K") { dist = dist * 1.609344 }
        if (unit === "N") { dist = dist * 0.8684 }
        return Math.round(dist);
    }
}

// Calculate the upper and lower boundary geohashes for
// a given latitude, longitude, and distance in miles
export const getGeoHashRange = (latitude: number, longitude: number, distance: number) => {
    const lat = 0.0144927536231884; // degrees latitude per mile
    const lon = 0.0181818181818182; // degrees longitude per mile

    const lowerLat = latitude - lat * distance;
    const lowerLon = longitude - lon * distance;

    const greaterLat = latitude + lat * distance;
    const greaterLon = longitude + lon * distance;

    const lower = geohash.encode(lowerLat, lowerLon);
    const upper = geohash.encode(greaterLat, greaterLon);

    return {
        lower,
        upper
    };
};

export function discoverUsers(uid, location, distance) {
    return new Promise((resolve, reject) => {
        const { latitude, longitude } = location;
        const range = getGeoHashRange(latitude, longitude, distance);

        usersCollection
            .where('location.geoHash', '>=', range.lower)
            .where('location.geoHash', '<=', range.upper)
            .onSnapshot(snapshot => {
                if (Boolean(snapshot))
                    resolve(snapshot.docs);
            })
    });
}

export function checkOtherUserSwipeExits(uid, other_uid) {
    return new Promise((resolve, reject) => {
        swipeCardsCollection
            .where('uid', '==', other_uid)
            .where('other_uid', '==', uid)
            .where('action', 'in', ['like', 'superLike'])
            .onSnapshot(snapshot => {
                if (Boolean(snapshot))
                    resolve(snapshot.docs);
            })
    });
}

export function swipeCardUser(uid, other_uid, action) {
    return new Promise((resolve, reject) => {
        swipeCardsCollection.doc(`${uid}${other_uid}`).set({uid, other_uid, action, createdAt: moment().utc().unix()}, { merge: true}).then(() => {
            checkOtherUserSwipeExits(uid, other_uid).then(responseData => {
                if (responseData.length > 0 && [action === 'like' || action === 'superLike']) {
                    addSwipeMatch(uid, other_uid).then(response => resolve(response));
                } else
                    reject(false)
            });
        });
    });
}

export function getWhoLikedMe(uid) {
    return new Promise((resolve, reject) => {
        swipeCardsCollection
            .where('other_uid', '==', uid)
            .where('action', '==', 'like')
            .onSnapshot(snapshot => {
                if (Boolean(snapshot)) {
                    let getUserInfo = [];
                    for (let v in snapshot.docs) {
                        let data = snapshot.docs[v]._data;
                        getUserInfo.push(getUserDetail(data.uid, data));
                    }

                    Promise.all(getUserInfo).then(responseData => {
                        let response = [];
                        for (let v in responseData) {
                            let user = responseData[v].response._data;
                            let data = responseData[v].data;
                            response.push({
                                user,
                                ...data
                            })
                        }

                        getStore.dispatch({
                            type: PEOPLE_WHO_LIKED,
                            payload: response
                        });
                        resolve(response);
                    });
                }
            })
    });
}

export function checkSwipeMatchExits(uid, other_uid) {
    return new Promise((resolve, reject) => {
        matchesCollection
            .where('members', 'in', [[uid, other_uid], [other_uid, uid]])
            .onSnapshot(snapshot => {
                if (Boolean(snapshot))
                    resolve(snapshot.docs);
            })
    });
}

export function addSwipeMatch(uid, other_uid) {
    return new Promise((resolve, reject) => {
        checkSwipeMatchExits(uid, other_uid).then(response => {
            if (response.length === 0) {
                let customId = `${uid}${other_uid}`;
                matchesCollection.doc(customId)
                    .set({
                        customId,
                        uid,
                        other_uid,
                        last_swipe_by: uid,
                        members: [uid, other_uid],
                        createdAt: moment().utc().unix()}, { merge: true})
                    .then(() => {
                        addConversation(customId, [uid, other_uid]);
                        resolve(true)
                    }).catch(error => {
                        reject(false)
                    });
            } else
                resolve(true)
        });
    });
}

function getUserMatch(data) {
    return new Promise((resolve, reject) => {
        matchesCollection
            .where(data.key, '==', data.value)
            .onSnapshot(snapshot => {
                if (Boolean(snapshot))
                    resolve(snapshot.docs);
            })
    });
}


export function getAllMatches(uid, isGetConversation) {
    return new Promise((resolve, reject) => {
       let add = [];
       add.push(getUserMatch({key: 'uid', value: uid}));
       add.push(getUserMatch({key: 'other_uid', value: uid}));

       Promise.all(add).then(response => {
           let getUserInfo = [];
           for (let a in response) {
               let data = response[a];
               for (let v in data) {
                   let snapData = data[v]._data;
                   let getUID = snapData.uid === uid ? snapData.other_uid : snapData.uid;
                   getUserInfo.push(getUserDetail(getUID, snapData));
               }
           }

           Promise.all(getUserInfo).then(responseData => {
               let response = [];
               for (let v in responseData) {
                   let user = responseData[v].response._data;
                   let data = responseData[v].data;
                   response.push({
                       user,
                       ...data
                   })
               }

               getStore.dispatch({
                  type: MATCHES,
                  payload: response
               });

               if (isGetConversation)
                getAllConversation(uid);

               resolve(response);
           });

       })
    })
}

export function addConversation(id, members) {
    return new Promise((resolve, reject) => {
        conversationsCollection.doc(id).set({
            matches_id: id,
            members,
            latestMessage: {
                text: ``,
                createdAt: moment().utc().unix()
            }
        }).then(() => {
            resolve(true);
        }).catch(error => {
            reject(false)
        });
    });
}

export function getAllConversation(uid) {
    return new Promise((resolve, reject) => {
        getAllMatches(uid).then(response => {
            if (response.length > 0) {
                let getConversations = response.map(function (o) {return o.customId;});

                conversationsCollection
                    .where('matches_id', 'in', getConversations)
                    .onSnapshot(snapshot => {
                        if (Boolean(snapshot)) {
                            let docs = snapshot.docs;
                            let conversations = [];
                            for (let v in docs) {
                                let data = {
                                    ...docs[v]._data
                                };
                                let obj = response.find(o => o.customId === data.matches_id);
                                data.user = obj.user;
                                conversations.push(data);
                            }

                            getStore.dispatch({
                                type: CONVERSATIONS,
                                payload: conversations
                            });
                            resolve(conversations);
                        }
                    })
            }
        });
    });
}

export function updateLatestMessageInConversation(id, parameter) {
    return new Promise((resolve, reject) => {
        conversationsCollection
            .doc(id)
            .set({
                latestMessage: {
                    ...parameter,
                    createdAt: moment().utc().unix(),
                }},
                { merge: true}).then(response => {

        })
    });
}

export function addMessageInConversation(id, parameter) {
    return new Promise((resolve, reject) => {
        conversationsCollection
            .doc(id)
            .collection('Messages')
            .add({
                ...parameter,
                createdAt: moment().utc().unix(),
            }).then(response => {
                resolve(true)
        })
    });
}

export function getAllMessages(conversationId, otherUser) {
    return new Promise((resolve, reject) => {
        let currentUser = getStore.getState().auth.user;
        conversationsCollection
            .doc(conversationId)
            .collection('Messages')
            .orderBy('createdAt', 'desc')
            .get().then((response) => {
            const messages = response.docs.map(doc => {
                const firebaseData = doc.data();

                const data = {
                    _id: doc.id,
                    ...firebaseData,
                    createdAt: moment.unix(firebaseData.createdAt).local()
                };

                if (!firebaseData.system)
                {
                    data.user = firebaseData.user._id === currentUser.uid ? {
                        ...firebaseData.user,
                        name: currentUser.name,
                        avatar: regex.getProfilePic(currentUser.photos)
                    } : {
                        ...firebaseData.user,
                        name: otherUser.name,
                        avatar: regex.getProfilePic(otherUser.photos)
                    };
                }

                return data;
            });
            resolve(messages);
        })
    });
}

export function sendSeekerRequest(parameter) {
    return new Promise((resolve, reject) => {
        seekerRequestCollection
            .add({
                ...parameter,
                createdAt: moment().utc().unix(),
            }).then(response => {
              resolve(true)
        })
    })
}

export function getSeekerRequest(id) {
    return new Promise((resolve, reject) => {
        seekerRequestCollection
            .where( 'request_to', '==', id)
            .where( 'request_status', 'in', ['', 'accepted'])
            .onSnapshot(snapshot => {
                const getUserInfo = snapshot.docs.map(doc => {
                    const firebaseData = {
                        seeker_id: doc.id,
                        ...doc.data()
                    };
                    return getUserDetail(firebaseData.request_by, firebaseData);
                });

                Promise.all(getUserInfo).then(responseData => {
                    let response = [];
                    for (let v in responseData) {
                        let user = responseData[v].response._data;
                        let data = responseData[v].data;
                        response.push({
                            user,
                            ...data
                        })
                    }
                    getStore.dispatch({
                        type: SEEKER_REQUESTS,
                        payload: response
                    });
                    resolve(response);
                });
            })
    })
}

export function getMySeekerRequest(id) {
    return new Promise((resolve, reject) => {
        seekerRequestCollection
            .where('request_by', '==', id)
            .onSnapshot(snapshot => {
                const getUserInfo = snapshot.docs.map(doc => {
                    const firebaseData = {
                        seeker_id: doc.id,
                        ...doc.data()
                    };
                    return getUserDetail(firebaseData.request_to, firebaseData);
                });

                Promise.all(getUserInfo).then(responseData => {
                    let response = [];
                    for (let v in responseData) {
                        let user = responseData[v].response._data;
                        let data = responseData[v].data;
                        response.push({
                            user,
                            ...data
                        })
                    }
                    getStore.dispatch({
                        type: MY_SEND_SEEKER_REQUESTS,
                        payload: response
                    });
                    resolve(response);
                });
            })
    })
}

export function updateSeekerRequestStatus(id, request_status) {
    return new Promise((resolve, reject) => {
        seekerRequestCollection
            .doc(id)
            .set({request_status: request_status}, { merge: true})
            .then(() => {
                resolve(true)
        })
    })
}

export function deleteSeekerRequest(id) {
    return new Promise((resolve, reject) => {
        seekerRequestCollection
            .doc(id)
            .delete()
            .then(() => {
                resolve(true)
            });
    })
}

export function updateLatestMessageInSeeker(id, parameter) {
    return new Promise((resolve, reject) => {
        seekerRequestCollection
            .doc(id)
            .set({
                    latestMessage: {
                        ...parameter,
                        createdAt: moment().utc().unix(),
                    }},
                { merge: true}).then(response => {

        })
    });
}

export function addMessageInSeeker(id, parameter) {
    return new Promise((resolve, reject) => {
        seekerRequestCollection
            .doc(id)
            .collection('Messages')
            .add({
                ...parameter,
                createdAt: moment().utc().unix(),
            }).then(response => {
               resolve(true)
        })
    });
}

export function getAllMessagesFromSeeker(seekerId, otherUser) {
    return  new Promise((resolve, reject) => {
        let currentUser = getStore.getState().auth.user;
        seekerRequestCollection
            .doc(seekerId)
            .collection('Messages')
            .orderBy('createdAt', 'desc')
            .get().then(response => {
            const getMessages = response.docs.map(doc => {
                const firebaseData = doc.data();

                const data = {
                    _id: doc.id,
                    ...firebaseData,
                    createdAt: moment.unix(firebaseData.createdAt).local()
                };

                if (!firebaseData.system)
                {
                    data.user = firebaseData.user._id === currentUser.uid ? {
                        ...firebaseData.user,
                        name: currentUser.name,
                        avatar: regex.getProfilePic(currentUser.photos)
                    } : {
                        ...firebaseData.user,
                        name: otherUser.name,
                        avatar: regex.getProfilePic(otherUser.photos)
                    };
                }

                return data;
            });
            resolve(getMessages);
        })
    });
}
