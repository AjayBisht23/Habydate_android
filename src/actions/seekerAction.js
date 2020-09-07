import {seekerRequestCollection} from '../config/firestore';
import {getStore} from '../../App';
import {MY_SEND_SEEKER_REQUESTS, SEEKER_REQUESTS} from './types';
import {getUserDetail} from './userAction';
import moment from 'moment';
import {regex} from '../utils/regex';

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

export function getSeekerRequestLists(id) {
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

export function getMySeekerRequestLists(id) {
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
