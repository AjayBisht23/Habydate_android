import {notificationsCollection} from '../config/firestore';
import moment from 'moment';
import {getUserDetail} from './userAction';

export function createNewNotification(parameter) {
    return new Promise((resolve, reject) => {
        notificationsCollection
            .add({
                ...parameter,
                createdAt: moment().utc().unix(),
            }).then(response => {
            resolve(true)
        })
    })
}

export function getNotificationLists(uid) {
    return new Promise((resolve, reject) => {
        notificationsCollection
            .where('to_user', '==', uid)
            .get().then(response => {
            const getUserInfo = response.docs.map(doc => {
                const firebaseData = {
                    id: doc.id,
                    ...doc.data()
                };
                return getUserDetail(firebaseData.from_user, firebaseData);
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

                resolve(response);
            });
        })
    })
}

export function updateNotificationStatus(id, request_status) {
    return new Promise((resolve, reject) => {
        notificationsCollection
            .doc(id)
            .set({request_status: request_status}, { merge: true})
            .then(() => {
                resolve(true)
            })
    })
}

export function getAndUpdateNotificationItem(relationship_id, request_status) {
    return new Promise((resolve, reject) => {
        notificationsCollection
            .where('relationship_id', '==', relationship_id)
            .get().then(response => {
            let notifications = response.docs.map(doc => {
                updateNotificationStatus(doc.id, request_status);
            });
        })
    })
}
